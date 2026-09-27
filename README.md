<div align="center">

# 🦞 Favicon Forge

### 一站式离线 Favicon / PWA 图标工坊

**一个素材，锻造整套网站图标 —— 100% 本地、零依赖、零上传、保护隐私**

[![License: MIT](https://img.shields.io/badge/License-MIT-2563eb.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-f97316.svg)](CONTRIBUTING.md)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-16a34a.svg)](package.json)
[![Offline Ready](https://img.shields.io/badge/offline-ready-16a34a.svg)]()

**🌐 语言 / Language：[简体中文](README.md) ｜ [繁體中文](README.zh-TW.md) ｜ [English](README.en.md)**

⬇️ **[点此下载单文件版（双击即用）](https://github.com/gitstq/favicon-forge/releases/latest)**

</div>

---

## 🎉 项目介绍

每次给网站换图标，你是不是都要手忙脚乱地凑齐一堆文件？`favicon.ico`、16/32/48 各种 PNG、iOS 的 `apple-touch-icon`、Android 的 192/512、矢量 `favicon.svg`、还有 `site.webmanifest`……尺寸、圆角、安全区规则一大堆，而在线生成工具要么**强制上传图片**、要么**要求注册登录**、甚至**偷偷加水印**。

**Favicon Forge（图标锻造炉）** 就是为解决这个痛点而生的开源工具 👇

- 🔒 **全程本地运行**：所有渲染都在你的浏览器里完成，图片**永远不会离开你的电脑**，断网也能用；
- 📦 **单文件零依赖**：一个 HTML 文件双击即开，无需安装 Node、无需 `npm install`；
- 🎨 **三种素材来源**：Emoji、文字、上传图片，任你选择；
- ✅ **一次导出全套**：自动生成 9 个符合各平台规范的文件，打包成 ZIP 一键下载；
- 📋 **代码直接复制**：自动生成可粘贴到 `<head>` 的引用代码。

> 💡 **灵感来源**：源于「每次建站都要重复处理 favicon」的真实痛点。本项目**完全自研**，没有复制任何在线生成器或开源项目的代码，仅参考了各平台公开的图标规范（W3C Manifest、Apple/Android 官方文档），并在**隐私、易用性与跨平台正确性**上做了大量差异化优化。

---

## ✨ 核心特性

- 😀 **三种来源，随心切换**
  - **Emoji**：内置 24 个常用 Emoji 快捷选择，也可输入任意 Emoji；
  - **文字**：支持 1–3 个字符（含中文），自由设置文字颜色；
  - **图片**：点击或拖放上传，支持 **contain（完整显示）/ cover（填满裁剪）** 两种模式。

- 🌈 **灵活的背景与外形**
  - 背景支持 **纯色 / 线性渐变 / 完全透明**，渐变角度 0–360° 可调；
  - 标签页图标 **圆角 0–50%、内边距 0–30%** 滑块实时调节。

- 📱 **懂平台规则的智能渲染**（**核心差异化亮点**）
  - **浏览器标签页图标**：可透明、可圆角；
  - **Apple 触摸图标（180px）**：自动**全出血、不透明**，符合 iOS 裁剪规则；
  - **Android / PWA（192/512）**：自动全出血，并把内容收进 **maskable 安全区（中心 80%）**；
  - 提供 **iOS / 圆形 / 圆角方** 三种蒙版预览，可一键叠加**安全区虚线圆**与**深色壁纸**，所见即所得。

- 🧩 **自研多分辨率 `favicon.ico`**
  - 手工构建符合微软 ICO 规范的容器，将 **16/32/48 三个尺寸**打包进同一个 `.ico`，兼容旧浏览器与桌面快捷方式。

- 🗜️ **手写零依赖 ZIP 打包**
  - 自研 CRC-32 校验与 ZIP 封装（STORE 模式），**无需任何第三方库**即可在浏览器内生成压缩包，输出确定性、可复现。

- 📄 **矢量 SVG 与 PWA 清单**
  - 自动生成分辨率无关的 `favicon.svg`、符合 W3C 规范的 `site.webmanifest`，以及可直接复制的 `<head>` 代码。

- 🛡️ **隐私优先 & 零遥测**：无账号、无统计、无网络请求、无任何追踪。

---

## 🚀 快速开始

### 方式一：单文件版（最推荐，零安装）⭐

1. 前往 [**Releases 最新版**](https://github.com/gitstq/favicon-forge/releases/latest)，下载 `favicon-forge.html`；
2. **双击用浏览器打开**即可，全程可断网使用。

> 也可以直接克隆本仓库，打开 `dist/favicon-forge.html`（仓库已内置构建好的单文件）。

### 方式二：从源码运行 / 二次开发

**环境要求**：[Node.js](https://nodejs.org/) **≥ 16**（仅开发与自测需要；普通使用无需 Node）

```bash
# 克隆仓库
git clone https://github.com/gitstq/favicon-forge.git
cd favicon-forge

# 运行单元测试（20 项，零依赖）
npm test

# 构建单文件到 dist/favicon-forge.html
npm run build
```

用浏览器打开根目录的 `index.html`（开发版）或 `dist/favicon-forge.html`（单文件版）即可。

### 三步生成你的图标

1. 🎯 选择来源（Emoji / 文字 / 图片）并调整背景、圆角；
2. 👀 在右侧实时预览标签页与各设备效果；
3. ⬇️ 点击 **「下载全套图标包（.zip）」**，或复制 HTML 代码。

---

## 📖 详细使用指南

### 📦 导出的文件清单

| 文件 | 尺寸 / 规格 | 用途 |
| --- | --- | --- |
| `favicon.ico` | 内含 16 / 32 / 48 | IE / 旧浏览器 / Windows 桌面图标 |
| `favicon-16x16.png` | 16×16 | 浏览器标签页 |
| `favicon-32x32.png` | 32×32 | 浏览器标签页 / 收藏夹 |
| `favicon-48x48.png` | 48×48 | Windows 磁贴 |
| `apple-touch-icon.png` | 180×180 | 添加到 iOS 主屏 |
| `android-chrome-192x192.png` | 192×192 | Android / PWA |
| `android-chrome-512x512.png` | 512×512 | Android / PWA 高清，`purpose="any maskable"` |
| `favicon.svg` | 矢量 | 现代浏览器，分辨率无关 |
| `site.webmanifest` | JSON | PWA 应用清单 |

### 🧩 集成到你的网站

把解压后的 9 个文件放到网站**根目录**，然后把下面这段复制到每个页面的 `<head>` 中（应用内「复制 HTML 代码」按钮可生成，路径可按需修改）：

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#2563eb">
```

> 📁 **图标不在根目录？** 例如放在 `/static/icons/`，只需把代码里的路径统一改成 `/static/icons/...`，并同步修改 `site.webmanifest` 里的图标路径即可。

### 🖼️ 典型使用场景

- 🧑‍💻 **个人博客 / 作品集**：用一个 Emoji 快速打造专属图标；
- 🏢 **企业官网 / 产品落地页**：上传 Logo，一键得到全平台图标；
- 📱 **PWA 应用**：自动生成 maskable 图标与 manifest，可安装到手机主屏；
- 🧪 **本地原型 / 临时项目**：双击单文件即可，不污染环境、不上传素材。

### 🎛️ 参数说明

- **圆角**：仅作用于「可透明的标签页图标」；Apple/Android 图标由系统统一裁剪，故自动全出血；
- **内边距**：内容与边缘的距离；全出血图标会**自动保证至少 10% 的安全区**；
- **主题色 / 启动背景色**：写入 `site.webmanifest`，影响 PWA 启动画面与浏览器地址栏配色。

### 🖼️ 演示截图

> 工作台界面：左侧素材与样式控制，中间实时预览，右侧一键导出。

![Favicon Forge 工作台](https://raw.githubusercontent.com/gitstq/favicon-forge/main/docs/assets/preview.png)

---

## 💡 设计思路与迭代规划

### 🧠 设计理念

1. **隐私是默认值，而非选项**：图标渲染天然适合在浏览器端用 Canvas 完成，因此没有任何上传的必要；
2. **零依赖才不会腐化**：CRC-32、ICO、ZIP 全部手工实现，避免供应链风险，也保证单文件长期可用；
3. **尊重平台规范**：透明圆角的标签图标、全出血的 Apple/Android 图标、maskable 安全区，都严格遵循官方文档，而不是「一张方图走天下」；
4. **核心逻辑同构**：`crc32 / ico / zip / svg / manifest` 模块在浏览器与 Node 中均可运行，便于单元测试与复用。

### 🛠️ 技术选型

- **前端**：原生 HTML + CSS + ES Modules，**零框架、零构建依赖**；
- **渲染**：Canvas 2D（PNG 编码由浏览器原生提供）；
- **二进制**：自研 ICO / ZIP / CRC-32（`Uint8Array` + `DataView`）；
- **测试**：Node 内置 `node:test`，无需第三方测试框架。

### 🗺️ 迭代计划（Roadmap）

- [ ] 🔤 图片来源时，SVG 内嵌栅格图像（base64）；
- [ ] 🎞️ 支持动态 GIF / 多帧 favicon；
- [ ] 🧰 提供 Node CLI（`npx favicon-forge ...`）便于 CI 集成；
- [ ] 🎨 更多蒙版形状与品牌预设（Windows 磁贴、Safari pinned tab）；
- [ ] 🌍 增补日语、韩语等更多 README 语言；
- [ ] 📦 批量处理多个素材。

> 欢迎在 [Issues](https://github.com/gitstq/favicon-forge/issues) 提出你的需求 ～

---

## 📦 打包与部署指南

**本项目属于纯前端工具（工具库类）**，跨平台方式天然简单 —— 一个 HTML 文件即可在 **Windows / macOS / Linux 的任意现代浏览器**中运行，无需为每个系统单独打包原生可执行文件。

```bash
# 构建跨平台单文件
npm run build      # 产物：dist/favicon-forge.html
```

- ☁️ **部署到网站**：把 `dist/favicon-forge.html` 上传到任意静态托管（GitHub Pages、Netlify、Vercel、Nginx 等）即可访问；
- 💻 **本地分发**：直接把该 HTML 文件发给他人，双击即用；
- 🔧 **作为库引入**：核心模块位于 `src/`，可 `import { buildIco, buildZip, buildSvgFavicon, buildManifest } from 'favicon-forge'` 在你自己的项目中复用。

**兼容环境**：Chrome / Edge / Firefox / Safari 等现代浏览器（需支持 Canvas 2D 与 ES2017）。

---

## 🤝 贡献指南

我们非常欢迎社区贡献！🎉 请先阅读 [**CONTRIBUTING.md**](CONTRIBUTING.md)，简要流程如下：

1. Fork 本仓库并新建分支：`git checkout -b feat/your-feature`；
2. 提交代码，**请遵循 [Angular 提交规范](https://www.conventionalcommits.org/)**：
   - `feat: 新增功能` ｜ `fix: 修复问题` ｜ `docs: 文档更新` ｜ `refactor: 代码重构` ｜ `test: 测试相关`；
3. 确保 `npm test` 全部通过；
4. 推送分支并提交 Pull Request，描述清楚改动内容与原因；
5. 提交 Issue 时请附上复现步骤、浏览器版本与期望行为。

---

## 📄 开源协议说明

本项目基于 **[MIT License](LICENSE)** 开源，这是一个宽松且对商业友好的协议：

- ✅ 你可以自由地 **使用、复制、修改、合并、出版、分发、再授权及销售**；
- ✅ 可用于个人与商业项目；
- 📌 唯一要求是在副本中保留原版权声明与本许可声明；
- 🚫 本软件按「现状」提供，作者不承担任何担保责任。

---

<div align="center">

如果这个项目帮你省去了凑图标的烦恼，欢迎给个 ⭐️ 支持一下！

**Made with 🧡 by [gitstq](https://github.com/gitstq)**

</div>
