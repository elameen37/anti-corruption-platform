import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICPC SICE | Sovereign Gateway",
  description: "Secure Inter-Agency Collaboration Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
