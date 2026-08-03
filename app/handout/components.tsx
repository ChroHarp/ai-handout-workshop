import type { ReactNode } from "react";

export function Page({
  pageId,
  id,
  step,
  title,
  children,
  className = "",
}: {
  pageId: string;
  id?: string;
  step: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const isMajorSection = Boolean(id === "start" || className.includes("stepBreak"));

  return (
    <section data-page={pageId} id={id} className={`sheet ${className}`}>
      <div className={`sectionHeading ${isMajorSection ? "majorHeading" : "subHeading"}`}>
        {isMajorSection && (
          <header className="sheetHeader">
            <span>{step}</span>
            <span>AI 備課到互動教材｜教師實作講義</span>
          </header>
        )}
        <h2>{title}</h2>
      </div>
      {children}
      <footer className="sheetFooter">
        <span>從課程構想到教材上線</span>
        <span className="pageNo" />
      </footer>
    </section>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <span className="label">{children}</span>;
}

export function Callout({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "teal" | "orange";
}) {
  return (
    <aside className={`callout ${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function Prompt({
  children,
  title = "可複製提示詞模板",
  note = "替換括號中的內容，再貼入 AI 對話工具",
}: {
  children: ReactNode;
  title?: string;
  note?: string;
}) {
  return (
    <div className="prompt">
      <div className="promptTop">
        <span>{title}</span>
        <span>{note}</span>
      </div>
      <p>{children}</p>
    </div>
  );
}

export function Checks({ items }: { items: string[] }) {
  return (
    <ul className="checks">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function WriteBox({
  title,
  lines = 3,
}: {
  title: string;
  lines?: number;
}) {
  return (
    <div className="writeBox">
      <strong>{title}</strong>
      {Array.from({ length: lines }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
