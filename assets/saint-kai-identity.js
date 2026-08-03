const video = document.querySelector("#saint-kai-video");
const stage = document.querySelector(".identity-stage");
const panels = [...document.querySelectorAll("[data-identity-panel]")];

if (video && stage && panels.length === 6) {
  const frameCount = 485;
  const pages = [
    {
      name: "主页",
      title: "说一句，就开始。",
      description: "五个 Codex Native 产品，把模糊意图变成可执行、可验证的结果。",
      href: "#home",
    },
    {
      name: "Sculptor Skill",
      title: "把风格，提炼成规则。",
      description: "从多源造型证据提炼可执行的 3D Style Genome 与下游 Skill。",
      href: "#sculptor",
    },
    {
      name: "Goal Signal Skill",
      title: "先稳定目标，再持续推进。",
      description: "把长期目标与一次性路径、权限和失败上下文准确分开。",
      href: "#goal-signal",
    },
    {
      name: "TakeTrace",
      title: "一句话，开始剪辑。",
      description: "把编辑意图变成可确认的操作计划，再交给本地编辑器执行。",
      href: "#taketrace",
    },
    {
      name: "PageTrace",
      title: "一句话，决定下一页。",
      description: "从页面目标整理候选方向，并给出下一步可执行的页面决策。",
      href: "#pagetrace",
    },
    {
      name: "AsterFlow",
      title: "先匹配工况，再讨论泵。",
      description: "把产品理解、工况筛选、性能证据与技术 RFQ 接成一条双语采购决策路径。",
      href: "#asterflow",
    },
  ];
  const status = stage.querySelector("[data-video-status]");
  const pageLinks = [...document.querySelectorAll("[data-identity-page]")];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let queued = false;
  let lastFrame = -1;

  function progress() {
    const start = panels[0].offsetTop;
    const end = panels.at(-1).offsetTop;
    return Math.min(1, Math.max(0, (scrollY - start) / Math.max(1, end - start)));
  }

  function activeState() {
    const focus = scrollY + innerHeight * 0.5;
    const center = (panel) => panel.getBoundingClientRect().top + scrollY + panel.offsetHeight * 0.5;
    return panels.reduce((closest, panel, index) => (
      Math.abs(center(panel) - focus)
        < Math.abs(center(panels[closest]) - focus)
        ? index
        : closest
    ), 0);
  }

  function render() {
    queued = false;
    if (!Number.isFinite(video.duration)) return;

    const rawProgress = progress();
    const state = activeState();
    const value = reducedMotion.matches ? state / (pages.length - 1) : rawProgress;
    const frame = Math.round(value * (frameCount - 1));
    const page = pages[state];
    if (frame !== lastFrame) {
      lastFrame = frame;
      video.currentTime = frameTime(frame);
      video.pause();
    }

    pageLinks.forEach((link, index) => {
      if (index === state) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function requestRender() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(render);
  }

  function frameTime(frame) {
    const frameDuration = video.duration / frameCount;
    return Math.min(video.duration - frameDuration, frame * frameDuration);
  }

  function ready() {
    stage.classList.add("is-ready");
    status.hidden = true;
    requestRender();
  }

  async function alignHash() {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.matches("[data-identity-panel]")) {
      await Promise.all([...document.querySelectorAll(".home-product-visual")]
        .map((image) => image.decode().catch(() => {})));
      requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    }
  }

  if (video.readyState >= 1) ready();
  else video.addEventListener("loadedmetadata", ready, { once: true });
  video.addEventListener("error", () => {
    status.textContent = "视频载入失败";
  });
  addEventListener("scroll", requestRender, { passive: true });
  addEventListener("resize", requestRender, { passive: true });
  reducedMotion.addEventListener("change", requestRender);
  if (document.readyState === "complete") alignHash();
  else addEventListener("load", alignHash, { once: true });

  console.assert(frameCount === 485);
  console.assert(panels.length === 6);
  console.assert(pages.length === pageLinks.length);
  console.assert(pages.every((page, index) => page.href === pageLinks[index].getAttribute("href")));
  console.assert(Math.round(0.5 * (frameCount - 1)) === 242);
  console.assert(Math.round(1 * (frameCount - 1)) === 484);
  console.assert(panels[0].offsetTop < panels.at(-1).offsetTop);
  console.assert(frameTime(frameCount - 1) < video.duration);
}

const launchLinks = [...document.querySelectorAll(".home-product .primary-action[data-product]")];
const productNames = {
  sculptor: "Sculptor Skill",
  "goal-signal": "Goal Signal Skill",
  taketrace: "TakeTrace",
  pagetrace: "PageTrace",
  asterflow: "AsterFlow",
};
let launching = false;

launchLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (launching) return;
    launching = true;

    const rect = link.getBoundingClientRect();
    const product = productNames[link.dataset.product] || "产品";
    const wash = document.createElement("div");
    const next = document.createElement("iframe");
    wash.className = "launch-wash";
    wash.innerHTML = "<strong>说一句，</strong><em>就开始。</em>";
    next.className = "launch-next-panel";
    next.src = link.href;
    next.title = `${product} 启动页`;
    next.tabIndex = -1;
    next.setAttribute("aria-hidden", "true");
    document.body.append(wash, next);
    document.body.classList.add("is-launching");

    wash.animate([
      { top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderRadius: "14px", offset: 0, easing: "cubic-bezier(.22,1,.36,1)" },
      { top: "0", left: "0", width: "100vw", height: "100vh", borderRadius: "0", offset: 0.35 },
      { top: "0", left: "0", width: "100vw", height: "100vh", borderRadius: "0", offset: 0.5, easing: "cubic-bezier(.76,0,.24,1)" },
      { top: "0", left: "-100vw", width: "100vw", height: "100vh", borderRadius: "0", offset: 1 },
    ], { duration: 1100, easing: "linear", fill: "forwards" });

    setTimeout(() => location.href = link.href, 1100);
  });
});

console.assert(launchLinks.length === 5);
