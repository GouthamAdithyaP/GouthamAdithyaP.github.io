import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, Copy, CornerDownLeft, FileText, Hash, Moon, Search, Terminal as TerminalIcon,
} from 'lucide-react';
import { profile, projects, resume } from '../data/profile';
import { useUI } from '../context';
import { copyText, scrollToId } from '../hooks';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

type Item = { id: string; group: string; label: string; hint?: string; icon: React.ReactNode; run: () => void; keywords?: string };

const navTargets = [
  ['top', 'Home'], ['about', 'About'], ['skills', 'Technical skills'], ['experience', 'Experience'],
  ['projects', 'Featured projects'], ['case-studies', 'Case studies'], ['impact', 'Achievements & impact'],
  ['resume', 'Resume'], ['contact', 'Contact'],
] as const;

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, toggleTheme, setTerminalOpen, toast, openCase } = useUI();
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = () => setPaletteOpen(false);

  const items = useMemo<Item[]>(() => [
    ...navTargets.map(([id, label]) => ({ id: `go-${id}`, group: 'Go to', label, icon: <Hash size={15} />, run: () => scrollToId(id) })),
    ...projects.map((p) => ({ id: `case-${p.id}`, group: 'Case studies', label: `${p.client}: ${p.name}`, icon: <ArrowRight size={15} />, run: () => openCase(p.id), keywords: p.tech.join(' ') })),
    { id: 'resume-download', group: 'Resume', label: 'Download resume (PDF)', icon: <FileText size={15} />, run: () => { const a = document.createElement('a'); a.href = resume.pdf; a.download = resume.fileName; a.click(); } },
    { id: 'resume-view', group: 'Resume', label: 'View resume in browser', icon: <FileText size={15} />, run: () => window.open(resume.pdf, '_blank', 'noopener') },
    { id: 'copy-email', group: 'Contact', label: 'Copy email address', hint: profile.email, icon: <Copy size={15} />, run: async () => toast((await copyText(profile.email)) ? 'Email copied to clipboard' : profile.email) },
    { id: 'linkedin', group: 'Contact', label: 'Open LinkedIn', icon: <LinkedInIcon size={15} />, run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    { id: 'github', group: 'Contact', label: 'Open GitHub', icon: <GitHubIcon size={15} />, run: () => window.open(profile.github, '_blank', 'noopener') },
    { id: 'theme', group: 'Preferences', label: 'Toggle dark / light theme', icon: <Moon size={15} />, run: () => toggleTheme() },
    { id: 'terminal', group: 'Developer', label: 'Open developer terminal', hint: 'or press `', icon: <TerminalIcon size={15} />, run: () => setTerminalOpen(true), keywords: 'console shell easter egg' },
  ], [openCase, toast, toggleTheme, setTerminalOpen]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => `${it.label} ${it.group} ${it.keywords ?? ''}`.toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    if (paletteOpen) {
      lastFocus.current = document.activeElement as HTMLElement;
      setQ(''); setI(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lastFocus.current?.focus?.({ preventScroll: true });
    }
  }, [paletteOpen]);

  useEffect(() => { setI(0); }, [q]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${i}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [i]);

  if (!paletteOpen) return null;

  const run = (it: Item) => { close(); setTimeout(it.run, 10); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setI((v) => Math.min(v + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
    else if (e.key === 'Enter' && filtered[i]) { e.preventDefault(); run(filtered[i]); }
    else if (e.key === 'Tab') { e.preventDefault(); }
  };

  let lastGroup = '';
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={onKey}>
        <div className="palette-search">
          <Search size={17} aria-hidden="true" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to a section, open a case study, grab the resume…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[i] ? `pi-${filtered[i].id}` : undefined}
            aria-autocomplete="list"
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette-list" id="palette-list" role="listbox" ref={listRef}>
          {filtered.length === 0 && <li className="palette-empty">No results for “{q}”. Try “resume” or “spring”.</li>}
          {filtered.map((it, k) => {
            const header = it.group !== lastGroup ? (lastGroup = it.group) : null;
            return (
              <li key={it.id} role="presentation">
                {header && <p className="palette-group mono">{header}</p>}
                <div
                  id={`pi-${it.id}`}
                  role="option"
                  aria-selected={k === i}
                  data-index={k}
                  className={`palette-item ${k === i ? 'is-on' : ''}`}
                  onMouseMove={() => setI(k)}
                  onClick={() => run(it)}
                >
                  <span className="pi-icon" aria-hidden="true">{it.icon}</span>
                  <span className="pi-label">{it.label}</span>
                  {it.hint && <span className="pi-hint mono">{it.hint}</span>}
                  {k === i && <CornerDownLeft size={14} className="pi-enter" aria-hidden="true" />}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot mono">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>`</kbd> terminal</span>
        </div>
      </div>
    </div>
  );
}
