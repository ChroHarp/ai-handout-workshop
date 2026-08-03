import { Page, Label, Prompt } from "../components";
import styles from "../styles/Page05.module.css";

export default function Page05() {
  return (
<Page pageId="p05" id="step2" step="STEP 2" title="依規劃內容產出講義與學習單" className={`stepBreak ${styles.page}`}>
          <p className="lead">課程藍圖確認後，隆老師接著製作學生真正會使用的文件：講義整理必要內容，學習單則記錄學生的觀察、推理、選擇與反思。</p>
          <div className="twoCols alignStart">
            <article className="card">
              <Label>講義內容母稿</Label>
              <h3>光影奇航短版講義</h3>
              <ol>
                <li>驅動問題與作品觀察</li>
                <li>影子形成的三個條件</li>
                <li>距離、角度、旋轉的效果</li>
                <li>設計任務與製作流程</li>
                <li>安全、分享與反思</li>
              </ol>
            </article>
            <article className="card">
              <Label>學習證據</Label>
              <h3>學生工作頁</h3>
              <ol>
                <li>畫出第一次觀察並描述</li>
                <li>預測調整一項條件的結果</li>
                <li>記錄實測結果與差異</li>
                <li>選擇作品方案並說明理由</li>
                <li>連回情緒觀點的反思</li>
              </ol>
            </article>
          </div>
          <Prompt
            title="光影奇航｜當時使用的提示語（整理版）"
            note="先看具體案例怎麼說"
          >
            依照這份「光影奇航」課程藍圖，先規劃學生講義與一張活動工作頁。講義要讓國中學生理解影子形成的條件、距離與角度造成的變化、作品任務、安全提醒及分享方式；工作頁要讓學生留下第一次觀察、變因預測、實測差異、作品選擇理由，以及把光影變化連回情緒觀點的反思。請先列出兩份文件的架構、各段目的與對應的學習證據，現在不要直接寫全文。
          </Prompt>
          <h2 className="inlineSectionTitle">把案例提示語換成你的講義需求</h2>
          <table className="handoutTable">
            <thead><tr><th>章節</th><th>本節目的</th><th>必要內容</th><th>學生要做什麼</th><th>來源</th></tr></thead>
            <tbody>
              <tr><td>導入</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>核心概念</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>步驟／範例</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>任務與標準</td><td></td><td></td><td></td><td></td></tr>
              <tr><td>安全／延伸</td><td></td><td></td><td></td><td></td></tr>
            </tbody>
          </table>
        </Page>
  );
}
