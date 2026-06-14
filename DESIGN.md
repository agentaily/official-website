# Design — Agentaily 官网 (official-website)

这个产品**长什么样、怎么设计的**的真相源(视觉/交互维度)。和 `SPEC.md`(架构真相)、`features/`(行为真相)**三足鼎立** —— 它是**视觉契约**。

> [UI] 仅**消费设计系统的 UI 项目**需要本文件;纯逻辑 / 后端 / CLI 项目没有。
> **本产品的视觉系统(palette / type / 组件)在上游 `@agentaily/design-system` (^0.10.0) —— 本文件不重复那些**,只记**本产品自己的**设计指针 + 决策。`designer` agent 读本文件当真相源(就像 `spec-architect` 读 features)。

## 设计在哪做(来源)

- **Claude Design 项目**:**官网设计项目的 projectId 待补 —— 问用户**(fleet 落地前需要这个才能开新对话设计页面)。
- **首个 handoff 引用** = `Gop7LedEF_n8rMHzWaDZ-w`(落地页设计稿)—— 第一个 fleet worker 据此 `design-sync` 落地落地页。
- 流程:在 claude.ai/design 对应项目里设计页面 → 复制 handoff 链接 → `design-sync` 三路合并进代码。取法 / 合并细节见 `design-via-claude-design` + `design-sync` skill。**别和上游组件库 (`@agentaily/design-system`) 的设计项目搞混**(那个是设计组件本身的;本仓只有缺组件 / 缺 seam 时才往那反馈,**叫人**)。

## 设计原则 / 交互

- **落地页(单页滚动)**:Hero → 功能特性 → 主理人 (founder) → CTA → 页脚,自上而下叙事。
- **深色主题默认**(`data-theme="dark"`):品牌随上游 DS —— 极客风、简约、大气、科技感。
- **双语 (en/zh)**:文案走 i18n catalog,默认中文,可切换;切换不丢滚动位置。
- **响应式**:移动优先;断点 / 栅格随设计稿定,优先用 DS 布局原语。
- **视觉系统不自造**:palette / type / 组件全部来自 `@agentaily/design-system`,本仓只记**官网自己的**版式 / 区块 / 文案决策。

—— 本产品特定的视觉语言、交互模式、信息架构、响应式约定。

## 消费的设计系统

- **`@agentaily/design-system` (^0.10.0)**:**UI 一律消费,不手搓**;升级随上游流过来。
- 关键组件 / token:`BrandMark`(品牌标)· `Button` · `Card`(含 ticks 边角motif)· `Badge` —— 落地页区块按设计从 DS 取(Hero/功能卡/CTA);视觉系统(palette/type)全部来自 DS,本仓不重定义。
- 缺组件 / 缺 seam → 往**上游组件库**反馈补齐(下游定契约、上游照做;这步**叫人**)。

## 页面 / 界面清单(+ 设计状态)

落地页是**单页滚动**,下面按区块拆。当前全仓只有占位壳(`src/App.tsx`),区块均**待设计 / 待实现**(fleet worker 从 handoff `Gop7LedEF_n8rMHzWaDZ-w` 落地)。

| 区块                                      | 设计状态           | 对应代码                                   |
| ----------------------------------------- | ------------------ | ------------------------------------------ |
| **Hero**(价值主张 + 主 CTA + BrandMark)   | 🚧 待设计 / 待实现 | `src/App.tsx`(现为占位壳)                  |
| **功能特性 (Features)**                   | 🚧 待设计 / 待实现 | (待建,如 `src/sections/Features.tsx`)      |
| **主理人 (Founder)**                      | 🚧 待设计 / 待实现 | (待建)                                     |
| **CTA**                                   | 🚧 待设计 / 待实现 | (待建)                                     |
| **页脚 (Footer)**(链接 / 版权 / 语言切换) | 🚧 待设计 / 待实现 | (待建)                                     |
| 语言切换 (en/zh)                          | 占位已实现         | `src/App.tsx`(`LocaleSwitch`)+ `src/i18n/` |

## 设计 ↔ 代码映射

- `.design-baseline/`:上次同步的设计快照(`design-sync` 三路 diff 的基线;改设计后刷新)。**它是冻结快照,任何 formatter 都不可碰** —— 必须在 `.prettierignore`(及其它 formatter 的 ignore)里列出 `.design-baseline/`,否则 `prettier --write .` 会改写基线、让下次三路 diff 满是假冲突。
- 落地链:`designer`(去 Claude Design 设计、拿 handoff)→ `design-syncer`(`design-sync` 进代码,保留本地工程改动)。
- **改设计 → 同一次更新本文件**(文档与代码同步纪律:页面清单 / 设计状态别漂移)。
