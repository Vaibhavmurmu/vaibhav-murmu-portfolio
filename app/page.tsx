"use client"

import { useState, useEffect, useRef } from "react"

interface Project { id: number; title: string; cat: string; desc: string; tags: string[]; url: string }
interface Skill { n: string; p: number; logo: string; color: string; category: string; since: number }
interface OcMsg { role: "bot" | "user"; text: string }
interface FamMember { id: string; name: string; role: string; gen: number; col: string; note?: string; emoji: string }

const LOGOS: Record<string, string> = {
  PyTorch: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.012 9.866 9.866 0 0014.012 0 9.866 9.866 0 000-14.012L16.94 9.08a5.84 5.84 0 010 8.27 5.84 5.84 0 01-8.27 0 5.84 5.84 0 010-8.27l3.335-3.336V0z" fill="#EE4C2C"/><circle cx="16.596" cy="7.32" r="1.44" fill="#EE4C2C"/></svg>`,
  TensorFlow: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-6.168-3.564v8.98L12.46 18.96V0l10.262 5.856v5.31z" fill="#FF6F00"/></svg>`,
  Transformers: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="none" stroke="#FFD21E" stroke-width="2"/><circle cx="12" cy="8" r="3" fill="#FFD21E"/><path d="M6 18c0-3.31 2.69-6 6-6s6 2.69 6 6" fill="#FFD21E"/></svg>`,
  "Next.js": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" fill="currentColor"/></svg>`,
  React: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" stroke-width="1.5" transform="rotate(120 12 12)"/></svg>`,
  TypeScript: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="3" fill="#3178C6"/><path d="M14 11h-2.5v7h-2v-7H7V9h7v2zm2 1.5c.4-.3.9-.5 1.5-.5 1.4 0 2.5 1 2.5 2.5V18h-2v-3c0-.6-.4-1-1-1s-1 .4-1 1v3h-2v-7h2v1.5z" fill="white"/></svg>`,
  PostgreSQL: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="8" ry="3" fill="none" stroke="#336791" stroke-width="1.5"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" fill="none" stroke="#336791" stroke-width="1.5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" fill="none" stroke="#336791" stroke-width="1.5"/></svg>`,
  "Node.js": `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.85L3 6.7v10.6l9 4.85 9-4.85V6.7L12 1.85zM5 15.95V8.35l7 3.77v7.6l-7-3.77zm9 3.77V11.12l7-3.77v7.6l-7 3.77z" fill="#339933"/></svg>`,
  WebRTC: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="none" stroke="#666" stroke-width="1.5"/><circle cx="12" cy="12" r="3" fill="#666"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke="#666" stroke-width="1.2"/></svg>`,
  OpenCV: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="6" r="4" fill="#5C3EE8"/><circle cx="16" cy="6" r="4" fill="#E8533E"/><circle cx="12" cy="14" r="4" fill="#4E9A06"/></svg>`,
  Docker: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 11h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3-3h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zM7 5h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zM4 14.5c.3 2 1.8 2.5 3 2.5h12c2 0 3.5-1.5 3.5-3.5 0-.3 0-.6-.1-.9L22 12h-1.5c-.2-1.5-1.3-2-2.5-2H17v-1h-2v1h-1v-1h-2v1H9c-.8 0-1.5.3-2 .8L4 14.5z" fill="#2496ED"/></svg>`,
  AWS: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 14l-3-6 1.5-.5L7 11l1.5-3.5L10 8l-3 6zm5-6l2 6h-1.5L12 12l-.5 2H10l2-6zm5 0l2 6h-1.5L17 12l-.5 2H15l2-6zM3 17l1-1 16 3-1 1L3 17z" fill="#FF9900"/></svg>`,
}

const TL = [
  { role: "CFO & Co-founder", co: "RunAsh AI", p: "Apr 2021 – present", d: "Steering financial strategy, capital planning, fundraising, investor communication, and operating discipline across the business." },
  { role: "Business & Strategy", co: "RunAsh AI Labs", p: "2020 – present", d: "Translating product ambition into sustainable revenue, GTM planning, and company-wide execution across live commerce and AI products." },
  { role: "Operations & Planning", co: "Murmu family enterprise", p: "2018 – 2021", d: "Built systems, planning, and decision frameworks across agriculture, business operations, and family enterprise work." },
]

const PROJECTS: Project[] = [
  { id: 1, title: "RunAsh AI Labs", cat: "Research", desc: "AI systems and strategy for live demonstration video, agentic workflows, and product experimentation at enterprise pace.", tags: ["Strategic AI", "Product Ops", "Growth"], url: "https://runash.in/ai" },
  { id: 2, title: "RunAsh Live", cat: "Operations", desc: "Revenue, launch, and operating model for live commerce experiences designed for conversion and retention.", tags: ["Live Commerce", "Finance", "Growth"], url: "https://live.runash.in" },
  { id: 3, title: "RunAsh Commerce", cat: "Business", desc: "Commercial strategy around sustainable goods, unit economics, and high-engagement shopping experiences.", tags: ["Marketplace", "Strategy", "Payments"], url: "https://runash.in/commerce" },
  { id: 4, title: "RunAshChat", cat: "AI", desc: "Support and commerce AI workflows built to create conversion while reducing friction in customer journey design.", tags: ["AI", "CX", "Automation"], url: "https://runash.in/chat" },
  { id: 5, title: "Runash Sons of Industries", cat: "Family Business", desc: "Manufacturing and agri-tech systems with a practical operating mindset rooted in local growth and resilience.", tags: ["Manufacturing", "Agri-Tech", "Operations"], url: "https://runash.industries.runash.in" },
]

const SKILLS: Skill[] = [
  { n: "Finance Strategy", p: 94, logo: "Next.js", color: "#f59e0b", category: "Business", since: 2021 },
  { n: "Investor Relations", p: 91, logo: "React", color: "#60a5fa", category: "Business", since: 2021 },
  { n: "Operations", p: 93, logo: "TypeScript", color: "#22c55e", category: "Operations", since: 2020 },
  { n: "P&L Ownership", p: 90, logo: "PostgreSQL", color: "#34d399", category: "Finance", since: 2021 },
  { n: "Board Reporting", p: 88, logo: "Node.js", color: "#a78bfa", category: "Finance", since: 2021 },
  { n: "Excel / Modeling", p: 95, logo: "Docker", color: "#f97316", category: "Analytics", since: 2019 },
  { n: "SQL", p: 87, logo: "OpenCV", color: "#38bdf8", category: "Analytics", since: 2020 },
  { n: "Market Analysis", p: 86, logo: "AWS", color: "#facc15", category: "Strategy", since: 2022 },
  { n: "Product Finance", p: 89, logo: "WebRTC", color: "#fb7185", category: "Product", since: 2021 },
  { n: "Leadership", p: 92, logo: "TensorFlow", color: "#f97316", category: "Leadership", since: 2018 },
  { n: "Risk Planning", p: 84, logo: "PyTorch", color: "#ef4444", category: "Operations", since: 2020 },
  { n: "Operational Systems", p: 90, logo: "Transformers", color: "#facc15", category: "Systems", since: 2021 },
]

