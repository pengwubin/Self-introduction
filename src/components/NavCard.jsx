import { Link } from "react-router-dom";

export default function NavCard({ title, subtitle, description, to, tags = [], index, role, period, company }) {
  return (
    <Link to={to} className="project-card group block">
      <div>
        <div className="project-card__num">— {String(index).padStart(2, "0")}</div>
        <h3 className="project-card__title">{title}</h3>
        <div className="project-card__meta">
          {role && <span>{role}</span>}
          {company && <span>{company}</span>}
          {period && <span>{period}</span>}
          {!role && subtitle && <span>{subtitle}</span>}
        </div>
        <p className="project-card__desc">{description}</p>
        {tags.length > 0 && (
          <div className="project-card__tags">
            {tags.map((t) => (<span key={t} className="tag">{t}</span>))}
          </div>
        )}
      </div>
      <div className="project-card__arrow">
        <span>查看</span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2"/></svg>
      </div>
    </Link>
  );
}
