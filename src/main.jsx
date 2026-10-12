import React from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./styles.css";

const ease = [0.22, 1, 0.36, 1];

const education = [
  { title: "Collège du Val d’Ardière", date: "2022 — 2026", detail: "Année scolaire" },
  { title: "Lycée Polyvalent Louis Armand — Campus Gleizé", date: "2025 — 2028", detail: "2nde MTNE (Métier Transition Numérique et Énergétique)", description: "Suivi d’un BAC PRO CIEL (Cybersécurité, Informatique et Réseaux, Électronique)." },
  { title: "BTS SIO — Option SISR", date: "2028 — 2030", detail: "Prochainement", future: true },
];

const experience = [
  { title: "Hartmann Group", date: "2024", detail: "Plateforme de transit — Belleville", description: "Découverte de l’entreprise et de ses différents services, prise de connaissance de son environnement. Stage de découverte, d’observation et d’étude." },
  { title: "Saint-Jean Industries", date: "2025", detail: "Plateforme de transit, gestion, conception et fabrication — Belleville", description: "Découverte de l’entreprise et de ses différents services, aide à la maintenance informatique. Stage de découverte, d’observation et d’étude." },
  { title: "Saint-Jean Industries", date: "2026", detail: "Plateforme de transit, gestion, conception et fabrication — Belleville", description: "Re-découverte de l’entreprise et de ses nouveaux services, de l’infrastructure réseaux et mise en place de serveurs et services informatiques sous forme de LABS. Stage de découverte, d’observation et de fonction." },
  { title: "2EFC ENERGIES", date: "2026", detail: "Entreprise générale de bâtiment (TCE)", description: "Découverte de l’entreprise, de son fonctionnement, de ses équipes. Travail apporté surtout dans la partie ELEC. Stage de fonction et de découverte." },
];

const projects = [
  { title: "WimEditorGUI", description: "Éditeur graphique de fichiers WIM (images Windows), basé sur les utilitaires intégrés Windows.", tag: "Python", href: "https://github.com/TiagAuCarre/WimEditorGUI" },
  { title: "campuskiwi-website", description: "Site web fictif pour l’école de RP Campus Kiwi de Beaujeu, en glassmorphism avec canvas animé.", tag: "Web", href: "https://github.com/TiagAuCarre/campuskiwi-website" },
  { title: "iperf-gui", description: "Interface graphique Python simple pour piloter iPerf et tester les performances réseau.", tag: "Python", href: "https://github.com/TiagAuCarre/iperf-gui" },
  { title: "iperf-cmd", description: "Scripts batch pour automatiser des tests de débit réseau avec iPerf en ligne de commande.", tag: "Batch", href: "https://github.com/TiagAuCarre/iperf-cmd" },
  { title: "pronote-rp-campuskiwi", description: "Reprise fictive de l’interface Pronote pour le projet de RP Campus Kiwi de Beaujeu.", tag: "Web", href: "https://github.com/TiagAuCarre/pronote-rp-campuskiwi" },
];

function Icon({ name, size = 18 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (name === "arrow") return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
  if (name === "external") return <svg {...props}><path d="M14 3h7v7M10 14 21 3" /><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></svg>;
  if (name === "mail") return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  if (name === "phone") return <svg {...props}><path d="M21 16.5v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.8 2 2 0 0 1 3.1 1.6h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7 9.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" /></svg>;
  if (name === "github") return <svg {...props}><path d="M9 19c-4.3 1.3-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.5a5 5 0 0 0-1.3-3.5 4.6 4.6 0 0 0-.1-3.5s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C5.3 1.6 4.1 2 4.1 2A4.6 4.6 0 0 0 4 5.5a5 5 0 0 0-1.3 3.5c0 5 3.2 6.2 6.2 6.5a3.4 3.4 0 0 0-.9 2.6V22" /></svg>;
  return null;
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : delay, ease }}>{children}</motion.div>;
}

function Heading({ index, kicker, title, note }) {
  return <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-number">{index}</span>{kicker}</div><h2>{title}</h2></div>{note && <p className="section-note">{note}</p>}</div>;
}

