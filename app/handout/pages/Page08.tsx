import { Page, Callout, Prompt } from "../components";
import styles from "../styles/Page08.module.css";

export default function Page08() {
  return (
<Page pageId="p08" step="STEP 3｜提示詞模板" title="規劃投影片地圖" className={styles.page}>
          <p className="lead">輸入提示語後，根據 AI 提出一版頁面規劃。先確認每一頁在課堂上的作用，再針對需要調整的頁面提出修改，等到內容底定後，才開始生成檔案。</p>
          <table className={styles.slidePlanTable}>
            <thead>
              <tr>
                <th>頁次</th>
                <th>投影片主題</th>
                <th>內容與操作</th>
                <th>預計時間</th>
                <th>視覺安排</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>光影魔術師</td>
                <td>換個角度看，世界大不同</td>
                <td>1 分</td>
                <td>「雜物／影子」左右對照大圖</td>
              </tr>
              <tr>
                <td>2</td>
                <td>看似混亂，影子卻很精準</td>
                <td>三位藝術家案例，聚焦實體與影子的反差</td>
                <td>3 分</td>
                <td>
                  作品大圖＋示範影片
                  <a className={styles.videoLink} href="https://www.youtube.com/watch?v=PoxHdszQ5II" target="_blank" rel="noreferrer">
                    觀看影片
                  </a>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>影子的形狀由三件事決定</td>
                <td>光源、距離、角度</td>
                <td>3 分</td>
                <td>光源→物件→牆面的簡單示意圖</td>
              </tr>
              <tr>
                <td>4</td>
                <td>30 秒影子測試</td>
                <td>用手或文具靠近燈／牆、旋轉，觀察影子變化</td>
                <td>3 分</td>
                <td>三格操作圖：變大、變清楚、變形</td>
              </tr>
              <tr className={styles.continuationRow}>
                <td colSpan={5}>⋯</td>
              </tr>
            </tbody>
          </table>
          <Prompt>
            我要把這份［講義／課程內容］做成上課用簡報。講義要保留完整說明，簡報則要配合教學節奏，避免一頁放太多文字。請先規劃每一頁要呈現的主題、重點內容與建議畫面，現在先不要寫程式。頁數依內容需要決定。
          </Prompt>
          <Callout title="後續怎麼修改" tone="orange">直接指定頁次與期待結果，例如：「第 3 頁概念太多，拆成兩頁」或「第 5 頁先只出現問題，按下一步才顯示比較圖」。確認順序後，再請 AI 依最新版規劃製作簡報。</Callout>
          <h2 className="inlineSectionTitle">生成、存檔、預覽單檔 HTML 簡報</h2>
          <ol className="steps compact blueprintGrid">
            <li><b>確認地圖</b><p>先修改頁數、順序與每頁唯一訊息。</p></li>
            <li><b>要求程式</b><p>指定單檔 <code>index.html</code>、繁體中文、鍵盤與按鈕導覽、頁碼、手機版。</p></li>
          </ol>
        </Page>
  );
}
