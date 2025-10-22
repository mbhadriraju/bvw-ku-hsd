import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wild West Poster Generator",
  description: "Wild West Poster Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
