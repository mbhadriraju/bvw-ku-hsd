import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

// Specify that this route runs in Node.js environment
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON request to get the image URL
    const { imageUrl } = await request.json();
    if (!imageUrl) {
      // Return 400 if no image URL is provided
      return NextResponse.json({ error: "No image URL provided" }, { status: 400 });
    }

    // Call the Python BlazeFace face detection function
    const faceDetectionResult = await detectFacesWithBlazeFace(imageUrl);
    console.log(faceDetectionResult);

    // If faces are detected, process cropping
    if (faceDetectionResult.success && faceDetectionResult.faces.length > 0) {
      const croppedImageUrl = await processCropWithFaces(imageUrl, faceDetectionResult.faces);
      return NextResponse.json({
        success: true,
        croppedImageUrl,
        faces: faceDetectionResult.faces,
        message: `Detected ${faceDetectionResult.faces.length} face(s).`,
      });
    }

    // Return original image if no faces are detected
    return NextResponse.json({
      success: false,
      croppedImageUrl: imageUrl,
      faces: [],
      message: "No faces detected.",
    });
  } catch (err) {
    // Catch any unexpected errors
    console.error("Crop API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * Detect faces using BlazeFace Python script
 * 
 * @param imageUrl - URL of the image to process
 * @returns Promise resolving to JSON result from Python script
 */
async function detectFacesWithBlazeFace(imageUrl: string): Promise<any> {
  return new Promise(async (resolve) => {
    try {
      // Fetch the image from the provided URL
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      // Convert the image to Base64 for Python script input
      const base64Image = Buffer.from(buffer).toString("base64");

      // Construct absolute path to the Python BlazeFace detector script
      const scriptPath = path.join(process.cwd(), "face-detection", "blazeface_detector.py");

      // Spawn a child Python process to run the detector
      const pythonProcess = spawn("python3", [
        scriptPath,
        "--image",
        base64Image,
        "--conf",
        "0.5",
        "--iou",
        "0.3",
        "--max-det",
        "25",
      ]);

      let output = "";      // Collect stdout from Python
      let errorOutput = ""; // Collect stderr from Python

      pythonProcess.stdout.on("data", (data) => (output += data.toString()));
      pythonProcess.stderr.on("data", (data) => (errorOutput += data.toString()));

      pythonProcess.on("close", (code) => {
        if (code === 0) {
          // Parse JSON output from Python script if process succeeded
          try {
            resolve(JSON.parse(output));
          } catch (err) {
            console.error("JSON parse error:", err);
            resolve({ success: false, error: "Failed to parse Python output" });
          }
        } else {
          // If Python process fails, return the error output
          console.error("Python error:", errorOutput);
          resolve({ success: false, error: errorOutput });
        }
      });
    } catch (err) {
      // Handle errors while fetching or processing the image
      resolve({ success: false, error: err.message });
    }
  });
}

/**
 * Process cropping using detected faces
 * 
 * Currently just logs primary face bounding box.
 * You can implement cropping using Sharp/Jimp if desired.
 * 
 * @param imageUrl - Original image URL
 * @param faces - Array of detected faces with bounding boxes
 * @returns Promise resolving to URL of cropped image
 */
async function processCropWithFaces(imageUrl: string, faces: any[]): Promise<string> {
  try {
    // Choose the face with the highest confidence
    const primaryFace = faces.reduce((a, b) =>
      b.confidence > a.confidence ? b : a
    );
    console.log("Detected primary face:", primaryFace.bounding_box);

    // For now, return original image (no cropping applied)
    return imageUrl;
  } catch (err) {
    console.error("Error cropping image:", err);
    return imageUrl;
  }
}