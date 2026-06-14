# Testing — Agentaily 官网 (official-website)

这个项目**怎么设计测试**:分层、框架技术选型、护栏。和 `.claude/agents/README.md` 的双循环 TDD 方法论配套 —— 测试是 `implementer`(内环)/`outer-tester`(外环)把行为契约 `features/` realize 出来、并在护栏上自动拦回归的方式。

> 这是项目的**测试真相源**;改测试策略/选型/护栏 → 同一次改动更新本文件(文档与代码同步纪律)。

## 测试分层(海拔:多而快在下,少而真在上)

| 层               | 框架                                                              | 测什么                                               | 位置         | 谁写           | 跑在哪道闸    |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------- | ------------ | -------------- | ------------- |
| **unit**         | vitest · `tests/unit/`                                            | 纯逻辑单元(behavior-styled AAA,不为每断言写 Gherkin) | (见框架约定) | implementer    | pre-push + CI |
| **BDD 行为契约** | `features/` (Gherkin)                                             | 系统该做什么(唯一真相源)                             | `features/`  | spec-architect | CI            |
| **integration**  | @amiceli/vitest-cucumber + Testing Library · `tests/integration/` | 组件 / 跨模块协作                                    | (见框架约定) | outer-tester   | CI            |
| **e2e**          | (暂不装 — 静态站初期)                                             | 用户真实走一遍                                       | —            | outer-tester   | —             |

## 框架技术选型(为什么这么选)

- **单测 → vitest · `tests/unit/`**:和 Vite 同源、零额外配置、jsdom 跑 React 组件快;behavior-styled 单测验 i18n / 纯逻辑单元。
- **BDD 契约 → Gherkin `features/`**:行为可执行、business-readable,内外环都对着它,是契约真相源。
- **集成 → @amiceli/vitest-cucumber + Testing Library · `tests/integration/`**:vitest-cucumber 把 `features/` 的 Gherkin 直接绑成可执行测试,Testing Library 渲染真实组件断言用户可见行为(如切 en/zh 后文案变化)。
- **e2e → 暂不装**:静态站初期 e2e 性价比低;外环用 integration 覆盖即可,留待落地页稳定后引入 Playwright。
- 本仓逻辑很薄(主要是 i18n + UI 组合),所以单测聚焦 i18n / 工具函数,行为主要由 `tests/integration/` 的 BDD 实现 —— **外环只有 integration,没有 e2e 层**。

## 护栏(质量门:纵深防御,便宜在前、权威在后)

| 阶段   | 闸                                                                              | 拦什么                  |
| ------ | ------------------------------------------------------------------------------- | ----------------------- |
| 写时   | plan 模式 + 先写失败测试                                                        | 方向错 / 实现错         |
| 提交时 | lefthook `pre-commit`(prettier --write 暂存文件 + 改了 .ts(x) 时 typecheck)     | 格式 / 类型             |
| 推送时 | lefthook `pre-push`(npm test + npm run build)                                   | 单测红 / 构建坏         |
| PR 时  | CI 必需检查(verify(format:check / typecheck / test / build))+ 独立 `reviewer`   | 集成/e2e 回归、设计偏差 |
| 合并时 | branch protection(main 要求 CI verify 绿 + PR 审查(分支保护由人在 GitHub 上配)) | 带病进 main             |

- **lefthook** 在 `npm install` 时经 `prepare` 自动装;`pre-commit` 只格式化 / typecheck 暂存文件(快),`pre-push` 跑全量 test + build(权威)。
- **CI** 是唯一必需检查 `verify`:一个 job 串起 format:check → typecheck → test → build。静态站无 workers / e2e job。
- **部署**:`deploy-cloudflare.yml` 在 push main 时跑(CI 之外的独立 workflow);它**不是** PR 的必需检查。

## 本地一条命令验完(done 的定义)

```bash
npm run typecheck && npm test && npm run build
```

## 约定 / 坑(this repo)

- 每个外环测试映射一个 `features/` 场景 —— 匹配 Gherkin 步骤,别断言 trivia。
- 渲染真实组件(经 Testing Library);切 locale 的场景断言**用户可见文案**变化,别断言内部 state。**无 e2e 层** —— 别为静态站初期硬写 Playwright。
