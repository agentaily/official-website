# SPEC — Agentaily 官网 (official-website)

> **Stub.** 这是落地页的**架构真相**骨架。详细视觉 / 交互设计见 [DESIGN.md](./DESIGN.md) + Claude Design handoff;**实际落地页由 fleet worker 实现**(本仓初始只建可 build 的占位壳)。和 [`features/`](./features)(行为真相)、[DESIGN.md](./DESIGN.md)(视觉真相)三足鼎立。

## 定位

Agentaily Form 的**官方落地页**:一个**纯静态前端站**,双语 (en/zh),深色主题,消费 `@agentaily/design-system`。目标是介绍产品、建立信任、引导访客试用 / 联系。**无后端 / 无 PII / 无客户端密钥**。

## 落地页区块(待设计 → 待实现)

| 区块 | 用途 | 状态 |
| --- | --- | --- |
| **Hero** | 一句话价值主张 + 主 CTA + 品牌(BrandMark) | 🚧 待设计 / 待实现 |
| **功能特性 (Features)** | 对话式表单设计、发布收集、看结果等核心能力卡片 | 🚧 待设计 / 待实现 |
| **主理人 (Founder)** | 主理人介绍 / 故事 / 理念模块 | 🚧 待设计 / 待实现 |
| **CTA** | 行动召唤(试用 / 注册 / 联系) | 🚧 待设计 / 待实现 |
| **页脚 (Footer)** | 链接、版权、语言切换、外链(`rel="noopener noreferrer"`) | 🚧 待设计 / 待实现 |

> 详细设计(每个区块的视觉、文案、交互、响应式)见 **handoff**(Claude Design)→ 由 fleet 实现。设计项目链接 + handoff 引用见 [DESIGN.md](./DESIGN.md)。

## 横切关注

- **i18n (en/zh)**:全站文案走 `src/i18n/` 的 message catalog;locale 可切换,默认中文。
- **深色主题**:`data-theme="dark"`,视觉系统全部来自上游 DS,本仓不重定义 palette/type。
- **响应式**:移动优先;断点约定随设计定。
- **安全**:纯静态站,无 PII、客户端无密钥、外链一律 `rel="noopener noreferrer"`、无内联敏感信息。

## 非目标

- ❌ 后端 / Workers / D1 / 表单提交(那是 `form-design` 产品本身的事)。
- ❌ npm 发版(这是部署的站)。
- ❌ 手搓 UI 组件(一律消费 `@agentaily/design-system`)。