const FAMILY: FamMember[] = [
  { id: "gg2-f", name: "Kandan Murmu", role: "Great-great-grandfather", gen: 1, col: "#475569", emoji: "👴", note: "Roots of the Murmu lineage. Bokaro, Jharkhand." },
  { id: "gg2-m", name: "Shrimati Devi", role: "Great-great-grandmother", gen: 1, col: "#475569", emoji: "👵", note: "Matriarch of the first generation. Bokaro, Jharkhand." },
  { id: "gg-f", name: "Gopi Murmu", role: "Great-grandfather", gen: 2, col: "#64748b", emoji: "👴", note: "Second generation of the Murmu family. Bokaro, Jharkhand." },
  { id: "gg-m", name: "Shrimati Devi", role: "Great-grandmother", gen: 2, col: "#64748b", emoji: "👵", note: "Second generation. Bokaro, Jharkhand." },
  { id: "g-f", name: "Rameshwaram Murmu", role: "Grandfather", gen: 3, col: "#34d399", emoji: "👴", note: "Patriarch of the third generation. Lived and worked in Bokaro, Jharkhand." },
  { id: "g-m", name: "HiraMuni Devi", role: "Grandmother", gen: 3, col: "#34d399", emoji: "👵", note: "Matriarch of the third generation. Bokaro, Jharkhand." },
  { id: "p-f", name: "Sanu Murmu", role: "Father · Farmer & Businessman", gen: 4, col: "#38bdf8", emoji: "👨‍🌾", note: "A grounded builder who taught discipline, resilience, and long-term thinking." },
  { id: "p-m", name: "Biraji D Murmu", role: "Mother · Housewife & Businesswoman", gen: 4, col: "#a78bfa", emoji: "👩‍💼", note: "The steady force behind the family — warmth, planning, and a deep belief in education and effort." },
  { id: "ram", name: "Ram Murmu", role: "Founder & CEO, RunAsh AI", gen: 5, col: "#f97316", emoji: "🧑‍💻", note: "Founder and builder of RunAsh AI, focused on AI systems, live experiences, and next-generation products." },
  { id: "vaibhav", name: "Vaibhav Murmu", role: "Founder & CFO, RunAsh AI", gen: 5, col: "#fbbf24", emoji: "📊", note: "Co-founder and CFO of RunAsh AI. Focused on business strategy, operational systems, and financial discipline." },
  { id: "puja", name: "Miss Puja K Murmu", role: "Co-founder & Marketing Head", gen: 5, col: "#f472b6", emoji: "📢", note: "Leads brand, growth, and campaign strategy for the product family." },
  { id: "nirali", name: "Nirali Murmu", role: "Co-founder & CS", gen: 5, col: "#34d399", emoji: "🔬", note: "Engineering and applied AI research for the RunAsh suite." },
]

const FAM_BY_ID = Object.fromEntries(FAMILY.map((f) => [f.id, f]))
const GEN_META = [
  { gen: 1, label: "1st Generation", sub: "Great-great-grandparents", col: "#475569" },
  { gen: 2, label: "2nd Generation", sub: "Great-grandparents", col: "#64748b" },
  { gen: 3, label: "3rd Generation", sub: "Grandparents", col: "#34d399" },
  { gen: 4, label: "4th Generation", sub: "Father & Mother", col: "#38bdf8" },
  { gen: 5, label: "5th Generation", sub: "Ram & Siblings", col: "#f97316" },
]

const CHAPTERS = [
  { id: "roots", lbl: "Roots", h: "A village in Jharkhand", q: "A strong foundation is built long before the business begins.", b: "Before there was a startup, there was a family shaped by values, hard work, and the discipline to make the most of limited resources." },
  { id: "spark", lbl: "The Spark", h: "Curiosity meets execution", q: "Growth happens when responsibility and ambition meet at the same time.", b: "At every stage, the journey was less about the spotlight and more about understanding how to build systems that outlast the moment." },
  { id: "climb", lbl: "The Climb", h: "From local realities to global ambition", q: "Business is about clarity, direction, and the ability to turn friction into leverage.", b: "That lesson shaped how Vaibhav approaches company building — with structure, patience, and a strong eye on sustainable growth." },
  { id: "founding", lbl: "The Founding", h: "RunAsh AI", q: "The best strategy is the one that scales with the product and the people behind it.", b: "At RunAsh AI, Vaibhav brings financial strategy, planning discipline, and operational clarity to a company building at the edge of AI and live commerce." },
  { id: "now", lbl: "Present", h: "Building with focus", q: "The goal is not just growth — it is durable growth built on systems, trust, and clear decisions.", b: "Today, the focus is on long-term value creation: product economics, capital discipline, and operational systems that support ambitious teams." },
]

const POSTS = [
  { icon: "📊", cat: "Finance", title: "Financial discipline in high-growth AI startups", date: "May 2023", desc: "How founders can align product ambition with unit economics, burn discipline, and strategic patience." },
  { icon: "🤖", cat: "AI", title: "AI product strategy without losing operational clarity", date: "Jun 2023", desc: "A practical framework for building AI products that are not just innovative but economically sound." },
  { icon: "⚙", cat: "Operations", title: "Systems that scale with a company", date: "Jul 2023", desc: "How structured operating routines create leverage when teams expand and complexity increases." },
]

