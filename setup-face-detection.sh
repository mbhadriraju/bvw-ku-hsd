#!/bin/bash

# Setup script for BlazeFace ONNX face detection
# This script installs Python dependencies and downloads the BlazeFace model

echo "Setting up BlazeFace ONNX face detection..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed. Please install Python 3.7+ first."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "Error: pip3 is not installed. Please install pip3 first."
    exit 1
fi

# Navigate to face-detection directory
cd face-detection

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt

# Download BlazeFace ONNX model if it doesn't exist
if [ ! -f "blaze.onnx" ]; then
    echo "Downloading BlazeFace ONNX model..."
    wget "https://huggingface.co/garavv/blazeface-onnx/resolve/main/blaze.onnx" -O blaze.onnx
    echo "Model downloaded successfully!"
else
    echo "BlazeFace ONNX model already exists."
fi

# Test the Python script
echo "Testing BlazeFace detector..."
python3 blazeface_detector.py --help

echo "Setup complete! BlazeFace ONNX face detection is ready to use."
echo ""
echo "To test face detection manually, run:"
echo "python3 blazeface_detector.py --image <base64_image_data>"
