# Agentaily 官网 (official-website)

**Agentaily Form 的官方落地页** —— 双语 (en/zh)、深色主题、消费 [`@agentaily/design-system`](https://github.com/agentaily/design-system) 的**纯静态前端站**。

> 这是**部署的站,不是发布的包**:合并到 `main` 即由 GitHub Actions 部署到 Cloudflare Pages。它不发 npm、没有后端 / workers / D1。

## 怎么跑

```bash
npm install          # 拉依赖(含 DS 0.10.0)+ 装 lefthook git hooks
npm run dev          # Vite dev server (5173)
npm run typecheck    # tsc --noEmit(src/ strict TS)
npm test             # 单元 + BDD(vitest, jsdom)
npm run build        # 生产构建(产物在 dist/)
npm run preview      # 预览 build 产物
npm run format       # prettier --write .
```

「做完」一条命令验完:`npm run typecheck && npm test && npm run build`。

## 这是什么 / 长什么样

- **双语落地页**:Nav → Hero(含聊天 demo)→ 关于 (About) → 作品 (Works) → FAQ → 页脚。区块 spec 见 [SPEC.md](./SPEC.md);详细视觉/交互设计见 [DESIGN.md](./DESIGN.md)(从 Claude Design handoff `y7W2EG` 落地)。
- **深色主题**:`<html data-theme="dark">`,Nav 里可切深/浅;对齐 Agentaily 品牌(极客风、简约、大气、科技感)。
- **i18n**:`LocaleProvider` + `useMessages()`(`src/i18n/`,文案全在 `en.json` / `zh.json`),默认中文,Nav 里可切英文。

## 文档导航

- [SPEC.md](./SPEC.md) —— 落地页区块结构(架构真相)
- [DESIGN.md](./DESIGN.md) —— 视觉/交互契约(设计真相,`designer` agent 的真相源)
- [TESTING.md](./TESTING.md) —— 测试分层 / 框架选型 / 护栏(测试真相)
- [ROADMAP.md](./ROADMAP.md) —— 能力地图
- [`features/`](./features) —— 行为契约(Gherkin,行为真相)
- [`.claude/agents/README.md`](./.claude/agents/README.md) —— sub agent 分工(PR 驱动)

## 技术栈

Vite + React 18 + TypeScript (strict, `src/`) · vitest + @amiceli/vitest-cucumber + Testing Library · lefthook + Prettier · GitHub Actions + Cloudflare Pages。
