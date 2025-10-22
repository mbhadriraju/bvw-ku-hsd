import { type NextRequest } from "next/server";

// Use dynamic import so bundlers that don't like puppeteer at build-time won't fail
const puppeteer = await import("puppeteer");

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    const { poster } = await request.json();

    // Wrap poster HTML in a full document and set a base so root-relative
    // image URLs (e.g. /uploads/...) resolve correctly when Puppeteer loads it.
    const html = `<!doctype html>
    <html>
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <base href="http://localhost:3001/">
            <style>body{margin:0}</style>
        </head>
        <body>
            ${poster}
        </body>
    </html>`;

    // Launch Puppeteer with common flags for headless environments.
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();

    // Set the HTML content. Provide networkidle to wait for images to load.
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Create PDF. You can tune size, margins, and scale here.
        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
        await browser.close();

        // Convert Node buffer/Uint8Array to a plain ArrayBuffer for the Response body
            const arrayBuffer = pdfBuffer.buffer.slice(
                pdfBuffer.byteOffset,
                pdfBuffer.byteOffset + pdfBuffer.byteLength
            );

                    const uint8 = new Uint8Array(arrayBuffer);

                    // Convert to base64 so we can safely return JSON from the route and let the
                    // client construct a Blob and trigger a download. This avoids typing issues
                    // with streaming binary responses in some Next runtimes.
                    const base64 = Buffer.from(uint8).toString("base64");

                    return new Response(JSON.stringify({ base64 }), {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
}