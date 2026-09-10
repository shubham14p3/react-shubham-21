import { lazy, Suspense, useEffect, useRef, useState } from "react";
import profile from "../../data/profile.json";
import portrait from "../../assets/images/section/03.png";
import testimonials from "../layouts/home01/testimonial/testimonialsData";
import Icon from "../studio/Icon";
import InterfaceLab from "../studio/InterfaceLab";
import DetailDialog from "../studio/DetailDialog";
import { caseStudies } from "../studio/caseStudies";

const RepositoryExplorer = lazy(() => import("../studio/RepositoryExplorer"));
const resumeUrl = "/shubham-raj-resume.pdf";
const navigation = [{ label: "Work", id: "work" }, { label: "Experience", id: "experience" }, { label: "About", id: "about" }, { label: "Contact", id: "contact" }];
const excerpts = [
  "His ability to turn complex user requirements into clean, efficient, and intuitive interfaces is exceptional.",
  "Shubham's strong technical skills, combined with his collaborative and positive attitude, make him an invaluable asset to any team.",
  "Shubham Raj’s professionalism and healthy perfectionism always motivated me to do my own part of the job better.",
  "When I was available he had just solved the problem, I was so impressed with his solution, he is a talented guy and when he is stuck he is ready to ask for help.",
  "Shubham is a fantastic skilled person & there was a lot to learn from him.",
  "Shubham has been a good teammate at microverse, he doesn't hesitate to help people when having doubts or questions.",
  "He is always capable of adapting to new working environments. Shubham worked far beyond the call of duty.",
  "He improves any team he joins and it would be great working with him again.",
];

function SectionLabel({ number, children }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-18% 0px -60% 0px", threshold: 0 });
    navigation.forEach(item => { const section = document.getElementById(item.id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOutside = event => { if (!headerRef.current?.contains(event.target)) setMenuOpen(false); };
    const closeOnEscape = event => { if (event.key === "Escape") { setMenuOpen(false); menuRef.current?.focus(); } };
    const desktop = window.matchMedia("(min-width: 801px)");
    const closeOnDesktop = event => { if (event.matches) setMenuOpen(false); };
    if (menuOpen) { document.addEventListener("pointerdown", closeOutside); document.addEventListener("keydown", closeOnEscape); }
    desktop.addEventListener("change", closeOnDesktop);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeOnEscape); desktop.removeEventListener("change", closeOnDesktop); };
  }, [menuOpen]);

  return <header className="studio-header" ref={headerRef}>
    <div className="shell header-inner">
      <a className="wordmark" href="#home" aria-label="Shubham Raj, back to top" onClick={() => setMenuOpen(false)}><span className="wordmark-symbol">sr<span>.</span></span><span>Shubham Raj<span className="wordmark-role">Engineer with an eye for design</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>{item.label}</a>)}</nav>
      <div className="header-actions"><a className="header-resume" href={resumeUrl} download="Shubham-Raj-Resume.pdf">Résumé <Icon name="download" size={16} /></a><button ref={menuRef} type="button" className="icon-button menu-toggle" aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button></div>
    </div>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen}>{navigation.map((item, index) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}<Icon name="diagonal" /></a>)}</nav>
  </header>;
}

function Hero() {
  return <section id="home" className="hero-section shell" aria-labelledby="hero-title">
    <div className="hero-content">
      <p className="eyebrow hero-intro"><span className="intro-line" /> Shubham Raj · Senior Frontend Engineer</p>
      <h1 id="hero-title">Built to work.<br />Made to<br /><em>feel right.</em></h1>
      <p className="hero-description">I turn complex products into clear, considered interfaces. <strong>6+ years</strong> of connecting thoughtful design with dependable React engineering.</p>
      <div className="hero-actions"><a className="button button-lime" href="#work">Explore my work <Icon name="diagonal" /></a><a className="button button-quiet" href={resumeUrl} download="Shubham-Raj-Resume.pdf">Download résumé <Icon name="download" size={18} /></a></div>
      <div className="hero-location"><span className="availability-dot" /><span>Open to the right opportunity</span><span className="hero-location-divider">/</span><span>Based in Mexico City</span></div>
    </div>
    <InterfaceLab />
    <div className="hero-bottom"><span>Design-minded. Detail-driven. Human-first.</span><a href="#work">Scroll to explore <span aria-hidden="true">↓</span></a></div>
  </section>;
}

