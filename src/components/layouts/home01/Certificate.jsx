import React, { Component } from 'react';
// Logos
import udemy from '../../../assets/images/logo/udemy.png';
import istqb from '../../../assets/images/logo/istqb.png';
import iabac from '../../../assets/images/logo/iabac.png';
import upgrad from '../../../assets/images/logo/upgrad.png';
import salesforce from '../../../assets/images/logo/salesforce.png';
import mongo from '../../../assets/images/logo/mongodb.png'; // Add MongoDB logo in your assets if available
import microverse from '../../../assets/images/logo/microverse.png'; // Add Microverse logo in your assets if available
// import edwisor from '../../../assets/images/logo/edwisor.png'; // Add edWisor logo in your assets if available

class Certificate extends Component {
    state = {
        items: [
            { id: 'sf-jsd1', title: 'Salesforce JavaScript Developer I', issuer: 'Salesforce', issued: 'Jun 2025', badge: 'Certification', icon: salesforce },
            { id: 'mongo-basics', title: 'M001: MongoDB Basics', issuer: 'MongoDB University', issued: 'Mar 2021', badge: 'Course', icon: mongo },
            { id: 'istqb', title: 'ISTQB Foundation Level', issuer: 'ISTQB', issued: 'Dec 2018', badge: 'Certification', icon: istqb },
            { id: 'mern', title: 'MERN Fullstack Project (Udemy)', issuer: 'Udemy', issued: 'Sep 2023', badge: 'Course', icon: udemy },
            { id: 'mv-js', title: 'Microverse JavaScript Module', issuer: 'Microverse', issued: 'Aug 2020', badge: 'Module', icon: microverse },
            { id: 'mv-rails', title: 'Microverse Ruby on Rails', issuer: 'Microverse', issued: 'Aug 2020', badge: 'Module', icon: microverse },
            { id: 'mv-db', title: 'Microverse Ruby/Databases', issuer: 'Microverse', issued: 'Aug 2020', badge: 'Module', icon: microverse },
            { id: 'edwisor', title: 'edWisor Project Completion', issuer: 'edWisor.com', issued: 'Oct 2019', badge: 'Project', icon: iabac },
            { id: 'iabac-ds', title: 'IABAC Certified Data Scientist', issuer: 'IABAC', issued: 'Apr 2019', badge: 'Certification', icon: iabac },
            { id: 'iabac-dsf', title: 'IABAC Data Science Foundation', issuer: 'IABAC', issued: 'Feb 2019', badge: 'Certification', icon: iabac },
            { id: 'upgrad', title: 'StartUP India Learning Program', issuer: 'upGrad', issued: 'Feb 2017', badge: 'Program', icon: upgrad },
        ],
    };

    dup = (arr, times = 2) => Array.from({ length: times }).flatMap(() => arr);

    initials = (text = "") => {
        const parts = String(text).trim().split(/\s+/);
        return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
    };

    Avatar = ({ icon, issuer, title }) => {
        if (icon) {
            return (
                <div className="avatar">
                    <img src={icon} alt="" loading="lazy" />
                </div>
            );
        }
        return <div className="avatar initials" aria-hidden>{this.initials(issuer || title)}</div>;
    };

    Card = ({ item }) => (
        <div className="card">
            {/* floating washout bubbles inside card */}
            <span className="bubble b1" aria-hidden />
            <span className="bubble b2" aria-hidden />
            <span className="bubble b3" aria-hidden />
            <div className="card-top">
                <this.Avatar icon={item.icon} issuer={item.issuer} title={item.title} />
                <div className="meta-wrap">
                    <div className="title" title={item.title}>{item.title}</div>
                    <div className="meta">
                        <span className="issuer">{item.issuer}</span>
                        {item.issued && <><span className="dot">•</span><span>{item.issued}</span></>}
                    </div>
                </div>
                <span className="badge">{item.badge}</span>
            </div>
        </div>
    );

    Row = ({ items, dir = 'ltr', speed = 32 }) => {
        const loopItems = this.dup(items, 2);
        return (
            <div className={`row ${dir === 'rtl' ? 'rtl' : 'ltr'}`} tabIndex={0} aria-label="Scrolling row (pause on hover or focus)">
                <div className="track" style={{ ['--duration']: `${speed}s` }}>
                    {loopItems.map((it, i) => (<this.Card key={`${it.id}-${i}`} item={it} />))}
                </div>
            </div>
        );
    };

