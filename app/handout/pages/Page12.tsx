import { Page, Callout } from "../components";
import styles from "../styles/Page12.module.css";

export default function Page12() {
  return (
<Page pageId="p12" step="STEP 4" title="" className={styles.page}>
          <ol className={`steps compact continueAt3 ${styles.continuedSteps}`}>
            <li><b>打開 Drop</b><p>前往 <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer">app.netlify.com/drop</a>，把整個 <code>web</code> 資料夾拖入中央區域。</p></li>
            <li><b>等待完成</b><p>上傳完成後會得到可分享網址。若畫面要求登入或認領專案，依提示回到已登入帳號。</p></li>
            <li><b>線上驗收</b><p>開新分頁及手機測試網址；把連結貼回工作頁，同時保留本機原稿。</p></li>
          </ol>
          <h2 className="inlineSectionTitle">網站有改動時，整包重新部署</h2>
          <div className={styles.maintenanceColumns}>
            <section>
              <h3>更新既有專案</h3>
              <ol className="steps compact numbered">
                <li><b>修改本機原稿</b><p>先在本機完成並測試。</p></li>
                <li><b>開啟專案</b><p>進入 Netlify 的專案頁與 Production deploys。</p></li>
                <li><b>再次拖入資料夾</b><p>上傳完整更新資料夾，不只單獨丟修改過的檔案。</p></li>
                <li><b>重新驗收</b><p>新版本完成後，網址維持不變；重新整理並用手機測試。</p></li>
              </ol>
            </section>
            <section>
              <h3>常見問題速查</h3>
              <dl className="trouble">
                <dt>出現 404</dt><dd>確認最上層有 <code>index.html</code>，不要多包一層空資料夾。</dd>
                <dt>圖片在本機正常、線上失效</dt><dd>檢查大小寫、空格、中文檔名與絕對路徑；改用英文小寫檔名。</dd>
                <dt>上傳卡住</dt><dd>先壓成 ZIP 重試；減少大型素材；換穩定網路與最新版 Chromium 瀏覽器。</dd>
                <dt>新版沒有出現</dt><dd>確認部署已完成，再強制重新整理或用無痕視窗檢查。</dd>
              </dl>
            </section>
          </div>
          <Callout title="公開前最後檢查" tone="orange">
            Netlify 網址通常可被任何知道連結的人開啟。不要放學生姓名、帳號、照片、未授權作品、私人文件、API 金鑰或可回推身分的學習紀錄。
          </Callout>
          <p className="sourceNote">
            操作依據：<a href="https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/" target="_blank" rel="noreferrer">Netlify Drop Quickstart</a>、
            <a href="https://docs.netlify.com/manage/projects/add-new-project/" target="_blank" rel="noreferrer">Deploy local files</a>。
          </p>
        </Page>
  );
}
