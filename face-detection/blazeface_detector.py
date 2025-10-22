#!/usr/bin/env python3
"""
BlazeFace ONNX Face Detection Script
Integrates with Node.js backend for real face detection
"""

import sys
import json
import base64
import numpy as np
from PIL import Image
import onnxruntime as ort
from io import BytesIO
import argparse
import os

class BlazeFaceDetector:
    def __init__(self, model_path="face-detection/blaze.onnx"):
        """
        Initialize the BlazeFace detector with ONNX model
        
        Args:
            model_path (str): Path to the local ONNX model file
        """
        self.model_path = model_path
        self.session = None
        self.load_model()  # Load the ONNX model on initialization
    
    def load_model(self):
        """Load the ONNX model from local path"""
        if not os.path.exists(self.model_path):
            print(f"ERROR: ONNX model not found at {self.model_path}", file=sys.stderr)
            sys.exit(1)
        
        try:
            # Create an ONNX runtime session for inference
            self.session = ort.InferenceSession(self.model_path)
            print("BlazeFace ONNX model loaded successfully", file=sys.stderr)
        except Exception as e:
            print(f"Error loading model: {e}", file=sys.stderr)
            sys.exit(1)
    
    def preprocess_image(self, image_data):
        """
        Convert base64 image bytes to a normalized tensor suitable for BlazeFace
        
        Args:
            image_data (bytes): Raw image bytes
        
        Returns:
            img_tensor (np.array): Preprocessed image tensor
            orig_width (int): Original image width
            orig_height (int): Original image height
        """
        try:
            image = Image.open(BytesIO(image_data)).convert("RGB")  # Ensure 3 channels
            orig_width, orig_height = image.size
            img_128 = image.resize((128, 128))  # BlazeFace expects 128x128 input
            img_np = np.asarray(img_128, dtype=np.float32) / 255.0  # Normalize to [0,1]
            img_np = np.transpose(img_np, (2, 0, 1))[None, ...]  # Convert to CHW format with batch dim
            return img_np, orig_width, orig_height
        except Exception as e:
            print(f"Error preprocessing image: {e}", file=sys.stderr)
            return None, None, None
    
    def detect_faces(self, image_data, conf_threshold=0.5, iou_threshold=0.3, max_detections=25):
        """
        Detect faces in the given image
        
        Args:
            image_data (bytes): Raw image bytes
            conf_threshold (float): Minimum confidence for detection
            iou_threshold (float): IOU threshold for non-max suppression
            max_detections (int): Maximum number of faces to detect
        
        Returns:
            faces (list): List of detected faces with bounding boxes and landmarks
        """
        img_tensor, orig_width, orig_height = self.preprocess_image(image_data)
        if img_tensor is None:
            return []

        try:
            # Run inference
            outputs = self.session.run(None, {
                "image": img_tensor.astype(np.float32),
                "conf_threshold": np.array([conf_threshold], dtype=np.float32),
                "max_detections": np.array([max_detections], dtype=np.int64),
                "iou_threshold": np.array([iou_threshold], dtype=np.float32),
            })
            
            boxes = outputs[0][0]  # Bounding boxes
            scores = outputs[1][0] if len(outputs) > 1 else np.ones(len(boxes), dtype=np.float32)
            
            faces = []

            # If only one face, reshape
            if boxes.ndim == 1:
                boxes = boxes.reshape(1, 16)
            
            # Iterate through detections
            for i, (det, score) in enumerate(zip(boxes, scores)):
                if score < conf_threshold:
                    continue  # Skip low-confidence detections
                
                # Extract bounding box coordinates
                top_y, top_x, bot_y, bot_x = det[0], det[1], det[2], det[3]
                x1 = int(top_x * orig_width)
                y1 = int(top_y * orig_height)
                x2 = int(bot_x * orig_width)
                y2 = int(bot_y * orig_height)
                
                # Ignore tiny boxes
                if x2 - x1 < 5 or y2 - y1 < 5:
                    continue
                
                # Extract facial landmarks
                landmarks = {
                    "left_eye": {"x": det[4]*orig_width, "y": det[5]*orig_height},
                    "right_eye": {"x": det[6]*orig_width, "y": det[7]*orig_height},
                    "nose": {"x": det[8]*orig_width, "y": det[9]*orig_height},
                    "mouth": {"x": det[10]*orig_width, "y": det[11]*orig_height},
                    "left_cheek": {"x": det[12]*orig_width, "y": det[13]*orig_height},
                    "right_cheek": {"x": det[14]*orig_width, "y": det[15]*orig_height}
                }

                # Append face result
                faces.append({
                    "id": i,
                    "confidence": float(score),
                    "bounding_box": {"x": x1, "y": y1, "width": x2-x1 + 30, "height": y2-y1 + 30},
                    "landmarks": landmarks
                })
            return faces
        except Exception as e:
            print(f"Error detecting faces: {e}", file=sys.stderr)
            return []

def main():
    """Command-line interface for face detection"""
    parser = argparse.ArgumentParser(description="BlazeFace ONNX Face Detection")
    parser.add_argument("--image", required=True, help="Base64 encoded image data")
    parser.add_argument("--conf", type=float, default=0.5)
    parser.add_argument("--iou", type=float, default=0.3)
    parser.add_argument("--max-det", type=int, default=25)
    args = parser.parse_args()
    
    try:
        # Decode the base64 image
        image_data = base64.b64decode(args.image)

        # Initialize detector
        detector = BlazeFaceDetector()

        # Perform face detection
        faces = detector.detect_faces(
            image_data,
            conf_threshold=args.conf,
            iou_threshold=args.iou,
            max_detections=args.max_det
        )

        # Output results as JSON
        print(json.dumps({"success": True, "faces": faces, "count": len(faces)}))
    except Exception as e:
        # Handle errors gracefully
        print(json.dumps({"success": False, "error": str(e), "faces": [], "count": 0}))
        sys.exit(1)

if __name__ == "__main__":
    main()