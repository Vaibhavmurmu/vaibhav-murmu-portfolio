"use client"

import { useEffect, useState } from "react"

const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "story", label: "Story" },
  { id: "family", label: "Family" },
  { id: "contact", label: "Contact" },
]

const stats = [
  { value: "5+", label: "Product lines" },
  { value: "2021", label: "Founded" },
  { value: "CFO", label: "Role" },
]

const capabilities = [
  { name: "Business strategy", level: 96 },
  { name: "Financial planning", level: 94 },
  { name: "Operational systems", level: 92 },
  { name: "Market analysis", level: 90 },
  { name: "Growth execution", level: 89 },
  { name: "Leadership", level: 93 },
]

const projects = [
  {
    title: "RunAsh AI",
    category: "AI Strategy",
    description: "A forward-looking AI lab focused on strategic product execution, immersive experiences, and measurable business impact.",
    tags: ["AI", "Product", "Strategy"],
  },
  {
    title: "RunAsh Live",
    category: "Commerce",
    description: "Live commerce systems built around conversion, retention, and operational discipline in fast-moving product environments.",
    tags: ["Live Commerce", "Revenue", "Growth"],
  },
  {
    title: "RunAsh Commerce",
    category: "Business Model",
    description: "A commercial model designed around sustainable offers, strong unit economics, and durable market fit.",
    tags: ["Marketplace", "Economics", "Operations"],
  },
  {
    title: "RunAshChat",
    category: "AI Experience",
    description: "Human-centered AI workflows for customer support and conversion journeys that reduce friction while increasing clarity.",
    tags: ["CX", "Automation", "AI"],
  },
]

const storySteps = [
  {
    title: "Roots in Bokaro",
    text: "A strong sense of responsibility and discipline was shaped in the years before business ever became a formal ambition.",
  },
  {
    title: "Learning through execution",
    text: "Every experience sharpened the mindset to build systems, create clarity, and guide growth with practical decision-making.",
  },
  {
    title: "Building with structure",
    text: "The dream became a business model — one defined by strategy, sustainability, and the ability to scale with intent.",
  },
  {
    title: "RunAsh AI today",
    text: "Vaibhav now focuses on strategic finance, operational systems, and business architecture across the product portfolio.",
  },
]

const family = [
  {
    name: "Kandan Murmu",
    role: "Great-great-grandfather",
    generation: "Gen 1",
    color: "#94a3b8",
    emoji: "👴",
  },
  {
    name: "Gopi Murmu",
    role: "Great-grandfather",
    generation: "Gen 2",
    color: "#7dd3fc",
    emoji: "👴",
  },
  {
    name: "Rameshwaram Murmu",
    role: "Grandfather",
    generation: "Gen 3",
    color: "#34d399",
    emoji: "👴",
  },
  {
    name: "Sanu Murmu",
    role: "Father · Farmer & businessman",
    generation: "Gen 4",
    color: "#fbbf24",
    emoji: "👨‍🌾",
  },
  {
    name: "Biraji D Murmu",
    role: "Mother",
    generation: "Gen 4",
    color: "#c084fc",
    emoji: "👩‍💼",
  },
  {
    name: "Ram Murmu",
    role: "Founder & CEO, RunAsh AI",
    generation: "Gen 5",
    color: "#f97316",
    emoji: "🧑‍💻",
  },
  {
    name: "Vaibhav Murmu",
    role: "Founder & CFO, RunAsh AI",
    generation: "Gen 5",
    color: "#facc15",
    emoji: "📊",
  },
  {
    name: "Puja K Murmu",
    role: "Marketing leader",
    generation: "Gen 5",
    color: "#f472b6",
    emoji: "📢",
  },
  {
    name: "Nirali Murmu",
    role: "CS & AI systems",
    generation: "Gen 5",
    color: "#34d399",
    emoji: "🔬",
  },
]

const blogPosts = [
  {
    category: "Finance",
    title: "Financial discipline in AI-led companies",
    blurb: "Why founders need a sharper operating lens before chasing scale.",
  },
  {
    category: "Operations",
    title: "Systems that compound instead of collapse",
    blurb: "How a business turns complexity into a repeatable operating engine.",
  },
  {
    category: "Strategy",
    title: "The difference between fast growth and durable growth",
    blurb: "A founder’s framework for building value that lasts beyond the hype cycle.",
  },
]

