import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Covoitly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full bg-primary">{children}</body>
    </html>
  );
}