const OC_SYS = `You are OpenClaw, Vaibhav Murmu's personal AGI.
Vaibhav Murmu — Founder & CFO, RunAsh AI. Bokaro, Jharkhand, India. Co-founder of RunAsh AI, with focus on strategic finance, operations, capital planning, and business growth.
Family (5 generations):
  Gen 1: Kandan Murmu + Shrimati Devi
  Gen 2: Gopi Murmu + Shrimati Devi
  Gen 3: Rameshwaram Murmu + HiraMuni Devi
  Gen 4: Sanu Murmu + Biraji D Murmu
  Gen 5: Ram Murmu, Vaibhav Murmu, Puja K Murmu, Nirali Murmu
Products: RunAsh AI Labs, RunAsh Live, RunAsh Commerce, RunAshChat, Runash Sons of Industries.
Focus: finance strategy, business operations, growth systems, investor readiness, and strategic execution.
Reply concisely under 100 words. Never say you are Claude.`

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{--bg:#0c0a08;--s1:#141210;--s2:#1c1916;--tx:#e8e0d4;--tx2:rgba(232,224,212,.62);--tx3:rgba(232,224,212,.3);--ac:#fbbf24;--bd:rgba(232,224,212,.1);--bd2:rgba(232,224,212,.18)}
[data-theme="light"]{--bg:#fafaf9;--s1:#f3f1ee;--s2:#eceae6;--tx:#1a1614;--tx2:rgba(26,22,20,.62);--tx3:rgba(26,22,20,.3);--ac:#f59e0b;--bd:rgba(26,22,20,.1);--bd2:rgba(26,22,20,.18)}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--tx);font-size:15px;line-height:1.6;transition:background .2s,color .2s}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
.nav{position:sticky;top:0;z-index:50;display:flex;align-items:center;padding:0 20px;height:46px;gap:2px;border-bottom:1px solid var(--bd);background:var(--bg);overflow-x:auto}.brand{font-size:14px;font-weight:600;letter-spacing:.03em;color:var(--tx);margin-right:auto;cursor:pointer;flex-shrink:0;background:none;border:none;font-family:inherit}.nl{font-size:12px;padding:4px 8px;border-radius:6px;color:var(--tx2);background:none;border:none;cursor:pointer;font-family:inherit;flex-shrink:0;white-space:nowrap}.nl:hover,.nl.on{background:var(--s1);color:var(--tx)}.nl.on{font-weight:500}.tpill{padding:3px 10px;border-radius:20px;border:1px solid var(--bd2);background:var(--s1);color:var(--tx2);font-size:11px;font-weight:500;cursor:pointer;font-family:inherit;flex-shrink:0;margin-left:4px}.ocnav{padding:3px 10px;border-radius:6px;border:1px solid var(--bd2);background:var(--s1);color:var(--tx2);font-size:11px;font-weight:500;cursor:pointer;font-family:inherit;flex-shrink:0;margin-left:2px}.wrap{padding:64px 24px;max-width:760px;margin:0 auto}.rule{border:none;border-top:1px solid var(--bd)}.lbl{font-size:11px;font-weight:500;color:var(--ac);text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px}h1{font-size:clamp(28px,5vw,40px);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-bottom:8px}h2{font-size:20px;font-weight:500;letter-spacing:-.015em;margin-bottom:16px}h3{font-size:14px;font-weight:500;margin-bottom:5px}.bp{padding:8px 18px;border-radius:7px;border:none;background:var(--ac);color:#111827;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}.bp:hover{opacity:.88}.bo{padding:8px 18px;border-radius:7px;border:1px solid var(--bd2);background:transparent;color:var(--tx);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit}.bo:hover{background:var(--s1)}.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.card{background:var(--s1);border:1px solid var(--bd);border-radius:10px;padding:16px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.stat{background:var(--s1);border:1px solid var(--bd);border-radius:10px;padding:12px 14px}.stat-n{font-size:22px;font-weight:600}.stat-l{font-size:11px;color:var(--tx3);margin-top:3px}.tl-item{display:flex;gap:14px;padding-bottom:26px}.tl-dc{display:flex;flex-direction:column;align-items:center;flex-shrink:0}.tl-dot{width:9px;height:9px;border-radius:50%;background:var(--ac);margin-top:5px}.tl-ln{width:1px;background:var(--bd);flex:1;margin-top:4px}.pf-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}.pf-btn{font-size:12px;padding:4px 12px;border-radius:20px;border:1px solid var(--bd2);color:var(--tx2);background:transparent;cursor:pointer;font-family:inherit}.pf-btn.on{background:rgba(251,191,36,.1);color:var(--ac);border-color:var(--ac)}.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.pc{background:var(--s1);border:1px solid var(--bd);border-radius:10px;padding:16px;cursor:pointer;transition:border-color .15s}.pc:hover{border-color:var(--ac)}.sk-tabs{display:flex;gap:6px;margin-bottom:20px;perspective:600px}.sk-tab{font-size:12px;padding:6px 14px;border-radius:7px;border:1px solid var(--bd2);color:var(--tx2);background:var(--s1);cursor:pointer;font-family:inherit;transition:all .2s;transform-style:preserve-3d}.sk-tab:hover{transform:rotateX(-8deg) translateY(-1px);border-color:var(--ac)}.sk-tab.on{background:var(--ac);color:#111827;border-color:var(--ac)}.sk-panel{animation:panelIn .3s cubic-bezier(.16,1,.3,1)}@keyframes panelIn{from{opacity:0;transform:rotateX(-12deg) translateY(8px)}to{opacity:1;transform:rotateX(0) translateY(0)}}.sgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px}.si{background:var(--s1);border:1px solid var(--bd);border-radius:10px;padding:14px 10px;text-align:center;transition:all .2s;cursor:default}.si:hover{border-color:var(--ac);transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.2)}.si-logo{width:32px;height:32px;margin:0 auto 8px}.si-logo svg{width:100%;height:100%}.si-bar{height:3px;background:var(--bd2);border-radius:2px;margin-top:8px;overflow:hidden}.si-fill{height:100%;border-radius:2px;width:0;transition:width 1s cubic-bezier(.16,1,.3,1)}.radar-wrap{display:flex;justify-content:center;padding:8px 0}.sk-timeline{display:flex;flex-direction:column;gap:10px}.sk-tl-item{display:flex;align-items:center;gap:12px}.sk-tl-logo{width:24px;height:24px;flex-shrink:0}.sk-tl-bar-wrap{flex:1;background:var(--bd2);border-radius:4px;height:8px;overflow:hidden}.sk-tl-bar{height:100%;border-radius:4px;transition:width 1s cubic-bezier(.16,1,.3,1)}.ft-svg-wrap{width:100%;overflow-x:auto;padding:8px 0;-webkit-overflow-scrolling:touch}.dialog-backdrop{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadein .2s ease}@keyframes fadein{from{opacity:0}to{opacity:1}}.dialog-card{background:var(--s1);border:1px solid var(--bd2);border-radius:16px;width:100%;max-width:420px;overflow:hidden;animation:slideup .25s cubic-bezier(.16,1,.3,1)}@keyframes slideup{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}.dialog-img-area{width:100%;height:280px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}.dialog-img-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;width:100%;height:100%}.dialog-body{padding:20px}.dialog-close{position:absolute;top:12px;right:12px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,.5);border:none;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:1;line-height:1}.ch-head{width:100%;display:flex;align-items:center;gap:10px;padding:13px 14px;background:transparent;border:none;cursor:pointer;font-family:inherit;text-align:left}.ch-body{padding:0 14px 14px;border-top:1px solid var(--bd)}.writing-canvas-wrap{position:relative;height:160px;margin-bottom:20px;border-radius:12px;overflow:hidden;background:var(--s1);border:1px solid var(--bd)}.bc{background:var(--s1);border:1px solid var(--bd);border-radius:10px;overflow:hidden;cursor:pointer;transition:all .2s}.bc:hover{border-color:var(--ac);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.15)}.bc-img{height:80px;background:var(--s2);display:flex;align-items:center;justify-content:center;font-size:26px;border-bottom:1px solid var(--bd)}.bc-body{padding:12px}.cf-input{font-size:13px;padding:8px 10px;border-radius:7px;border:1px solid var(--bd2);background:var(--s1);color:var(--tx);font-family:inherit;outline:none;width:100%;resize:vertical}.cf-input:focus{border-color:var(--ac)}.ci-row{display:flex;align-items:flex-start;gap:10px;margin-bottom:11px}.oc-fab{position:fixed;bottom:20px;right:20px;z-index:100;display:flex;align-items:center;gap:6px;padding:9px 16px;border-radius:24px;border:1px solid var(--bd2);background:var(--s2);color:var(--tx);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;box-shadow:0 4px 16px rgba(0,0,0,.25)}.oc-fab:hover{border-color:var(--ac);color:var(--ac)}.oc-drawer{position:fixed;bottom:0;right:0;width:340px;height:490px;background:var(--s1);border:1px solid var(--bd2);border-radius:12px 12px 0 0;display:flex;flex-direction:column;z-index:200;transform:translateY(100%);transition:transform .22s cubic-bezier(.32,1,.23,1);box-shadow:0 -8px 32px rgba(0,0,0,.2)}.oc-drawer.open{transform:translateY(0)}.oc-head{padding:11px 13px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:8px;flex-shrink:0}.oc-av{width:26px;height:26px;border-radius:50%;background:rgba(251,191,36,.12);color:var(--ac);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0}.oc-x{background:none;border:none;cursor:pointer;color:var(--tx3);font-size:18px;padding:4px;line-height:1}.oc-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}.oc-bub-b{font-size:13px;line-height:1.55;padding:8px 10px;max-width:86%;word-break:break-word;background:var(--s2);border:1px solid var(--bd);color:var(--tx);border-radius:3px 10px 10px 10px}.oc-bub-u{font-size:13px;line-height:1.55;padding:8px 10px;max-width:86%;word-break:break-word;background:var(--ac);color:#111827;border-radius:10px 3px 10px 10px}.oc-inp{flex:1;font-size:13px;padding:7px 9px;border-radius:7px;border:1px solid var(--bd2);background:var(--bg);color:var(--tx);font-family:inherit;outline:none}.oc-inp:focus{border-color:var(--ac)}.oc-send{padding:7px 12px;border-radius:7px;border:none;background:var(--ac);color:#111827;font-size:13px;cursor:pointer;font-family:inherit}.oc-send:disabled{opacity:.4;cursor:not-allowed}.chip{font-size:11px;padding:3px 9px;border-radius:20px;border:1px solid var(--bd2);color:var(--tx2);background:var(--s1);cursor:pointer;font-family:inherit}.chip:hover{color:var(--tx);background:var(--s2)}@keyframes blink{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}.dot-1{animation:blink 1.1s infinite}.dot-2{animation:blink 1.1s .18s infinite}.dot-3{animation:blink 1.1s .36s infinite}footer{text-align:center;padding:24px 20px;font-size:12px;color:var(--tx3);border-top:1px solid var(--bd)}@media(max-width:600px){.g2,.pgrid,.cf-grid{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr 1fr!important}.oc-drawer{width:100%!important}.stats{grid-template-columns:repeat(3,1fr)}.dialog-card{max-width:100%}}
`

function gs(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }) }
function Rule() { return <hr className="rule" /> }

function ImageDialog({ member, onClose, dark }: { member: FamMember; onClose: () => void; dark: boolean }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = "" }
  }, [onClose])

  const genLabel = GEN_META.find((g) => g.gen === member.gen)

  return (
    <div className="dialog-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose() }} role="dialog" aria-modal="true" aria-label={`${member.name} profile`}>
      <div className="dialog-card">
        <div className="dialog-img-area" style={{ background: `linear-gradient(135deg, ${member.col}22, ${member.col}08)` }}>
          <button className="dialog-close" onClick={onClose} aria-label="Close">×</button>
          <div className="dialog-img-placeholder">
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: `${member.col}25`, border: `3px solid ${member.col}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, boxShadow: `0 0 40px ${member.col}30` }}>
              {member.emoji}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: member.col, background: `${member.col}18`, padding: "3px 10px", borderRadius: 20, border: `1px solid ${member.col}40` }}>
              {genLabel?.label} · {genLabel?.sub}
            </div>
          </div>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(circle at 50% 50%, ${member.col}10 0%, transparent 70%)` }} />
        </div>

        <div className="dialog-body">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: `${member.col}20`, border: `2px solid ${member.col}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{member.emoji}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 2 }}>{member.name}</div>
              <div style={{ fontSize: 12, color: member.col, fontWeight: 500 }}>{member.role}</div>
            </div>
          </div>

          {member.note && <p style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.7, marginBottom: 16 }}>{member.note}</p>}

          <div style={{ background: "var(--s2)", border: "1px solid var(--bd)", borderRadius: 8, padding: "10px 12px", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: "var(--tx3)", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em" }}>Family line</span>
            {GEN_META.map((g, i) => (
              <span key={g.gen} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {i > 0 && <span style={{ color: "var(--tx3)", fontSize: 10 }}>→</span>}
                <span style={{ fontSize: 10, padding: "1px 7px", borderRadius: 20, background: member.gen === g.gen ? `${member.col}20` : "transparent", color: member.gen === g.gen ? member.col : "var(--tx3)", fontWeight: member.gen === g.gen ? 600 : 400, border: member.gen === g.gen ? `1px solid ${member.col}50` : "1px solid transparent" }}>{g.label}</span>
              </span>
            ))}
          </div>

          <button onClick={onClose} style={{ marginTop: 14, width: "100%", padding: "9px", borderRadius: 8, border: "1px solid var(--bd2)", background: "transparent", color: "var(--tx)", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Close</button>
        </div>
      </div>
    </div>
  )
}

function NavBar({ dark, toggleTheme, openOC }: { dark: boolean; toggleTheme: () => void; openOC: () => void }) {
  const [active, setActive] = useState("hero")
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: "-40% 0px -40% 0px" }
    )
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])
  const links = [["about", "About"], ["projects", "Projects"], ["skills", "Skills"], ["resume", "Résumé"], ["family", "Family"], ["story", "Story"], ["blog", "Blog"], ["contact", "Contact"]]
  return (
    <nav className="nav">
      <button className="brand" onClick={() => gs("hero")}>Vaibhav<em style={{ color: "var(--ac)", fontStyle: "normal" }}>Murmu</em></button>
      {links.map(([id, label]) => (
        <button key={id} className={`nl${active === id ? " on" : ""}`} onClick={() => gs(id)}>{label}</button>
      ))}
      <button className="tpill" onClick={toggleTheme}>{dark ? "☀ Light" : "🌙 Dark"}</button>
      <button className="ocnav" onClick={openOC}>✦ OpenClaw</button>
    </nav>
  )
}

