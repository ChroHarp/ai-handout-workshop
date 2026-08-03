import { Page } from "../components";
import styles from "../styles/Page12.module.css";

export default function Page12() {
  return (
<Page pageId="p12" step="STEP 4｜註冊與部署" title="第一次拖放部署：從資料夾取得網址" className={styles.page}>
          <div className="imageFrame wide">
            <img src="/assets/netlify-drop.jpg" alt="Netlify Drop 頁面中央的拖放區" />
            <p>實際畫面｜將資料夾、ZIP 或單一 HTML 放入中央 Drop here 區域</p>
          </div>
          <ol className="steps compact numbered">
            <li><b>部署前整理</b><p>最上層必須有 <code>index.html</code>；圖片放在 <code>assets</code>；全部使用相對路徑。</p></li>
            <li><b>重新本機測試</b><p>先關閉再開啟 <code>index.html</code>，確認中文、圖片、按鈕與互動都正常。</p></li>
            <li><b>打開 Drop</b><p>前往 <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer">app.netlify.com/drop</a>，把整個 <code>web</code> 資料夾拖入中央區域。</p></li>
            <li><b>等待完成</b><p>上傳完成後會得到可分享網址。若畫面要求登入或認領專案，依提示回到已登入帳號。</p></li>
          </ol>
          <ol className="steps compact numbered continueAt5">
            <li><b>線上驗收</b><p>開新分頁及手機測試網址；把連結貼回工作頁，同時保留本機原稿。</p></li>
          </ol>
        </Page>
  );
}
