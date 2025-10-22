import { type NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }
    const newFileName = "upload-file.png";

    const arrayBuffer = await (file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicDir = path.join(process.cwd(), "public");
    const destPath = path.join(publicDir, newFileName);

    await fs.writeFile(destPath, buffer);
    const publicUrl = `/${newFileName}`;

    return NextResponse.json({ success: true, url: publicUrl }, { status: 200 });
  } catch (err) {
    console.error("Error handling upload:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}