function Hero({ openOC }: { openOC: () => void }) {
  return (
    <section id="hero" className="wrap" style={{ paddingTop: 72, paddingBottom: 64 }}>
      <div className="lbl">Founder · CFO · Operator</div>
      <h1>Vaibhav Murmu</h1>
      <div style={{ fontSize: 15, color: "var(--ac)", fontWeight: 500, marginBottom: 14 }}>Founder & CFO, RunAsh AI</div>
      <p style={{ fontSize: 15, color: "var(--tx2)", maxWidth: 500, lineHeight: 1.7, marginBottom: 28 }}>
        Building the financial and operational backbone behind AI products, live commerce, and scalable startup execution from Bokaro to the next chapter.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 44 }}>
        <button className="bp" onClick={() => gs("contact")}>Get in touch</button>
        <button className="bo" onClick={() => gs("projects")}>View projects</button>
        <button className="bo" onClick={openOC}>✦ Ask OpenClaw</button>
      </div>
      <div className="stats">
        {[["5+", "Products in motion"], ["2021", "RunAsh AI founded"], ["CFO", "Strategic finance & ops"]].map(([n, l]) => (
          <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="wrap">
      <h2>Builder with a business lens</h2>
      <p style={{ color: "var(--tx2)", marginBottom: 22, maxWidth: 520, lineHeight: 1.7, fontSize: 14 }}>
        From a grounded upbringing in Bokaro to co-founding RunAsh AI — balancing product ambition with financial discipline, operational systems, and long-term strategy.
      </p>
      <div className="g2" style={{ marginBottom: 28 }}>
        {[
          { icon: "📈", t: "Finance", d: "Strategic financial planning, investor readiness, P&L ownership, and execution discipline for high-growth product teams." },
          { icon: "🚀", t: "RunAsh AI", d: "Co-founding a company at the intersection of AI, live commerce, and scalable digital experiences." },
          { icon: "📍", t: "Origin", d: "Bokaro, Jharkhand, India — a place that shaped the value of work, systems, and persistence." },
          { icon: "🎯", t: "Mission", d: "Turn product ambition into durable operating systems and measurable business value." },
        ].map(({ icon, t, d }) => (
          <div key={t} className="card">
            <div style={{ fontSize: 18, marginBottom: 10 }}>{icon}</div>
            <h3>{t}</h3>
            <p style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.55 }}>{d}</p>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--tx3)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 14 }}>Timeline</div>
      {TL.map((t, i) => (
        <div key={t.role} className="tl-item">
          <div className="tl-dc"><div className="tl-dot" />{i < TL.length - 1 && <div className="tl-ln" />}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{t.role}</div>
            <div style={{ fontSize: 13, color: "var(--ac)", margin: "2px 0" }}>{t.co}</div>
            <div style={{ fontSize: 11, color: "var(--tx3)" }}>{t.p}</div>
            <div style={{ fontSize: 13, color: "var(--tx2)", marginTop: 4, lineHeight: 1.5 }}>{t.d}</div>
          </div>
        </div>
      ))}
    </section>
  )
}

