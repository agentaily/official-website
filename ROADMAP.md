# ROADMAP — Agentaily 官网 (official-website)

以**能力**为粒度跟踪。细节链 [SPEC.md](./SPEC.md) / [DESIGN.md](./DESIGN.md) / 各 PR,不复述。

## ✅ 已完成

- **项目骨架** —— Vite + React 18 + TS (strict) + DS 0.10.0,可 `build`;i18n (en/zh) 脚手架;占位壳(消费 DS 的 BrandMark)。
- **CI + 部署 workflow** —— GitHub Actions CI(format/typecheck/test/build)+ Cloudflare Pages 自动部署 workflow(结构就绪;**CF Pages 项目 / 域名绑定待人后续做**)。
- **fleet-ready** —— `.claude/agents/`(7 角色)+ TESTING.md + DESIGN.md;CLAUDE.md 装就绪 + 自轮询约定。
- **落地页实现(PR #1)** —— 从 Claude Design handoff `8Q3zKq` 落地单页:Nav → Hero(含聊天 demo)→ 作品 (Works) → FAQ → 页脚(chat6 去掉 About),全程消费 DS 组件、双语填实、深/浅可切、滚动入场。文案全在 `en.json` / `zh.json`。设计真相见 [DESIGN.md](./DESIGN.md),行为契约见 [`features/`](./features)。
- **接入共享浏览器运行时(PR #4)** —— 主题(亮/暗/system)+ i18n(en/zh)+ 偏好持久化迁移到共享浏览器运行时:删手搓 `src/lib/useTheme.ts` 与 i18n provider,换 `ThemeProvider` / `useTheme` + `createI18n` 工厂(catalog 仍在本仓 `en.json`/`zh.json`)。新增:跨 `*.agentaily.com` 子域 cookie 持久化、首访 `navigator` 语言探测(zh 兜底)、`themeInitScript` 防 FOUC;切语言改为 context 即时重渲染(不再 reload)。
- **收敛到单一上游 DS(PR #5)** —— 把上条的浏览器运行时(主题 / i18n / 持久化)从已弃用的 `@agentaily/web-kit` 迁到 `@agentaily/design-system` `^0.15`(0.15.0 把 web-kit 的同名运行时移植进 DS,导出名一字不差、行为逐字段等价):换 import 源 + 删 `@agentaily/web-kit` 依赖,**纯机械、行为零变化**(cookie key `agentaily:theme` / `domain=.agentaily.com`、navigator 探测、`<html lang>` 全不变)。自此单一上游 DS 同时供视觉组件 + 浏览器运行时。
- **定位重构:产品 → 通用平台** —— 把官网叙事从「Agentaily Form / 一个个单独产品」整体重构成**「聊天 × 万物」通用平台 / 框架**:Hero 主副标语讲「聊一句即造出能用应用(aml 后端 + 前端文件、沙箱运行)→ 发布市场 → 任何人 fork 再造」;Works 改为「市场抢先看」(Form Design = 平台造的第一个应用,而非站点本身);FAQ 全面改写为平台向(是什么 / 能造什么 / 应用由什么组成 / fork / 现状)。**纯文案 + 真相源文档同步**,结构 / 技术栈 / 组件不动、零新依赖(仅 Hero 两个 CTA 接线互换:主 = 看市场、次 = 聊想法)。详见 [SPEC.md](./SPEC.md) 定位 + [DESIGN.md](./DESIGN.md)。

- **市场区去单产品 + 主题/语言 cookie 持久化 + 防闪(本 PR)** —— ① 「市场抢先看」去掉退役中的 `form-design` 卡 + `form-design.agentaily.com` 链接(那个独立产品 + 域即将下线),换成**不绑具体产品**的叙事:featured 卡 CTA 指向真应用 `agentaily.pages.dev/build`(聊天造 app)+「第一批应用即将上架」+「你的点子」,视觉结构不变;页脚「市场」列与 FAQ 现状同步去 form-design。② theme/locale 持久化从默认 `auto`(localhost 落 localStorage)显式钉成 **cookie backend**(`ThemeProvider` / `createI18n` 都加 `storage: { backend: "cookie" }`);DS 的 `themeInitScript`(cookie 优先)已由 `vite.config` 注入 `<head>` → **主题刷新零闪**;locale 靠 cookie + `<html lang="zh">` 预设把首屏闪降到最小。**纯文案 + 配置 + 文档同步,零新依赖。**

## 🚧 进行中

-（暂无)

## 📋 待办

- **生产部署上线** —— 建 Cloudflare Pages 项目 `official-website` + 绑定自定义域名(走 `cloudflare-pages-deploy` skill;DNS 在阿里云)。
- **(可选) E2E** —— 静态站初期不做;落地页稳定后可加 Playwright 走「访客切语言 / 点 CTA」真实路径。
- **SEO / OG / favicon / 站点元信息** —— 待设计定后补。
