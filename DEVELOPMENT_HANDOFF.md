# 開發進度與 Session 接手說明

更新日期：2026-08-13

這份文件記錄目前已合併的基準、尚未提交的開發內容、重要設計決策與接手注意事項。新 session 開始工作前，依序閱讀：

1. `AGENTS.md`：講義與專案的維護規準。
2. `SITE_STRUCTURE_INDEX.md`：網站路由、講義頁面與簡報結構。
3. 本文件：最新開發進度與工作樹狀態。
4. `app/slides/ai-prep-to-interactive/README.md`：HTML 簡報編修方式。

## 專案與正式環境

- 本機專案：`D:\Git\ai-handout-workshop`
- GitHub：`https://github.com/ChroHarp/ai-handout-workshop`
- 正式網站：`https://ai-handout-workshop.vercel.app/`
- 正式分支：`main`
- Vercel 由 GitHub `main` 自動部署。
- 目前簡報共 43 頁，來源為 `content/01-cover.md`～`content/43-ending.md`。

## 已推送到 main 的基準

目前本機與遠端 `main` 的已推送基準是：

```text
3e05eda Merge agent/update-interactive-slides into main
```

此基準已包含：

- 首頁的講義與 HTML 簡報入口。
- 43 頁 Markdown 驅動簡報。
- P31 iframe 互動展示頁，嵌入 `/example/point_light_shadow_projection.html`。
- 精簡後的點光源互動控制列，只保留模式、物體與輔助線。
- P43 Ending 與白髮少年尤拉視覺。
- 既有逐步顯示、自動動畫、簡報筆／空白鍵翻頁與 Netlify 練習段落。

## 目前尚未提交的開發內容

以下變更已完成並通過程式驗證，但尚未 commit／push：

### 1. 簡報圖片預載

- 檔案：`app/slides/ai-prep-to-interactive/SlideDeck.tsx`
- 進入簡報後，背景預載目前頁後方兩頁的 `image` 與 `qrImage`。
- 翻頁後持續往後補載，不會一進站下載全部 43 頁。
- 目的：減少依序播放時的圖片等待，同時避免初始流量過大。

### 2. 網站首頁 QR code

- 元件：`app/HomeQr.tsx`
- 樣式：`app/page.module.css`
- 掛載：`app/page.tsx`
- 素材：`public/images/home/site-qr.png`
- QR 固定指向 `https://ai-handout-workshop.vercel.app/`。
- QR 是約 3 KB 的靜態 PNG，使用 Next.js `Image`，沒有增加瀏覽器端 QR 套件。

### 3. 簡報 P1 QR code

- 檔案：`content/01-cover.md`
- P1 改用 `/images/home/site-qr.png`。
- 標示改為「掃描開啟主頁」，內容指向正式網站。
- 保留原本點擊放大 QR 的互動與封面排版。

### 4. 五頁打字機動畫預留空間

- 程式：`app/slides/ai-prep-to-interactive/useSlideEffects.ts`
- 頁面：P5、P8、P15、P22、P26。
- 這五頁的 `effects` 加入 `reserve-typewriter-space`。
- 打字開始前先測量完整 blockquote 高度並設為 `min-height`，避免逐字顯示時提示框、圖片或其他物件跳動。
- 離開投影片時會清除暫時高度。
- 其他打字機頁面沒有套用此行為。

## 最近驗證結果

目前功能變更完成後已執行：

```powershell
npm.cmd run lint
npm.cmd run test:slides
npm.cmd run build
```

結果：

- ESLint：0 errors；仍有 4 個既有 `<img>` 最佳化 warning。
- 簡報測試：3/3 通過。
- 43 張 Markdown 編號、版型與媒體檔案檢查通過。
- Next.js 16.2.6 production build 成功。

若接手後修改程式或 Markdown，交付前至少重跑 `npm.cmd run test:slides` 與 `npm.cmd run build`。

## 工作樹與提交範圍

預計屬於本輪功能的檔案：

```text
app/HomeQr.tsx
app/page.tsx
app/page.module.css
app/slides/ai-prep-to-interactive/SlideDeck.tsx
app/slides/ai-prep-to-interactive/useSlideEffects.ts
content/01-cover.md
content/05-first-question.md
content/08-options-prompt.md
content/15-handout-prompt.md
content/22-slide-map-prompt.md
content/26-generate-html-prompt.md
public/images/home/site-qr.png
README.md
SITE_STRUCTURE_INDEX.md
app/slides/ai-prep-to-interactive/README.md
DEVELOPMENT_HANDOFF.md
```

目前另有下列未追蹤項目，不要未經確認就納入提交：

- `.codex-temp/`：本機預覽紀錄，可重新產生。
- `public/.sites-runtime/`：舊 Sites／本機執行產物，不屬於目前 Vercel 單軌部署。
- `public/example/ai_presentation-gemini.html`：P28 連結的公開範例，用於測試免費 Gemini 能否依簡報規劃表產生有效簡報；下次提交時一併納入。

## 已完成的專案清理

2026-08-13 已清除：

- 本機 Sites／D1／Worker 舊目錄與空殼：`.openai/`、`db/`、`drizzle/`、`worker/`、`scripts/`、`examples/`、`build/`。
- 舊 Sites／Cloudflare 與可重建輸出：`.sites-runtime/`、`public/.sites-runtime/`、`.wrangler/`、`.next-vercel/`、`dist/`、`tmp/`、`.codex-temp/`、`_node_modules_incomplete_20260803/`。
- 可重建 .next/（驗證建置後再次移除）。
- .npmrc 已移除 cache=.sites-runtime/npm-cache，npm 改回使用者層級快取，避免 .sites-runtime/ 每次指令後重新出現。
- 15 個完全未引用的舊圖片與 Next.js 預設 SVG。

保留：

- `node_modules/`：目前本機開發依賴。
- 所有實際被程式或 Markdown 引用的圖片。
- `public/example/point_light_shadow_projection.html`：P31 正式互動範例。
- `public/example/ai_presentation-gemini.html`：P28 使用的 Gemini 簡報生成範例，保留並應隨下一次提交納入。

清理後已重跑 lint、3 項簡報測試與 production build，均無錯誤；lint 仍有 4 個既有 `<img>` warning。

## 關鍵設計決策

- 簡報文字與可見標籤放在 `content/*.md`；不要把實際投影片正文寫入 TSX。
- `SlideDeck.tsx` 只處理共用版型、導覽、媒體與預載。
- 動畫邏輯集中在 `useSlideEffects.ts`，頁面以 front matter 的 `effects` 選擇行為。
- P31 使用 iframe，因範例本身是互動程式；同時保留另開完整頁面的連結。
- 首頁與 P1 共用同一張正式網站 QR 素材。
- GitHub `main` 是唯一原始碼來源，Vercel 是唯一正式部署平台。

## 建議下一步

1. 實際以瀏覽器逐頁檢查 P5、P8、P15、P22、P26，確認打字過程沒有版面位移。
2. 檢查首頁 QR 與 P1 QR 能由手機掃描並開啟正式網站。
3. 以慢速網路或停用快取模式檢查圖片預載是否改善 P3、P5、P7 等大圖頁面的切換。
4. 確認 `public/example/ai_presentation-gemini.html` 是否要納入正式網站。
5. 只暫存本輪相關檔案，commit 後推送 `main`，讓 Vercel 自動部署。