function ClayObject({ className, label, children, constraints }) {
  const reduce = useReducedMotion();
  return <motion.div className={`clay-object ${className}`} role="img" aria-label={label} drag={!reduce} dragConstraints={constraints} dragElastic={0.18} dragMomentum={false} dragTransition={{ bounceStiffness: 340, bounceDamping: 19 }} whileDrag={reduce ? undefined : { scale: 1.06, rotate: -4, zIndex: 5 }} whileHover={reduce ? undefined : { y: -4, rotate: 3 }} transition={{ type: "spring", stiffness: 360, damping: 18 }}>{children}</motion.div>;
}

function ClayStudio() {
  const reduce = useReducedMotion();
  const stageRef = React.useRef(null);
  return <div ref={stageRef} className="clay-stage" aria-label="Illustration décorative avec des objets en argile déplaçables"><div className="stage-crosshair crosshair-a" /><div className="stage-crosshair crosshair-b" /><div className="stage-caption"><span className="live-dot" /> NETWORK / LABS <span>OBJETS INTERACTIFS</span></div>
    <div className="portrait-wrap"><img className="portrait" src="/photo.png" alt="Portrait de Tiago Meira" /><span className="portrait-halftone" /><span className="portrait-frame" /><span className="portrait-label">PORTRAIT / TM—01</span></div>
    <ClayObject constraints={stageRef} className="clay-router" label="Objet décoratif en argile, déplaçable"><div className="router-top"><i /><i /><i /></div><div className="router-face"><svg viewBox="0 0 130 92" aria-hidden="true"><path d="M65 15v25M28 61l22-13M102 61 80 48M28 61h74" /><circle cx="65" cy="16" r="7" /><circle cx="27" cy="63" r="7" /><circle cx="103" cy="63" r="7" /><circle cx="65" cy="42" r="9" /></svg><span className="router-word">LINK / 03</span></div><div className="router-foot"><span>01</span><span>NET / CORE</span></div></ClayObject>
    <ClayObject constraints={stageRef} className="clay-token token-orange" label="Pastille orange en argile, déplaçable"><span>+</span></ClayObject><ClayObject constraints={stageRef} className="clay-token token-stone" label="Pastille claire en argile, déplaçable"><span /></ClayObject>
    {!reduce && <motion.div className="stage-orbit" animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} />}
    <div className="stage-index">FIG. 01 <span>—</span> HOMELAB STUDY</div>
  </div>;
}

function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const links = [["À propos", "about"], ["Compétences", "skills"], ["Formation", "education"], ["Expérience", "experience"], ["Projets", "projects"]];
  return <motion.header className={`site-header ${scrolled ? "is-scrolled" : ""}`} initial={reduce ? false : { opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .55, ease }}><div className="nav-shell">
    <a className="brand" href="#top" aria-label="Tiago Meira, accueil"><span className="brand-stamp">TM</span><span>TIAGO<span className="brand-muted">MEIRA</span></span></a>
    <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Navigation principale">{links.map(([label, id], i) => <motion.a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} whileHover={reduce ? undefined : { y: -2 }} transition={{ duration: .2 }}>{label}<span className="nav-num">0{i + 1}</span></motion.a>)}</nav>
    <motion.a className="nav-contact" href="mailto:tiago.meira@studentmail.fr" whileHover={reduce ? undefined : { scale: 1.035 }} whileTap={reduce ? undefined : { scale: .97 }}>Écrire un message <Icon name="arrow" size={15} /></motion.a>
    <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
  </div></motion.header>;
}

function Timeline({ items }) {
  return <div className="timeline">{items.map((item, i) => <Reveal key={`${item.title}-${item.date}`} delay={i * .05}><motion.article className={`timeline-card panel ${item.future ? "is-future" : ""}`} whileHover={{ x: 5 }} transition={{ duration: .22 }}><span className="timeline-node" /><div className="timeline-copy"><div className="timeline-top"><h3>{item.title}</h3><span className="date-tag">{item.date}</span></div><div className="timeline-detail">{item.detail}</div>{item.description && <p>{item.description}</p>}</div><span className="timeline-index">{String(i + 1).padStart(2, "0")}</span></motion.article></Reveal>)}</div>;
}

