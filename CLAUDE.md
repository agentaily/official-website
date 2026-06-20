# Agentaily 官网 (official-website) — 项目约定

Agentaily 的**官方落地页** —— 介绍「聊天 × 万物」**通用平台 / 框架**(聊一句即造出能用的应用,发布到市场、任何人可 fork 再造;不是一个个单独产品)。双语 (en/zh)、深色主题、消费 `@agentaily/design-system` 的**纯静态前端站**。导航:
[README](./README.md)(怎么跑)· [SPEC.md](./SPEC.md)(落地页区块/架构)· [DESIGN.md](./DESIGN.md)(视觉/交互设计)·
[ROADMAP.md](./ROADMAP.md)(能力地图)· [TESTING.md](./TESTING.md)(测试策略)·
[`.claude/agents/README.md`](./.claude/agents/README.md)(sub agent 分工)。

## 工作流纪律

- **接到会改代码的任务,先从 `main` 切一个 feature 分支再动手,提交走 PR。** 不要把改动直接堆在 `main` 的工作区里。纯问答 / 探索 / 只读调研不必开分支。
- 单线任务用 **branch** 隔离即可;**worktree 留给多实例并行**(`claude-fleet`,每任务一 worktree + 一终端)。
- **只在用户要求时** commit / push。commit 与 PR 标题用 conventional commits 带 scope(`feat(landing): …` / `fix(i18n): …` / `ci(deploy): …`)。
- **合并守 CI gate**:含源码的 PR **等 CI 绿了再合**(或 `gh pr merge --auto` 让它自动等);只有**纯文档 / 紧急修复**才用 `--admin` 绕过,并在汇报里讲明绕过了什么。
- 谁 ship 或改变一个能力,**同一次改动**更新 [ROADMAP.md](./ROADMAP.md);改了视觉 / 区块,同一次更新 [DESIGN.md](./DESIGN.md)。文档不复述,链 SPEC / DESIGN / agents/README。

## 硬约束

- **UI 一律消费 [`@agentaily/design-system`](https://github.com/agentaily/design-system)**,不手搓组件;升级随上游流过来。视觉系统(palette/type)全来自 DS,本仓不重定义。
- **全站文案走 `src/i18n` catalog**(`en.json` / `zh.json`),禁硬编码可见字符串;默认中文,可切英文。
- `src/` 是 **TypeScript strict** —— `src/core` 这类纯逻辑 **test-first(TDD)**,先写失败单测再写实现。
- **纯静态站**:无后端 / 无 PII / 客户端无密钥;外链一律 `rel="noopener noreferrer"`,不内联敏感信息。**不发 npm**(这是部署的站,不是包)。

## 双循环 TDD / BDD 约定

- [`features/*.feature`](./features) 是**行为契约的唯一真相源**(Gherkin);[`SPEC.md`](./SPEC.md) 是架构真相、[`DESIGN.md`](./DESIGN.md) 是视觉真相 —— 三足鼎立。
- **内环**(`implementer`):`src/` 实现 + `tests/unit` 单测,红→绿→重构,不拆。
- **外环**(`outer-tester`):`tests/integration`(vitest-cucumber + Testing Library)把 feature 场景 realize 出来。**本站初期不做 e2e**。
- 分工与五条铁律(契约优先交接 · reviewer 独立只读 · 内环不拆 · 最小权限 · 并行需隔离)见 [`.claude/agents/README.md`](./.claude/agents/README.md);测试分层 / 选型 / 护栏见 [`TESTING.md`](./TESTING.md)。
- UI 改动走 `designer`(去本产品的 Claude Design 项目设计 → 拿 handoff → `design-sync` 落地),不在代码里凭空手搓界面。

## 自主运作约定(就绪 + 自轮询)

被 `fleet` 起终端后,读完本 `CLAUDE.md` 即**就绪**,进入**自轮询**自洽消化:

- **只盯自己仓的 `autopilot` + draft PR(任务工单)** → 由本项目 [`pr-analyst`](./.claude/agents/README.md) 分析路由(分类 → 拆子任务 → 派 `spec-architect`/`implementer`/`outer-tester`/`designer`/`release-eng`),按双循环 TDD 在 feature 分支上消化;含源码的改动等 CI 绿。
- **不自查上游 NPM 依赖**:`@agentaily/design-system` 等的升级由 **orchestrator 掌握全局后开成普通 PR 派下来**(本站不像 form-design 那样跑「上游发版」双轮询);收到这类 PR 就当普通任务工单消化(跑 `npm run typecheck && npm test && npm run build` 验证后挂起等人合)。

**这些必须叫人,别自主**:合并 PR(守 CI gate)· 设计拍板(去 Claude Design 点)· 缺上游 DS 组件 / seam 的反馈 · 跨项目开 PR · CF Pages 项目 / 域名绑定等不可逆部署操作 · 凭证操作(vault)。轮询空闲时拉长间隔省钱。

## 跑起来

`npm run dev`(5173)· `npm run typecheck` · `npm test`(unit + BDD,jsdom)· `npm run build` · `npm run preview`。
「做完」一条命令验完:`npm run typecheck && npm test && npm run build`。
