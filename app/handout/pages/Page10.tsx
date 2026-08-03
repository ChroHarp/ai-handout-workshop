import { Page, Label, Prompt } from "../components";
import styles from "../styles/Page10.module.css";

export default function Page10() {
  return (
<Page pageId="p10" id="step4" step="STEP 4" title="將互動內容做成網頁並傳送到 Netlify" className={`stepBreak ${styles.page}`}>
          <p className="lead">HTML 簡報生成後，隆老師發現其中「調整光源、物體位置與角度」的步驟，不容易只靠幾張圖片說清楚。於是他請 AI 在簡報中加入一個互動頁面，直接呈現實際操作時會發生的變化。</p>
          <div className="interactionExample">
            <div className="controlMock">
              <div className="lightDot" />
              <div className="objectMock" />
              <div className="shadowMock" />
              <input aria-label="距離示意滑桿" type="range" defaultValue="55" />
            </div>
            <div>
              <Label>光影案例</Label>
              <h3>調整位置與角度，看見影子變化</h3>
              <p>拖動光源或物體、調整角度，畫面立即更新影子的大小、方向與形狀。</p>
            </div>
          </div>
          <Prompt
            title="光影奇航｜當時使用的提示語（整理版）"
            note="具體案例"
          >
            請在「光影奇航」簡報中插入一個互動頁面，主題是呈現物體位置與角度的變化如何影響影子。頁面中要看得到光源、物體、投影面與影子；可以拖動光源和物體，也能用滑桿調整物體角度，影子要立即跟著改變。請加入重設按鈕與清楚標示，並讓滑鼠、觸控和鍵盤都能操作。先說明你準備如何安排這個互動頁面，等我確認後再修改簡報。
          </Prompt>
          <h3>互動規格只回答五題</h3>
          <div className="fiveQuestions compactCards">
            {[
              ["1", "位置", "插在簡報的哪一頁？"],
              ["2", "元素", "畫面要出現哪些物件？"],
              ["3", "操作", "可以拖曳、點選或調整什麼？"],
              ["4", "變化", "操作後哪些畫面會立即改變？"],
              ["5", "控制", "如何重設？手機與鍵盤怎麼操作？"],
            ].map(([n, title, desc]) => <article key={n}><b>{n}</b><h3>{title}</h3><p>{desc}</p></article>)}
          </div>
          <h2 className="inlineSectionTitle">先寫清楚互動規格，再請 AI 改程式</h2>
          <p className="lead">把焦點放在互動頁面：它要呈現哪些物件、使用者可以怎麼操作，以及操作後畫面如何變化。</p>
          <Prompt>
            請在簡報的第［頁次／主題］頁插入一個互動頁面。互動主題是［要呈現的現象或關係］。畫面包含［物件與標示］；使用者可以用［拖曳／滑桿／按鈕／點選］調整［可改變的條件］，畫面中的［結果］要立即跟著改變。加入［重設、切換視角或其他控制］，並支援滑鼠、觸控與鍵盤。請先說明頁面配置與操作方式，等我確認後再修改簡報。
          </Prompt>
        </Page>
  );
}
