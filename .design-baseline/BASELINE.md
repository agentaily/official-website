# Design baseline — official-website

这是 **`design-sync` 的基线快照区**:每次从 Claude Design 拿到 handoff 落地进代码时,把那次的设计原型快照存在这里,作为下次三路 diff(baseline ↔ 新 handoff ↔ 当前代码)的「上次设计」一方。

- **首次 design-sync 已落(PR #1)** —— handoff `y7W2EGsfsjhDNPg2OAXnBQ` 的原型快照存在 `y7W2EGsfsjhDNPg2OAXnBQ/`(`index.html` / `app.jsx` / `i18n.jsx` / `sections.jsx` / `sections2.jsx` / `landing.css`)。下次拿到新 handoff 时,以它为「上次设计」一方做三路 diff,合并后把快照换成新 handoff 的。
- **本目录在 `.gitignore` 里**:快照是**本地工作快照**(不入库,避免给 PR 塞一堆原型文件);只有本说明文件 `BASELINE.md` 被 `-f` 强加进版本库当指针。
- **此目录是冻结快照,formatter 不可碰** —— 已在 [`.prettierignore`](../.prettierignore) 列出 `.design-baseline/`,否则 `prettier --write .` 会改写基线、让下次三路 diff 满是假冲突。
- 取 handoff、`design-sync` 三路合并流程见 `design-via-claude-design` + `design-sync` skill。设计项目链接见 [`../DESIGN.md`](../DESIGN.md)。