function Projects() {
  const [cat, setCat] = useState("All")
  const cats = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.cat)))]
  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat)

  return (
    <section id="projects" className="wrap">
      <h2>RunAsh product family</h2>
      <div className="pf-row">
        {cats.map((c) => <button key={c} className={`pf-btn${c === cat ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="pgrid">
        {list.map((p) => (
          <div key={p.id} className="pc" onClick={() => window.open(p.url, "_blank")} onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--ac)" )} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--bd)")}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ac)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 5 }}>{p.cat}</div>
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 5 }}>{p.title}</div>
            <div style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.5, marginBottom: 9 }}>{p.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 9 }}>
              {p.tags.map((t) => <span key={t} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: "var(--s2)", border: "1px solid var(--bd)", color: "var(--tx3)" }}>{t}</span>)}
            </div>
            <div style={{ fontSize: 12, color: "var(--ac)", borderTop: "1px solid var(--bd)", paddingTop: 9 }}>↗ View project</div>
          </div>
        ))}
      </div>
    </section>
  )
}

type SkillTab = "grid" | "radar" | "timeline"

function RadarChart({ dark }: { dark: boolean }) {
  const cats = Array.from(new Set(SKILLS.map((s) => s.category)))
  const scores = cats.map((cat) => ({ cat, score: Math.round(SKILLS.filter((s) => s.category === cat).reduce((a, b) => a + b.p, 0) / SKILLS.filter((s) => s.category === cat).length) }))
  const n = scores.length; const cx = 160, cy = 140, r = 100
  const aStep = (2 * Math.PI) / n
  const pt = (a: number, rad: number) => ({ x: cx + rad * Math.cos(a - Math.PI / 2), y: cy + rad * Math.sin(a - Math.PI / 2) })
  const dpts = scores.map((cs, i) => pt(i * aStep, (cs.score / 100) * r))
  const path = dpts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z"
  const tc = dark ? "rgba(232,224,212,.65)" : "rgba(26,22,20,.65)"
  const gc = dark ? "rgba(232,224,212,.1)" : "rgba(26,22,20,.1)"

  return (
    <div className="radar-wrap">
      <svg width="320" height="280" viewBox="0 0 320 280">
        {[25, 50, 75, 100].map((l) => { const ps = scores.map((_, i) => pt(i * aStep, (l / 100) * r)); return <path key={l} d={ps.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z"} fill="none" stroke={gc} strokeWidth="1" /> })}
        {scores.map((_, i) => { const p = pt(i * aStep, r); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={gc} strokeWidth="1" /> })}
        <path d={path} fill="rgba(251,191,36,.15)" stroke="#fbbf24" strokeWidth="2" />
        {dpts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fbbf24" />)}
        {scores.map((cs, i) => { const lp = pt(i * aStep, r + 28); return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={tc}>{cs.cat.split(" ")[0]} {cs.score}%</text> })}
      </svg>
    </div>
  )
}

function Skills({ dark }: { dark: boolean }) {
  const [tab, setTab] = useState<SkillTab>("grid")
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setAnimated(true); obs.disconnect() } }, { threshold: .1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const tabs = [{ id: "grid" as SkillTab, label: "Grid", icon: "⊞" }, { id: "radar" as SkillTab, label: "Radar", icon: "◎" }, { id: "timeline" as SkillTab, label: "Timeline", icon: "↔" }]

  return (
    <section id="skills" ref={ref} className="wrap">
      <h2>Core capabilities</h2>
      <div className="sk-tabs">
        {tabs.map((t) => <button key={t.id} className={`sk-tab${tab === t.id ? " on" : ""}`} onClick={() => setTab(t.id)}>{t.icon} {t.label}</button>)}
      </div>
      <div className="sk-panel" key={tab}>
        {tab === "grid" && (
          <div className="sgrid">
            {SKILLS.map((s) => (
              <div key={s.n} className="si" title={`${s.n} — ${s.p}% · since ${s.since}`}>
                <div className="si-logo"><div dangerouslySetInnerHTML={{ __html: LOGOS[s.logo] || LOGOS["WebRTC"] }} /></div>
                <div style={{ fontSize: 11, fontWeight: 500, margin: "4px 0 2px" }}>{s.n}</div>
                <div style={{ fontSize: 9, color: "var(--tx3)" }}>{s.category}</div>
                <div className="si-bar"><div className="si-fill" style={{ width: animated ? `${s.p}%` : 0, background: s.color }} /></div>
              </div>
            ))}
          </div>
        )}
        {tab === "radar" && <RadarChart dark={dark} />}
        {tab === "timeline" && (
          <div className="sk-timeline">
            {[...SKILLS].sort((a, b) => a.since - b.since).map((s) => (
              <div key={s.n} className="sk-tl-item">
                <div className="sk-tl-logo"><div dangerouslySetInnerHTML={{ __html: LOGOS[s.logo] || LOGOS["WebRTC"] }} /></div>
                <div style={{ fontSize: 11, fontWeight: 500, width: 110, flexShrink: 0 }}>{s.n}</div>
                <div style={{ fontSize: 10, color: "var(--tx3)", width: 30, flexShrink: 0 }}>'{String(s.since).slice(2)}</div>
                <div style={{ flex: 1 }} className="sk-tl-bar-wrap"><div className="sk-tl-bar" style={{ width: animated ? `${s.p}%` : 0, background: s.color }} /></div>
                <div style={{ fontSize: 11, color: "var(--tx3)", width: 32, textAlign: "right", flexShrink: 0 }}>{s.p}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Resume() {
  return (
    <section id="resume" className="wrap">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Résumé</h2>
        <a href="/Vaibhav_Murmu_Resume.pdf" download style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 13px", borderRadius: 7, border: "1px solid var(--bd2)", background: "var(--s1)", color: "var(--tx)", fontSize: 12, fontWeight: 500, textDecoration: "none" }}>⬇ Download PDF</a>
      </div>
      <div className="g2" style={{ marginBottom: 10 }}>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ac)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Experience</div>
          <div style={{ fontWeight: 500, marginBottom: 2 }}>Founder & CFO</div>
          <div style={{ fontSize: 13, color: "var(--ac)", margin: "2px 0" }}>RunAsh AI</div>
          <div style={{ fontSize: 11, color: "var(--tx3)", marginBottom: 8 }}>Apr 2021 – present · Bokaro, Jharkhand</div>
          <p style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.6 }}>Owning the financial strategy, operating model, and business systems behind AI-driven products and live commerce experiences.</p>
        </div>
        <div className="card">
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ac)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Education</div>
          <div style={{ fontWeight: 500, marginBottom: 2 }}>Business & Strategy Focus</div>
          <div style={{ fontSize: 13, color: "var(--ac)", margin: "2px 0" }}>Self-directed growth + startup execution</div>
          <div style={{ fontSize: 11, color: "var(--tx3)", marginBottom: 10 }}>Practical strategy in high-uncertainty environments</div>
          <div style={{ fontWeight: 500, marginBottom: 2 }}>Leadership & Systems</div>
          <div style={{ fontSize: 13, color: "var(--ac)", margin: "2px 0" }}>Operational scaling</div>
          <div style={{ fontSize: 11, color: "var(--tx3)" }}>Focused on sustainable value creation</div>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ac)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Capability stack</div>
        <div className="g2">
          {[["Finance", "P&L, capital planning, fundraising readiness, investor communications, strategic planning"], ["Operations", "Operating systems, workflow design, team coordination, business process structure"], ["Strategy", "Market analysis, business model refinement, growth planning, product economics"], ["Analytics", "Excel, SQL, dashboards, KPI design, reporting frameworks"]].map(([l, v]) => (
            <div key={l}><div style={{ fontSize: 11, fontWeight: 500, color: "var(--ac)", marginBottom: 3 }}>{l}</div><p style={{ fontSize: 12, color: "var(--tx2)", lineHeight: 1.55 }}>{v}</p></div>
          ))}
        </div>
      </div>
      <div className="card">
        <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ac)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 10 }}>Highlights</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[["Investor communication", "Investor readiness across product, market, and capital needs"], ["Commercial planning", "Revenue model thinking tied to execution"], ["Operating cadence", "Decision frameworks that scale with growth"]].map(([name, org]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--ac)" }}>🏅</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
              <span style={{ fontSize: 12, color: "var(--tx3)" }}>· {org}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FamilyTree({ dark }: { dark: boolean }) {
  const [dialogMember, setDialogMember] = useState<FamMember | null>(null)

  const tc = dark ? "rgba(232,224,212,.85)" : "rgba(26,22,20,.85)"
  const tc3 = dark ? "rgba(232,224,212,.32)" : "rgba(26,22,20,.32)"
  const bd = dark ? "rgba(232,224,212,.12)" : "rgba(26,22,20,.12)"
  const stripe0 = dark ? "rgba(255,255,255,.015)" : "rgba(0,0,0,.015)"
  const stripe1 = dark ? "rgba(255,255,255,.025)" : "rgba(0,0,0,.025)"

  const W = 780
  const ROW_H = 120
  const TOP = 54
  const TOTAL_H = TOP + ROW_H * 5 + 60

  const POS: Record<string, { x: number; y: number }> = {
    "gg2-f": { x: 300, y: TOP },
    "gg2-m": { x: 480, y: TOP },
    "gg-f": { x: 300, y: TOP + ROW_H },
    "gg-m": { x: 480, y: TOP + ROW_H },
    "g-f": { x: 300, y: TOP + ROW_H * 2 },
    "g-m": { x: 480, y: TOP + ROW_H * 2 },
    "p-f": { x: 300, y: TOP + ROW_H * 3 },
    "p-m": { x: 480, y: TOP + ROW_H * 3 },
    ram: { x: 90, y: TOP + ROW_H * 4 },
    vaibhav: { x: 280, y: TOP + ROW_H * 4 },
    puja: { x: 470, y: TOP + ROW_H * 4 },
    nirali: { x: 660, y: TOP + ROW_H * 4 },
  }

  const nodeR = (id: string) => id === "ram" ? 27 : 22
  const couples: Array<[string, string]> = [["gg2-f", "gg2-m"], ["gg-f", "gg-m"], ["g-f", "g-m"], ["p-f", "p-m"]]
  const vertLinks: Array<[string, string, string]> = [["gg2-f", "gg2-m", "gg-f"], ["gg-f", "gg-m", "g-f"], ["g-f", "g-m", "p-f"]]
  const siblings = ["ram", "vaibhav", "puja", "nirali"]

  return (
    <section id="family" className="wrap">
      <h2>Murmu family tree</h2>
      <p style={{ fontSize: 14, color: "var(--tx2)", marginBottom: 18, lineHeight: 1.6 }}>
        Five generations of the Murmu family — rooted in Bokaro, Jharkhand. <strong style={{ color: "var(--tx)", fontWeight: 500 }}>Click any member</strong> to open their profile card.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {GEN_META.map((g) => (
          <div key={g.gen} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: g.col, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "var(--tx3)" }}><strong style={{ color: "var(--tx)", fontWeight: 500 }}>{g.label}</strong> — {g.sub}</span>
          </div>
        ))}
      </div>

      <div className="ft-svg-wrap">
        <svg width={W} height={TOTAL_H} viewBox={`0 0 ${W} ${TOTAL_H}`} style={{ maxWidth: "100%", display: "block", minWidth: 520 }}>
          <defs>
            {FAMILY.map((f) => (
              <radialGradient key={f.id} id={`rg-${f.id}`} cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor={f.col} stopOpacity="0.6" />
                <stop offset="100%" stopColor={f.col} stopOpacity="0.1" />
              </radialGradient>
            ))}
            <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {GEN_META.map((g, i) => (
            <g key={g.gen}>
              <rect x={0} y={TOP + ROW_H * i - 40} width={W} height={ROW_H} fill={i % 2 === 0 ? stripe0 : stripe1} />
              <text x={10} y={TOP + ROW_H * i - 24} fontSize="9" fontWeight="700" fill={tc3} letterSpacing="1">{g.label.toUpperCase()}</text>
              <text x={10} y={TOP + ROW_H * i - 13} fontSize="9" fill={tc3}>{g.sub}</text>
            </g>
          ))}

          {couples.map(([a, b]) => {
            const pa = POS[a], pb = POS[b]
            const mx = (pa.x + pb.x) / 2
            return (
              <g key={`couple-${a}`}>
                <line x1={pa.x + nodeR(a)} y1={pa.y} x2={pb.x - nodeR(b)} y2={pb.y} stroke={bd} strokeWidth="1.5" strokeDasharray="5 3" />
                <circle cx={mx} cy={pa.y} r="3.5" fill={bd} />
              </g>
            )
          })}

          {vertLinks.map(([a, b, child]) => {
            const pa = POS[a], pb = POS[b], pc = POS[child]
            const mx = (pa.x + pb.x) / 2
            const childMem = FAMILY.find((f) => f.id === child)
            return (
              <path key={`vert-${child}`} d={`M${mx},${pa.y + 4} C${mx},${(pa.y + pc.y) / 2} ${pc.x},${(pa.y + pc.y) / 2} ${pc.x},${pc.y - nodeR(child) - 3}`} fill="none" stroke={childMem?.col || bd} strokeWidth="1.2" strokeDasharray="5 3" opacity="0.4" />
            )
          })}

          {(() => {
            const pf = POS["p-f"], pm = POS["p-m"]
            const mx = (pf.x + pm.x) / 2
            const barY = pf.y + 48
            const sibPosArr = siblings.map((id) => POS[id])
            const barLeft = Math.min(...sibPosArr.map((p) => p.x))
            const barRight = Math.max(...sibPosArr.map((p) => p.x))
            return (
              <g>
                <line x1={mx} y1={pf.y + nodeR("p-f") + 3} x2={mx} y2={barY} stroke={bd} strokeWidth="1.2" strokeDasharray="5 3" />
                <line x1={barLeft} y1={barY} x2={barRight} y2={barY} stroke={bd} strokeWidth="1.2" />
                {siblings.map((id) => {
                  const sp = POS[id]
                  const mem = FAMILY.find((f) => f.id === id)
                  return <line key={id} x1={sp.x} y1={barY} x2={sp.x} y2={sp.y - nodeR(id) - 3} stroke={mem?.col || bd} strokeWidth="1.5" opacity="0.45" />
                })}
              </g>
            )
          })()}

          {FAMILY.map((f) => {
            const pos = POS[f.id]
            if (!pos) return null
            const r = nodeR(f.id)
            const isRam = f.id === "ram"
            return (
              <g key={f.id} style={{ cursor: "pointer" }} transform={`translate(${pos.x},${pos.y})`} onClick={() => setDialogMember(f)} tabIndex={0} role="button" aria-label={`Open ${f.name} profile`} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setDialogMember(f) }}>
                <circle r={r + 8} fill="transparent" stroke={f.col} strokeWidth="0" style={{ transition: "all .15s" }} />
                <circle r={r + 5} fill="transparent" stroke={f.col} strokeWidth="1" opacity="0.3" />
                <circle r={r} fill={`url(#rg-${f.id})`} stroke={f.col} strokeWidth={isRam ? 2.5 : 1.5} filter={isRam ? "url(#glow)" : undefined} />
                <text textAnchor="middle" dominantBaseline="middle" fontSize={isRam ? 16 : 13}>{f.emoji}</text>
                <text y={r + 15} textAnchor="middle" fontSize="9" fontWeight="600" fill={tc}>{f.name.split(" ")[0]}</text>
                {f.name.split(" ").length > 1 && <text y={r + 25} textAnchor="middle" fontSize="8" fill={tc3}>{f.name.split(" ").slice(1, 3).join(" ")}</text>}
                <title>{f.name} · {f.role} · Click to view profile</title>
              </g>
            )
          })}

          {GEN_META.map((g, i) => (
            <g key={`legend-${g.gen}`} transform={`translate(${15 + i * 145}, ${TOTAL_H - 18})`}>
              <circle r="4" fill={g.col} opacity="0.8" />
              <text x="9" dominantBaseline="middle" fontSize="9" fill={tc3}>{g.label}</text>
            </g>
          ))}
        </svg>
      </div>

      {dialogMember && <ImageDialog member={dialogMember} onClose={() => setDialogMember(null)} dark={dark} />}
    </section>
  )
}

