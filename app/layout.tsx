import type { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eat Real Food",
  description:
    "America is the greatest country on Earth. And the sickest. Highly processed food has hollowed out our health. The truth is simple: real food restores health.",
  metadataBase: new URL("https://realfood.gov"),
  openGraph: {
    title: "Eat Real Food",
    description:
      "America is the greatest country on Earth. And the sickest. Highly processed food has hollowed out our health. The truth is simple: real food restores health.",
    images: ["/seo/opengraph-image-1200x630.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eat Real Food",
    description:
      "Highly processed food has hollowed out our health. The truth is simple: real food restores health.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  other: {
    "theme-color": "#F3F0D6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
