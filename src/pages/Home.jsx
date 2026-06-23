import { Outlet } from "react-router-dom";
import { contactInfo, experiences, problems, profile, projects } from "../data/profile";
import AiAssistant from "../components/AiAssistant";
import BackToTop from "../components/BackToTop";
import CustomCursor from "../components/CustomCursor";
import NavCard from "../components/NavCard";
import ParticleBg from "../components/ParticleBg";
import ScrollReveal from "../components/ScrollReveal";
import SkillDisplay from "../components/SkillDisplay";
import StatusBar from "../components/StatusBar";

export default function Home() {
  const year = new Date().getFullYear();
  const name = profile.name || "";
  const nameParts = [name.slice(0, 1), name.slice(1, 2), name.slice(2)];
  const aboutParagraphs = [
    <>
      我是一名在人力资源信息化领域深耕了 <strong className="intro-strong">6 年</strong> 的从业者。曾参与过
      <strong className="intro-strong">多个百万级项目</strong>，尤其对
      <strong className="intro-strong">大型集团和国企</strong>的复杂业务场景有丰富的落地经验。在项目管理方面，我擅长从
      <strong className="intro-strong">需求挖掘</strong>到
      <strong className="intro-strong">方案设计</strong>，再到
      <strong className="intro-strong">进度控制</strong>，能够独立覆盖项目启动、计划、执行、监控、收尾的全流程。
    </>,
    <>
      同时，我具备产品思维，曾从 <strong className="intro-strong">0 到 1</strong> 完成过覆盖组织、招聘、人事、考勤、薪酬、绩效、人才发展等模块的产品规划。我还有
      <strong className="intro-strong"> 1 年软件开发经验</strong>，具备
      <strong className="intro-strong"> 低代码开发能力</strong>，熟悉数据库、分布式技术，能熟练进行服务器部署与日志分析。
    </>,
    <>
      在 AI 应用上，我擅长用<strong className="intro-strong">智能体</strong>设计自动化工作流，常用
      <strong className="intro-strong"> Dify</strong>、
      <strong className="intro-strong"> 扣子</strong>、
      <strong className="intro-strong"> Claude Code</strong>等平台来提升效率。整体上，我沟通协调能力强，善于拆解复杂问题，自我驱动力和抗压能力也比较突出，能快速适应挑战。
    </>,
  ];

  return (
    <div className="relative">
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div className="bg-paper-noise" />
      <CustomCursor />

      <nav className="top-nav">
        <div className="container-page top-nav__inner">
          <a href="#top" className="top-nav__brand">
            {nameParts[0]}
            <em>{nameParts[1]}</em>
            {nameParts[2]}
            <span className="dot" />
          </a>
          <div className="top-nav__links">
            <a href="#problems">服务</a>
            <a href="#about">关于</a>
            <a href="#skills">能力</a>
            <a href="#experience">经历</a>
            <a href="#projects">项目</a>
            <a href="#contact">联系</a>
          </div>
        </div>
      </nav>

      <section
        id="top"
        className="page-section"
        style={{ position: "sticky", top: 0, zIndex: 0, paddingTop: "120px", paddingBottom: "60px" }}
      >
        <div className="bg-photo-hero">
          <ParticleBg className="bg-photo-hero__particles" />
          <div className="bg-photo-hero__glow bg-photo-hero__glow--left" />
          <div className="bg-photo-hero__glow bg-photo-hero__glow--right" />
          <div className="bg-photo-hero__overlay" />
          <div className="bg-photo-hero__noise" />
        </div>

        <div className="container-page relative z-10">
          <div className="flex flex-wrap justify-between gap-3 mb-10 reveal-fade" style={{ animationDelay: "0.1s" }}>
            <div className="hero-meta">
              <span style={{ color: "#070707" }}>{profile.title}</span>
              <span style={{ margin: "0 10px", color: "#070707" }}>·</span>
              <span style={{ color: "#070707" }}>{profile.subtitle}</span>
            </div>
            <div className="hero-meta">
              <span>作品集 / 2020 - {year}</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-8">
              <div className="reveal-up" style={{ animationDelay: "0.2s" }}>
                <h1 className="hero-display">
                  {nameParts[0]}
                  <span className="italic-glyph">{nameParts[1]}</span>
                  {nameParts[2]}
                </h1>
              </div>

              <div className="reveal-up mt-3" style={{ animationDelay: "0.32s" }}>
                <p
                  className="hero-kicker"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "20px",
                    fontStyle: "italic",
                    color: "rgba(255, 255, 255, 0.92)",
                    textShadow: "0 1px 8px rgba(18, 20, 26, 0.55)",
                    fontVariationSettings: '"opsz" 96, "SOFT" 80',
                  }}
                >
                  HR 信息化 · 项目管理 · 产品设计
                </p>
              </div>

              <div className="sr is-in mt-7" style={{ maxWidth: "560px" }}>
                <p className="aside-quote">
                  深耕人力资源信息化 7 年，从软件实施到 0 到 1 产品规划，从大型集团百万级项目到多系统集成，
                  将复杂 HR 业务翻译成可落地的数字化方案。
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8 reveal-up" style={{ animationDelay: "0.5s" }}>
                <a href="#contact" className="btn btn--primary">
                  联系合作 <span className="arr">→</span>
                </a>
                <a href="#projects" className="btn btn--ghost">
                  浏览项目 <span className="arr">→</span>
                </a>
              </div>

              <div className="grid grid-cols-4 gap-6 mt-10 reveal-up" style={{ animationDelay: "0.6s" }}>
                <div>
                  <div className="stat-value">
                    <em>7</em>
                    <span style={{ fontSize: "16px", color: "#ffffff", marginLeft: "3px" }}>年</span>
                  </div>
                  <div className="stat-label">HR 信息化</div>
                </div>
                <div>
                  <div className="stat-value">
                    <em>5</em>
                    <span style={{ fontSize: "16px", color: "#ffffff", marginLeft: "3px" }}>+</span>
                  </div>
                  <div className="stat-label">百万级项目</div>
                </div>
                <div>
                  <div className="stat-value">
                    <em>4</em>
                    <span style={{ fontSize: "16px", color: "#ffffff", marginLeft: "3px" }}>种</span>
                  </div>
                  <div className="stat-label">角色跨度</div>
                </div>
                <div>
                  <div className="stat-value">
                    <em>13</em>
                    <span style={{ fontSize: "16px", color: "#ffffff", marginLeft: "3px" }}>项</span>
                  </div>
                  <div className="stat-label">系统集成</div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 flex justify-center md:justify-end reveal-up" style={{ animationDelay: "0.4s" }}>
              <div className="photo-frame">
                <span className="photo-frame__corner photo-frame__corner--tl" />
                <span className="photo-frame__corner photo-frame__corner--tr" />
                <span className="photo-frame__corner photo-frame__corner--bl" />
                <span className="photo-frame__corner photo-frame__corner--br" />
                <img
                  src="/个人照片-透明版.png"
                  alt={profile.name}
                  className="photo-reveal"
                  style={{ width: "389px", aspectRatio: "3/4", objectFit: "cover" }}
                />
                <div className="photo-frame__caption">FIG. 01 · {profile.name} · {year}</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-10 hero-meta" style={{ opacity: 0.48 }}>
            <span>BG. Particle Field · Live Render</span>
          </div>
        </div>
      </section>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "var(--color-bg-primary)",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.25), 0 -20px 60px rgba(0, 0, 0, 0.15), 0 -1px 3px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          className="py-7 relative z-10"
          style={{
            borderTop: "1px solid var(--color-rule)",
            borderBottom: "1px solid var(--color-rule)",
            background: "rgba(253, 251, 246, 0.65)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="marquee">
            <div className="marquee__track">
              <span className="marquee__item">人力<em>资源</em></span>
              <span className="marquee__item">产品<em>设计</em></span>
              <span className="marquee__item">项目<em>管理</em></span>
              <span className="marquee__item">系统<em>集成</em></span>
              <span className="marquee__item">AI <em>工作流</em></span>
              <span className="marquee__item">人力<em>资源</em></span>
              <span className="marquee__item">产品<em>设计</em></span>
              <span className="marquee__item">项目<em>管理</em></span>
              <span className="marquee__item">系统<em>集成</em></span>
              <span className="marquee__item">AI <em>工作流</em></span>
            </div>
          </div>
        </div>

        <section id="problems" className="page-section">
          <div className="container-page relative z-10">
            <span className="giant-num giant-num--tr">01</span>
            <ScrollReveal>
              <div className="section-header">
                <div>
                  <div className="section-label">服务 <span className="section-num">/ 01</span></div>
                  <h2 className="section-title">
                    我能为您<em>解决</em>什么
                  </h2>
                </div>
                <div className="section-subtitle hidden md:block">
                  7 年 HR 信息化深耕，从实施到产品，理解企业人力资源管理中的典型难题。
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--color-border)" }}>
              {problems.map((problem, index) => (
                <ScrollReveal key={index} delay={index * 60}>
                  <div className="problem-card">
                    <div className="problem-card__num">问题 / {String(index + 1).padStart(2, "0")}</div>
                    <h3 className="problem-card__title">{problem.title}</h3>
                    <p className="problem-card__desc">{problem.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="page-section">
          <div className="container-page relative z-10">
            <span className="giant-num giant-num--tl">02</span>
            <ScrollReveal>
              <div className="section-header">
                <div>
                  <div className="section-label">简介 <span className="section-num">/ 02</span></div>
                  <h2 className="section-title">
                    不只是简历上
                    <br />
                    那几行<em>文字</em>
                  </h2>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-12 gap-8 mt-2">
              <ScrollReveal className="col-span-12 md:col-span-7">
                <div className="intro-rich mb-6">
                  {aboutParagraphs.map((paragraph, index) => (
                    <p key={index} className="text-text-secondary leading-relaxed" style={{ fontSize: "14.5px", lineHeight: 1.82 }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="rule mb-6" />
                <div className="flex flex-wrap gap-2">
                  <span className="tag tag--accent">0 到 1 产品规划</span>
                  <span className="tag tag--accent">百万级集团项目</span>
                  <span className="tag tag--accent">多系统集成</span>
                  <span className="tag tag--accent">BPM 流程设计</span>
                  <span className="tag tag--accent">AI 工作流</span>
                  <span className="tag tag--accent">低代码开发</span>
                </div>
              </ScrollReveal>

              <ScrollReveal className="col-span-12 md:col-span-4 md:col-start-9" delay={80}>
                <div className="card card--editorial p-6 grain">
                  <div className="eyebrow mb-5">核心数据</div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-baseline" style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "10px" }}>
                      <span className="num-marker uppercase">上线项目</span>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontStyle: "italic", color: "var(--color-accent)" }}>10+</span>
                    </li>
                    <li className="flex justify-between items-baseline" style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "10px" }}>
                      <span className="num-marker uppercase">原型设计</span>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontStyle: "italic", color: "var(--color-accent)" }}>300+</span>
                    </li>
                    <li className="flex justify-between items-baseline" style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "10px" }}>
                      <span className="num-marker uppercase">方案设计</span>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontStyle: "italic", color: "var(--color-accent)" }}>100+</span>
                    </li>
                    <li className="flex justify-between items-baseline">
                      <span className="num-marker uppercase">培训场次</span>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "26px", fontStyle: "italic", color: "var(--color-accent)" }}>50+</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="skills" className="page-section">
          <div className="container-page relative z-10">
            <span className="giant-num giant-num--tr">03</span>
            <ScrollReveal>
              <div className="section-header">
                <div>
                  <div className="section-label">能力 <span className="section-num">/ 03</span></div>
                  <h2 className="section-title">
                    五大维度 <em>·</em> 完整能力栈
                  </h2>
                </div>
                <div className="section-subtitle hidden md:block">
                  从 HR 业务深度到 AI 应用，覆盖企业数字化转型所需的完整能力结构。
                </div>
              </div>
            </ScrollReveal>
            <SkillDisplay />
          </div>
        </section>

        <section id="experience" className="page-section relative">
          <div className="bg-photo-soft">
            <img src="/guangzhou.jpg" alt="" className="bg-photo-soft__img" />
            <div className="bg-photo-soft__overlay" />
          </div>
          <div className="container-page relative z-10">
            <span className="giant-num giant-num--tl">04</span>
            <ScrollReveal>
              <div className="section-header">
                <div>
                  <div className="section-label">经历 <span className="section-num">/ 04</span></div>
                  <h2 className="section-title">
                    四种角色 <em>·</em> 一条成长路径
                  </h2>
                </div>
                <div className="section-subtitle hidden md:block">
                  从技术执行到产品设计，每一步都踩在 HR 数字化的关键节点上。
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-2">
              {experiences.map((experience, index) => (
                <ScrollReveal key={experience.id} delay={index * 60}>
                  <NavCard
                    title={experience.company}
                    description={experience.summary}
                    to={`/experience/${experience.id}`}
                    index={index + 1}
                    role={experience.role}
                    period={experience.period}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="page-section">
          <div className="container-page relative z-10">
            <span className="giant-num giant-num--tr">05</span>
            <ScrollReveal>
              <div className="section-header">
                <div>
                  <div className="section-label">项目 <span className="section-num">/ 05</span></div>
                  <h2 className="section-title">
                    代表性<em>项目</em>作品
                  </h2>
                </div>
                <div className="section-subtitle hidden md:block">
                  覆盖大型集团、零售连锁、制造业、教育集团等真实落地的 HR 数字化案例。
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-2">
              {projects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 50}>
                  <NavCard
                    title={project.name}
                    description={`${project.background.slice(0, 100)}…`}
                    to={`/project/${project.id}`}
                    index={index + 1}
                    role={project.role}
                    period={project.period}
                    company={project.company}
                    tags={project.tags}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="page-section relative" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <div className="bg-photo-soft">
            <img src="/guangzhou.jpg" alt="" className="bg-photo-soft__img" />
            <div className="bg-photo-soft__overlay" />
          </div>
          <div className="container-page relative z-10">
            <span className="giant-num giant-num--bl">06</span>
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto">
                <div className="section-label justify-center inline-flex">联系 <span className="section-num">/ 06</span></div>
                <h2 className="section-title text-center" style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}>
                  期待与您<em>交流</em>
                </h2>

                <div
                  className="inline-flex items-center gap-2.5 mt-6 mb-8 px-4 py-2"
                  style={{
                    border: "1px solid var(--color-accent-line)",
                    background: "var(--color-accent-soft)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "var(--color-accent)",
                      boxShadow: "0 0 8px var(--color-accent)",
                      animation: "pulse-glow 2s ease infinite",
                    }}
                  />
                  {contactInfo.availability}
                </div>

                <p className="text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto" style={{ fontSize: "15px" }}>
                  {contactInfo.cta}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px max-w-xl mx-auto" style={{ background: "var(--color-border)" }}>
                  <a href={`mailto:${profile.email}`} className="block p-5 group transition-all card">
                    <div className="num-marker uppercase mb-1">邮箱</div>
                    <div
                      className="link-line text-text-primary group-hover:text-accent"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontStyle: "italic" }}
                    >
                      {profile.email}
                    </div>
                  </a>
                  <div className="block p-5 card">
                    <div className="num-marker uppercase mb-1">电话</div>
                    <div className="text-text-primary" style={{ fontFamily: "var(--font-serif)", fontSize: "17px", fontStyle: "italic" }}>
                      131·1274·0472
                    </div>
                  </div>
                </div>

                <div className="num-marker mt-6 uppercase">
                  <span>{profile.location}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <footer className="site-footer relative overflow-hidden">
          <div className="container-page relative z-10">
            <div className="reveal-up">
              <h2 className="footer-display">
                {nameParts[0]}
                <em>{nameParts[1]}</em>
                {nameParts[2]}
              </h2>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-12 pt-6" style={{ borderTop: "1px solid var(--color-rule)" }}>
              <div className="col-span-12 md:col-span-4 hero-meta">
                <span>© {year} · 保留所有权利</span>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-center hero-meta">
                <span>{profile.title} · {profile.subtitle}</span>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right hero-meta">
                <span>v3.0 · 风景版</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <AiAssistant />
      <BackToTop />
      <StatusBar />
      <Outlet />
    </div>
  );
}
