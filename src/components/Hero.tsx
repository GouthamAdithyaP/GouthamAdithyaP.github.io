import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Boxes, ChevronDown, Coffee, Download, Eye, Leaf, MapPin, Send } from 'lucide-react';
import { profile, resume, snapshot } from '../data/profile';
import { scrollToId, useTypewriter } from '../hooks';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

const orbit = [
  { label: 'Java 17', icon: Coffee, cls: 'orb-chip-1' },
  { label: 'Spring Boot', icon: Leaf, cls: 'orb-chip-2' },
  { label: 'Microservices', icon: Boxes, cls: 'orb-chip-3' },
];

function Avatar() {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // If the image already errored before hydration, onError never fires. Check once on mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className="avatar">
      <div className="avatar-glow" aria-hidden="true" />
      <div className="avatar-orbit" aria-hidden="true" />
      {orbit.map(({ label, icon: Icon, cls }) => (
        <span key={label} className={`orb-chip ${cls}`} aria-hidden="true"><Icon size={13} /> {label}</span>
      ))}
      <div className="avatar-ring" aria-hidden="true" />
      <div className="avatar-inner">
        <span className="avatar-initials" aria-hidden="true">{profile.initials}</span>
        {!failed && (
          <img
            ref={imgRef}
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={640}
            height={640}
            fetchPriority="high"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className="avatar-status">
        <span className="pulse-dot" aria-hidden="true" />
        Open to new roles
      </div>
    </div>
  );
}

function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <div className="menu" ref={ref}>
      <button className="btn btn-ghost" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Download size={16} aria-hidden="true" /> Resume <ChevronDown size={15} className={`chev ${open ? 'up' : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="menu-pop" role="menu">
          <a className="menu-item" role="menuitem" href={resume.pdf} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
            <Eye size={16} aria-hidden="true" /> <span>View resume</span> <small className="mono">PDF</small>
          </a>
          <a className="menu-item" role="menuitem" href={resume.pdf} download={resume.fileName} onClick={() => setOpen(false)}>
            <Download size={16} aria-hidden="true" /> <span>Download resume</span> <small className="mono">PDF</small>
          </a>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const typed = useTypewriter(profile.roles);
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="grid-lines" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow-pill intro-1">
            <span className="mono">~/</span> {profile.currentRole} at {profile.company}
          </p>
          <h1 id="hero-title" className="hero-title intro-2">
            {profile.name.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="serif-accent">{profile.name.split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="hero-role intro-3">
            <span className="sr-only">{profile.title}</span>
            <span className="mono prompt" aria-hidden="true">$</span>
            <span className="mono typed" aria-hidden="true">{typed}</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="hero-intro intro-4">{profile.intro}</p>

          <ul className="hero-tech intro-5" aria-label="Key technologies">
            {profile.heroTech.map((t) => <li key={t}>{t}</li>)}
          </ul>

          <div className="hero-ctas intro-6">
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}>
              <Send size={16} aria-hidden="true" /> Contact me
            </a>
            <ResumeMenu />
            <a className="icon-btn icon-lg" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub profile">
              <GitHubIcon />
            </a>
            <a className="icon-btn icon-lg" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn profile">
              <LinkedInIcon />
            </a>
          </div>
          <p className="hero-loc intro-6"><MapPin size={14} aria-hidden="true" /> {profile.location}</p>
        </div>

        <div className="hero-visual intro-3">
          <Avatar />
        </div>
      </div>

      <div className="container">
        <div className="snapshot intro-7" aria-label="30-second summary">
          <div className="snapshot-head">
            <span className="mono">30-second summary</span>
            <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToId('experience'); }}>
              Full timeline <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
          <dl className="snapshot-grid">
            {snapshot.map((s) => (
              <div key={s.label} className="snapshot-item">
                <dt>{s.label}</dt>
                <dd><strong>{s.value}</strong><span>{s.sub}</span></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
