import Image from "next/image";
import styles from "./page.module.css";

const HOME_URL = "https://ai-handout-workshop.vercel.app/";

export default function HomeQr() {
  return (
    <a className={styles.homeQr} href={HOME_URL} target="_blank" rel="noreferrer" aria-label="開啟 AI 備課到互動教材正式網站">
      <Image src="/images/home/site-qr.png" width={84} height={84} alt="AI 備課到互動教材正式網站 QR code" />
      <span>
        <strong>掃描開啟主頁</strong>
        <small>ai-handout-workshop.vercel.app</small>
      </span>
    </a>
  );
}