function ClientStrip() {
  return <div className="client-strip"><div className="shell client-inner"><p>Enterprise client experience<span>Through Infosys & Capgemini</span></p><div className="client-names" aria-label="Clients: Visa, Citi, Discover, Abu Dhabi Bank"><span className="client-visa">VISA</span><span className="client-citi">citi</span><span className="client-discover">DISCOVER</span><span className="client-adb">Abu Dhabi<br />Bank</span></div></div></div>;
}

function Work({ onSelect }) {
  return <section id="work" className="section-pad shell" aria-labelledby="work-title">
    <SectionLabel number="01">Selected work</SectionLabel>
    <div className="section-heading"><h2 id="work-title">Big challenges.<br /><em>Thoughtful solutions.</em></h2><p>Real contributions to products where clarity, consistency, and performance matter.</p></div>
    <div className="featured-work">
      {caseStudies.slice(0, 2).map(item => <article className={`work-card work-${item.id}`} key={item.id}>
        <button className="work-visual" type="button" onClick={() => onSelect(item)} aria-label={`Read ${item.client} case study`}>
          <span className="work-visual-top"><span>{item.client}</span><span>{item.number} / {item.type}</span></span>
          {item.id === "citi" ? <div className="performance-visual"><div className="performance-number">40<span>%</span></div><span className="performance-caption">better page load performance</span><div className="performance-track"><span>Less friction</span><div aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><span>More flow</span></div></div> : <div className="system-visual"><div className="system-eyebrow">A shared design language</div><div className="system-components"><span className="system-button">Continue <Icon name="arrow" size={17} /></span><span className="system-toggle" aria-hidden="true"><i /></span><span className="system-avatar">SR</span></div><div className="system-input"><span>Consistent by design</span><Icon name="check" size={16} /></div><div className="system-type"><span>Aa</span><div><b>Components → Products</b><span>One considered foundation.</span></div></div></div>}
          <span className="work-visual-bottom"><span>{item.id === "citi" ? "Code splitting · State optimization" : "Reusable UI · Shared architecture"}</span><span className="circle-arrow"><Icon name="diagonal" /></span></span>
        </button>
        <div className="work-caption"><div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3><button className="work-title-button" type="button" onClick={() => onSelect(item)}>{item.title}<Icon name="diagonal" /></button></h3><p>{item.description}</p></div>
      </article>)}
    </div>
    <button className="work-wide" type="button" onClick={() => onSelect(caseStudies[2])}><span className="work-wide-index">03</span><div><span className="eyebrow">Discover & Abu Dhabi Bank · Capgemini</span><h3>Built once. Better everywhere.</h3></div><span className="work-wide-metric"><b>50+</b><span>features delivered</span></span><span className="circle-arrow"><Icon name="diagonal" /></span></button>
    <p className="work-disclosure">Public summaries of my contributions. Client interfaces and source code remain confidential; visuals above illustrate the work.</p>
  </section>;
}

