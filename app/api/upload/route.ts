import { type NextRequest, NextResponse } from "next/server";
import fs from "fs/promises"; // File system module with promise support
import path from "path";      // Module to handle file paths

// Specify that this API route runs in Node.js environment
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parse incoming form data from the request
    const formData = await request.formData();
    // Extract the "file" field from form data
    const file = formData.get("file");

    // Validate that a file was provided
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Ensure the retrieved item is actually a File instance
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type (allow only PNG or JPEG)
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Set the filename to save as in the public folder
    const newFileName = "upload-file.png";

    // Convert File to ArrayBuffer, then to Node.js Buffer
    const arrayBuffer = await (file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get absolute path to the "public" directory
    const publicDir = path.join(process.cwd(), "public");
    // Create full destination path for the file
    const destPath = path.join(publicDir, newFileName);

    // Write the buffer to disk
    await fs.writeFile(destPath, buffer);

    // Create a public URL to access the uploaded file
    const publicUrl = `/${newFileName}`;

    // Return success response with URL
    return NextResponse.json({ success: true, url: publicUrl }, { status: 200 });
  } catch (err) {
    // Catch any errors during file handling and respond with 500
    console.error("Error handling upload:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}