function Story() {
  const [open, setOpen] = useState(new Set(["roots"]))
  const toggle = (id: string) => setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <section id="story" className="wrap">
      <h2>From Bokaro to building</h2>
      <p style={{ fontSize: 14, color: "var(--tx2)", marginBottom: 22, maxWidth: 500, lineHeight: 1.65 }}>
        A founder’s perspective shaped by practical learning, disciplined execution, and the belief that business should be backed by strong systems.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {CHAPTERS.map((ch, i) => {
          const isOpen = open.has(ch.id)
          return (
            <div key={ch.id} style={{ border: "1px solid var(--bd)", borderRadius: 10, overflow: "hidden" }}>
              <button className="ch-head" onClick={() => toggle(ch.id)}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: isOpen ? "var(--ac)" : "rgba(251,191,36,.12)", color: isOpen ? "#111827" : "var(--ac)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ac)", textTransform: "uppercase", letterSpacing: ".07em" }}>{ch.lbl}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--tx)", marginTop: 1 }}>{ch.h}</div>
                </div>
                <span style={{ fontSize: 14, color: "var(--tx3)" }}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="ch-body">
                  <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.75, margin: "14px 0" }}>{ch.b}</p>
                  <div style={{ borderLeft: "3px solid var(--ac)", paddingLeft: 14 }}>
                    <p style={{ fontSize: 14, fontStyle: "italic", color: "var(--tx)", lineHeight: 1.55, fontWeight: 500 }}>"{ch.q}"</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

