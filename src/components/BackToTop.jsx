import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="back-to-top"
      style={{
        opacity: show ? 1 : 0,
        visibility: show ? "visible" : "hidden",
        transform: show ? "translateY(0)" : "translateY(12px)",
      }}
      aria-label="Back to top"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 13V1M2 6l5-5 5 5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </button>
  );
}
