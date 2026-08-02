# AsterFlow NX Series - Verification Report

验收日期：2026-08-01  
验收对象：最终生产构建、Codex 内浏览器页面与用户交付包

## 结论

**PASS - 单产品四段、中心固定可交互 3D、英文在上中文在下、选型/RFQ/七卡证据流均已实现。**

## Codex 内浏览器实测

- 四段 `.story-chapter`：`4`。
- 3D canvas：`1`，对象为 NX 65-40-200 端吸离心泵概念模型。
- 3D 控件：自动旋转 → 暂停切换成功；左右旋转、缩放与复位已保留。
- 首屏模型顶部：`72 px`。
- 滚动至第四段附近（`scrollY = 3333.5`）后模型顶部仍为 `72 px`。
- 页面横向溢出：`0 px`。
- 四个章节背景保持透明，状态切换仅改变模型颜色/线框，不再以白色图层或材质透明度覆盖中心 3D 产品。
- 首屏 DOM：`137` 个中文语言节点；英文多出的 1 个为根 `<html lang="en">`。
- 每个双语块均为 1 个英文节点 + 1 个中文节点，无重复中文块。

## 功能证据

- `40 m³/h · 45 m · 50 Hz · 20 °C`：
  - `NX 50-32-160` 因可用扬程不足被排除；
  - `NX 65-40-200` 与 `NX 80-50-200` 进入 preliminary shortlist；
  - 首位为 `NX 65-40-200`，illustrative score 为 `93.4`。
- 60 Hz 请求返回 Engineering review，不产生模拟曲线或 shortlist。
- 50 Hz 性能图、BEP/POR、效率/NPSHr 小图与表格读取同一 typed concept record。
- 三步 Technical RFQ 继承 duty 与候选型号；服务端再次验证输入。
- RFQ 演示不接 CRM/邮件、不保存联系人、不保存附件字节。
- 附件边界：最多 1 个 PDF/JPEG/PNG，最大 10 MB。
- `/case-study` 呈现七卡双语案例证据流。
- Tender Redline 支持 Confirm / Clarify / Exclude；Clarify 项双语带入 Technical RFQ。
- Evidence-State Skin 将 50 Hz illustrative、60 Hz review 与 uncovered 状态同步映射到中心 3D 泵。
- Metric / US unit parity 展示源值、换算值与 round-trip；不以换算替代频率工程复核。
- Counterfactual rail 可撤回 flow 输入或提高 head 约束，并同步撤回 shortlist → curve → RFQ 证据链；恢复后回到原工况。
- Rejection-first shortlist 先展示排除型号及原因，再展示 preliminary candidates。

## 自动验证

| 检查 | 结果 |
|---|---:|
| Biome | 23 files，0 error |
| TypeScript | PASS |
| Domain unit tests | 6 / 6 |
| Journey / responsive / bilingual / 3D E2E | 11 / 11 |
| Artifact / case accessibility tests | 3 / 3 |
| Product axe serious / critical | 0 / 0 |
| Case-study axe serious / critical | 0 / 0 |
| Responsive horizontal overflow | 0 at 390×844, 768×1024, 1280×800, 1440×900 |
| Production build | PASS |
| npm audit | 0 vulnerabilities |

## Lighthouse

最终生产构建：

| Category | Score |
|---|---:|
| Performance | 95 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

- LCP：2.2 s
- CLS：0
- TBT：210 ms
- 原始报告：`lighthouse.json`

## 文件验收

- 产品截图：4 张，均为 `1440 × 900`。
- 案例卡：7 张，均为 `1080 × 1440`。
- 3 份 PDF：均为 2 页，英文在上、中文在下，可重新读取文本并带 SAMPLE / concept-data 标识。
- PDF 中文字符读取计数：datasheet `235`、installation request `374`、series overview `341`。
- 源码 ZIP 通过压缩包完整性测试。

## 真实性与责任边界

- AsterFlow / NX Series：虚构作品集概念。
- 性能值：illustrative concept data，不用于工程选型。
- 曲线覆盖：仅 50 Hz；60 Hz 为 Engineering review。
- 标准：仅作参考，不构成认证或符合性声明。
- 参考品牌页面：仅用于信息架构审视，不构成官方合作或官方案例。
- 商业结果：不承诺真实选型结果、报价结果、询盘量或转化增长。
