import { Page, Callout, Prompt, Checks, WriteBox } from "../components";
import styles from "../styles/Page06.module.css";

export default function Page06() {
  return (
<Page pageId="p06" step="STEP 2｜模板與產出" title="把學習證據變成可填寫的學習單" className={styles.page}>
          <Prompt>
            依照我確認的［課程名稱］課程藍圖，先提出講義目錄。這份講義的使用者是［年段／對象］，用途是［課中閱讀／教師引導／課後複習］。每節列出「目的、必要內容、學生要做什麼、對應證據、來源」。不要寫全文。等我確認目錄後，先完成［指定章節］樣張；語氣適合［年段］，重要名詞加粗，操作步驟使用編號，安全提醒放在行動之前，未提供來源的事實標示［待查證］。
          </Prompt>
          <h3>樣張批判修訂</h3>
          <Checks items={[
            "資訊正確，來源可追溯；沒有把背景知識寫得超出課程需要。",
            "學生看得懂要做什麼；每一個動詞都能轉成具體行動。",
            "段落、步驟、警示與例子有清楚層級。",
            "一頁密度合理，圖片有教學功能與授權說明。",
          ]} />
          <table className="worksheetTable">
            <thead><tr><th>活動時點</th><th>要留下的證據</th><th>學生動作</th><th>題目或欄位</th><th>教師怎麼看</th></tr></thead>
            <tbody>
              <tr><td>活動前</td><td></td><td>預測／選擇</td><td></td><td></td></tr>
              <tr><td>操作中</td><td></td><td>觀察／記錄</td><td></td><td></td></tr>
              <tr><td>操作後</td><td></td><td>解釋／反思</td><td></td><td></td></tr>
            </tbody>
          </table>
          <Prompt>
            依［課程藍圖］與［已確認講義］，找出學生在［活動前／操作中／操作後］必須留下的學習證據。設計一張［紙張或數位格式］學習單，每題標出使用時點，包含清楚任務、符合回答長度的填寫空間、至少一個要求說明理由的欄位，以及簡短自評。不要把講義改成挖空題，也不要新增講義中沒有的專有知識。
          </Prompt>
          <WriteBox title="這張學習單最重要的證據" lines={2} />
          <WriteBox title="看到什麼回答，表示學生真的理解？" lines={3} />
          <Callout title="操作產出">
            把修訂後的講義與學習單各存成一份獨立檔案。從這一步開始，後續簡報只能擷取這兩份已確認內容。
          </Callout>
        </Page>
  );
}
