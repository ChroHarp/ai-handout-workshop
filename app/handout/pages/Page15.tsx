import { Page, Callout, WriteBox } from "../components";
import styles from "../styles/Page15.module.css";

export default function Page15() {
  return (
<Page pageId="p15" step="FINISH" title="成果交付與最後驗收" className={styles.page}>
          <div className="finalChecklist">
            {[
              ["01", "課程藍圖", "核心問題、目標、歷程、證據、限制可互相對應"],
              ["02", "講義初稿", "學生不看簡報也能理解任務與必要內容"],
              ["03", "學習單", "確實留下觀察、推理、決策或反思證據"],
              ["04", "HTML 簡報", "頁數符合教學需要、可導覽、手機可讀、內容來自講義"],
              ["05", "單一互動", "操作、畫面變化、回饋與重試都可理解"],
              ["06", "分享與原稿", "網址可開啟，本機資料夾與版本仍保留"],
            ].map(([n, title, desc]) => (
              <div key={n}><b>{n}</b><span><strong>{title}</strong><p>{desc}</p></span><i /></div>
            ))}
          </div>
          <div className="threeCols finalNotes">
            <WriteBox title="我今天完成了" lines={3} />
            <WriteBox title="我還要修正" lines={3} />
            <WriteBox title="下一次實際使用日期" lines={3} />
          </div>
          <Callout title="收束" tone="teal">
            把 Netlify 網址或本機檔名貼到成果區；為資料夾加上日期或版本號。下一次從這份原稿繼續修，不重新生成一套無法對照的新檔案。
          </Callout>
          <div className="links">
            <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer">Netlify Drop</a>
            <a href="https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/" target="_blank" rel="noreferrer">官方操作文件</a>
            <button onClick={() => window.print()}>列印／另存 PDF</button>
          </div>
        </Page>
  );
}