    render() {
        const { items } = this.state;
        const row1 = items.slice(0);
        const row2 = items.slice(0);
        const row3 = items.slice(0);

        return (
            <div className="section slide-personal-Intro-fifth slide-dark bg-white">
                <style>{`
:root{
  --ink:#0b1220; --ink-2:#111827; --muted:#4b5563;
  --card:#ffffff; --line:rgba(15,23,42,.16);
  --soft:rgba(15,23,42,.06); --badge-bg:#eef2ff; --badge-ink:#1e1b4b;
  --edgeL:0%; --edgeR:0%;

  /* background palette */
  --bg1:#f8fbff;
  --bg2:#f4f6ff;
  --shapeA: rgba(99,102,241,.18);
  --shapeB: rgba(16,185,129,.18);
  --shapeC: rgba(14,165,233,.16);
  --shapeD: rgba(236,72,153,.14);

  /* card bubble palette */
  --cA: rgba(99,102,241,.22);
  --cB: rgba(16,185,129,.20);
  --cC: rgba(236,72,153,.20);
  --cD: rgba(59,130,246,.20);
  --glow:white;
}

#cert-marquee{
  position:relative;
  overflow:clip;
  background: radial-gradient(1200px 600px at 10% -10%, #ffffff 0%, var(--bg1) 60%, var(--bg2) 100%);
}

#cert-marquee .container{ max-width:1120px; margin:0 auto; padding:0 16px; position:relative; z-index:2; }
#cert-marquee{ padding:clamp(16px,3vw,36px) 0; color:var(--ink); }
#cert-marquee .head{ margin:0 0 16px; display:flex; align-items:end; justify-content:space-between; gap:12px; }
#cert-marquee .head h2{ margin:0; font-weight:800; letter-spacing:-.02em; color:var(--ink-2); font-size:clamp(1.3rem,2.4vw,1.9rem); }

/* rows wrapper */
.rows{ display:grid; gap:24px; position:relative; z-index:2; }
.rows-bleed{
  width:100vw; position:relative; left:50%; right:50%; margin-left:-50vw; margin-right:-50vw;
  padding-left:16px; padding-right:16px;
}

/* ---------- Geometric Page Background (behind rows) ---------- */
.geo-bg{
  position:absolute; inset:0;
  z-index:1;
  pointer-events:none;
}
.geo-bg::before{
  content:""; position:absolute; inset:-2px; opacity:.5;
  background-image:
    url("data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>\
<defs>\
  <pattern id='p' width='40' height='40' patternUnits='userSpaceOnUse'>\
    <circle cx='6' cy='6' r='1.6' fill='rgba(99,102,241,0.18)'/>\
    <circle cx='26' cy='22' r='1.2' fill='rgba(16,185,129,0.18)'/>\
    <path d='M30 6 l6 10 h-12 z' fill='rgba(14,165,233,0.12)'/>\
  </pattern>\
</defs>\
<rect width='100%' height='100%' fill='url(%23p)'/>\
</svg>");
  background-size: 280px 280px;
  filter: saturate(1.05);
  animation: pattern-drift 40s linear infinite;
}
.shape{ position:absolute; border-radius:24px; filter: blur(0.2px); will-change: transform; }
.shape.s1{ width:220px; height:220px; left:-60px; top:10%;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.65), transparent 60%), var(--shapeA);
  border-radius:999px; animation: float-a 22s ease-in-out infinite, spin-slow 96s linear infinite; }
.shape.s2{ width:180px; height:180px; right:10%; top:18%;
  background: linear-gradient(135deg, rgba(255,255,255,.55), transparent 60%), var(--shapeB);
  transform: rotate(45deg);
  animation: float-b 26s ease-in-out infinite 1s, wobble 18s ease-in-out infinite; }
.shape.s3{ width:320px; height:120px; left:16%; bottom:8%;
  background: linear-gradient(90deg, rgba(255,255,255,.5), transparent 70%), var(--shapeC);
  border-radius:80px; animation: float-c 28s ease-in-out infinite .5s; }
.shape.s4{ width:120px; height:120px; right:-40px; bottom:12%;
  background: radial-gradient(circle at 70% 30%, rgba(255,255,255,.55), transparent 55%), var(--shapeD);
  border-radius:999px; animation: float-d 20s ease-in-out infinite; opacity:.9; }

/* ---------- Rows & Marquee ---------- */
.row{
  position:relative; overflow:clip; clip-path: inset(0 round 16px); isolation:isolate;
  border-radius:16px; border:1px solid var(--line);
  background:linear-gradient(180deg,#fff,#fbfbff);
  box-shadow:0 6px 18px var(--soft);
  padding:16px 0;
  -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,1) var(--edgeL), rgba(0,0,0,1) calc(100% - var(--edgeR)));
          mask-image: linear-gradient(90deg, rgba(0,0,0,1) var(--edgeL), rgba(0,0,0,1) calc(100% - var(--edgeR)));
}
.row:hover, .row:focus { outline:2px solid #c7d2fe; outline-offset:2px; }

.track{
  display:flex; gap:12px; align-items:center; width:max-content;
  will-change: transform; transform: translateX(0);
  animation: scroll-ltr var(--duration, 30s) linear infinite;
}
.row.rtl .track{ animation-name: scroll-rtl; }
.row:hover .track, .row:focus .track{ animation-play-state: paused; }

/* ---------- Card with Washout Bubbles ---------- */
.card{
  position:relative; overflow:hidden; flex:0 0 auto;
  width:auto; inline-size:max-content; max-inline-size:420px; min-inline-size:180px;
  margin-inline:2px; background:var(--card);
  border:1px solid var(--line); border-radius:14px; box-shadow:0 4px 12px var(--soft);
  padding:12px; min-height:92px; display:flex; align-items:center;
  transition: transform .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease;
  will-change: transform;
}
.card:hover{
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0,0,0,.12);
  background: linear-gradient(180deg,#fff,#fafbff);
  border-color: rgba(59,130,246,.22);
}

/* Big soft color wash behind content */
.card::before{
  content:""; position:absolute; inset:-40%;
  background:
    radial-gradient(220px 220px at 18% 22%, var(--cA), transparent 60%),
    radial-gradient(240px 240px at 84% 78%, var(--cB), transparent 60%),
    radial-gradient(160px 160px at 70% 18%, var(--cC), transparent 60%);
  filter: blur(12px) saturate(1.05);
  opacity:.55; transform: scale(.92) rotate(0deg);
  transition: transform .45s ease, opacity .45s ease, filter .45s ease;
  z-index:0;
}
.card:hover::before{
  transform: scale(1.05) rotate(3deg);
  opacity:.82; filter: blur(10px) saturate(1.18);
}

/* Sheen swipe on hover */
.card::after{
  content:""; position:absolute; inset:-1px;
  background: linear-gradient(120deg, rgba(255,255,255,0) 35%, rgba(255,255,255,.35) 50%, rgba(255,255,255,0) 65%);
  transform: translateX(-120%) rotate(.5deg);
  transition: transform .9s ease;
  pointer-events:none; opacity:.35;
}
.card:hover::after{ transform: translateX(120%) rotate(.5deg); }

/* floating bubble elements */
.bubble{
  position:absolute; border-radius:999px; filter: blur(6px);
  opacity:.40; z-index:0; mix-blend-mode: screen;
  will-change: transform, opacity;
}
.bubble.b1{
  width:160px; height:160px; left:-30px; top:-30px;
  background: radial-gradient(circle at 30% 30%, var(--glow), rgba(255,255,255,0) 60%), var(--cD);
  animation: bubble-float-a 12s ease-in-out infinite;
}
.bubble.b2{
  width:120px; height:120px; right:-24px; bottom:-18px;
  background: radial-gradient(circle at 35% 35%, var(--glow), rgba(255,255,255,0) 60%), var(--cB);
  animation: bubble-float-b 13s ease-in-out infinite .4s;
}
.bubble.b3{
  width:90px; height:90px; left:55%; top:10%;
  background: radial-gradient(circle at 40% 40%, var(--glow), rgba(255,255,255,0) 60%), var(--cC);
  animation: bubble-float-c 11s ease-in-out infinite .2s;
}
.card:hover .bubble{ opacity:.55; filter: blur(5px); }

/* keep content above visuals */
.card-top{ position:relative; z-index:1; width:100%; display:grid; grid-template-columns:auto 1fr auto; align-items:center; gap:10px; }

/* avatar & text */
.avatar{
  width:40px;height:40px;border-radius:50%;display:grid;place-items:center; overflow:hidden;
  border:1px solid rgba(0,0,0,.12); background:#f3f4f6; flex:none;
}
.avatar img{ width:100%; height:100%; object-fit:cover; display:block; }
.avatar.initials{
  font-weight:800;font-size:.88rem;letter-spacing:.02em;color:#0b1220;
  background:linear-gradient(135deg, rgba(99,102,241,.22), rgba(16,185,129,.22));
}

.meta-wrap .title{
  font-weight:800; letter-spacing:-.01em; font-size:1rem; line-height:1.2; color:var(--ink);
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
.meta{
  display:flex; gap:8px; align-items:center; font-size:.9rem; color:var(--muted); flex-wrap: wrap;
}
.meta .dot{ opacity:.55; }
.issuer{ max-width:22ch; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

.badge{
  font-size:.72rem; padding:6px 8px; border-radius:999px;
  background:var(--badge-bg); color:var(--badge-ink);
  border:1px solid rgba(30,27,75,.18); white-space:nowrap;
}

/* ---------- Animations ---------- */
@keyframes scroll-ltr { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes scroll-rtl { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
@keyframes pattern-drift { 0% { background-position: 0 0; } 100% { background-position: 320px 160px; } }

@keyframes float-a { 0%,100%{ transform: translateY(-4px) } 50%{ transform: translateY(10px) } }
@keyframes float-b { 0%,100%{ transform: translateY(6px) rotate(45deg) } 50%{ transform: translateY(-12px) rotate(45deg) } }
@keyframes float-c { 0%,100%{ transform: translate(0, 4px) } 50%{ transform: translate(6px, -8px) } }
@keyframes float-d { 0%,100%{ transform: translateY(2px) } 50%{ transform: translateY(-10px) } }
@keyframes spin-slow { from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }
@keyframes wobble { 0%,100%{ transform: rotate(43deg) } 50%{ transform: rotate(47deg) } }

/* card bubbles subtle float */
@keyframes bubble-float-a { 0%,100%{ transform: translate(0,0) } 50%{ transform: translate(8px,10px) } }
@keyframes bubble-float-b { 0%,100%{ transform: translate(0,0) } 50%{ transform: translate(-10px,-8px) } }
@keyframes bubble-float-c { 0%,100%{ transform: translate(0,0) } 50%{ transform: translate(6px,-6px) } }

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
  .track{ animation-duration: 120s; }
  .geo-bg::before, .shape, .bubble, .card::after, .card::before{ animation: none !important; transition: none !important; }
}

/* ---------- Responsive ---------- */
@media (max-width: 640px){
  :root{ --edgeL:6%; --edgeR:6%; }
  #cert-marquee{ background: radial-gradient(900px 450px at 5% -10%, #ffffff 0%, var(--bg1) 60%, var(--bg2) 100%); }
  .geo-bg::before{ opacity:.38; }

  .rows{ gap:14px; }
  .row{ padding:10px 0; }
  .track{ gap:10px; }

  .card{
    padding:0.6rem; min-height:4.2rem;
    max-inline-size: 85vw; min-inline-size: 72vw;
  }
  .card::before{ opacity:.45; filter: blur(10px); }
  .bubble{ opacity:.34; filter: blur(7px); }

  .avatar{ width:1.8rem; height:1.8rem; }
  .meta-wrap .title{ font-size:clamp(0.85rem, 3.2vw, 1rem); line-height:1.25; }
  .meta{ font-size:clamp(0.7rem, 2.6vw, 0.9rem); gap:0.4rem; }
  .badge{ padding:0.25rem 0.45rem; font-size:clamp(0.68rem, 2.3vw, 0.8rem); }
  .meta-wrap .title, .issuer{ overflow-wrap:anywhere; }
  .row .track{ animation-duration: calc(var(--duration, 30s) * 1.6); }
}

@media (max-width: 480px){
  :root{ --edgeL:8%; --edgeR:8%; }
  .card{
    padding:0.55rem; min-height:3.8rem;
    max-inline-size: 92vw; min-inline-size: 78vw;
  }
  .avatar{ width:1.7rem; height:1.7rem; }
  .meta-wrap .title{ font-size:clamp(0.84rem, 3.8vw, 0.95rem); }
  .meta{ font-size:clamp(0.68rem, 3.2vw, 0.85rem); }
  .badge{ font-size:clamp(0.66rem, 2.9vw, 0.78rem); }
}
        `}</style>

                <section id="cert-marquee" className="flat-Certificate">
                    {/* Geometric background layer */}
                    <div className="geo-bg" aria-hidden>
                        <span className="shape s1" />
                        <span className="shape s2" />
                        <span className="shape s3" />
                        <span className="shape s4" />
                    </div>

                    <div className="container">
                        <header className="head">
                            <h2>Certificates & Courses</h2>
                        </header>
                    </div>

                    <div className="rows rows-bleed">
                        <this.Row items={row1} dir="ltr" speed={34} />
                        <this.Row items={row2} dir="rtl" speed={30} />
                        <this.Row items={row3} dir="ltr" speed={36} />
                    </div>
                </section>
            </div>
        );
    }
}

export default Certificate;
