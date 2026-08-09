import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI 備課到互動教材｜從課程構想到教材上線",
  description: "資優教師的 AI 備課實作教材：閱讀完整講義，或開啟情境引導的互動 HTML 簡報。",
  openGraph: {
    title: "AI 備課到互動教材",
    description: "講義 × HTML 簡報",
    images: [{ url: "/og.png", width: 1536, height: 915, alt: "AI 備課到互動教材" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 備課到互動教材",
    description: "講義 × HTML 簡報",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}