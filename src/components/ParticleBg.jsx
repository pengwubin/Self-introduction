import { useEffect, useRef } from "react";

const COLORS = [
  { fill: "18, 162, 138", glow: "92, 226, 208", alpha: 0.8 },
  { fill: "58, 193, 177", glow: "146, 240, 228", alpha: 0.72 },
  { fill: "244, 179, 62", glow: "255, 220, 138", alpha: 0.7 },
  { fill: "247, 118, 102", glow: "255, 186, 175", alpha: 0.58 },
  { fill: "170, 185, 255", glow: "224, 229, 255", alpha: 0.42 },
];

const TARGET_FPS = 40;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function pickColor() {
  const roll = Math.random();
  if (roll < 0.44) return COLORS[0];
  if (roll < 0.7) return COLORS[1];
  if (roll < 0.92) return COLORS[2];
  if (roll < 0.985) return COLORS[3];
  return COLORS[4];
}

function buildScene(width, height) {
  const horizonY = height * 0.18;
  const planeHeight = height * 0.82;

  return {
    width,
    height,
    centerX: width * 0.56,
    horizonY,
    planeHeight,
    maxSpread: width * 0.99,
    startBand: width * 0.042,
  };
}

function projectPoint(lane, depth, scene) {
  const depthCurve = Math.pow(depth, 1.9);
  const spread = scene.maxSpread * (0.045 + Math.pow(depth, 1.12) * 0.98);

  return {
    x: scene.centerX + lane * spread,
    y: scene.horizonY + scene.planeHeight * depthCurve,
  };
}

function createParticle() {
  const laneBand = Math.random();
  const laneMagnitude = Math.pow(laneBand, 1.35);
  const laneSign = Math.random() < 0.5 ? -1 : 1;

  return {
    lane: laneSign * laneMagnitude,
    depth: Math.pow(Math.random(), 1.65),
    speed: randomBetween(0.00018, 0.00042),
    drift: randomBetween(-0.009, 0.009),
    wobblePhase: randomBetween(0, Math.PI * 2),
    wobbleSpeed: randomBetween(0.28, 0.65),
    baseSize: Math.random() < 0.84 ? randomBetween(0.9, 1.9) : randomBetween(2.0, 3.6),
    shape: Math.random() < 0.42 ? "dot" : Math.random() < 0.8 ? "square" : "diamond",
    color: pickColor(),
  };
}

function createParticles(width, height) {
  const area = width * height;
  const count = clamp(Math.floor(area / 5400), 80, 160);
  return Array.from({ length: count }, () => createParticle());
}

function resetParticle(particle) {
  const fresh = createParticle();
  particle.lane = fresh.lane;
  particle.depth = randomBetween(0.008, 0.045);
  particle.speed = fresh.speed;
  particle.drift = fresh.drift;
  particle.wobblePhase = fresh.wobblePhase;
  particle.wobbleSpeed = fresh.wobbleSpeed;
  particle.baseSize = fresh.baseSize;
  particle.shape = fresh.shape;
  particle.color = fresh.color;
}

function renderGrid(ctx, scene) {
  const { width, height, centerX, horizonY, planeHeight, maxSpread, startBand } = scene;

  ctx.clearRect(0, 0, width, height);

  const wash = ctx.createLinearGradient(0, 0, 0, height);
  wash.addColorStop(0, "rgba(255,255,255,0)");
  wash.addColorStop(0.22, "rgba(255,255,255,0.52)");
  wash.addColorStop(0.62, "rgba(247,249,251,0.2)");
  wash.addColorStop(1, "rgba(247,249,251,0)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);

  for (let row = 0; row < 7; row += 1) {
    const t = row / 6;
    const y = horizonY + planeHeight * Math.pow(t, 1.9);
    const inset = width * (0.16 - t * 0.11);
    ctx.beginPath();
    ctx.moveTo(inset, y);
    ctx.lineTo(width - inset, y);
    ctx.strokeStyle = `rgba(192, 203, 214, ${0.06 - t * 0.018})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  for (let col = -8; col <= 8; col += 1) {
    const normalized = col / 8;
    const targetX = centerX + normalized * (maxSpread / 2.15);
    const startX = centerX + normalized * startBand;
    const startY = horizonY + Math.abs(normalized) * 5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(targetX, height + 18);
    ctx.strokeStyle = "rgba(200, 210, 220, 0.07)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  const horizonGlow = ctx.createLinearGradient(0, horizonY - 32, 0, horizonY + 64);
  horizonGlow.addColorStop(0, "rgba(255,255,255,0)");
  horizonGlow.addColorStop(0.42, "rgba(255,255,255,0.75)");
  horizonGlow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = horizonGlow;
  ctx.fillRect(0, horizonY - 32, width, 96);
}

function drawParticle(ctx, particle, scene, time) {
  const wobble = Math.sin(time * 0.00042 * particle.wobbleSpeed + particle.wobblePhase) * 0.01;
  const lane = clamp(particle.lane + particle.drift * particle.depth + wobble, -1.15, 1.15);
  const { x, y } = projectPoint(lane, particle.depth, scene);
  const size = particle.baseSize * (0.6 + Math.pow(particle.depth, 1.15) * 2.2);
  const alpha = particle.color.alpha * (0.3 + Math.pow(particle.depth, 0.92) * 0.78);
  const fillStyle = `rgba(${particle.color.fill}, ${alpha})`;
  const glowStyle = `rgba(${particle.color.glow}, ${alpha * 0.42})`;
  const half = size * 0.5;

  ctx.fillStyle = fillStyle;

  if (size > 2.4) {
    ctx.shadowBlur = size * 2.4;
    ctx.shadowColor = glowStyle;
  } else {
    ctx.shadowBlur = 0;
  }

  if (particle.shape === "dot") {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.48, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (particle.shape === "square") {
    ctx.fillRect(x - half, y - half, size, size);
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-half, -half, size, size);
  ctx.restore();
}

export default function ParticleBg({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = canvas.parentElement ?? canvas;
    const gridCanvas = document.createElement("canvas");
    const gridCtx = gridCanvas.getContext("2d");
    if (!gridCtx) return undefined;

    let particles = [];
    let scene = buildScene(1, 1);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let lastFrameTime = 0;
    let isVisible = true;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width || window.innerWidth));
      height = Math.max(1, Math.floor(rect.height || window.innerHeight));
      dpr = clamp(window.devicePixelRatio || 1, 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gridCanvas.width = Math.floor(width * dpr);
      gridCanvas.height = Math.floor(height * dpr);
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      scene = buildScene(width, height);
      renderGrid(gridCtx, scene);
      particles = createParticles(width, height);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(gridCanvas, 0, 0, width, height);

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        if (!reduceMotion) {
          particle.depth += particle.speed * (0.5 + particle.depth * 5);
          if (particle.depth >= 1.04) {
            resetParticle(particle);
          }
        }

        drawParticle(ctx, particle, scene, time);
      }

      ctx.shadowBlur = 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(host);

    resize();
    draw(0);

    if (!reduceMotion) {
      const frameInterval = 1000 / TARGET_FPS;

      const tick = (time) => {
        rafId = requestAnimationFrame(tick);
        if (!isVisible) return;
        if (time - lastFrameTime < frameInterval) return;
        lastFrameTime = time;
        draw(time);
      };

      rafId = requestAnimationFrame(tick);
    }

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className={["particle-field", className].filter(Boolean).join(" ")} aria-hidden="true" />;
}
