# AsterFlow NX Series - Delivery Index

交付日期：2026-08-01

## 1. 单产品四段交互页

源码包：`asterflow-nx-case.zip`

- `01 Product / 产品`：NX 65-40-200 产品定位、应用边界与真实性声明。
- `02 Duty / 工况`：工况输入与 preliminary shortlist。
- `03 Curve / 曲线`：50 Hz 性能曲线、BEP / POR 与产品证据。
- `04 RFQ / 技术询价`：Technical RFQ 与七卡案例入口。

四段共用中心固定的程序化 3D 端吸离心泵。模型支持拖动旋转、滚轮缩放、左右旋转、自动旋转、暂停与复位；向下滚动时模型保持固定，左右决策信息切换。

本版新增一条贯穿 shortlist → curve → RFQ 的采购决策证据链：Tender Redline、Evidence-State Skin、Metric / US unit parity、Counterfactual failure propagation 与 Rejection-first shortlist。所有判断均沿用既有 concept data；单位换算不生成 60 Hz 曲线，人工标记的 Clarify 项会进入 Technical RFQ。

全页面采用 English above / 中文 below：英文在上、中文在下，同时显示，不使用语言切换器。

本地启动：解压后执行 `npm ci && npm run dev`，打开 `http://localhost:3000`。

## 2. 交付内容

- `screenshots/`：4 张 1440 × 900 四段产品页截图。
- `screenshots-contact-sheet.jpg`：四段总览。
- `case-cards/`：7 张 1080 × 1440 双语案例证据卡。
- `case-cards-contact-sheet.jpg`：七卡总览。
- `sample-documents/`：3 份英文在上、中文在下的 SAMPLE PDF。
- `VERIFICATION_REPORT.md`：功能、双语、3D、无障碍、性能与边界验收。
- `lighthouse.json`：生产构建 Lighthouse 原始报告。
- `SHA256SUMS.txt`：交付文件校验值。

## 3. 页面与接口

- `/`：四段单产品交互体验。
- `/case-study`：七卡案例证据流。
- `/api/rfq`：本地验证型 RFQ 接口，不持久化数据。

## 4. Figma 参考

先前静态长帧仍保留于：
<https://www.figma.com/design/7wg2379xLbJOnSNIR8gUjG/AsterFlow-NX-%E2%80%94-Product-Experience---Case-Evidence>

最新交付的双语、固定 3D 与四段交互以本源码包、Codex 内浏览器页面和本目录截图为准；Figma 静态帧不承担 3D 运行证明。

## 固定边界

AsterFlow 与 NX Series 均为虚构概念；性能数据仅为 illustrative concept data。现有曲线只覆盖 50 Hz，60 Hz 保持 Engineering review。案例不是 CNP 或其他参考品牌的官方项目，也不构成真实工程选型、采购建议、性能保证或询盘增长承诺。
