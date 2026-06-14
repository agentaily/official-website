# ROADMAP — Agentaily 官网 (official-website)

以**能力**为粒度跟踪。细节链 [SPEC.md](./SPEC.md) / [DESIGN.md](./DESIGN.md) / 各 PR,不复述。

## ✅ 已完成

- **项目骨架** —— Vite + React 18 + TS (strict) + DS 0.10.0,可 `build`;i18n (en/zh) 脚手架;占位壳(消费 DS 的 BrandMark)。
- **CI + 部署 workflow** —— GitHub Actions CI(format/typecheck/test/build)+ Cloudflare Pages 自动部署 workflow(结构就绪;**CF Pages 项目 / 域名绑定待人后续做**)。
- **fleet-ready** —— `.claude/agents/`(7 角色)+ TESTING.md + DESIGN.md;CLAUDE.md 装就绪 + 自轮询约定。

## 🚧 进行中

- **落地页实现(fleet PR 进行中)** —— 从 Claude Design handoff 落地 Hero / 功能特性 / 主理人 (founder) / CTA / 页脚 五大区块,双语填实。设计真相见 [DESIGN.md](./DESIGN.md),行为契约见 [`features/`](./features)。

## 📋 待办

- **生产部署上线** —— 建 Cloudflare Pages 项目 `official-website` + 绑定自定义域名(走 `cloudflare-pages-deploy` skill;DNS 在阿里云)。
- **i18n 文案填实** —— 把 `en.json` / `zh.json` 从占位 key 扩成全站文案。
- **(可选) E2E** —— 静态站初期不做;落地页稳定后可加 Playwright 走「访客切语言 / 点 CTA」真实路径。
- **SEO / OG / favicon / 站点元信息** —— 待设计定后补。
