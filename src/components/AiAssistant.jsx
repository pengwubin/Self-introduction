import { useEffect, useMemo, useState } from "react";

const DIFY_CHAT_URL = "https://udify.app/chatbot/JOBAAZkyXD1idqEw";

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const warmUp = useMemo(
    () => () => {
      setShouldMount(true);
    },
    []
  );

  useEffect(() => {
    const addLink = (rel, href, crossOrigin) => {
      const existing = document.head.querySelector(`link[rel="${rel}"][href="${href}"]`);
      if (existing) return;
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    };

    addLink("preconnect", "https://udify.app", "anonymous");
    addLink("dns-prefetch", "https://udify.app");

    const idleWarm =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(() => setShouldMount(true), { timeout: 1800 })
        : window.setTimeout(() => setShouldMount(true), 1200);

    return () => {
      if ("cancelIdleCallback" in window && typeof idleWarm === "number") {
        window.cancelIdleCallback(idleWarm);
      } else {
        window.clearTimeout(idleWarm);
      }
    };
  }, []);

  return (
    <>
      <button
        onMouseEnter={warmUp}
        onFocus={warmUp}
        onTouchStart={warmUp}
        onClick={() => {
          warmUp();
          setOpen((value) => !value);
        }}
        className={`ai-assistant-trigger${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls="ai-assistant-modal"
        aria-label="Open AI assistant"
      >
        <span className="ai-chip">
          <span className="ai-chip__corner" />
          <span className="ai-chip__frame">
            <span className="ai-chip__badge">AI</span>
          </span>
          <span className="ai-chip__label">AI助手</span>
        </span>
      </button>

      {shouldMount && (
        <div
          className={`ai-assistant-modal${open ? " is-open" : " is-hidden"}`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        >
          <div
            id="ai-assistant-modal"
            className="ai-assistant-modal__dialog grain"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="ai-assistant-modal__close"
              aria-label="Close AI assistant"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!loaded && (
              <div className="ai-assistant-modal__loading">
                <div className="ai-assistant-modal__loading-mark">AI</div>
                <div className="ai-assistant-modal__loading-text">助手加载中</div>
              </div>
            )}

            <iframe
              src={DIFY_CHAT_URL}
              title="AI assistant"
              className={`ai-assistant-modal__frame${loaded ? " is-loaded" : ""}`}
              frameBorder="0"
              allow="microphone"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>
      )}
    </>
  );
}