function ProjectCard({ project, index }) {
  const reduce = useReducedMotion();
  return <Reveal delay={(index % 3) * .06}><motion.a className="project-card panel" href={project.href} target="_blank" rel="noopener noreferrer" whileHover={reduce ? undefined : { y: -6 }} whileTap={reduce ? undefined : { scale: .985 }} transition={{ duration: .22, ease }}><div className="project-top"><span className="project-code">PROJECT / {String(index + 1).padStart(2, "0")}</span><Icon name="external" /></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><span className="project-tag">{project.tag}</span><span className="project-open">Ouvrir le projet <Icon name="arrow" size={15} /></span></div><span className="project-sweep" /></motion.a></Reveal>;
}

function FAQ() {
  const items = [
    ["Quel domaine m’intéresse ?", "Je suis étudiant en réseaux et cybersécurité. Je développe mes compétences en réseaux, virtualisation et infrastructure physique, notamment à travers mes homelabs."],
    ["Quelle formation je suis ?", "Je suis en 2nde MTNE au Lycée Polyvalent Louis Armand — Campus Gleizé, avec un BAC PRO CIEL (Cybersécurité, Informatique et Réseaux, Électronique)."],
    ["Quel est mon prochain objectif d’études ?", "Le parcours envisagé est un BTS SIO, option SISR, indiqué dans mon parcours pour 2028–2030."],
    ["Comment me contacter ?", "Tu peux m’écrire à tiago.meira@studentmail.fr ou m’appeler au +33 6 03 42 00 03."],
  ];
  return <div className="faq-list">{items.map(([question, answer], i) => <Reveal key={question} delay={i * .04}><details className="faq-item"><summary><span className="faq-number">0{i + 1}</span><span>{question}</span><span className="faq-plus">+</span></summary><p>{answer}</p></details></Reveal>)}</div>;
}

