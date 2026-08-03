import { Page, Prompt, Checks, WriteBox } from "../components";
import styles from "../styles/Page04.module.css";

export default function Page04() {
  return (
<Page pageId="p04" step="STEP 1｜操作產出" title="延伸選定構想，產出課程藍圖" className={styles.page}>
          <p className="lead">隆老師從前一輪提出的方案中選定一個方向，再請 AI 把構想延伸得更具體，整理成後續製作教材時可使用的課程藍圖。</p>
          <ol className="steps blueprintGrid">
            <li><b>盤點</b><p>回答 AI 的關鍵問題；不確定的內容標成待確認。</p></li>
            <li><b>發散</b><p>請 AI 提出三個差異明確的主軸，逐案列出價值、風險與適用條件。</p></li>
            <li><b>選擇</b><p>由你選定方向，再要求 AI 指出最可能失敗的地方與修正方式。</p></li>
            <li><b>成型</b><p>依下列欄位輸出一頁式藍圖，並標示事實、推論與教師決策。</p></li>
          </ol>
          <Prompt>
            我想採用第＿＿個構想，並保留［我特別喜歡的部分］。請根據前面的討論，把這個構想延伸成一頁式課程藍圖，包含：課程名稱、核心問題、學習目標、活動流程、學生任務、預計成果、所需材料、時間安排與注意事項。若有尚未決定或資料不足的地方，請標示出來，不要自行補完。
          </Prompt>
          <div className="miniTemplate">
            <h3>一頁式藍圖驗收</h3>
            <Checks items={[
              "核心問題可用一句話說明，而且學生真的能在活動中回應。",
              "每個活動都能指出要產生哪一項學習證據。",
              "時間加總合理，材料與安全提醒出現在活動之前。",
              "沒有把 AI 推論寫成已查證的事實。",
            ]} />
          </div>
          <WriteBox title="我決定保留／刪除／再查證的內容" lines={3} />
        </Page>
  );
}
