import { useEffect, useState } from 'react';
import { Command, Menu, Moon, Sun, X } from 'lucide-react';
import { profile, sections } from '../data/profile';
import { useUI } from '../context';
import { scrollToId, useActiveSection, useScrollProgress } from '../hooks';

const ids = sections.map((s) => s.id);

export function Nav() {
  const { toggleTheme, setPaletteOpen } = useUI();
  const active = useActiveSection(ids);
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={go('top')}>
          <span className="brand-mark" aria-hidden="true">{profile.initials}</span>
          <span className="brand-name">{profile.firstName}<span className="brand-dot" aria-hidden="true">.</span></span>
          <span className="sr-only">, back to top</span>
        </a>

        <nav className={`nav-links ${open ? 'is-open' : ''}`} id="primary-nav" aria-label="Primary">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={go(s.id)} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'true' : undefined}>
              {s.label}
            </a>
          ))}
          <a href="#resume" onClick={go('resume')} className="nav-mobile-only">Resume</a>
        </nav>

        <div className="nav-actions">
          <button className="kbd-btn" onClick={() => setPaletteOpen(true)}>
            <Command size={14} aria-hidden="true" />
            <span className="sr-only">Open command palette:</span>
            <span className="kbd-label">Search</span>
            <kbd>Ctrl K</kbd>
          </button>
          <button
            className="icon-btn"
            onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 }); }}
            aria-label="Toggle dark and light theme"
          >
            <Sun size={17} className="i-sun" aria-hidden="true" />
            <Moon size={17} className="i-moon" aria-hidden="true" />
          </button>
          <a href="#resume" onClick={go('resume')} className="btn btn-primary btn-sm nav-resume">Resume</a>
          <button className="icon-btn nav-burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="primary-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
