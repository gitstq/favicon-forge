# 🤝 Contributing Guide · 贡献指南 · 貢獻指南

**[English](#english) · [简体中文](#简体中文) · [繁體中文](#繁體中文)**

感谢你愿意为 **Favicon Forge** 出一份力！🎉 无论你是来报告 Bug、提出建议，还是提交代码，都非常欢迎。

Thank you for your interest in **Favicon Forge**! 🎉 Bug reports, feature ideas, and pull requests are all welcome.

---

## English

### Code of Conduct

Please be kind and respectful. We want a friendly, inclusive space for everyone. Harassment or abuse of any kind will not be tolerated.

### Ways to Contribute

- **Report a bug** — open an [Issue](https://github.com/gitstq/favicon-forge/issues) with steps to reproduce, your browser/OS version, and a screenshot if possible;
- **Suggest a feature** — describe the problem and how your idea would help;
- **Improve docs or translations** — fixes and new languages are greatly appreciated;
- **Send a Pull Request**.

### Pull Request Workflow

1. Fork the repo and create a branch: `git checkout -b feat/short-description`;
2. Make your changes; keep commits focused;
3. Run the tests and make sure they pass: `npm test`;
4. If you change rendering/build logic, rebuild the single file: `npm run build`;
5. Push and open a PR against `main`, clearly describing the change and why.

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) (Angular style):

- `feat:` a new feature
- `fix:` a bug fix
- `docs:` documentation only
- `refactor:` code change that neither fixes a bug nor adds a feature
- `test:` adding or correcting tests
- `chore:` tooling / maintenance

### Code Style

- Keep it **dependency-free**; the project deliberately ships zero runtime dependencies;
- Prefer clear names and small, focused functions;
- Core binary logic should stay isomorphic (browser + Node) and covered by tests.

---

## 简体中文

### 行为准则

请保持友善与尊重，共同营造友好、包容的社区环境；我们不接受任何形式的骚扰或攻击。

### 可以贡献什么

- **报告 Bug**：在 [Issue](https://github.com/gitstq/favicon-forge/issues) 中附上复现步骤、浏览器/系统版本，最好有截图；
- **提出功能建议**：说明遇到的问题以及你的想法；
- **完善文档或翻译**：文档勘误与新语言都非常欢迎；
- **提交 Pull Request**。

### PR 流程

1. Fork 仓库并新建分支：`git checkout -b feat/简短描述`；
2. 进行修改，保持提交聚焦；
3. 运行测试并确保通过：`npm test`；
4. 若改动了渲染或构建逻辑，请重新构建单文件：`npm run build`；
5. 推送并向 `main` 分支提交 PR，写清楚改动内容与原因。

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)（Angular 风格）：

- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 仅文档
- `refactor:` 重构（不修 Bug、不加功能）
- `test:` 测试相关
- `chore:` 工具 / 维护

### 代码风格

- 坚持**零依赖**，本项目刻意不引入任何运行时依赖；
- 命名清晰、函数小而专注；
- 核心二进制逻辑保持同构（浏览器 + Node）并由测试覆盖。

---

## 繁體中文

### 行為準則

請保持友善與尊重，共同營造友好、包容的社群環境；我們不接受任何形式的騷擾或攻擊。

### 可以貢獻什麼

- **回報 Bug**：在 [Issue](https://github.com/gitstq/favicon-forge/issues) 附上重現步驟、瀏覽器/系統版本，最好有截圖；
- **提出功能建議**：說明遇到的問題與你的想法；
- **完善文件或翻譯**：勘誤與新語言都非常歡迎；
- **提交 Pull Request**。

### PR 流程

1. Fork 專案並新建分支：`git checkout -b feat/簡短描述`；
2. 進行修改，保持提交聚焦；
3. 執行測試並確認通過：`npm test`；
4. 若改動了渲染或建構邏輯，請重新建構單檔：`npm run build`；
5. 推送並向 `main` 分支提交 PR，寫清楚改動內容與原因。

### 提交規範

遵循 [Conventional Commits](https://www.conventionalcommits.org/)（Angular 風格）：

- `feat:` 新功能
- `fix:` 修復問題
- `docs:` 僅文件
- `refactor:` 重構
- `test:` 測試相關
- `chore:` 工具 / 維護

### 程式碼風格

- 堅持**零相依**，本專案刻意不引入任何執行時相依；
- 命名清晰、函式小而專注；
- 核心二進位邏輯保持同構（瀏覽器 + Node）並由測試涵蓋。

---

<div align="center">

🙏 **Thank you / 谢谢你 / 謝謝你！**

</div>
