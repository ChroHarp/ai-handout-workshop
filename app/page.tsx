import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const resources = [
  {
    href: "/handout",
    eyebrow: "課前閱讀與實作參考",
    title: "教學講義",
    description: "依照完整流程閱讀課程規劃、講義製作、互動設計與上線步驟。",
    action: "閱讀講義",
    image: "/images/home/handout-card.png",
    imageAlt: "桌面上的教學講義與活動工作頁",
    priority: true,
  },
  {
    href: "/slides/ai-prep-to-interactive",
    eyebrow: "課堂投影與操作示範",
    title: "HTML 簡報",
    description: "跟著隆老師從模糊構想開始，逐步完成可互動、可分享的教材。",
    action: "開啟簡報",
    image: "/images/ai-prep-to-interactive/cover-generated.png",
    imageAlt: "光影教材與瀏覽器簡報的工作桌",
    priority: false,
  },
];

export default function Home() {
  return (
    <main className={styles.portal}>
      <header className={styles.intro}>
        <p className={styles.kicker}>臺北市新進教師研習</p>
        <h1>AI 備課到互動教材</h1>
        <p className={styles.lead}>選擇你要使用的教材</p>
      </header>

      <section className={styles.cards} aria-label="教材入口">
        {resources.map((resource) => (
          <Link className={styles.card} href={resource.href} key={resource.href}>
            <span className={styles.imageWrap}>
              <Image
                src={resource.image}
                alt={resource.imageAlt}
                fill
                priority={resource.priority}
                sizes="(max-width: 760px) 90vw, 44vw"
              />
            </span>
            <span className={styles.copy}>
              <span className={styles.eyebrow}>{resource.eyebrow}</span>
              <strong>{resource.title}</strong>
              <span className={styles.description}>{resource.description}</span>
              <span className={styles.action}>
                {resource.action}<b aria-hidden="true">→</b>
              </span>
            </span>
          </Link>
        ))}
      </section>

      <footer className={styles.footer}>
        教育部資優央團輔導員　平興國中 陳隆期老師
      </footer>
    </main>
  );
}