# AI 備課到互動教材

這個專案包含網站入口、A4 教學講義與 Markdown 驅動的 HTML 簡報。

- 網站入口：`/`
- 教學講義：`/handout`
- HTML 簡報：`/slides/ai-prep-to-interactive`
- 原始碼來源：GitHub `main`
- 正式部署：Vercel

投影片文字放在 `content/`，圖片放在 `public/images/`，影片放在 `public/videos/`；一般內容修訂不需要修改 TSX。

## 修改投影片文字

1. 打開 `content/`。
2. 依編號找到投影片，例如 `14-student-documents.md`。
3. 修改第二個 `---` 之後的 Markdown 文字。
4. 儲存後回到瀏覽器，開發預覽會自動更新。

每張投影片的檔案開頭是 YAML front matter：

```yaml
---
title: 決定講義與工作頁
layout: image-right
section: Step 2｜製作講義與工作頁
image: /images/ai-prep-to-interactive/scenario-student-documents.png
imageAlt: 桌上放著學生講義、工作頁與光影操作材料
accent: orange
animation: slide-left
---
```

所有會在投影片上看見的標題、正文、圖說與互動標籤，都應放在 Markdown 檔案，不要寫進 TSX。

## 插入或更換圖片

1. 把圖片放進 `public/images/ai-prep-to-interactive/`。
2. 在投影片 front matter 設定圖片路徑：

```yaml
image: /images/ai-prep-to-interactive/example.png
imageAlt: 圖片內容說明
imageCaption: 顯示在圖片下方的圖說
```

教材截圖、示意圖與作品全貌應保留完整內容；情境照片才適合使用裁切式構圖。請勿把投影片正文直接生成在圖片內。

## 插入或更換影片

1. 把影片放進 `public/videos/ai-prep-to-interactive/`。
2. 在 front matter 設定：

```yaml
video: /videos/ai-prep-to-interactive/example.webm
videoCaption: 影片操作說明
```

設定 `video` 後，圖片欄位的位置會改為播放影片。

## 新增、刪除與調整順序

- 新增：複製一個 `content/*.md`，修改內容與檔名編號。
- 刪除：刪除對應的 Markdown 檔案。
- 調整順序：修改檔名前兩碼，並保持從 `01` 開始連續編號。

目前共有 40 張投影片。調整數量後，請同步更新 `tests/slides-markdown.test.mjs` 的預期頁數。

## 切換版型

修改 front matter 的 `layout`：

- `cover`：封面
- `text`：一般文字
- `bullets`：條列
- `two-columns`：雙欄；用 `<!-- column -->` 分隔
- `image-left`、`image-right`：圖文雙欄
- `cards`：最多三欄的重點卡片
- `table`：表格
- `quote`：大型引言或短句
- `prompt`：靠左對齊的完整提示語
- `folder-tree`：專案資料夾層級
- `full-image`：全版圖片與短句
- `netlify-practice`：Netlify 資料夾拖曳練習

畫面寬度低於 900px 時，雙欄、多欄與互動版型會自動改成單欄。

## 在 Phoenix Code 啟動預覽

1. 在 Phoenix Code 選擇「Open Folder」，開啟 `D:\Git\ai-handout-workshop`。
2. 開啟內建 Terminal。
3. 第一次使用先安裝套件：

```powershell
npm.cmd install
```

4. 啟動開發預覽：

```powershell
npm.cmd run dev
```

5. Terminal 會顯示本機網址，例如 `http://localhost:3000/`。在網址後加上：

```text
/slides/ai-prep-to-interactive
```

Windows PowerShell 若阻擋 `npm.ps1`，請使用本文件中的 `npm.cmd` 寫法。

## 安裝、預覽與建置

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

- `npm.cmd install`：安裝相依套件。
- `npm.cmd run dev`：啟動可即時更新的開發預覽。
- `npm.cmd run build`：產生 Vercel／Next.js 使用的正式建置。
- `npm.cmd test`：建置並檢查 40 張 Markdown、版型與媒體檔案。

## Netlify 教學段落

- 第 32–36 頁是五個逐步操作頁。
- 第 34 頁是可重複練習的拖曳／點擊互動。
- 第 35 頁播放 `public/videos/ai-prep-to-interactive/netlify-drop-practice.webm`。
- 這段互動只模擬操作，不會登入 Netlify，也不會真的公開任何檔案。

## GitHub 與 Vercel

- GitHub `main` 是唯一原始碼來源。
- Vercel 連接 GitHub，`main` 更新後自動部署。
- 舊 Codex Sites 專案只保留在遠端作為歷史備份，不再作為編修或部署來源。
- 本機不再保留 Sites、Vinext、Cloudflare Worker 或 D1 的建置架構。