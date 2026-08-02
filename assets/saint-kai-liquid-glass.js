addEventListener("load", () => {
  const nav = document.querySelector(".identity-state-nav");
  const reducedTransparency = matchMedia("(prefers-reduced-transparency: reduce)");
  if (!nav || reducedTransparency.matches || typeof liquidGL !== "function") return;

  liquidGL({
    snapshot: ".identity-stage",
    target: ".identity-state-nav",
    resolution: Math.min(devicePixelRatio, 1.5),
    refraction: 0.012,
    bevelDepth: 0.08,
    bevelWidth: 0.18,
    frost: 0,
    shadow: true,
    specular: !matchMedia("(prefers-reduced-motion: reduce)").matches,
    reveal: "none",
    tilt: false,
    magnify: 1.018,
    on: {
      init() {
        document.documentElement.classList.add("liquid-gl-ready");
      },
    },
  });
});
