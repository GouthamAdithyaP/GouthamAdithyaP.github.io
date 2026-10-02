import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { experience, metrics, profile, projects, skillGroups } from '../data/profile';
import { useUI } from '../context';
import { scrollToId } from '../hooks';

type Line = { kind: 'in' | 'out' | 'ok' | 'warn' | 'accent'; text: string };

const COMMANDS = ['help', 'whoami', 'about', 'skills', 'experience', 'projects', 'case', 'impact', 'contact', 'resume', 'theme', 'mvn spring-boot:run', 'sudo hire goutham', 'clear', 'exit'];

const banner: Line[] = [
  { kind: 'accent', text: 'goutham@portfolio — interactive shell' },
  { kind: 'out', text: 'Type `help` to see commands. Tab completes, ↑ recalls history, Esc closes.' },
];

const springBoot = [
  '  .   ____          _            __ _ _',
  ' /\\\\ / ___\'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\',
  '( ( )\\___ | \'_ | \'_| | \'_ \\/ _` | \\ \\ \\ \\',
  ' \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )',
  '  \'  |____| .__|_| |_|_| |_\\__, | / / / /',
  ' =========|_|==============|___/=/_/_/_/',
  ' :: Spring Boot ::                (v3.3.5)',
];

export function Terminal() {
  const { terminalOpen, setTerminalOpen, toggleTheme, openCase } = useUI();
  const [lines, setLines] = useState<Line[]>(banner);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!terminalOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = '';
      timers.current.forEach(clearTimeout); timers.current = [];
      prev?.focus?.({ preventScroll: true });
    };
  }, [terminalOpen]);
  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight }); }, [lines]);

  if (!terminalOpen) return null;

  const print = (...ls: Line[]) => setLines((prev) => [...prev, ...ls]);
  const out = (text: string): Line => ({ kind: 'out', text });
  const close = () => setTerminalOpen(false);
  const goto = (id: string) => { close(); setTimeout(() => scrollToId(id), 60); };

  const exec = (raw: string) => {
    const cmd = raw.trim();
    print({ kind: 'in', text: cmd });
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 30));
    const [c, ...args] = cmd.split(/\s+/);
    switch (c.toLowerCase()) {
      case 'help':
        print(...[
          'whoami            who is this?', 'about             short bio', 'skills            stack by area',
          'experience        current role', 'projects          list case studies', 'case <aos|uco|ogb> open a case study',
          'impact            the numbers', 'contact           how to reach me', 'resume            jump to downloads',
          'theme             toggle dark / light', 'clear | exit', '', 'There may be one or two hidden commands. ☕',
        ].map(out));
        break;
      case 'whoami':
        print({ kind: 'accent', text: profile.name }, out(`${profile.title} · ${profile.location}`), out(`${profile.currentRole} @ ${profile.companyFull} since ${profile.since}`));
        break;
      case 'about':
        print(out(profile.intro));
        break;
      case 'skills':
        skillGroups.forEach((g) => print(out(`${g.label.padEnd(18)} ${g.skills.filter((s) => s.level === 'production').map((s) => s.name).slice(0, 6).join(', ')}`)));
        break;
      case 'experience':
        print({ kind: 'accent', text: `${experience.role} · ${experience.company}` }, out(experience.period), ...experience.highlights.slice(0, 3).map((h) => out(`• ${h}`)));
        break;
      case 'projects':
        projects.forEach((p) => print(out(`${p.id.padEnd(5)} ${p.client} — ${p.name}`)));
        print(out('Run `case <id>` to open one.'));
        break;
      case 'case': {
        const p = projects.find((x) => x.id === (args[0] ?? '').toLowerCase());
        if (!p) { print({ kind: 'warn', text: 'usage: case aos | case uco | case ogb' }); break; }
        print({ kind: 'ok', text: `Opening ${p.name}…` });
        setTimeout(() => { close(); openCase(p.id); }, 350);
        break;
      }
      case 'impact':
        metrics.forEach((m) => print(out(`${(m.value + m.suffix).padStart(5)}  ${m.label}`)));
        break;
      case 'contact':
        print(out(`email     ${profile.email}`), out(`linkedin  ${profile.linkedinLabel}`), out(`github    ${profile.githubLabel}`));
        break;
      case 'resume':
        print({ kind: 'ok', text: 'Jumping to the resume section…' });
        setTimeout(() => goto('resume'), 300);
        break;
      case 'theme':
        toggleTheme();
        print({ kind: 'ok', text: 'Theme toggled.' });
        break;
      case 'clear':
        setLines([]);
        break;
      case 'exit':
        close();
        break;
      case 'ls':
        print(out('about.md  skills.json  experience.log  case-studies/  resume.pdf  contact.txt'));
        break;
      case 'cat':
        print(out(args[0] === 'about.md' ? profile.intro : `cat: ${args[0] ?? ''}: try \`cat about.md\``));
        break;
      case 'mvn':
        if (args.join(' ') !== 'spring-boot:run') { print({ kind: 'warn', text: 'did you mean `mvn spring-boot:run`?' }); break; }
        springBoot.forEach((l, k) => { timers.current.push(window.setTimeout(() => print({ kind: 'accent', text: l }), k * 70)); });
        [
          'INFO  Starting PortfolioApplication using Java 17',
          'INFO  Tomcat initialized with port 8080 (http)',
          'INFO  Resilience4j circuit breaker "recruiters" is CLOSED',
          'INFO  Started PortfolioApplication. Ready to take your call.',
        ].forEach((l, k) => timers.current.push(window.setTimeout(() => print({ kind: k === 3 ? 'ok' : 'out', text: l }), 600 + k * 260)));
        break;
      case 'sudo':
        if (args.join(' ').toLowerCase() === 'hire goutham') {
          print({ kind: 'ok', text: '[sudo] permission granted. Opening your email app…' });
          setTimeout(() => { window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Let's talk about a role")}`; }, 600);
        } else {
          print({ kind: 'warn', text: 'goutham is not in the sudoers file. Try `sudo hire goutham`.' });
        }
        break;
      case 'rm':
        print({ kind: 'warn', text: 'Nice try. Production data is protected by @Transactional and good judgment.' });
        break;
      default:
        print({ kind: 'warn', text: `command not found: ${c}. Type \`help\`.` });
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { exec(input); setInput(''); setHi(-1); }
    else if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); const n = Math.min(hi + 1, history.length - 1); if (history[n]) { setHi(n); setInput(history[n]); } }
    else if (e.key === 'ArrowDown') { e.preventDefault(); const n = hi - 1; setHi(n); setInput(n >= 0 ? history[n] : ''); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      const m = COMMANDS.filter((c) => c.startsWith(input.toLowerCase()));
      if (m.length === 1) setInput(m[0]);
      else if (m.length > 1) print({ kind: 'in', text: input }, out(m.join('   ')));
    } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLines([]); }
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="terminal" role="dialog" aria-modal="true" aria-label="Developer terminal" onClick={() => inputRef.current?.focus()}>
        <div className="term-bar">
          <span className="tl r" /><span className="tl y" /><span className="tl g" />
          <span className="mono term-title">goutham@portfolio: ~</span>
          <button className="icon-btn sm" onClick={close} aria-label="Close terminal"><X size={14} aria-hidden="true" /></button>
        </div>
        <div className="term-body mono" ref={bodyRef} aria-live="polite">
          {lines.map((l, k) => (
            <div key={k} className={`term-line ${l.kind}`}>
              {l.kind === 'in' && <span className="term-prompt">❯ </span>}
              {l.text || ' '}
            </div>
          ))}
          <div className="term-input">
            <span className="term-prompt" aria-hidden="true">❯ </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              aria-label="Terminal command"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
