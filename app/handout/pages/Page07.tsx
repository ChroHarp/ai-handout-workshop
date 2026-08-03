import { Page, Label, Prompt } from "../components";
import styles from "../styles/Page07.module.css";

export default function Page07() {
  return (
<Page pageId="p07" id="step3" step="STEP 3" title="依講義規劃建立 HTML 簡報" className={`stepBreak ${styles.page}`}>
          <p className="lead">講義與學習單完成後，隆老師開始製作簡報。他先向 AI 說明兩種文件的用途不同：講義要方便讀者閱讀與筆記，知識說明必須完整清楚；簡報則要配合教學節奏，控制每一頁的知識密度，讓畫面能協助現場講解。</p>
          <div className="twoCols alignStart">
            <article className="card"><Label>講義</Label><h3>適合閱讀與筆記</h3><p>保留較完整的知識說明、操作步驟與必要空間，讓讀者離開投影畫面後仍能理解。</p></article>
            <article className="card"><Label>簡報</Label><h3>配合教學節奏</h3><p>每頁聚焦少量訊息，依說明順序揭示內容，讓教師能控制觀看焦點與活動進度。</p></article>
          </div>
          <div className="slideMap">
            {[
              ["01", "封面與驅動問題", "引起好奇"],
              ["02", "作品揭示", "先觀察再解釋"],
              ["03", "條件一：距離", "看見單一變因"],
              ["04", "條件二：角度", "比較兩個結果"],
              ["05", "條件三：旋轉", "預測後操作"],
              ["06", "設計任務", "做什麼、多久、標準"],
              ["07", "安全與分享", "行動前提醒"],
              ["08", "反思與收束", "回到學習證據"],
            ].map(([n, title, role]) => (
              <article key={n}><b>{n}</b><h3>{title}</h3><p>{role}</p></article>
            ))}
          </div>
          <Prompt
            title="光影奇航｜當時使用的提示語（整理版）"
            note="先看具體案例怎麼說"
          >
            我要依照已確認的「光影奇航」講義製作課堂用 HTML 簡報。請先規劃投影片地圖，不要寫程式。內容需要依序帶學生看見作品、提出驅動問題、理解距離／角度／旋轉造成的影子變化、接收設計任務與安全提醒，最後回到學習單的反思。請依教學需要決定頁數；每頁只處理一個主要訊息，並列出該頁目的、畫面文字、教師或學生動作，以及需要的視覺素材。不要新增講義以外的事實。
          </Prompt>
        </Page>
  );
}
