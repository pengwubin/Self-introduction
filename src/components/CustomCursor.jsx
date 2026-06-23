import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0, rafId;
    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (!visible) setVisible(true);
    };
    const animate = () => {
      ringX += (dotX - ringX) * 0.15;
      ringY += (dotY - ringY) * 0.15;
      if (ringRef.current) ringRef.current.style.left = ringX + "px";
      if (ringRef.current) ringRef.current.style.top = ringY + "px";
      if (dotRef.current) dotRef.current.style.left = dotX + "px";
      if (dotRef.current) dotRef.current.style.top = dotY + "px";
      rafId = requestAnimationFrame(animate);
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    const bind = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.addEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseleave", leave);
      });
    };
    bind();
    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, [visible]);

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: hovering ? 4 : 6,
          height: hovering ? 4 : 6,
          background: "var(--color-accent)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          borderColor: hovering ? "var(--color-accent)" : "rgba(237,233,220,0.3)",
        }}
      />
    </div>
  );
}
