import { Page, Checks, WriteBox } from "../components";
import styles from "../styles/Page14.module.css";

export default function Page14() {
  return (
<Page pageId="p14" id="step5" step="STEP 5" title="其他延伸部分" className={`stepBreak ${styles.page}`}>
          <p className="lead">完成第一版課程後，隆老師發現講義、學習單、簡報與互動網頁仍會持續修改。他先挑一項需要跨檔案、反覆執行或長期維護的工作，再判斷是否適合交給 Agent 協助。</p>
          <table>
            <thead><tr><th>工作</th><th>現在要準備</th><th>Agent 可以協助</th><th>教師仍要確認</th></tr></thead>
            <tbody>
              <tr><td>多檔一致性</td><td>講義、學習單、HTML 原稿</td><td>同步名詞、步驟與規準</td><td>教學意圖與版本</td></tr>
              <tr><td>批次教材</td><td>固定模板與資料欄位</td><td>產生教師版、學生版、差異化版本</td><td>內容正確與負荷</td></tr>
              <tr><td>課後維護</td><td>試教紀錄、錯誤清單</td><td>修檔、測試、保存變更</td><td>是否符合現場</td></tr>
              <tr><td>班級系統</td><td>資料結構、權限與流程</td><td>建立介面與自動化</td><td>個資、權限與長期維運</td></tr>
            </tbody>
          </table>
          <div className="agentFilter">
            <h3>值得升級為 Agent 任務嗎？</h3>
            <Checks items={[
              "同一件事會重複做三次以上。",
              "需要同時讀寫兩種以上的檔案。",
              "有明確輸入、輸出與可測試的成功標準。",
              "資料權限、個資界線與誰負責驗收都說得清楚。",
            ]} />
          </div>
          <WriteBox title="我下一個想交給 Agent 的真實工作" lines={4} />
        </Page>
  );
}