export default function Home() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
  }, [dark])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      <style>{`
        :root {
          --bg: #0d0d0c;
          --bg-elev: #151412;
          --bg-soft: #1b1917;
          --panel: rgba(255,255,255,0.03);
          --panel-strong: rgba(255,255,255,0.05);
          --line: rgba(255,255,255,0.08);
          --line-strong: rgba(255,255,255,0.14);
          --text: #f6f1ea;
          --text-soft: rgba(246,241,234,0.74);
          --text-muted: rgba(246,241,234,0.52);
          --gold: #d9b16a;
          --gold-soft: rgba(217,177,106,0.2);
          --cream: #f2dec0;
          --shadow: rgba(0,0,0,0.22);
          --grad: linear-gradient(135deg, #d9b16a 0%, #f1d7a0 100%);
        }

        html[data-theme="light"] {
          --bg: #f4efe9;
          --bg-elev: #f8f5f2;
          --bg-soft: #f1ece7;
          --panel: rgba(15,15,15,0.02);
          --panel-strong: rgba(15,15,15,0.04);
          --line: rgba(15,15,15,0.08);
          --line-strong: rgba(15,15,15,0.12);
          --text: #171512;
          --text-soft: rgba(23,21,18,0.74);
          --text-muted: rgba(23,21,18,0.52);
          --gold: #9e6a1d;
          --gold-soft: rgba(158,106,29,0.12);
          --cream: #d7a449;
          --shadow: rgba(0,0,0,0.08);
          --grad: linear-gradient(135deg, #c28a39 0%, #e9c578 100%);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background:
            radial-gradient(circle at top, rgba(217,177,106,0.12), transparent 28%),
            var(--bg);
          color: var(--text);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition: background 0.25s ease, color 0.25s ease;
        }
        a { color: inherit; text-decoration: none; }
        button, input, textarea { font: inherit; }

        .page-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 48px;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: blur(16px);
          background: rgba(13, 13, 12, 0.65);
          border-bottom: 1px solid var(--line);
        }

        html[data-theme="light"] .topbar {
          background: rgba(244, 239, 233, 0.75);
        }

        .topbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 700;
          color: var(--text);
        }

        .brand-mark {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--grad);
          color: #171512;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 800;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .nav-link {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-soft);
          border-radius: 999px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 12px;
          transition: 0.2s ease;
        }

        .nav-link:hover {
          border-color: var(--line-strong);
          background: var(--panel);
          color: var(--text);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .theme-toggle,
        .primary-btn,
        .secondary-btn,
        .chip {
          border-radius: 999px;
          border: 1px solid var(--line-strong);
          cursor: pointer;
          transition: 0.2s ease;
        }

        .theme-toggle {
          background: var(--panel);
          color: var(--text);
          padding: 8px 12px;
          font-size: 12px;
        }

        .primary-btn {
          background: var(--grad);
          border-color: transparent;
          color: #171512;
          font-weight: 700;
          padding: 12px 18px;
          box-shadow: 0 14px 28px rgba(217,177,106,0.2);
        }

        .secondary-btn {
          background: transparent;
          color: var(--text);
          padding: 12px 18px;
        }

        .primary-btn:hover, .secondary-btn:hover, .theme-toggle:hover {
          transform: translateY(-1px);
        }

        .hero {
          padding: 84px 0 56px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 28px;
          align-items: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          border: 1px solid rgba(217,177,106,0.28);
          background: var(--gold-soft);
          color: var(--gold);
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 18px;
        }

        h1 {
          margin: 0;
          font-size: clamp(3.4rem, 6vw, 6rem);
          line-height: 0.93;
          letter-spacing: -0.07em;
          font-weight: 700;
        }

        .accent {
          color: var(--gold);
        }

        .lead {
          margin-top: 18px;
          max-width: 640px;
          color: var(--text-soft);
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 36px;
        }

        .stat-card {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 18px 16px;
          box-shadow: 0 12px 26px var(--shadow);
        }

        .stat-value {
          font-size: clamp(1.6rem, 2vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.06em;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .hero-panel {
          position: relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border: 1px solid var(--line);
          border-radius: 28px;
          padding: 24px;
          overflow: hidden;
          box-shadow: 0 24px 40px var(--shadow);
        }

        .hero-panel::before {
          content: "";
          position: absolute;
          inset: -20% 10% auto auto;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(217,177,106,0.18), transparent 60%);
        }

        .mini-panel {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 18px;
          margin-bottom: 16px;
        }

        .mini-badge {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 14px;
          color: var(--gold);
          font-weight: 700;
        }

        .person-card {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--grad);
          display: grid;
          place-items: center;
          color: #171512;
          font-size: 26px;
          font-weight: 700;
        }

        .name {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0;
        }

        .role {
          margin: 4px 0 0;
          color: var(--text-soft);
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .panel-metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .metric {
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.02);
          border-radius: 14px;
          padding: 12px;
        }

        .metric strong {
          display: block;
          font-size: 1.1rem;
        }

        .metric span {
          display: block;
          margin-top: 4px;
          color: var(--text-muted);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        section {
          padding: 48px 0;
        }

        .section-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 24px;
        }

        h2 {
          margin: 0;
          font-size: clamp(2.1rem, 4vw, 3.1rem);
          letter-spacing: -0.06em;
          line-height: 1;
        }

        .section-note {
          color: var(--text-muted);
          font-size: 0.84rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .about-grid,
        .project-grid,
        .contact-grid,
        .family-grid,
        .blog-grid {
          display: grid;
          gap: 18px;
        }

        .about-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .card {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 12px 26px var(--shadow);
        }

        .icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: var(--gold-soft);
          color: var(--gold);
          font-size: 18px;
          margin-bottom: 16px;
        }

        .card h3 {
          margin: 0 0 8px;
          font-size: 1.12rem;
        }

        .card p {
          margin: 0;
          color: var(--text-soft);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .timeline {
          display: grid;
          gap: 16px;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 16px;
          align-items: start;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: var(--grad);
          box-shadow: 0 0 0 7px var(--gold-soft);
          margin-top: 4px;
        }

        .timeline-body {
          padding-bottom: 10px;
          border-bottom: 1px solid var(--line);
        }

        .timeline-body strong {
          display: block;
          font-size: 1.02rem;
          margin-bottom: 4px;
        }

        .timeline-body span {
          color: var(--gold);
          font-size: 0.82rem;
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .timeline-body p {
          margin: 0;
          color: var(--text-soft);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .project-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .project-card {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 12px 26px var(--shadow);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .project-type {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .project-card h3 {
          margin: 0;
          font-size: 1.22rem;
        }

        .project-card p {
          margin: 0;
          color: var(--text-soft);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          display: inline-block;
          padding: 7px 10px;
          background: rgba(255,255,255,0.02);
          border-color: var(--line);
          color: var(--text-soft);
          font-size: 11px;
        }

        .project-link {
          margin-top: auto;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
        }

        .skill-shell {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 12px 26px var(--shadow);
        }

        .skill-list {
          display: grid;
          gap: 16px;
        }

        .skill-row {
          display: grid;
          grid-template-columns: 180px 1fr 42px;
          gap: 14px;
          align-items: center;
        }

        .skill-name {
          font-size: 0.9rem;
          color: var(--text-soft);
        }

        .skill-bar {
          height: 8px;
          background: rgba(255,255,255,0.04);
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid var(--line);
        }

        .skill-fill {
          height: 100%;
          border-radius: 999px;
          background: var(--grad);
        }

        .skill-number {
          text-align: right;
          color: var(--gold);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .story-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .story-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 20px;
        }

        .story-index {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--gold-soft);
          color: var(--gold);
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .story-card h3 {
          margin: 0 0 8px;
          font-size: 1.08rem;
        }

        .story-card p {
          margin: 0;
          color: var(--text-soft);
          line-height: 1.7;
        }

        .family-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .family-card {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .family-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--line);
        }

        .family-card h4 {
          margin: 0 0 4px;
          font-size: 0.92rem;
        }

        .family-card span {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 3px;
        }

        .family-card p {
          margin: 0;
          color: var(--text-soft);
          font-size: 0.78rem;
          line-height: 1.6;
        }

        .blog-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .blog-card {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 12px 26px var(--shadow);
        }

        .blog-visual {
          height: 140px;
          background: linear-gradient(135deg, rgba(217,177,106,0.16), rgba(255,255,255,0.02));
          border-bottom: 1px solid var(--line);
          display: grid;
          place-items: center;
          font-size: 2rem;
        }

        .blog-body {
          padding: 18px;
        }

        .blog-category {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .blog-body h3 {
          margin: 0 0 8px;
          font-size: 1.04rem;
        }

        .blog-body p {
          margin: 0;
          color: var(--text-soft);
          line-height: 1.7;
          font-size: 0.92rem;
        }

        .contact-grid {
          grid-template-columns: 0.9fr 1.1fr;
          gap: 20px;
          align-items: start;
        }

        .contact-list {
          display: grid;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .contact-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--gold-soft);
          color: var(--gold);
          display: grid;
          place-items: center;
        }

        .contact-meta {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .contact-value {
          color: var(--text-soft);
          font-size: 0.95rem;
        }

        .form {
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 22px;
          display: grid;
          gap: 12px;
          box-shadow: 0 12px 26px var(--shadow);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        input, textarea {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--line);
          border-radius: 12px;
          color: var(--text);
          padding: 12px 14px;
          outline: none;
        }

        input:focus, textarea:focus {
          border-color: rgba(217,177,106,0.5);
          box-shadow: 0 0 0 3px rgba(217,177,106,0.12);
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        footer {
          padding: 24px 0 16px;
          border-top: 1px solid var(--line);
          color: var(--text-muted);
          font-size: 0.82rem;
          line-height: 1.8;
          text-align: center;
        }

        @media (max-width: 900px) {
          .hero-grid,
          .contact-grid,
          .about-grid,
          .project-grid,
          .story-grid,
          .blog-grid,
          .family-grid {
            grid-template-columns: 1fr;
          }

          .skill-row {
            grid-template-columns: 1fr;
          }

          .nav {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .page-shell {
            padding: 0 16px 36px;
          }

          .topbar-inner {
            padding: 12px 16px;
            flex-wrap: wrap;
          }

          .brand {
            letter-spacing: 0.1em;
          }

          .nav {
            width: 100%;
            justify-content: flex-start;
          }

          .stats-row,
          .form-row,
          .panel-metrics {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand" onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}>
            <span className="brand-mark">V</span>
            Vaibhav Murmu
          </div>

          <div className="nav">
            {navItems.map((item) => (
              <button key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={() => setDark((value) => !value)}>
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </div>

      <main className="page-shell">
        <section className="hero" id="hero">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Founder • CFO • Operator</div>
              <h1>
                Vaibhav <span className="accent">Murmu</span>
              </h1>
              <p className="lead">
                Strategist, operator, and business builder focused on turning AI ambition into real economic value —
                combining product vision, capital discipline, and operational clarity.
              </p>

              <div className="hero-actions">
                <button className="primary-btn" onClick={() => scrollTo("contact")}>Let&apos;s connect</button>
                <button className="secondary-btn" onClick={() => scrollTo("projects")}>View projects</button>
              </div>

              <div className="stats-row">
                {stats.map((item) => (
                  <div key={item.label} className="stat-card">
                    <div className="stat-value">{item.value}</div>
                    <div className="stat-label">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-panel">
              <div className="mini-panel">
                <div className="mini-badge">RunAsh AI</div>
                <div className="person-card">
                  <div className="avatar">V</div>
                  <div>
                    <p className="name">Vaibhav Murmu</p>
                    <p className="role">Founder & CFO</p>
                  </div>
                </div>

                <div className="panel-metrics">
                  <div className="metric">
                    <strong>5+</strong>
                    <span>Product lines</span>
                  </div>
                  <div className="metric">
                    <strong>2021</strong>
                    <span>Founded</span>
                  </div>
                  <div className="metric">
                    <strong>AI</strong>
                    <span>Focus</span>
                  </div>
                  <div className="metric">
                    <strong>Ops</strong>
                    <span>Lens</span>
                  </div>
                </div>
              </div>

              <div className="mini-panel">
                <div className="mini-badge">Operating focus</div>
                <div className="tag-row" style={{ marginTop: 8 }}>
                  <span className="chip">Strategic Finance</span>
                  <span className="chip">Growth</span>
                  <span className="chip">Operating Systems</span>
                  <span className="chip">Capital Planning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="section-head">
            <h2>Builder with a business lens</h2>
            <div className="section-note">About</div>
          </div>

          <div className="about-grid">
            <div className="card">
              <div className="icon-box">📈</div>
              <h3>Finance strategy</h3>
              <p>Designing the operating framework behind sustainable product growth, forecasting, and strategic capital decisions.</p>
            </div>

            <div className="card">
              <div className="icon-box">🚀</div>
              <h3>Product leadership</h3>
              <p>Balancing commercial ambition with disciplined execution, especially in AI products and live commerce environments.</p>
            </div>

            <div className="card">
              <div className="icon-box">📍</div>
              <h3>Grounded roots</h3>
              <p>From Bokaro, Jharkhand, to building actual systems for growth — shaped by resilience, clarity, and practical thinking.</p>
            </div>
          </div>

          <div className="timeline" style={{ marginTop: 26 }}>
            {[
              { title: "CFO & Co-founder", company: "RunAsh AI", period: "Apr 2021 — Present", description: "Leading financial strategy, planning cadence, business operations, and strategic execution across product and growth priorities." },
              { title: "Business & Strategy", company: "RunAsh AI Labs", period: "2020 — Present", description: "Working at the interface of experimentation, product narratives, and operating model decisions that support long-term viability." },
              { title: "Operations & Planning", company: "Murmu family enterprise", period: "2018 — 2021", description: "Building process discipline, planning frameworks, and practical decision systems within a broader family and business context." },
            ].map((item) => (
              <div key={item.title} className="timeline-item">
                <div className="dot" />
                <div className="timeline-body">
                  <strong>{item.title}</strong>
                  <span>{item.company} · {item.period}</span>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <div className="section-head">
            <h2>RunAsh product family</h2>
            <div className="section-note">Portfolio</div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <div key={project.title} className="project-card">
                <div className="project-type">{project.category}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                <div className="project-link">View project →</div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
          <div className="section-head">
            <h2>Core capabilities</h2>
            <div className="section-note">Skills</div>
          </div>

          <div className="skill-shell">
            <div className="skill-list">
              {capabilities.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                  <div className="skill-number">{skill.level}%</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="story">
          <div className="section-head">
            <h2>From Bokaro to building</h2>
            <div className="section-note">Story</div>
          </div>

          <div className="story-grid">
            {storySteps.map((step, index) => (
              <div key={step.title} className="story-card">
                <div className="story-index">0{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="family">
          <div className="section-head">
            <h2>Murmu family tree</h2>
            <div className="section-note">Family</div>
          </div>

          <div className="family-grid">
            {family.map((person) => (
              <div key={person.name} className="family-card">
                <div className="family-avatar" style={{ borderColor: `${person.color}66`, background: `${person.color}18` }}>
                  {person.emoji}
                </div>
                <div>
                  <span>{person.generation}</span>
                  <h4>{person.name}</h4>
                  <p>{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="blog">
          <div className="section-head">
            <h2>Writing</h2>
            <div className="section-note">Insights</div>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.title} className="blog-card">
                <div className="blog-visual">✦</div>
                <div className="blog-body">
                  <div className="blog-category">{post.category}</div>
                  <h3>{post.title}</h3>
                  <p>{post.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <div className="section-head">
            <h2>Get in touch</h2>
            <div className="section-note">Contact</div>
          </div>

          <div className="contact-grid">
            <div className="card" style={{ height: "100%" }}>
              <div className="contact-list">
                {[
                  ["✉", "Email", "teamstartuprunash@gmail.com"],
                  ["📍", "Location", "Bokaro, Jharkhand, India"],
                  ["📞", "Phone", "+91 89877 24121"],
                  ["💼", "LinkedIn", "linkedin.com/in/rammurmu"],
                ].map(([icon, label, value]) => (
                  <div key={label} className="contact-item">
                    <div className="contact-icon">{icon}</div>
                    <div>
                      <div className="contact-meta">{label}</div>
                      <div className="contact-value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form">
              <div className="form-row">
                <input placeholder="Your name" aria-label="Your name" />
                <input placeholder="Email address" aria-label="Email address" />
              </div>
              <input placeholder="Subject" aria-label="Subject" />
              <textarea placeholder="Tell me about your idea or opportunity" aria-label="Message" />
              <button className="primary-btn" style={{ width: "fit-content" }}>Send message</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        Vaibhav Murmu · Founder & CFO, RunAsh AI · Bokaro, Jharkhand, India
      </footer>
    </>
  )
}