function App() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const artworkY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 50]);
  const heroWords = ["RÉSEAUX", "&", "CYBERSÉCURITÉ"];
  const stats = [["05", "projets GitHub présentés"], ["04", "expériences en entreprise"], ["03", "étapes de formation"], ["02", "compétences mises en avant"]];
  return <MotionConfig reducedMotion="user"><div className="site-frame" id="top"><div className="background-grid" aria-hidden="true" /><div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" /><Navbar />
    <main>
      <section className="hero section-wrap" aria-labelledby="hero-title"><div className="hero-copy"><motion.div className="hero-kicker" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .55, delay: .1, ease }}><span className="status-light" /> PORTFOLIO / ÉDITION 2026</motion.div>
        <motion.h1 id="hero-title" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : .12, delayChildren: .18 } } }}>{heroWords.map((word, i) => <motion.span key={word} className={i === 1 ? "hero-amp" : ""} variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : .65, ease } } }}>{word}</motion.span>)}</motion.h1>
        <motion.p className="hero-intro" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : .55, delay: .56, ease }}>Je suis <strong>Tiago Meira</strong>, étudiant passionné par l’informatique, les réseaux et les systèmes qui les font fonctionner.</motion.p>
        <motion.div className="hero-actions" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : .55, delay: .68 }}><motion.a className="button button-primary" href="#projects" whileHover={reduce ? undefined : { y: -2 }} whileTap={reduce ? undefined : { scale: .97 }}>Découvrir mes projets <Icon name="arrow" /></motion.a><a className="text-link" href="#about">En savoir plus <span>↓</span></a></motion.div>
        <motion.div className="hero-contact" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : .5, delay: .8 }}><a href="tel:+33603420003"><Icon name="phone" size={16} /> +33 6 03 42 00 03</a><a href="mailto:tiago.meira@studentmail.fr"><Icon name="mail" size={16} /> tiago.meira@studentmail.fr</a></motion.div>
      </div><motion.div className="hero-artwork" style={{ y: artworkY }} initial={reduce ? false : { opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : .75, delay: .25, ease }}><ClayStudio /></motion.div><div className="hero-bottomline"><span>TIAGO MEIRA / 01</span><span>BEAUJOLAIS, FRANCE <i>↘</i></span></div></section>

      <section id="about" className="section-wrap content-section"><Reveal><Heading index="01" kicker="À propos de moi" title="L’informatique, depuis toujours." note="Curiosité technique. Apprentissage continu." /></Reveal><Reveal className="about-panel panel"><div className="about-symbol">T<span>M</span><i>×</i></div><div className="about-text"><p>Je suis fan d’informatique depuis tout petit : je développe activement mes compétences en réseaux, en virtualisation, en infrastructure physique...</p><p>Grâce à mes projets personnels, tels que la création de homelabs, j’approfondis ma maîtrise des environnements techniques et je progresse au quotidien.</p></div><div className="about-side"><span>FOCUS</span><strong>Réseaux<br />Virtualisation<br />Homelabs</strong></div></Reveal></section>

      <section id="skills" className="section-wrap content-section skills-section"><Reveal><Heading index="02" kicker="Compétences" title="Ce que je sais faire." note="Des bases solides, une envie constante d’apprendre." /></Reveal><div className="skills-grid">{[{ icon: "⌘", label: "Mise en place de systèmes informatiques" }, { icon: "◎", label: "Bon niveau d’anglais" }].map((skill, i) => <Reveal key={skill.label} delay={i * .08}><motion.div className="skill-card panel" whileHover={reduce ? undefined : { y: -4 }} transition={{ duration: .22 }}><span className="skill-icon">{skill.icon}</span><span>{skill.label}</span><span className="skill-arrow">↗</span></motion.div></Reveal>)}</div></section>

      <section id="education" className="section-wrap content-section"><Reveal><Heading index="03" kicker="Parcours" title="Formation." note="Les étapes de mon parcours scolaire." /></Reveal><Timeline items={education} /></section>
      <section id="experience" className="section-wrap content-section"><Reveal><Heading index="04" kicker="Parcours professionnel" title="Expériences." note="Découvrir les équipes, les infrastructures et le terrain." /></Reveal><Timeline items={experience} /></section>

      <section className="section-wrap content-section journal-section"><Reveal><Heading index="05" kicker="Journal de parcours" title="Quelques repères." note="Un décompte des éléments présents dans mon parcours." /></Reveal><div className="stats-grid">{stats.map(([n, label], i) => <Reveal key={label} delay={i * .05}><div className="stat-card"><span className="stat-number">{n}</span><span className="stat-label">{label}</span><span className="stat-line" /></div></Reveal>)}</div></section>

      <section id="projects" className="section-wrap content-section projects-section"><Reveal><Heading index="06" kicker="GitHub" title="Projets choisis." note="Quelques outils et expériences que j’ai construits." /></Reveal><div className="projects-grid">{projects.map((project, i) => <ProjectCard key={project.title} project={project} index={i} />)}<Reveal delay={.12}><motion.a className="project-card project-more panel" href="https://github.com/TiagAuCarre" target="_blank" rel="noopener noreferrer" whileHover={reduce ? undefined : { y: -6 }} whileTap={reduce ? undefined : { scale: .985 }}><Icon name="github" size={28} /><span className="more-title">Voir plus de projets</span><span className="project-open">Mon GitHub <Icon name="arrow" size={15} /></span></motion.a></Reveal></div></section>

      <section className="section-wrap content-section faq-section"><Reveal><Heading index="07" kicker="En bref" title="Questions fréquentes." note="Quelques précisions sur mon parcours et mes centres d’intérêt." /></Reveal><FAQ /></section>

      <section id="infos" className="section-wrap content-section philosophy-section"><Reveal><div className="philosophy-card panel"><div className="philosophy-head"><span className="eyebrow"><span className="eyebrow-number">08</span> INFO. SUPP.</span><span className="quote-mark">“</span></div><div className="philosophy-content"><h2>Le respect<span>.</span></h2><blockquote>Une base fondamentale trop peu exploitée aujourd’hui. J’admire les gens qui m’apprennent de nouvelles choses, qui m’aident à comprendre certains aspects que je n’aurais pas découverts seul. Je suis investi dans mon travail et essaye toujours de faire au mieux.</blockquote></div><div className="philosophy-foot"><span>MA PHILOSOPHIE</span><span>TIAGO MEIRA <b>✳</b></span></div></div></Reveal></section>
    </main>
    <footer className="site-footer section-wrap"><a className="brand footer-brand" href="#top"><span className="brand-stamp">TM</span><span>TIAGO<span className="brand-muted">MEIRA</span></span></a><span className="footer-copy">© Tiago Meira — Tous droits réservés.</span><a className="cv-link" href="https://raw.githubusercontent.com/TiagAuCarre/tiags.fr/main/CV.pdf" download><span className="cv-icon">↓</span> Télécharger CV.pdf <Icon name="arrow" size={15} /></a></footer>
  </div></MotionConfig>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
