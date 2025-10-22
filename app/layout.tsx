import type { Metadata } from "next"; // Import Metadata type for defining page metadata
import "./globals.css";               // Import global CSS (includes fonts and Tailwind setup)

// Define metadata for the app (used by Next.js for SEO and browser title)
export const metadata: Metadata = {
  title: "Wild West Poster Generator",  // Page title shown in browser tab
  description: "Wild West Poster Generator", // Meta description for SEO
};

// Root layout component that wraps the entire app
export default function RootLayout({
  children,  // `children` represents the content of all pages inside this layout
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}