import { Page, Prompt } from "../components";
import styles from "../styles/Page09.module.css";

export default function Page09() {
  return (
<Page pageId="p09" step="STEP 3｜操作產出" title="完成存檔、預覽與修訂" className={styles.page}>
          <ol className="steps compact continueAt3">
            <li><b>正確存檔</b><p>把完整程式貼入純文字編輯器，以 UTF-8 儲存為 <code>index.html</code>，不是 <code>index.html.txt</code>。</p></li>
            <li><b>本機預覽</b><p>在檔案總管雙擊開啟；測試前後按鈕、方向鍵、首頁／末頁與視窗縮放。</p></li>
            <li><b>只修一輪</b><p>列出具體錯誤、所在頁次、期待結果，再請 AI 修改完整檔案。</p></li>
          </ol>
          <Prompt>
            請依照剛才確認的投影片規劃，製作一份可以在瀏覽器開啟的 HTML 簡報。使用繁體中文，整體風格簡潔、適合教室投影；每頁聚焦一個重點，內容較多時使用 grid 排版，不要全部擠成長段文字。需要講解順序的內容請依序出現。加入上一頁、下一頁、頁碼與鍵盤方向鍵操作，並讓手機畫面也能正常閱讀。
          </Prompt>
          <div className="revisionGrid">
            <span>依序出現</span><span>改成 2×2 grid</span><span>降低文字密度</span><span>放大重點圖</span>
            <span>拆成兩頁</span><span>左右對照</span><span>統一色彩與字級</span><span>先提問再揭示答案</span>
          </div>
          <div className="twoCols">
            <div className="miniTemplate"><h3>常見錯誤</h3><p>瀏覽器顯示程式文字：檔案副檔名錯誤。圖片破圖：路徑或檔名不一致。按鈕無反應：請 AI 檢查主控台錯誤。</p></div>
            <div className="miniTemplate"><h3>修正描述</h3><p>「第 4 頁下一頁按鈕無反應；期待點擊後到第 5 頁。請找出原因，修改後回傳完整 index.html。」</p></div>
          </div>
        </Page>
  );
}
