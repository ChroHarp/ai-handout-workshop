# AI 備課到互動教材｜網站交接與結構索引

更新日期：2026-08-04

本文件是網站內容、頁面順序與檔案責任的索引。修改頁面、換頁、頁數、檔名或架構後，必須同步更新本文件。

## 目前狀態

- 網站形式：Sites 上的 Vinext／React 單一路由網站。
- 閱讀方式：全部 A4 頁面依序向下捲動。
- 列印方式：一次列印或另存整份 A4 PDF。
- 實際頁數：封面 1 張＋內容 14 張，共 15 張 `.sheet`。
- 每張 A4 已拆成獨立 TSX 頁面元件；入口頁只負責載入講義閱讀器。
- 單頁密度規則已移至各頁 CSS Module；共用視覺與列印規則仍由主 CSS 管理。
- 自動測試已固定檢查15張頁面、目前掛載頁面順序及 Step 4 內容順序。

## 主要檔案

| 路徑 | 用途 | 編修規則 |
| --- | --- | --- |
| `app/page.tsx` | 網站入口 | 只載入 `HandoutBook`，不放講義正文 |
| `app/handout/HandoutBook.tsx` | 頁面順序、頂端導覽、列印按鈕與溢位檢查 | 新增、刪除或調整頁序時才修改 |
| `app/handout/components.tsx` | Page、Prompt、Callout、Checks、WriteBox 等共用元件 | 修改前必須評估全部16頁 |
| `app/handout/pages/CoverPage.tsx` | 封面內容 | 只處理封面 |
| `app/handout/pages/Page01.tsx`～`Page15.tsx` | 每張 A4 的獨立正文 | 單頁內容預設只改對應檔案 |
| `app/globals.css` | 色彩、字級、A4、共用元件、手機與列印規則 | 修改前必須評估全部頁面 |
| `app/handout/styles/CoverPage.module.css` | 封面專屬樣式入口 | 只影響封面 |
| `app/handout/styles/Page01.module.css`～`Page15.module.css` | 各頁局部密度與間距 | 單頁排版預設只改對應檔案 |
| `public/assets/` | 講義實際使用圖片 | 修改檔名時同步更新頁面引用 |
| `tests/rendered-html.test.mjs` | 頁數、頁序與內容順序驗收 | 必須與本索引一致 |
| `AGENTS.md` | 後續代理與人工編修規準 | 架構或驗收方式改變時同步更新 |
| `.openai/hosting.json` | Sites 專案綁定 | 保留既有 `project_id` |
| `dist/` | 已驗證建置輸出 | 可重建，不可直接編修 |

## 目前檔案結構

```text
app/
  page.tsx
  layout.tsx
  globals.css
  handout/
    HandoutBook.tsx
    components.tsx
    pages/
      CoverPage.tsx
      Page01.tsx
      Page02.tsx
      ...
      Page15.tsx
    styles/
      CoverPage.module.css
      Page01.module.css
      Page02.module.css
      ...
      Page15.module.css
public/
  assets/
tests/
  rendered-html.test.mjs
```

## 講義頁面順序

頁次以正文頁腳為準；封面不計入正文頁碼。

