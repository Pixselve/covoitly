import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Covoitly",
  description: "Organisez simplement vos covoiturages entre amis.",
  authors: [
    {
      name: "Mael Kerichard",
      url: "https://mael.app",
    },
  ],
  creator: "Mael Kerichard",
  robots: {
    follow: true,
    index: true,
  },
  metadataBase: new URL("https://covoitly.mael.app"),
  applicationName: "Covoitly",
  openGraph: {
    url: "https://covoitly.mael.app",
    title: "Covoitly",
    locale: "fr_FR",
    type: "website",
    description: "Organisez simplement vos covoiturages entre amis.",
    siteName: "Covoitly",
  },
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
