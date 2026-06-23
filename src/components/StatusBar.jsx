import { useEffect, useState } from "react";

export default function StatusBar() {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");
  const [section, setSection] = useState("首页");

  useEffect(() => {
    const sectionMap = {
      problems: "服务",
      about: "关于",
      skills: "能力",
      experience: "经历",
      projects: "项目",
      contact: "联系",
    };
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.round((h.scrollTop / total) * 100) : 0);

      let current = "首页";
      Object.keys(sectionMap).forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) current = sectionMap[id];
        }
      });
      setSection(current);
    };
    const tick = () => setTime(new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }));
    onScroll(); tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setInterval(tick, 30000);
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(timer); };
  }, []);

  return (
    <div className="status-bar select-none pointer-events-none">
      <div className="status-bar__inner">
        <div className="status-bar__group">
          <span><span className="status-bar__dot" />在线可联系</span>
          <span>· 深圳</span>
          <span>· {time}</span>
        </div>
        <div className="status-bar__group">
          <span>当前 · {section}</span>
          <span>—</span>
          <span className="tabular-nums">{String(progress).padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
