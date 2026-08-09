import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 備課到互動教材｜從課程構想到教材上線",
  description: "資優教師的 AI 備課實作講義：從課程規劃、講義與學習單，到 HTML 簡報、互動網頁與 Netlify 分享。",
  other: {
    "codex-preview": "development",
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
