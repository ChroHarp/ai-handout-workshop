import { Page, Prompt } from "../components";
import styles from "../styles/Page01.module.css";

export default function Page01() {
  return (
<Page pageId="p01" id="start" step="START" title="教學目標" className={styles.page}>
          <h3>完成研習後，你能夠</h3>
          <ol className="steps blueprintGrid">
            <li><b>討論課程規劃</b><p>運用 AI 蒐集資料、整理需求，從模糊構想逐步形成可行的課程方向。</p></li>
            <li><b>產出學習文件</b><p>依課程規劃製作講義與學習單，讓內容、活動與學習證據互相對應。</p></li>
            <li><b>建立 HTML 簡報</b><p>把講義內容轉換成適合投影、分頁呈現與課堂引導的 HTML 簡報。</p></li>
            <li><b>加入互動並上線</b><p>在簡報中加入一個互動頁面，完成測試、部署，並認識後續延伸方式。</p></li>
          </ol>
          <h2 className="inlineSectionTitle">從初步構想到資料蒐集</h2>
          <p className="lead">
            隆老師接到暑期 SEL 資優營隊的邀約。他雖然有 SEL 的基本概念，但對於課程還不熟悉，於是開始與 AI 助理討論如何設計課程。
          </p>
          <h3>先準備存放這次工作的資料夾</h3>
          <p>預計會逐步完成課程藍圖、講義、學習單與簡報；先把它們放在同一個資料夾中，方便後續整理與修改。</p>
          <div className="folder">
            <div className="folderTitle">我的課程主題／</div>
            <ul>
              <li><b>課程藍圖</b><span>整理課程方向與活動安排</span></li>
              <li><b>講義與學習單</b><span>學生閱讀與操作時使用</span></li>
              <li><b>課堂簡報</b><span>協助說明、示範與帶領活動</span></li>
              <li><b>參考資料</b><span>收集文字、圖片與課程案例</span></li>
            </ul>
          </div>
          <h3>先和 AI 討論初步構想與搜尋方向</h3>
          <Prompt title="隆老師的第一個問題">
            我想要設計一門課程，關於如何製作投影畫。學生用小紙片或模型插在平台上，透過特定角度的光照，產生出投影圖案。想要搜尋這些課程資料，要使用什麼關鍵字？
          </Prompt>
        </Page>
  );
}
