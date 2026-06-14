# Design baseline — official-website

这是 **`design-sync` 的基线快照区**:每次从 Claude Design 拿到 handoff 落地进代码时,把那次的设计原型快照存在这里,作为下次三路 diff(baseline ↔ 新 handoff ↔ 当前代码)的「上次设计」一方。

- **目前为空**(占位)—— 官网落地页尚未做第一次 design-sync。第一个 fleet worker 从 handoff 落地时会在这里写入快照 + 更新本文件。
- **此目录是冻结快照,formatter 不可碰** —— 已在 [`.prettierignore`](../.prettierignore) 列出 `.design-baseline/`,否则 `prettier --write .` 会改写基线、让下次三路 diff 满是假冲突。
- 取 handoff、`design-sync` 三路合并流程见 `design-via-claude-design` + `design-sync` skill。设计项目链接见 [`../DESIGN.md`](../DESIGN.md)。