| 識別 | 頁次 | 元件 | 頁面標題／內容 | 重要保護規則 |
| --- | ---: | --- | --- | --- |
| `cover` | 封面 | `CoverPage.tsx` | AI 備課到互動教材｜從課程構想到教材上線 | 保留封面版式、講師資訊與版本資訊 |
| `p01` | 1 | `Page01.tsx` | 教學目標／從初步構想到資料蒐集 | 2×2 教學目標、資料夾示意與第一個問題同頁 |
| `p02` | 2 | `Page02.tsx` | STEP 1｜蒐集資料與討論課程規劃 | 案例卡片維持 2×2，保留案例提示語與收束提示 |
| `p03` | 3 | `Page03.tsx` | STEP 1｜把光影案例換成你的課程條件 | 六個填寫框、通用提示詞與結構提示同頁 |
| `p04` | 4 | `Page04.tsx` | STEP 1｜延伸選定構想，產出課程藍圖 | 四步驟、提示詞、驗收與決策書寫框同頁 |
| `p05` | 5 | `Page05.tsx` | STEP 2｜依規劃內容產出講義與學習單 | 固定包含案例、案例提示語、換寫標題與講義目錄表 |
| `p06` | 6 | `Page06.tsx` | STEP 2｜把學習證據變成可填寫的學習單 | 固定包含通用提示語、修訂清單、學習單表格與全部操作產出 |
| `p07` | 7 | `Page07.tsx` | STEP 3｜依講義規劃建立 HTML 簡報 | 講義／簡報對照、八頁投影片地圖與案例提示語 |
| `p08` | 8 | `Page08.tsx` | STEP 3｜規劃投影片地圖 | AI 投影片規劃表範例、通用提示語、修改原則與生成流程前半 |
| `p09` | 9 | `Page09.tsx` | STEP 3｜完成存檔、預覽與修訂 | 接續步驟 3、提示詞、修訂詞、錯誤修正對照，以及 STEP 4 情境導入 |
| `p10` | 10 | `Page10.tsx` | STEP 4｜從光影案例規劃互動頁面 | 互動示意、案例提示語、五題規格、通用模板與單一互動書寫框順序固定 |
| `p11` | 11 | `Page11.tsx` | STEP 4｜登入 Netlify 與第一次拖放部署 | STEP 4 橫幅由本頁開始；上半為登入畫面與步驟，下半為橫向 Drop 圖片及首次部署步驟 1–2 |
| `p12` | 12 | `Page12.tsx` | STEP 4｜首次部署續篇與網站維護 | 不重複 STEP 4 橫幅，頁首直接續編首次部署步驟 3–5；網站更新標題置於雙欄區域前方 |
| `p14` | 13 | `Page14.tsx` | STEP 5｜其他延伸部分 | Agent 任務表、四項判斷與下一個真實工作書寫框 |
| `p15` | 14 | `Page15.tsx` | FINISH｜成果交付與最後驗收 | 六項成果、三個書寫框、收束與連結 |

## 樣式責任

- `app/globals.css`：共用色彩、字級、A4 幾何、頁首頁尾、表格、提示框、卡片、手機版與列印規則。
- `CoverPage.module.css`：封面局部樣式入口。
- `PageNN.module.css`：只處理該頁密度、局部 Grid 與間距；即使目前沒有特殊規則，也保留檔案作為未來單頁修改入口。
- 每張頁面都有穩定的 `data-page`，不可用過時的 `.page5`、`.page11` 等全域 class 代替。

## 單頁修改流程

1. 先在本文件的「講義頁面順序」找到頁次與元件。
2. 文字或結構只改對應的 `app/handout/pages/PageNN.tsx`。
3. 局部密度與間距只改對應的 `app/handout/styles/PageNN.module.css`。
4. 除非確定要影響全部頁面，不修改 `app/globals.css` 或 `app/handout/components.tsx`。
5. 修改後重新建置，確認16頁順序、內容順序與溢位狀態。

## 本機接手與建置

套件未包含於交接資料，依 `package-lock.json` 安裝。Google Drive 同步資料夾可能鎖定大量 `node_modules` 小檔案；若發生此情況，建議把整個專案複製到一般本機資料夾後再安裝與建置。

Sites 的正式建置環境執行：

```bash
npm ci
npm run build
```

Windows 本機若沒有 Bash，可直接執行 Vite production build，再執行 rendered HTML 測試：

```powershell
node_modules\.bin\vite.cmd build
node --test tests\rendered-html.test.mjs
```
## 已完成驗收

- Vinext／Vite production build 成功。
- 2 項 rendered HTML 自動測試通過。
- 目前為15張 `.sheet`：封面1張＋內容14張。
- 原 P11–P13 的操作內容全部保留，整併為目前的 P11 與 P12。
- 2026-08-05 以 Edge 列印引擎輸出 A4 PDF：共 15 頁、無空白頁；P11 登入區維持左右雙欄，所有頁尾均留在各自頁盒內。

## 建置與部署邊界

- 本地編修完成前不部署到 Sites。
- 部署時沿用 `.openai/hosting.json` 中的既有 Sites 專案。
- `dist/` 與 `.vinext/` 可重新產生，不能作為內容來源。
- Google Drive 同步資料夾不適合直接保存大量 `node_modules` 小檔案；若安裝被鎖定，將原始碼複製到一般本機資料夾建置，再把驗證結果或 `dist/` 同步回專案。
