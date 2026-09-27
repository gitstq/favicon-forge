<div align="center">

# 🦞 Favicon Forge

### 一站式離線 Favicon / PWA 圖示工坊

**一個素材，鍛造整套網站圖示 —— 100% 本地、零相依、零上傳、保護隱私**

[![License: MIT](https://img.shields.io/badge/License-MIT-2563eb.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-f97316.svg)](CONTRIBUTING.md)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-16a34a.svg)](package.json)

**🌐 語言 / Language：[简体中文](README.md) ｜ [繁體中文](README.zh-TW.md) ｜ [English](README.en.md)**

⬇️ **[點此下載單檔版（雙擊即用）](https://github.com/gitstq/favicon-forge/releases/latest)**

</div>

---

## 🎉 專案介紹

每次幫網站換圖示，是不是都要手忙腳亂地湊齊一堆檔案？`favicon.ico`、16/32/48 各種 PNG、iOS 的 `apple-touch-icon`、Android 的 192/512、向量 `favicon.svg`，還有 `site.webmanifest`……尺寸、圓角、安全區規則一大堆，而線上產生工具不是**強制上傳圖片**，就是**要求註冊登入**，甚至**偷偷加上浮水印**。

**Favicon Forge（圖示鍛造爐）** 就是為了解決這個痛點而生的開源工具 👇

- 🔒 **全程本地執行**：所有渲染都在你的瀏覽器裡完成，圖片**永遠不會離開你的電腦**，離線也能用；
- 📦 **單檔零相依**：一個 HTML 檔雙擊即開，不必安裝 Node、不必 `npm install`；
- 🎨 **三種素材來源**：Emoji、文字、上傳圖片，任你選擇；
- ✅ **一次匯出全套**：自動產生 9 個符合各平台規範的檔案，打包成 ZIP 一鍵下載；
- 📋 **程式碼直接複製**：自動產生可貼進 `<head>` 的引用程式碼。

> 💡 **靈感來源**：來自「每次建站都要重複處理 favicon」的真實痛點。本專案**完全自研**，沒有複製任何線上產生器或開源專案的程式碼，僅參考各平台公開的圖示規範（W3C Manifest、Apple/Android 官方文件），並在**隱私、易用性與跨平台正確性**上做了大量差異化優化。

---

## ✨ 核心特性

- 😀 **三種來源，隨心切換**
  - **Emoji**：內建 24 個常用 Emoji 快速選擇，也可輸入任意 Emoji；
  - **文字**：支援 1–3 個字元（含中文），自由設定文字顏色；
  - **圖片**：點擊或拖放上傳，支援 **contain（完整顯示）/ cover（填滿裁切）** 兩種模式。

- 🌈 **靈活的背景與外形**
  - 背景支援 **純色 / 線性漸層 / 完全透明**，漸層角度 0–360° 可調；
  - 標籤頁圖示 **圓角 0–50%、內距 0–30%** 滑桿即時調整。

- 📱 **懂平台規則的智慧渲染**（**核心差異化亮點**）
  - **瀏覽器標籤頁圖示**：可透明、可圓角；
  - **Apple 觸控圖示（180px）**：自動**全出血、不透明**，符合 iOS 裁切規則；
  - **Android / PWA（192/512）**：自動全出血，並把內容收進 **maskable 安全區（中心 80%）**；
  - 提供 **iOS / 圓形 / 圓角方** 三種遮罩預覽，可一鍵疊加**安全區虛線圓**與**深色桌布**，所見即所得。

- 🧩 **自研多解析度 `favicon.ico`**
  - 手工建立符合微軟 ICO 規範的容器，將 **16/32/48 三個尺寸**打包進同一個 `.ico`，相容舊瀏覽器與桌面捷徑。

- 🗜️ **手寫零相依 ZIP 打包**
  - 自研 CRC-32 校驗與 ZIP 封裝（STORE 模式），**不必任何第三方程式庫**即可在瀏覽器內產生壓縮檔，輸出具決定性、可重複。

- 📄 **向量 SVG 與 PWA 清單**
  - 自動產生與解析度無關的 `favicon.svg`、符合 W3C 規範的 `site.webmanifest`，以及可直接複製的 `<head>` 程式碼。

- 🛡️ **隱私優先 & 零遙測**：無帳號、無統計、無網路請求、無任何追蹤。

---

## 🚀 快速開始

### 方式一：單檔版（最推薦，零安裝）⭐

1. 前往 [**Releases 最新版**](https://github.com/gitstq/favicon-forge/releases/latest)，下載 `favicon-forge.html`；
2. **雙擊用瀏覽器開啟**即可，全程可離線使用。

> 也可以直接複製本專案，開啟 `dist/favicon-forge.html`（專案已內建建構好的單檔）。

### 方式二：從原始碼執行 / 二次開發

**環境需求**：[Node.js](https://nodejs.org/) **≥ 16**（僅開發與自測需要；一般使用無需 Node）

```bash
# 複製專案
git clone https://github.com/gitstq/favicon-forge.git
cd favicon-forge

# 執行單元測試（20 項，零相依）
npm test

# 建構單檔到 dist/favicon-forge.html
npm run build
```

用瀏覽器開啟根目錄的 `index.html`（開發版）或 `dist/favicon-forge.html`（單檔版）即可。

### 三步產生你的圖示

1. 🎯 選擇來源（Emoji / 文字 / 圖片）並調整背景、圓角；
2. 👀 在右側即時預覽標籤頁與各裝置效果；
3. ⬇️ 點擊 **「下載全套圖示包（.zip）」**，或複製 HTML 程式碼。

---

## 📖 詳細使用指南

### 📦 匯出的檔案清單

| 檔案 | 尺寸 / 規格 | 用途 |
| --- | --- | --- |
| `favicon.ico` | 內含 16 / 32 / 48 | IE / 舊瀏覽器 / Windows 桌面圖示 |
| `favicon-16x16.png` | 16×16 | 瀏覽器標籤頁 |
| `favicon-32x32.png` | 32×32 | 瀏覽器標籤頁 / 我的最愛 |
| `favicon-48x48.png` | 48×48 | Windows 動態磚 |
| `apple-touch-icon.png` | 180×180 | 加入 iOS 主畫面 |
| `android-chrome-192x192.png` | 192×192 | Android / PWA |
| `android-chrome-512x512.png` | 512×512 | Android / PWA 高畫質，`purpose="any maskable"` |
| `favicon.svg` | 向量 | 現代瀏覽器，與解析度無關 |
| `site.webmanifest` | JSON | PWA 應用程式清單 |

### 🧩 整合到你的網站

把解壓縮後的 9 個檔案放到網站**根目錄**，然後把下面這段複製到每個頁面的 `<head>` 中（應用程式內「複製 HTML 程式碼」按鈕可產生，路徑可依需求修改）：

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#2563eb">
```

> 📁 **圖示不在根目錄？** 例如放在 `/static/icons/`，只要把程式碼裡的路徑統一改成 `/static/icons/...`，並同步修改 `site.webmanifest` 裡的圖示路徑即可。

### 🖼️ 典型使用情境

- 🧑‍💻 **個人部落格 / 作品集**：用一個 Emoji 快速打造專屬圖示；
- 🏢 **企業官網 / 產品 Landing Page**：上傳 Logo，一鍵得到全平台圖示；
- 📱 **PWA 應用程式**：自動產生 maskable 圖示與 manifest，可安裝到手機主畫面；
- 🧪 **本地原型 / 臨時專案**：雙擊單檔即可，不污染環境、不上傳素材。

### 🎛️ 參數說明

- **圓角**：僅作用於「可透明的標籤頁圖示」；Apple/Android 圖示由系統統一裁切，故自動全出血；
- **內距**：內容與邊緣的距離；全出血圖示會**自動保證至少 10% 的安全區**；
- **主題色 / 啟動背景色**：寫入 `site.webmanifest`，影響 PWA 啟動畫面與瀏覽器網址列配色。

### 🖼️ 展示截圖

> 工作台介面：左側素材與樣式控制，中間即時預覽，右側一鍵匯出。

![Favicon Forge 工作台](https://raw.githubusercontent.com/gitstq/favicon-forge/main/docs/assets/preview.png)

---

## 💡 設計思路與迭代規劃

### 🧠 設計理念

1. **隱私是預設值，而非選項**：圖示渲染天然適合在瀏覽器端用 Canvas 完成，因此壓根兒不必上傳；
2. **零相依才不會腐化**：CRC-32、ICO、ZIP 全部手工實作，避免供應鏈風險，也確保單檔長期可用；
3. **尊重平台規範**：透明圓角的標籤圖示、全出血的 Apple/Android 圖示、maskable 安全區，都嚴格遵循官方文件，而不是「一張方圖走天下」；
4. **核心邏輯同構**：`crc32 / ico / zip / svg / manifest` 模組在瀏覽器與 Node 中皆可執行，便於單元測試與重用。

### 🛠️ 技術選型

- **前端**：原生 HTML + CSS + ES Modules，**零框架、零建構相依**；
- **渲染**：Canvas 2D（PNG 編碼由瀏覽器原生提供）；
- **二進位**：自研 ICO / ZIP / CRC-32（`Uint8Array` + `DataView`）；
- **測試**：Node 內建 `node:test`，不必第三方測試框架。

### 🗺️ 迭代計畫（Roadmap）

- [ ] 🔤 圖片來源時，SVG 內嵌點陣圖像（base64）；
- [ ] 🎞️ 支援動態 GIF / 多幀 favicon；
- [ ] 🧰 提供 Node CLI（`npx favicon-forge ...`）便於 CI 整合；
- [ ] 🎨 更多遮罩形狀與品牌預設（Windows 動態磚、Safari 釘選分頁）；
- [ ] 🌍 增補日語、韓語等更多 README 語言；
- [ ] 📦 批次處理多個素材。

> 歡迎在 [Issues](https://github.com/gitstq/favicon-forge/issues) 提出你的需求 ～

---

## 📦 打包與部署指南

**本專案屬於純前端工具（工具庫類）**，跨平台方式天然簡單 —— 一個 HTML 檔即可在 **Windows / macOS / Linux 的任一新現代瀏覽器**中執行，不必為每個系統單獨打包原生可執行檔。

```bash
# 建構跨平台單檔
npm run build      # 產物：dist/favicon-forge.html
```

- ☁️ **部署到網站**：把 `dist/favicon-forge.html` 上傳到任意靜態託管（GitHub Pages、Netlify、Vercel、Nginx 等）即可存取；
- 💻 **本地分發**：直接把該 HTML 檔寄給別人，雙擊即用；
- 🔧 **作為程式庫引入**：核心模段位於 `src/`，可 `import { buildIco, buildZip, buildSvgFavicon, buildManifest } from 'favicon-forge'` 在你自己的專案中重用。

**相容環境**：Chrome / Edge / Firefox / Safari 等現代瀏覽器（需支援 Canvas 2D 與 ES2017）。

---

## 🤝 貢獻指南

我們非常歡迎社群貢獻！🎉 請先閱讀 [**CONTRIBUTING.md**](CONTRIBUTING.md)，簡要流程如下：

1. Fork 本專案並新建分支：`git checkout -b feat/your-feature`；
2. 提交程式碼，**請遵循 [Angular 提交規範](https://www.conventionalcommits.org/)**：
   - `feat: 新增功能` ｜ `fix: 修復問題` ｜ `docs: 文件更新` ｜ `refactor: 程式重構` ｜ `test: 測試相關`；
3. 確認 `npm test` 全數通過；
4. 推送分支並提交 Pull Request，說明清楚改動內容與原因；
5. 提交 Issue 時請附上重現步驟、瀏覽器版本與預期行為。

---

## 📄 授權條款說明

本專案基於 **[MIT License](LICENSE)** 開源，這是一個寬鬆且對商業友善的授權條款：

- ✅ 你可以自由地 **使用、複製、修改、合併、出版、散布、再授權及銷售**；
- ✅ 可用於個人與商業專案；
- 📌 唯一要求是在副本中保留原版權聲明與本授權聲明；
- 🚫 本軟體按「現狀」提供，作者不承擔任何擔保責任。

---

<div align="center">

如果這個專案幫你省去了湊圖示的麻煩，歡迎給個 ⭐️ 支持一下！

**Made with 🧡 by [gitstq](https://github.com/gitstq)**

</div>