const WORDS = ["AI", "Finance", "Growth", "Operations", "Strategy", "RunAsh", "Bokaro", "Product", "AI Commerce", "Leadership", "KPI", "Investors", "Systems", "Capital", "Scaling"]
const WCOLS = ["#fbbf24", "#f59e0b", "#38bdf8", "#a78bfa", "#34d399"]

function WritingCanvas({ dark }: { dark: boolean }) {
  const animRef = useRef<number>(0)
  const [pts, setPts] = useState(() => WORDS.map((word, i) => ({
    id: i,
    word,
    x: 40 + Math.random() * 580,
    y: 15 + Math.random() * 130,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    opacity: 0.3 + Math.random() * 0.5,
    size: 11 + Math.random() * 8,
    color: WCOLS[Math.floor(Math.random() * WCOLS.length)],
  })))

  useEffect(() => {
    let frame = 0
    const animate = () => {
      frame++
      setPts((prev) => prev.map((p) => {
        let { x, y, vx, vy } = p
        x += vx; y += vy
        if (x < 20 || x > 640) vx = -vx
        if (y < 10 || y > 145) vy = -vy
        return { ...p, x, y, vx, vy, opacity: 0.25 + 0.4 * Math.sin(frame * 0.008 + p.id * 0.7) }
      }))
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const bg = dark ? "#141210" : "#f3f1ee"

  return (
    <div className="writing-canvas-wrap">
      <div style={{ position: "absolute", bottom: -5, left: 10, right: 10, height: "100%", background: dark ? "#1c1916" : "#e8e5e1", borderRadius: 12, border: `1px solid ${dark ? "rgba(232,224,212,.06)" : "rgba(26,22,20,.06)"}`, zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: -2, left: 5, right: 5, height: "100%", background: dark ? "#181511" : "#eeeae6", borderRadius: 12, border: `1px solid ${dark ? "rgba(232,224,212,.08)" : "rgba(26,22,20,.08)"}`, zIndex: 0 }} />
      <svg style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        {[32, 62, 92, 122, 152].map((y) => <line key={y} x1="16" y1={y} x2="calc(100% - 16)" y2={y} stroke={dark ? "rgba(232,224,212,.04)" : "rgba(26,22,20,.04)"} strokeWidth="1" />)}
        {pts.map((p) => <text key={p.id} x={p.x} y={p.y} fontSize={p.size} fontWeight="500" fill={p.color} opacity={p.opacity} fontFamily="-apple-system,system-ui,sans-serif">{p.word}</text>)}
        <defs>
          <linearGradient id="fl" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={bg} stopOpacity="1" /><stop offset="8%" stopColor={bg} stopOpacity="0" /></linearGradient>
          <linearGradient id="fr" x1="0" y1="0" x2="1" y2="0"><stop offset="92%" stopColor={bg} stopOpacity="0" /><stop offset="100%" stopColor={bg} stopOpacity="1" /></linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#fl)" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#fr)" />
      </svg>
    </div>
  )
}

function Blog({ dark }: { dark: boolean }) {
  return (
    <section id="blog" className="wrap">
      <h2>Writing</h2>
      <WritingCanvas dark={dark} />
      <div className="g3">
        {POSTS.map((p) => (
          <div key={p.title} className="bc" onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--ac)")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--bd)")}>
            <div className="bc-img">{p.icon}</div>
            <div className="bc-body">
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ac)", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 4 }}>{p.cat}</div>
              <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, marginBottom: 5 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: "var(--tx2)", lineHeight: 1.5, marginBottom: 6 }}>{p.desc}</div>
              <div style={{ fontSize: 11, color: "var(--tx3)" }}>{p.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", msg: "" })
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [sending, setSending] = useState(false)
  const inp = { fontSize: 13, padding: "8px 10px", borderRadius: 7, border: "1px solid var(--bd2)", background: "var(--s1)" as const, color: "var(--tx)" as const, fontFamily: "inherit", outline: "none", width: "100%" } as const

  async function submit() {
    if (!form.name || !form.email || !form.msg) { setStatus({ ok: false, text: "Fill in name, email, and message." }); return }
    setSending(true); setStatus(null)
    await new Promise((r) => setTimeout(r, 700))
    setStatus({ ok: true, text: "Message sent. Vaibhav will get back to you soon." })
    setForm({ name: "", email: "", subject: "", msg: "" }); setSending(false)
  }

  return (
    <section id="contact" className="wrap">
      <h2>Get in touch</h2>
      <div className="g2 cf-grid">
        <div>
          {[["✉", "Email", "teamstartuprunash@gmail.com"], ["📱", "Phone", "+91 89877 24121"], ["📍", "Location", "Bokaro, Jharkhand, India"], ["💼", "LinkedIn", "linkedin.com/in/rammurmu"], ["🐙", "GitHub", "github.com/rammurmu"], ["🌐", "Site", "rammurmu.runash.in"]].map(([icon, label, val]) => (
            <div key={label} className="ci-row">
              <span style={{ fontSize: 15, color: "var(--ac)", flexShrink: 0, marginTop: 2 }}>{icon}</span>
              <div><div style={{ fontSize: 10, color: "var(--tx3)", marginBottom: 1 }}>{label}</div><div style={{ fontSize: 13 }}>{val}</div></div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <input style={inp} type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <input style={inp} type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} />
          <textarea style={{ ...inp, resize: "vertical" }} rows={4} placeholder="What would you like to discuss?" value={form.msg} onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))} />
          <button className="bp" onClick={submit} disabled={sending} style={{ padding: 9, opacity: sending ? 0.5 : 1 }}>{sending ? "Sending…" : "Send message"}</button>
          {status && <div style={{ fontSize: 12, padding: "7px 10px", borderRadius: 7, background: status.ok ? "rgba(52,211,153,.12)" : "rgba(248,113,113,.12)", color: status.ok ? "#059669" : "#dc2626" }}>{status.text}</div>}
        </div>
      </div>
    </section>
  )
}

function OpenClaw({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [msgs, setMsgs] = useState<OcMsg[]>([{ role: "bot", text: "Hi — I’m OpenClaw, Vaibhav’s personal AGI. I know the Murmu family story, RunAsh AI, business strategy, and operations context. Ask anything about the company or the journey." }])
  const [inp, setInp] = useState("")
  const [loading, setLoading] = useState(false)
  const [hist, setHist] = useState<{ role: string; content: string }[]>([])
  const msgsRef = useRef<HTMLDivElement>(null)
  const inpRef = useRef<HTMLInputElement>(null)

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight }, [msgs, loading])
  useEffect(() => { if (open) setTimeout(() => inpRef.current?.focus(), 220) }, [open])

  async function send() {
    const txt = inp.trim(); if (!txt || loading) return
    setInp(""); setLoading(true)
    const nh = [...hist, { role: "user", content: txt }]; setHist(nh)
    setMsgs((m) => [...m, { role: "user", text: txt }])
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nh, system: OC_SYS, stream: false }) })
      const d = await r.json()
      const reply: string = d.content?.[0]?.text || "Something went wrong."
      setHist([...nh, { role: "assistant", content: reply }])
      setMsgs((m) => [...m, { role: "bot", text: reply }])
    } catch { setMsgs((m) => [...m, { role: "bot", text: "Connection error — try again." }]) }
    setLoading(false)
  }

  const chips = ["Who is Vaibhav Murmu?", "What is RunAsh AI building?", "Tell me about the Murmu family story", "What does Vaibhav focus on?"]

  return (
    <>
      {!open && <button className="oc-fab" onClick={() => setOpen(true)}>✦ OpenClaw</button>}
      <div className={`oc-drawer${open ? " open" : ""}`} role="dialog" aria-label="OpenClaw AI" aria-modal="true">
        <div className="oc-head">
          <div className="oc-av">✦</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500 }}>OpenClaw</div><div style={{ fontSize: 10, color: "var(--tx3)" }}>Vaibhav’s personal AGI</div></div>
          <button className="oc-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>
        <div ref={msgsRef} className="oc-msgs">
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
              <div className="oc-av" style={{ fontSize: 10 }}>{m.role === "bot" ? "✦" : "↑"}</div>
              <div className={m.role === "bot" ? "oc-bub-b" : "oc-bub-u"}>
                {m.text}
                {i === 0 && <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 7 }}>{chips.map((c) => <button key={c} className="chip" onClick={() => { setInp(c); setTimeout(send, 50) }}>{c}</button>)}</div>}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
              <div className="oc-av" style={{ fontSize: 10 }}>✦</div>
              <div className="oc-bub-b" style={{ display: "flex", gap: 3, padding: "10px 12px" }}>
                {[1, 2, 3].map((n) => <span key={n} style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--tx3)", display: "inline-block" }} className={`dot-${n}`} />)}
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: "10px 12px", borderTop: "1px solid var(--bd)", display: "flex", gap: 6, flexShrink: 0 }}>
          <input ref={inpRef} className="oc-inp" value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send() }} placeholder="Ask about Vaibhav or RunAsh…" />
          <button className="oc-send" onClick={send} disabled={loading || !inp.trim()}>↑</button>
        </div>
      </div>
    </>
  )
}

