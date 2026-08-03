"use strict";

const $ = (selector) => document.querySelector(selector);
const form = $("#start-form");
const message = $("#message");

const products = {
  "goal-signal": {
    repo: "https://github.com/realgaoshengkai-coder/goal-signal",
    plugin: "goal-signal",
    prompt: "用 Goal Signal 把这段粗略意图压成一个持久 Goal，并只保留目标任务无法可靠恢复的一次性上下文。",
    boundaries: ["只在显式请求写 Goal 时触发", "不执行或检查下游任务", "不把实现猜测写进持久 Goal"]
  },
  "adhd-codex": {
    repo: "https://github.com/UditAkhourii/adhd",
    command: "open 'codex://threads/019fb10e-864d-7830-8f94-5d5882bc6954'",
    prompt: "用 ADHD Codex 从相互隔离的认知视角并行探索这个开放问题，再由独立 critic 聚类、排除陷阱，并深化 Top 3。",
    boundaries: ["灵感来源原版为 UditAkhourii/adhd", "本版直接使用 Codex collaboration 编排", "当前仍是 Skill orchestration contract"]
  },
  "sculptor-skill": {
    repo: "https://github.com/realgaoshengkai-coder/sculptor-skill",
    plugin: "sculptor-skill",
    prompt: "用 Sculptor 提炼这组 3D 参考的造型语言，先区分 observed、reported、inferred 和 unknown，再输出可复用的 Style Genome 与下游 Skill。",
    boundaries: ["单图只形成 provisional profile", "生成工具不是唯一证据来源", "身份与原创性分别验证"]
  },
  taketrace: {
    repo: "https://github.com/realgaoshengkai-coder/taketrace",
    plugin: "taketrace",
    prompt: "用 TakeTrace 剪辑这段视频：删掉开头两秒停顿，把 00:08 的高光提前，并在执行前让我确认计划，完成后保存运行收据。",
    boundaries: ["媒体只交给本地 TakeTrace", "执行前确认计划", "每次运行生成可回看的收据"]
  },
  pagetrace: {
    repo: "https://github.com/realgaoshengkai-coder/pagetrace",
    plugin: "pagetrace",
    prompt: "用 PageTrace 把这份小红书内容目标整理成六页图文，显示三条判断，并让每一页都保留来源定位。",
    boundaries: ["Codex 负责自然语言理解", "PageTrace 验证三条判断与六页结构", "没有来源的内容不会伪装成已验证结论"]
  },
  "asterflow-nx": {
    repo: "https://github.com/realgaoshengkai-coder/asterflow-nx",
    plugin: "asterflow-nx",
    prompt: "用 AsterFlow NX 展示 3D 产品，整理 40 m³/h、45 m、50 Hz、20°C 清水工况，并把已知条件和待确认问题带入 Technical RFQ。",
    boundaries: ["3D 产品与性能数据明确标注为示意", "Codex 只操作可见产品字段", "采购前仍需制造商工程复核"]
  }
};

function selectedProduct() {
  return form.elements.product.value;
}

function setProduct(product) {
  const value = products[product] ? product : "goal-signal";
  const radio = form.querySelector(`input[name="product"][value="${value}"]`);
  radio.checked = true;
  message.value = products[value].prompt;
  $("#character-count").textContent = `${message.value.length} / 2000`;
}

function render(product, prompt) {
  const entry = products[product];
  const command = entry.command || `codex plugin marketplace add ${entry.repo}\ncodex plugin add ${entry.plugin}@${entry.plugin}`;
  $("#empty-plan").hidden = true;
  $("#plan-result").hidden = false;
  $("#install-command").textContent = command;
  $("#codex-prompt").textContent = prompt;
  $("#github-link").href = entry.repo;
  $("#product-boundaries").replaceChildren(...entry.boundaries.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
}

async function copy(button, text) {
  await navigator.clipboard.writeText(text);
  const label = button.textContent;
  button.textContent = "已复制";
  setTimeout(() => { button.textContent = label; }, 1200);
}

form.addEventListener("change", (event) => {
  if (event.target.name === "product") setProduct(event.target.value);
});
message.addEventListener("input", () => {
  $("#character-count").textContent = `${message.value.length} / 2000`;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const prompt = message.value.trim();
  if (!prompt) {
    message.setCustomValidity("请先描述任务");
    message.reportValidity();
    return;
  }
  message.setCustomValidity("");
  render(selectedProduct(), prompt);
});
$("#copy-command").addEventListener("click", () => copy($("#copy-command"), $("#install-command").textContent));
$("#copy-prompt").addEventListener("click", () => copy($("#copy-prompt"), $("#codex-prompt").textContent));

setProduct(new URLSearchParams(location.search).get("product"));
