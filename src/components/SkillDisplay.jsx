import { skills } from "../data/profile";

export default function SkillDisplay() {
  return (
    <div className="w-full">
      {skills.map((skill, index) => (
        <div key={skill.dimension} className="skill-row group">
          <div className="skill-row__num">/ {String(index + 1).padStart(2, "0")}</div>
          <div>
            <h3 className="skill-row__title">{skill.dimension}</h3>
            <p className="skill-row__desc">{skill.description}</p>
          </div>
          <div className="skill-row__items">
            {skill.items.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