export default function Page() {
  const [dark, setDark] = useState(true)
  const [ocOpen, setOcOpen] = useState(false)

  useEffect(() => { document.documentElement.setAttribute("data-theme", dark ? "dark" : "light") }, [dark])

  return (
    <>
      <style>{CSS}</style>
      <span className="sr">Vaibhav Murmu — Founder and CFO of RunAsh AI. Portfolio with 5-generation family tree, skills, projects, résumé, story, blog, contact, and OpenClaw AI.</span>
      <NavBar dark={dark} toggleTheme={() => setDark((d) => !d)} openOC={() => setOcOpen(true)} />
      <section id="hero"><Hero openOC={() => setOcOpen(true)} /></section>
      <Rule />
      <section id="about"><About /></section>
      <Rule />
      <section id="projects"><Projects /></section>
      <Rule />
      <Skills dark={dark} />
      <Rule />
      <Resume />
      <Rule />
      <FamilyTree dark={dark} />
      <Rule />
      <Story />
      <Rule />
      <Blog dark={dark} />
      <Rule />
      <Contact />
      <footer>
        Vaibhav Murmu · RunAsh AI · Bokaro, Jharkhand · <span style={{ color: "var(--ac)" }}>teamstartuprunash@gmail.com</span>
        <div style={{ marginTop: 6, fontSize: 11 }}>
          <span style={{ color: "var(--tx3)" }}>Co-founders: </span>
          <span style={{ color: "var(--tx2)" }}>Ram Murmu (CEO) · Puja K Murmu (Marketing) · Nirali Murmu (CS)</span>
        </div>
        <div style={{ marginTop: 4, fontSize: 11 }}>
          <span style={{ color: "var(--tx3)" }}>Parents: </span>
          <span style={{ color: "var(--tx2)" }}>Sanu Murmu (Father) · Biraji D Murmu (Mother)</span>
        </div>
      </footer>
      <OpenClaw open={ocOpen} setOpen={setOcOpen} />
    </>
  )
}