function Experience() {
  return <section id="experience" className="experience-section section-pad" aria-labelledby="experience-title"><div className="shell experience-layout">
    <div className="experience-intro"><SectionLabel number="02">The journey</SectionLabel><h2 id="experience-title">A builder’s<br /><em>trajectory.</em></h2><p>From testing the details to shaping the whole experience. Every role added a new way to think.</p><div className="experience-stat"><strong>6+</strong><span>years of professional<br />software experience</span></div><a className="text-link" href={resumeUrl} download="Shubham-Raj-Resume.pdf">The full story, in a PDF <Icon name="download" size={18} /></a></div>
    <div className="career-timeline">{profile.roles.map((role, index) => <details className="career-item" key={role.company} open={index === 0 ? true : undefined}>
      <summary><span className="career-index">0{index + 1}</span><span className="career-summary"><span className="career-date">{role.dates}{index === 0 && <span className="current-pill">Current</span>}</span><span className="career-company">{role.company}</span><span className="career-role">{role.title}</span></span><span className="career-expand"><Icon name="plus" /></span></summary>
      <div className="career-details"><p className="career-clients">{role.clients}<span>{role.location}</span></p><p>{role.summary}</p><ul>{role.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><div className="tag-row">{role.stack.map(item => <span key={item}>{item}</span>)}</div></div>
    </details>)}</div>
  </div></section>;
}

function About() {
  return <section id="about" className="about-section section-pad" aria-labelledby="about-title"><div className="shell">
    <SectionLabel number="03">Beyond the code</SectionLabel>
    <div className="about-layout"><div className="portrait-wrap"><img src={portrait} alt="Shubham Raj outdoors wearing a yellow jacket" width="549" height="602" loading="lazy" decoding="async" /><span className="portrait-caption"><span>Shubham, away from the keyboard.</span><Icon name="location" size={18} /></span></div>
      <div className="about-copy"><h2 id="about-title">An engineer’s mind.<br /><em>A designer’s eye.</em></h2><p className="about-lead">I care about the space between “it works” and “it feels effortless.”</p><p>That means clear hierarchy, useful feedback, considered interactions, and components that hold up beyond the happy path. I bring that mindset to the enterprise products I build.</p><p>I’m currently in Mexico City with Infosys, working on Visa’s frontend ecosystem. Before that: banking experiences for Citi, Discover, and Abu Dhabi Bank.</p><div className="about-principles"><span>Clarity over clutter.</span><span>Craft in the details.</span><span>People before pixels.</span></div><a className="text-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Get to know me on LinkedIn <Icon name="diagonal" size={18} /></a></div>
    </div>
    <div className="toolkit"><div><h3>What I bring<br />to the table.</h3><p>A practical toolkit.<br />Used with intention.</p></div><div className="skill-rows">{profile.skillGroups.map((group, index) => <div className="skill-row" key={group.title}><span className="skill-index">0{index + 1}</span><div><h4>{group.title}</h4><p>{group.items.join(" · ")}</p></div></div>)}</div></div>
    <div id="education" className="education-row">{profile.education.map(item => <div key={item.school}><span className="eyebrow">{item.degree}</span><h3>{item.school}</h3>{item.dates && <span className="education-date">{item.dates}</span>}</div>)}</div>
    <details id="certificates" className="credentials"><summary><span>Certifications & continuous learning <span className="credential-count">{profile.certifications.length}</span></span><Icon name="plus" /></summary><div className="credential-list">{profile.certifications.map(item => <div key={item.name}><div><strong>{item.name}</strong><span>{item.issuer} · {item.type}</span></div><span>{item.date}</span></div>)}</div></details>
  </div></section>;
}

function Recommendations({ onSelect }) {
  const [index, setIndex] = useState(0);
  const person = testimonials[index];
  return <section id="testimonials" className="recommendation-section section-pad shell" aria-labelledby="recommendations-title">
    <SectionLabel number="04">Good words from good people</SectionLabel><h2 id="recommendations-title" className="sr-only">Recommendations</h2>
    <div className="recommendation-layout"><span className="quote-mark" aria-hidden="true">“</span><div className="recommendation-body" aria-live="polite" aria-atomic="true"><blockquote>{excerpts[index]}</blockquote><div className="quote-attribution"><img src={person.img} alt="" width="48" height="48" loading="lazy" /><div><strong>{person.name}</strong><span>{person.headline}</span></div></div><button className="text-button quote-read" type="button" onClick={() => onSelect(person)}>Read full recommendation <Icon name="diagonal" size={17} /></button></div></div>
    <div className="recommendation-footer"><span>From recommendations shared on my portfolio</span><div className="quote-controls"><span>{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span><button type="button" className="icon-button previous-arrow" aria-label="Previous recommendation" onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}><Icon name="arrow" /></button><button type="button" className="icon-button" aria-label="Next recommendation" onClick={() => setIndex((index + 1) % testimonials.length)}><Icon name="arrow" /></button></div></div>
  </section>;
}

function Projects() {
  const [expanded, setExpanded] = useState(false);
  return <section id="portfolio" className="projects-section shell" aria-labelledby="projects-title"><details className="projects-disclosure" onToggle={event => setExpanded(event.currentTarget.open)}><summary><div><span className="eyebrow">Side projects & experiments</span><h2 id="projects-title">Curiosity, <em>in code.</em></h2><p>Explore my public GitHub projects.</p></div><span className="circle-arrow"><Icon name="plus" /></span></summary>{expanded && <Suspense fallback={<p className="repo-status" role="status">Opening project explorer…</p>}><RepositoryExplorer /></Suspense>}</details><a className="text-link all-code-link" href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">All code on GitHub <Icon name="diagonal" size={17} /></a></section>;
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus("Email address copied."); }
    catch { setCopyStatus("Copy is unavailable. Select the address above or use the email link."); }
  }
  return <footer id="contact" className="contact-section"><div className="shell">
    <SectionLabel number="05">Let’s make something matter</SectionLabel><div className="contact-top"><h2>Your next great<br />interface <em>starts here.</em></h2><a className="contact-round" href={`mailto:${profile.email}`} aria-label="Email Shubham Raj"><Icon name="diagonal" size={42} /></a></div>
    <div className="contact-bottom"><div className="contact-address"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="icon-button" type="button" onClick={copyEmail} aria-label="Copy email address"><Icon name={copyStatus === "Email address copied." ? "check" : "copy"} size={20} /></button><p className="copy-status" role="status">{copyStatus}</p></div><p className="contact-invite">Senior frontend & UI engineering opportunities.<br />Mexico City · Open to global conversations.</p></div>
    <div className="footer-links"><div><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Icon name="diagonal" size={15} /></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <Icon name="diagonal" size={15} /></a><a href="https://wa.me/918092766575" target="_blank" rel="noopener noreferrer">WhatsApp <Icon name="diagonal" size={15} /></a><a href={resumeUrl} download="Shubham-Raj-Resume.pdf">Résumé <Icon name="download" size={15} /></a></div><a href="#home">Back to top ↑</a></div>
    <div className="footer-colophon"><span>© {new Date().getFullYear()} Shubham Raj</span><span>Built with React. Finished with care.</span><div><a href="https://www.hackerrank.com/shubham14p3" target="_blank" rel="noopener noreferrer">HackerRank</a><a href="https://www.facebook.com/shubham14p3/" target="_blank" rel="noopener noreferrer">Facebook</a></div></div>
  </div></footer>;
}

