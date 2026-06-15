# Design baseline — official-website

这是 **`design-sync` 的基线快照区**:每次从 Claude Design 拿到 handoff 落地进代码时,把那次的设计原型快照存在这里,作为下次三路 diff(baseline ↔ 新 handoff ↔ 当前代码)的「上次设计」一方。

- **当前基线(PR #3)** —— handoff `sL6n1EQjQBvC2hDvmwx8wA`(页脚收尾:去掉底栏 slogan `AGENTAILY · 「聊天 × 万物」` + 版权/备案号水平居中)。下次拿到新 handoff 时,以它为「上次设计」一方做三路 diff,合并后把指针换成新 handoff 的。
  - ⚠️ **本地原型快照未落盘**:PR #3 由 fleet worker 落地,worker 对 design API 无凭证(`https://api.anthropic.com/v1/design/h/sL6n1EQjQBvC2hDvmwx8wA` 返 404),无法把原型抽进 `sL6n1EQjQBvC2hDvmwx8wA/`。本次 design delta 在工单里已显式枚举(页脚两处),故 worker 直接按枚举落地、以「diff 仅页脚」自证边界。**下次需要精确三路 diff 前**,请有凭证的 orchestrator 先 `WebFetch` 解包,把 `sL6n1EQjQBvC2hDvmwx8wA/` 快照补进本目录(否则会落到「无基线→首次同步」分支)。
  - 上一版基线(PR #1)为 handoff `8Q3zKqB6xqQ5Dd1YH2VXgg`(chat6 去 About),已被本次取代。
- **本目录在 `.gitignore` 里**:快照是**本地工作快照**(不入库,避免给 PR 塞一堆原型文件);只有本说明文件 `BASELINE.md` 被 `-f` 强加进版本库当指针。
- **此目录是冻结快照,formatter 不可碰** —— 已在 [`.prettierignore`](../.prettierignore) 列出 `.design-baseline/`,否则 `prettier --write .` 会改写基线、让下次三路 diff 满是假冲突。
- 取 handoff、`design-sync` 三路合并流程见 `design-via-claude-design` + `design-sync` skill。设计项目链接见 [`../DESIGN.md`](../DESIGN.md)。
