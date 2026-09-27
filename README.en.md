<div align="center">

# 🦞 Favicon Forge

### The All-in-One Offline Favicon & PWA Icon Forge

**One source, a complete set of web icons — 100% local, zero dependencies, zero uploads, privacy-first**

[![License: MIT](https://img.shields.io/badge/License-MIT-2563eb.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-f97316.svg)](CONTRIBUTING.md)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-16a34a.svg)](package.json)
[![Offline Ready](https://img.shields.io/badge/offline-ready-16a34a.svg)]()

**🌐 Language：[简体中文](README.md) ｜ [繁體中文](README.zh-TW.md) ｜ [English](README.en.md)**

⬇️ **[Download the single-file build (just double-click)](https://github.com/gitstq/favicon-forge/releases/latest)**

</div>

---

## 🎉 Introduction

Every time you refresh a website's icon, you end up juggling a pile of files: `favicon.ico`, PNGs at 16/32/48, the iOS `apple-touch-icon`, Android's 192/512, a vector `favicon.svg`, and a `site.webmanifest`... with a maze of sizes, corner radii and safe-zone rules. Online generators, meanwhile, **force you to upload images**, **require sign-up**, or even **sneak in watermarks**.

**Favicon Forge** is the open-source tool that fixes this 👇

- 🔒 **Runs entirely on your machine** — every render happens in your browser; your images **never leave your computer**, and it works offline;
- 📦 **Single file, zero dependencies** — double-click one HTML file and it opens. No Node install, no `npm install`;
- 🎨 **Three sources** — Emoji, text, or an uploaded image;
- ✅ **Export the whole set at once** — nine platform-correct files, packaged into one ZIP;
- 📋 **Copy-paste code** — generates the exact `<head>` snippet you need.

> 💡 **Inspiration** comes from the real, recurring pain of hand-assembling favicons for every site. This project is **fully original**: it copies no code from any online generator or open-source project. It only references public platform specs (the W3C Manifest and official Apple/Android documentation) and adds substantial differentiation in **privacy, ease of use, and cross-platform correctness**.

---

## ✨ Features

- 😀 **Three sources, switch instantly**
  - **Emoji**: 24 built-in quick picks, or type any emoji;
  - **Text**: 1–3 characters (including CJK), with a free text color;
  - **Image**: click or drag-and-drop, with **contain / cover** fitting.

- 🌈 **Flexible backgrounds & shape**
  - Solid color, linear gradient, or fully transparent backgrounds; gradient angle 0–360°;
  - Corner radius (0–50%) and padding (0–30%) sliders with live updates.

- 📱 **Platform-aware rendering** (**key differentiator**)
  - **Browser tab icons** may be transparent and rounded;
  - **Apple touch icon (180px)** is automatically **full-bleed and opaque**, matching iOS clipping;
  - **Android / PWA (192/512)** are full-bleed with content kept inside the **maskable safe zone (center 80%)**;
  - Preview under **iOS / circle / rounded-square** masks, with an optional **safe-zone guide** and **dark wallpaper** — what you see is what you get.

- 🧩 **Hand-built multi-resolution `favicon.ico`**
  - A spec-compliant ICO container bundling **16/32/48** in one file, compatible with legacy browsers and desktop shortcuts.

- 🗜️ **Hand-written, zero-dependency ZIP**
  - A custom CRC-32 plus a STORE-based ZIP packer produce the archive **in the browser with no third-party libraries**, deterministically and reproducibly.

- 📄 **Vector SVG & PWA manifest**
  - Auto-generated resolution-independent `favicon.svg`, a W3C-compliant `site.webmanifest`, and a copy-paste `<head>` snippet.

- 🛡️ **Privacy-first & zero telemetry**: no accounts, no analytics, no network requests, no tracking.

---

## 🚀 Quick Start

### Option 1: Single file (recommended, zero install) ⭐

1. Open the [**latest Release**](https://github.com/gitstq/favicon-forge/releases/latest) and download `favicon-forge.html`;
2. **Double-click to open it in any browser**. It works fully offline.

> You can also clone the repo and open `dist/favicon-forge.html` (the built single file is committed for you).

### Option 2: Run from source / develop

**Requirements**: [Node.js](https://nodejs.org/) **≥ 16** (only needed for development & self-tests, not for normal use)

```bash
# Clone
git clone https://github.com/gitstq/favicon-forge.git
cd favicon-forge

# Run the unit tests (20 cases, zero dependencies)
npm test

# Build the single file to dist/favicon-forge.html
npm run build
```

Then open `index.html` (development) or `dist/favicon-forge.html` (single-file build) in a browser.

### Generate your icons in three steps

1. 🎯 Pick a source (Emoji / text / image) and tune the background and radius;
2. 👀 Preview the tab and device icons live on the right;
3. ⬇️ Click **"Download the full icon set (.zip)"**, or copy the HTML snippet.

---

## 📖 Usage Guide

### 📦 What you get

| File | Size / spec | Purpose |
| --- | --- | --- |
| `favicon.ico` | bundles 16 / 32 / 48 | IE / legacy browsers / Windows desktop |
| `favicon-16x16.png` | 16×16 | Browser tab |
| `favicon-32x32.png` | 32×32 | Tabs / bookmarks |
| `favicon-48x48.png` | 48×48 | Windows tiles |
| `apple-touch-icon.png` | 180×180 | Add to iOS home screen |
| `android-chrome-192x192.png` | 192×192 | Android / PWA |
| `android-chrome-512x512.png` | 512×512 | Android / PWA HD, `purpose="any maskable"` |
| `favicon.svg` | vector | Modern browsers, resolution-independent |
| `site.webmanifest` | JSON | PWA manifest |

### 🧩 Integrating into your site

Place the nine extracted files at your site's **root**, then paste this into every page's `<head>` (the in-app "Copy HTML" button generates it; edit paths as needed):

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#2563eb">
```

> 📁 **Icons not at the root?** If they live at `/static/icons/`, change every path accordingly and update the icon entries inside `site.webmanifest`.

### 🖼️ Typical scenarios

- 🧑‍💻 **Personal blog / portfolio**: a unique icon from a single emoji;
- 🏢 **Company site / product landing page**: upload a logo and get every platform icon in one click;
- 📱 **PWA**: maskable icons and a manifest, installable to the home screen;
- 🧪 **Local prototypes / throwaway projects**: double-click the single file — no environment pollution, no uploads.

### 🎛️ Parameter notes

- **Radius** applies only to transparent tab icons; Apple/Android icons are clipped by the OS, so they go full-bleed automatically;
- **Padding** is the gap between content and edge; full-bleed icons always keep **at least a 10% safe zone**;
- **Theme / background colors** are written to `site.webmanifest`, affecting the PWA splash screen and address bar.

### 🖼️ Screenshot

> The workbench: source & style controls on the left, live preview in the middle, one-click export on the right.

![Favicon Forge workbench](https://raw.githubusercontent.com/gitstq/favicon-forge/main/docs/assets/preview.png)

---

## 💡 Design & Roadmap

### 🧠 Philosophy

1. **Privacy is the default, not an option** — icon rendering is naturally a client-side Canvas task, so there is no reason to upload anything;
2. **Zero dependencies resist rot** — CRC-32, ICO and ZIP are hand-built to avoid supply-chain risk and keep the single file working for years;
3. **Respect platform specs** — transparent rounded tab icons, full-bleed Apple/Android icons, and maskable safe zones follow official docs rather than shipping one square icon everywhere;
4. **Isomorphic core** — `crc32 / ico / zip / svg / manifest` run in both the browser and Node for easy testing and reuse.

### 🛠️ Tech stack

- **Frontend**: vanilla HTML + CSS + ES Modules, **no framework, no build dependency**;
- **Rendering**: Canvas 2D (PNG encoding provided natively by the browser);
- **Binary**: hand-built ICO / ZIP / CRC-32 (`Uint8Array` + `DataView`);
- **Tests**: Node's built-in `node:test`, no third-party test framework.

### 🗺️ Roadmap

- [ ] 🔤 Embed raster images (base64) inside the SVG for image sources;
- [ ] 🎞️ Animated GIF / multi-frame favicons;
- [ ] 🧰 A Node CLI (`npx favicon-forge ...`) for CI;
- [ ] 🎨 More mask shapes and brand presets (Windows tiles, Safari pinned tabs);
- [ ] 🌍 Additional README languages (Japanese, Korean);
- [ ] 📦 Batch processing of multiple sources.

> Feel free to open an [Issue](https://github.com/gitstq/favicon-forge/issues) with your ideas.

---

## 📦 Packaging & Deployment

**This is a pure front-end tool (a utility/library)**, so cross-platform delivery is naturally simple — one HTML file runs in any modern browser on **Windows, macOS, and Linux**, with no per-OS native binaries required.

```bash
# Build the cross-platform single file
npm run build      # output: dist/favicon-forge.html
```

- ☁️ **Deploy to the web**: upload `dist/favicon-forge.html` to any static host (GitHub Pages, Netlify, Vercel, Nginx);
- 💻 **Distribute locally**: hand the HTML file to anyone — just double-click;
- 🔧 **Use as a library**: the core modules live in `src/`; `import { buildIco, buildZip, buildSvgFavicon, buildManifest } from 'favicon-forge'`.

**Compatibility**: modern Chrome / Edge / Firefox / Safari (Canvas 2D and ES2017 required).

---

## 🤝 Contributing

Contributions are warmly welcomed! 🎉 Please read [**CONTRIBUTING.md**](CONTRIBUTING.md) first. In short:

1. Fork and create a branch: `git checkout -b feat/your-feature`;
2. Follow the [**Angular / Conventional Commits**](https://www.conventionalcommits.org/) style:
   - `feat:` · `fix:` · `docs:` · `refactor:` · `test:`;
3. Make sure `npm test` passes;
4. Push and open a Pull Request describing what and why;
5. For Issues, include reproduction steps, browser version, and expected behavior.

---

## 📄 License

This project is released under the permissive, business-friendly **[MIT License](LICENSE)**:

- ✅ You may freely **use, copy, modify, merge, publish, distribute, sublicense, and sell**;
- ✅ Suitable for both personal and commercial projects;
- 📌 The only requirement is retaining the copyright and permission notice;
- 🚫 The software is provided "as is", without warranty of any kind.

---

<div align="center">

If this saved you the hassle of assembling icons, a ⭐️ is much appreciated!

**Made with 🧡 by [gitstq](https://github.com/gitstq)**

</div>
