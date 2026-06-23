import { useNavigate, useParams } from "react-router-dom";
import { experiences, projects } from "../data/profile";

function normalizeText(text = "") {
  return text.replace(/[\s，,。；;、：:（）()]/g, "").trim();
}

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exp = experiences.find((item) => item.id === id);
  const currentIndex = experiences.findIndex((item) => item.id === id);

  if (!exp) {
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
          <p className="text-text-secondary mb-4">未找到该工作经历</p>
          <button onClick={() => navigate("/")} className="btn btn--ghost">
            返回
          </button>
        </div>
      </div>
    );
  }

  const companyKey = normalizeText(exp.company);
  const detailItems = exp.details.filter(
    (detail) => normalizeText(detail) !== normalizeText(exp.summary)
  );
  const relatedProjects = projects.filter((project) => {
    const projectCompany = normalizeText(project.company);
    return (
      projectCompany.includes(companyKey.slice(0, 2)) ||
      companyKey.includes(projectCompany)
    );
  });

  return (
    <div className="scrim" onClick={() => navigate("/")}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-3xl w-[92%] max-h-[88vh] overflow-y-auto relative grain"
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
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center z-20 transition-all"
          style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border-strong)",
            color: "var(--color-text-secondary)",
          }}
          aria-label="关闭经历详情"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-10">
          <div className="flex items-baseline gap-3 mb-5 flex-wrap">
            <span className="num-marker">
              经历 / {String(currentIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
            </span>
            <span className="text-text-tertiary">·</span>
            <span className="tag tag--accent">{exp.role}</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "36px",
              fontWeight: 350,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              marginBottom: "10px",
              fontVariationSettings: '"opsz" 144, "SOFT" 40',
            }}
          >
            {exp.company}
          </h2>
          <p className="num-marker mb-7">{exp.period}</p>

          <div
            className="mb-8 p-5 grain"
            style={{
              background: "rgba(250, 251, 252, 0.82)",
              border: "1px solid var(--color-border)",
              borderLeft: "2px solid var(--color-accent)",
            }}
          >
            <div className="eyebrow mb-3">职责概述</div>
            <p className="text-text-secondary leading-relaxed" style={{ fontSize: "15px", lineHeight: 1.8 }}>
              {exp.summary}
            </p>
          </div>

          {detailItems.length > 0 && (
            <>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="eyebrow">核心工作</div>
                <div className="num-marker">{String(detailItems.length).padStart(2, "0")} 项</div>
              </div>
              <ul className="space-y-3 mb-10">
                {detailItems.map((detail, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-text-secondary leading-relaxed px-4 py-3"
                    style={{
                      background: "rgba(250, 251, 252, 0.7)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <span
                      className="num-marker shrink-0 mt-1"
                      style={{ minWidth: "28px", color: "var(--color-accent)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "14px", lineHeight: 1.75 }}>{detail}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {relatedProjects.length > 0 && (
            <>
              <div className="rule mb-6" />
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="eyebrow">关联项目</div>
                <div className="num-marker">{String(relatedProjects.length).padStart(2, "0")} 项</div>
              </div>
              <div className="space-y-2">
                {relatedProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => navigate("/project/" + project.id)}
                    className="w-full text-left px-4 py-3 flex justify-between items-center group transition-all"
                    style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
                  >
                    <span
                      style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontStyle: "italic" }}
                      className="group-hover:text-accent transition-colors"
                    >
                      {project.name}
                    </span>
                    <span className="num-marker">→</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="mt-10 pt-5 flex justify-center gap-1.5" style={{ borderTop: "1px solid var(--color-rule)" }}>
            {experiences.map((item, index) => (
              <button
                key={item.id}
                onClick={() => navigate("/experience/" + item.id)}
                className="transition-all duration-300"
                style={{
                  width: index === currentIndex ? "28px" : "10px",
                  height: "2px",
                  background: index === currentIndex ? "var(--color-accent)" : "var(--color-border-strong)",
                }}
                title={item.company}
                aria-label={`查看经历 ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
