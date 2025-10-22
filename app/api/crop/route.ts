import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();
    if (!imageUrl) {
      return NextResponse.json({ error: "No image URL provided" }, { status: 400 });
    }

    // Run face detection
    const faceDetectionResult = await detectFacesWithBlazeFace(imageUrl);
    console.log(faceDetectionResult)
    if (faceDetectionResult.success && faceDetectionResult.faces.length > 0) {
      const croppedImageUrl = await processCropWithFaces(imageUrl, faceDetectionResult.faces);
      return NextResponse.json({
        success: true,
        croppedImageUrl,
        faces: faceDetectionResult.faces,
        message: `Detected ${faceDetectionResult.faces.length} face(s).`,
      });
    }

    return NextResponse.json({
      success: false,
      croppedImageUrl: imageUrl,
      faces: [],
      message: "No faces detected.",
    });
  } catch (err) {
    console.error("Crop API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function detectFacesWithBlazeFace(imageUrl: string): Promise<any> {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");

      const scriptPath = path.join(process.cwd(), "face-detection", "blazeface_detector.py");

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

      let output = "";
      let errorOutput = "";

      pythonProcess.stdout.on("data", (data) => (output += data.toString()));
      pythonProcess.stderr.on("data", (data) => (errorOutput += data.toString()));

      pythonProcess.on("close", (code) => {
        if (code === 0) {
          try {
            resolve(JSON.parse(output));
          } catch (err) {
            console.error("JSON parse error:", err);
            resolve({ success: false, error: "Failed to parse Python output" });
          }
        } else {
          console.error("Python error:", errorOutput);
          resolve({ success: false, error: errorOutput });
        }
      });
    } catch (err) {
      resolve({ success: false, error: err.message });
    }
  });
}

async function processCropWithFaces(imageUrl: string, faces: any[]): Promise<string> {
  try {
    const primaryFace = faces.reduce((a, b) =>
      b.confidence > a.confidence ? b : a
    );
    console.log("Detected primary face:", primaryFace.bounding_box);

    // For now, return the original image (you can crop using Sharp if desired)
    return imageUrl;
  } catch (err) {
    console.error("Error cropping image:", err);
    return imageUrl;
  }
}