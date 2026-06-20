# SPEC — Agentaily 官网 (official-website)

> 这是落地页的**架构真相**。详细视觉 / 交互设计见 [DESIGN.md](./DESIGN.md) + Claude Design handoff;落地页已由 fleet worker 从 handoff `8Q3zKq` 实现(PR #1)。和 [`features/`](./features)(行为真相)、[DESIGN.md](./DESIGN.md)(视觉真相)三足鼎立。

## 定位

Agentaily 的**官方落地页**:介绍 Agentaily 这个**「聊天 × 万物」通用平台 / 框架** —— 跟 AI 聊一句即造出能用的应用(aml 后端 + 前端文件、沙箱运行),发布到市场、任何人可浏览并 fork 再造;**不是**一个个单独产品(如表单工具)。一个**纯静态前端站**,双语 (en/zh),深色主题,消费 `@agentaily/design-system`。目标是讲清平台定位、建立信任、引导访客探索市场 / 联系。**无后端 / 无 PII / 无客户端密钥**。

## 落地页区块(单页滚动)

活动渲染树:**Nav → Hero → 市场抢先看(Works)→ FAQ → 页脚**(chat6 去掉了 About;锚点仍为 `#works`、组件仍名 `Works`,叙事改为「市场 + fork」)。区块 → 代码映射见 [DESIGN.md](./DESIGN.md)。原型里 PromptStrip / Philosophy / Services / HowWeWork / Contact / **About** 都是死组件,不实现。

| 区块 | 用途 | 状态 |
| --- | --- | --- |
| **Nav** | BrandMark + 锚点导航(作品 / FAQ)+ 语言(en/zh)/ 深浅主题切换,sticky | ✅ 已实现 |
| **Hero** | 平台价值主张(RotatingTagline:聊天造万物 + 市场 + fork)+ 主 CTA(看市场 / 聊想法)+ 抽象「聊天 × 万物」demo | ✅ 已实现 |
| **市场抢先看 (Works)** | 三张应用卡(已上线 Form Design / 筹备中 / 造你自己的),呈现市场 + fork 叙事,外链带 `rel="noopener noreferrer"` | ✅ 已实现 |
| **FAQ** | 合作向 Accordion(接什么项目 / 怎么收费 / 工期…),首项默认展开 | ✅ 已实现 |
| **页脚 (Footer)** | 品牌 + 标语 + 链接列 + 版权 + ICP 备案(链工信部);居中容器 | ✅ 已实现 |

> 每个区块的视觉、文案、交互、响应式见 **handoff**(Claude Design)+ [DESIGN.md](./DESIGN.md)。布局在 `src/styles/landing.css`,组件全部来自 `@agentaily/design-system`。

## 横切关注

- **i18n (en/zh)**:全站文案走 `src/i18n/` 的 message catalog(`en.json` / `zh.json`),经 `useMessages()` 读取;两份 catalog 由 `Messages` 接口锁同一形状(漂移即编译错)。locale 默认中文,Nav 里可切;切换同步 `<html lang>`。
- **主题**:默认深色(`<html data-theme="dark">`),Nav 里可切深 / 浅并持久化;视觉系统全部来自上游 DS,本仓不重定义 palette/type。
- **响应式**:移动优先;断点 760 / 900px(见 `landing.css`)。
- **安全**:纯静态站,无 PII、客户端无密钥、外链一律 `rel="noopener noreferrer"`、无内联敏感信息。

## 非目标

- ❌ 后端 / Workers / D1 / 表单提交(那是 `form-design` 产品本身的事)。
- ❌ npm 发版(这是部署的站)。
- ❌ 手搓 UI 组件(一律消费 `@agentaily/design-system`)。
