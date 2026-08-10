# AI 備課到互動教材｜HTML 簡報

這份簡報採用「Markdown 內容分離方案」。40 張投影片的可見文字都在專案根目錄的 `content/`；React 只負責讀取內容、套用版型、翻頁與動畫。

預覽路徑：`/slides/ai-prep-to-interactive`

## 修改投影片文字

1. 開啟 `content/`。
2. 找到對應頁次的 Markdown，例如 `08-options-prompt.md`。
3. 修改第二個 `---` 之後的 Markdown 文字。
4. 儲存後，開發預覽會自動更新。

請勿把投影片正文寫進 `SlideDeck.tsx`。

## 插入與更換圖片

1. 把圖片放進 `public/images/ai-prep-to-interactive/`。
2. 在投影片 front matter 設定圖片：

```yaml
---
title: 投影片標題
layout: image-right
image: /images/ai-prep-to-interactive/example.jpg
imageAlt: 圖片的替代文字
imageCaption: 顯示在圖片下方的圖說
imageAspect: 3 / 2
imageFit: cover
imagePosition: center
---
```

圖片檔名建議使用英文小寫與連字號。公開網站只應放可公開、已取得使用權的圖片；課程原始文件不要直接放進 `public/`。

### 調整圖片比例與裁切

- `imageAspect`：圖片框比例，例如正方形用 `1 / 1`、一般照片用 `3 / 2`、橫幅用 `16 / 9`。
- `imageFit: cover`：填滿圖片框，邊緣可能被裁切，適合情境照片或插畫。
- `imageFit: contain`：完整顯示圖片，可能留下空白，適合文件、教材、流程圖與介面截圖。
- `imagePosition`：控制裁切焦點，例如 `center`、`left center`、`70% center`。

生成新圖時，先看投影片圖片框比例，再要求 AI 使用相同比例，並把人物、文件與主要物件放在中央 80% 安全區。

## 新增、刪除與調整順序

- 新增：複製現有 Markdown，依頁次命名，例如 `09-example.md`。
- 刪除：刪除對應的 `content/*.md`，再重新編號。
- 排序：修改檔名前兩位數字，系統會依檔名載入，不需修改 TSX。

## 切換版型

front matter 的 `layout` 可使用：

- `cover`
- `text`
- `bullets`
- `two-columns`
- `image-left`
- `image-right`
- `cards`
- `table`
- `quote`
- `prompt`
- `folder-tree`
- `full-image`

雙欄版型用 `<!-- column -->` 分隔左右內容。動畫可設定為 `fade-up`、`fade-in` 或 `slide-left`；配色可設定為 `teal`、`blue`、`orange` 或 `gold`。

## 在 Phoenix Code 啟動預覽

1. 在 Phoenix Code 開啟整個 `ai-handout-workshop` 資料夾。
2. 開啟內建終端機。
3. 第一次使用先執行 `npm install`。
4. 執行 `npm run dev`。
5. 開啟終端機顯示的本機網址，再進入 `/slides/ai-prep-to-interactive`。

## 常用指令

macOS、Linux 或可正常執行 npm 的終端機：

```bash
npm install
npm run dev
npm run build
npm run test:slides
```

Windows PowerShell 若出現「npm.ps1 無法載入」：

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run test:slides
```

## 操作方式

- 下一張：方向鍵右／下、Page Down、空白鍵
- 上一張：方向鍵左／上、Page Up
- 第一張／最後一張：Home／End
- 全螢幕：按 `F`，或使用右下角按鈕
- 手機：左右滑動翻頁

## 素材來源

- 封面主視覺：使用 OpenAI 圖片生成工具製作，無文字、無商標、16:9。
- 課程圖片：取自「SEL 光影奇航」既有 HTML 簡報公開素材。
- Netlify 畫面：沿用原講義專案的 `public/assets/netlify-drop.jpg`。

這一版未把課程計畫、講義、工作頁或其他原始文件放入 `public/`，避免 build 後意外公開。需要提供成品下載時，請先確認公開範圍，再加入已核准的網址。
