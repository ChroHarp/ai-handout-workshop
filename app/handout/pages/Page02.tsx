import { Page, Label, Callout, Prompt } from "../components";
import styles from "../styles/Page02.module.css";

export default function Page02() {
  return (
<Page pageId="p02" id="step1" step="STEP 1" title="蒐集資料與討論課程規劃" className={`stepBreak ${styles.page}`}>
          <p className="lead">隆老師把蒐集到的資料，以及營隊對象、時間和其他相關要求交給 AI，開始討論初步構想。此時他只確定想以光影藝術為主軸，還沒有決定要搭配哪一個 SEL 主題、使用哪些道具，或讓學生完成什麼作品。</p>
          <div className="caseGrid">
            <article><Label>已經知道</Label><h3>課程情境</h3><p>暑期資優營隊、國中學生，課程希望能連結 SEL。</p></article>
            <article><Label>已有靈感</Label><h3>光影藝術</h3><p>參考投影畫與影子藝術案例，讓學生透過實作探索光影。</p></article>
            <article><Label>還未決定</Label><h3>SEL 主題與道具</h3><p>尚未確定要談情緒、觀點或合作，也還沒有選定光源、模型與材料。</p></article>
            <article><Label>這次要問</Label><h3>有哪些可行方案？</h3><p>請 AI 根據現有資料提出幾個方向，協助比較後再選擇。</p></article>
          </div>
          <Prompt
            title="光影奇航｜當時使用的提示語（整理版）"
            note="先看具體案例怎麼說"
          >
            我正在規劃一場國中資優學生的暑期 SEL 營隊。我想以光影藝術為主軸，也蒐集了一些投影畫與影子藝術的資料，但目前還沒有決定要搭配哪一個 SEL 主題、使用哪些道具，或讓學生完成什麼作品。請根據我提供的資料，提出 3 個可行的初步課程構想。每個構想簡要說明可以連結的 SEL 主題、學生可能進行的活動，以及需要準備的材料，讓我比較後再決定方向。現在先不要寫完整教案。
          </Prompt>
          <Callout title="這一步先做到這裡" tone="teal">
            先取得幾個方向明確、彼此有差異的初步方案；選定主軸後，再進一步補上目標、活動流程與學習單。
          </Callout>
          <Callout title="Tips" tone="orange">
            給 AI 籠統的問題容易得到籠統的產出，先花點時間討論出內容綱要與方向，可以讓後續的產出更加順利。
          </Callout>
        </Page>
  );
}
