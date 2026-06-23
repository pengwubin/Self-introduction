import { useNavigate, useParams } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";
import { projects } from "../data/profile";
import { projectImages } from "../data/projectImages";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.id === id);
  const currentIndex = projects.findIndex((item) => item.id === id);
  const imageItems = projectImages[id] || [];

  if (!project) {
    return (
      <div className="scrim" onClick={() => navigate("/")}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="p-10 max-w-md mx-auto text-center"
          style={{
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border-strong)",
            animation: "editorial-up 0.25s cubic-bezier(0.2,0.8,0.2,1) both",
          }}
        >
          <p className="text-text-secondary mb-4">未找到该项目</p>
          <button onClick={() => navigate("/")} className="btn btn--ghost">
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="scrim" onClick={() => navigate("/")}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-4xl w-[94%] max-h-[90vh] overflow-y-auto relative grain"
        style={{
          background: "var(--color-bg-elevated)",
          border: "1px solid var(--color-border-strong)",
          animation: "editorial-up 0.35s cubic-bezier(0.2,0.8,0.2,1) both",
          boxShadow: "0 30px 80px rgba(26, 24, 20, 0.18)",
        }}
      >
        <span
          className="absolute top-3 left-3"
          style={{ width: 12, height: 12, borderTop: "1px solid var(--color-accent)", borderLeft: "1px solid var(--color-accent)" }}
        />
        <span
          className="absolute top-3 right-3"
          style={{ width: 12, height: 12, borderTop: "1px solid var(--color-accent)", borderRight: "1px solid var(--color-accent)" }}
        />
        <span
          className="absolute bottom-3 left-3"
          style={{ width: 12, height: 12, borderBottom: "1px solid var(--color-accent)", borderLeft: "1px solid var(--color-accent)" }}
        />
        <span
          className="absolute bottom-3 right-3"
          style={{ width: 12, height: 12, borderBottom: "1px solid var(--color-accent)", borderRight: "1px solid var(--color-accent)" }}
        />

        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center z-20"
          style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border-strong)", color: "var(--color-text-secondary)" }}
          aria-label="关闭项目详情"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-10">
          <div className="flex items-baseline gap-3 mb-3 flex-wrap">
            <span className="num-marker">项目 / {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <span className="text-text-tertiary">·</span>
            <span className="tag tag--accent">{project.role}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "42px",
              fontWeight: 350,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              marginBottom: "10px",
              fontVariationSettings: '"opsz" 144, "SOFT" 40',
            }}
          >
            {project.name}
          </h2>
          <p className="num-marker mb-8">
            {project.company} · {project.period}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {imageItems.length > 0
              ? imageItems.map((src, index) => (
                  <figure
                    key={`${project.id}-${index}`}
                    className="overflow-hidden"
                    style={{
                      aspectRatio: "16 / 10",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg-surface)",
                    }}
                  >
                    <img
                      src={src}
                      alt={`${project.name} 图 ${index + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </figure>
                ))
              : Array.from({ length: project.images }, (_, index) => (
                  <PlaceholderImage key={index} index={index + 1} caption={`图 ${index + 1}`} className="aspect-[16/10]" />
                ))}
          </div>
          <p className="num-marker mb-8 text-center" style={{ opacity: 0.55 }}>
            {imageItems.length > 0 ? "· 项目现场 / 系统界面实拍 ·" : "· 项目原型 / 系统截图占位 ·"}
          </p>

          <div className="space-y-8">
            <div>
              <div className="eyebrow mb-3">项目背景</div>
              <p className="text-text-secondary leading-relaxed" style={{ fontSize: "14.5px", lineHeight: 1.75 }}>
                {project.background}
              </p>
            </div>

            <div>
              <div className="eyebrow mb-3">职责描述</div>
              <p className="text-text-secondary leading-relaxed" style={{ fontSize: "14.5px", lineHeight: 1.75 }}>
                {project.responsibility}
              </p>
            </div>

            <div>
              <div className="eyebrow mb-3">工作成果</div>
              <ul className="space-y-2">
                {project.achievements.map((achievement, index) => (
                  <li key={index} className="flex gap-4 text-text-secondary leading-relaxed">
                    <span className="num-marker shrink-0 mt-1" style={{ minWidth: "28px", color: "var(--color-accent)" }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "14px" }}>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-5 flex justify-center gap-1.5" style={{ borderTop: "1px solid var(--color-rule)" }}>
            {projects.map((item, index) => (
              <button
                key={item.id}
                onClick={() => navigate(`/project/${item.id}`)}
                className="transition-all duration-300"
                style={{
                  width: index === currentIndex ? "28px" : "10px",
                  height: "2px",
                  background: index === currentIndex ? "var(--color-accent)" : "var(--color-border-strong)",
                }}
                title={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
