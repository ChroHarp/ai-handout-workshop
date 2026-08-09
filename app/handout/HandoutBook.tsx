"use client";

import { useEffect } from "react";
import CoverPage from "./pages/CoverPage";
import Page01 from "./pages/Page01";
import Page02 from "./pages/Page02";
import Page03 from "./pages/Page03";
import Page04 from "./pages/Page04";
import Page05 from "./pages/Page05";
import Page06 from "./pages/Page06";
import Page07 from "./pages/Page07";
import Page08 from "./pages/Page08";
import Page09 from "./pages/Page09";
import Page10 from "./pages/Page10";
import Page11 from "./pages/Page11";
import Page12 from "./pages/Page12";

import Page14 from "./pages/Page14";
import Page15 from "./pages/Page15";

const navItems = [
  ["start", "教學目標"],
  ["step1", "1 建立課程雛形"],
  ["step2", "2 製作學習文件"],
  ["step3", "3 製作 HTML 簡報"],
  ["step4", "4 互動與上線"],
  ["step5", "5 延伸與維護"],
];

export default function HandoutBook() {
  useEffect(() => {
    const checkOverflow = () => {
      document.querySelectorAll<HTMLElement>(".sheet").forEach((sheet) => {
        const overflowing = sheet.scrollHeight > sheet.clientHeight + 1;
        sheet.dataset.overflow = String(overflowing);
      });
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    document.fonts?.ready.then(checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);


  return (
    <>
      <nav className="topbar" aria-label="講義章節">
        <a className="brand" href="/">
          AI 教材工作坊
        </a>
        <div className="navlinks">
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
        <button onClick={() => window.print()} aria-label="列印或另存 PDF">
          列印／另存 PDF
        </button>
      </nav>

      <main className="book">
        <CoverPage />
        <Page01 />
        <Page02 />
        <Page03 />
        <Page04 />
        <Page05 />
        <Page06 />
        <Page07 />
        <Page08 />
        <Page09 />
        <Page10 />
        <Page11 />
        <Page12 />

        <Page14 />
        <Page15 />
      </main>
    </>
  );
}