export default function Home() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  useEffect(() => {
    document.title = "Shubham Raj — Senior Frontend Engineer";
    const aliases = { "#specilizing": "#experience", "#banner": "#home", "#recommendations": "#testimonials" };
    const id = aliases[window.location.hash] || window.location.hash;
    if (id) { try { document.getElementById(decodeURIComponent(id.slice(1)))?.scrollIntoView({ behavior: "instant" }); } catch { /* Ignore malformed incoming hashes. */ } }
  }, []);
  return <div className="studio-site"><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><ClientStrip /><Work onSelect={setSelectedCase} /><Experience /><About /><Recommendations onSelect={setSelectedRecommendation} /><Projects /></main><Contact />
    {selectedCase && <DetailDialog title={selectedCase.title} eyebrow={`${selectedCase.client} / ${selectedCase.employer}`} onClose={() => setSelectedCase(null)}><div className="tag-row">{selectedCase.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h3>The challenge</h3><p>{selectedCase.challenge}</p><h3>My contribution</h3><ul>{selectedCase.contributions.map(item => <li key={item}>{item}</li>)}</ul><h3>The result</h3><p>{selectedCase.outcome}</p><p className="dialog-disclosure">This is a public summary of my work. Client source code and proprietary interfaces are not included.</p></DetailDialog>}
    {selectedRecommendation && <DetailDialog title={selectedRecommendation.name} eyebrow="Full recommendation" onClose={() => setSelectedRecommendation(null)}><p className="recommendation-meta">{selectedRecommendation.headline}<br />{selectedRecommendation.meta}</p>{selectedRecommendation.text.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</DetailDialog>}
  </div>;
}
