import { Page, Callout, WriteBox } from "../components";
import styles from "../styles/Page11.module.css";

export default function Page11() {
  return (
<Page pageId="p11" step="STEP 4｜互動與上線" title="完成互動規格並登入 Netlify" className={styles.page}>
          <WriteBox title="我的單一互動：概念、動作、變化與回饋" lines={4} />
          <div className="imageFrame">
            <img src="/assets/netlify-signup.jpg" alt="Netlify 註冊頁面，提供 Google、GitHub、GitLab、Bitbucket 與電子郵件選項" />
            <p>實際畫面｜Netlify 註冊頁（2026 年 7 月）</p>
          </div>
          <ol className="steps compact numbered">
            <li><b>開啟註冊頁</b><p>前往 <a href="https://app.netlify.com/signup" target="_blank" rel="noreferrer">app.netlify.com/signup</a>。</p></li>
            <li><b>選擇登入方式</b><p>可用 Google、GitHub、GitLab、Bitbucket 或電子郵件；選擇你能穩定登入的既有帳號。</p></li>
            <li><b>完成提供者驗證</b><p>依畫面登入，檢查顯示的帳號與授權範圍後再確認。不要把密碼或驗證碼貼給 AI。</p></li>
            <li><b>回到 Netlify</b><p>看到個人／團隊的 Projects 頁即完成。</p></li>
          </ol>
          <Callout title="登入的用途" tone="orange">
            登入後可以認領、管理及更新已部署的專案，之後修改教材時仍可沿用原本網址。
          </Callout>
        </Page>
  );
}
