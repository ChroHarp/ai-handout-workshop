import { Page, Callout, Prompt } from "../components";
import styles from "../styles/Page08.module.css";

export default function Page08() {
  return (
<Page pageId="p08" step="STEP 3｜提示詞模板" title="規劃投影片地圖" className={styles.page}>
          <p className="lead">輸入提示語後，AI 會先提出一版頁面規劃。先看每一頁在課堂上的作用，再針對需要調整的頁面提出修改，不必一開始就要求完整程式。</p>
          <div className="slideMap exampleMap">
            {[
              ["01", "封面與作品照片", "先讓學生看見成品，不急著解釋"],
              ["02", "你看見了什麼？", "以提問引導觀察形狀與影子"],
              ["03", "影子怎麼形成？", "用簡圖說明光源、物體與投影面"],
              ["04", "改變位置", "比較物體前後移動造成的差異"],
              ["05", "改變角度", "分段呈現旋轉前後的影子"],
              ["06", "活動任務", "交代今天要完成的作品與步驟"],
            ].map(([n, title, role]) => <article key={n}><b>{n}</b><h3>{title}</h3><p>{role}</p></article>)}
          </div>
          <Prompt>
            我要把這份［講義／課程內容］做成上課用簡報。講義要保留完整說明，簡報則要配合教學節奏，避免一頁放太多文字。請先規劃每一頁要呈現的主題、重點內容與建議畫面，現在先不要寫程式。頁數依內容需要決定。
          </Prompt>
          <Callout title="後續怎麼修改" tone="orange">直接指定頁次與期待結果，例如：「第 3 頁概念太多，拆成兩頁」或「第 5 頁先只出現問題，按下一步才顯示比較圖」。確認順序後，再請 AI 依最新版規劃製作簡報。</Callout>
          <h2 className="inlineSectionTitle">生成、存檔、預覽單檔 HTML 簡報</h2>
          <ol className="steps compact">
            <li><b>確認地圖</b><p>先修改頁數、順序與每頁唯一訊息。</p></li>
            <li><b>要求程式</b><p>指定單檔 <code>index.html</code>、繁體中文、鍵盤與按鈕導覽、頁碼、手機版。</p></li>
          </ol>
        </Page>
  );
}
