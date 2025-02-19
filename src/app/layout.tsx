import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniel_Park_Terminal",
  description: "Welcome to the digital workspace of Daniel Park",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
