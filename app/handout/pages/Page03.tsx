import { Page, Callout, Prompt, WriteBox } from "../components";
import styles from "../styles/Page03.module.css";

export default function Page03() {
  return (
<Page pageId="p03" step="STEP 1｜提示詞模板" title="把光影案例換成你的課程條件" className={styles.page}>
          <p className="lead">先填資料包，再替換提示詞中的括號。沒有把握的內容直接標示「待確認」。</p>
          <div className="formGrid">
            <WriteBox title="對象與先備經驗｜年段、人數、已學內容" lines={3} />
            <WriteBox title="時間與場域｜總時間、分組、教室限制" lines={3} />
            <WriteBox title="設備與材料｜現有資源、不能取得的資源" lines={3} />
            <WriteBox title="學習目標｜學生最後要理解或能做到什麼" lines={3} />
            <WriteBox title="安全與倫理｜個資、授權、操作風險" lines={3} />
            <WriteBox title="預期證據｜作品、解釋、紀錄、選擇、反思" lines={3} />
          </div>
          <Prompt>
            我正在規劃一場［對象］的［課程或營隊］。目前想到以［主題或素材］為主軸，手邊已有［資料或案例］，但［學習主題、活動方式、材料或成果］都還沒有完全決定。請根據我提供的資料，提出 3 個可行而且有差異的初步構想。每案簡要說明可以連結的學習主題、可能的活動與需要的材料，讓我比較後再選擇。現在先不要寫完整教案；資料不足的地方請直接指出。
          </Prompt>
          <Callout title="Tips" tone="orange">
            擔心自己講不清楚的話，可以讓 AI 主動提出需要甚麼資料。
          </Callout>
          <Callout title="替換時保留的結構" tone="teal">
            先說明課程情境與已有靈感，再坦白列出尚未決定的部分。這一輪的目的只是取得可比較的方向，不需要一次把課程寫完。
          </Callout>
        </Page>
  );
}
