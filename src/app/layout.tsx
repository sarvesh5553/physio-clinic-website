import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhysioCare - Expert Physiotherapy & Rehabilitation",
  description: "Professional physiotherapy services by Dr. Bhagyashree Salunke",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="teal" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}