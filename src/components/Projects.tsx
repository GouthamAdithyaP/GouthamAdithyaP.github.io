import { useRef } from 'react';
import { ArrowUpRight, CreditCard, Landmark, UserCheck } from 'lucide-react';
import { projects, type ProjectId } from '../data/profile';
import { useUI } from '../context';
import { prefersReducedMotion } from '../hooks';
import { Section } from './Section';

const icons: Record<ProjectId, typeof Landmark> = { aos: UserCheck, uco: CreditCard, ogb: Landmark };

function ProjectCard({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const { openCase } = useUI();
  const ref = useRef<HTMLElement>(null);
  const Icon = icons[p.id];

  // Spotlight that follows the cursor, plus a very small tilt.
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    if (!prefersReducedMotion()) {
      el.style.setProperty('--rx', `${((y / r.height) - 0.5) * -4}deg`);
      el.style.setProperty('--ry', `${((x / r.width) - 0.5) * 5}deg`);
    }
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg');
    ref.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      className="project-card reveal"
      style={{ ['--accent' as string]: p.accent, transitionDelay: `${i * 90}ms` }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="pc-glow" aria-hidden="true" />
      <div className="pc-top">
        <span className="pc-icon"><Icon size={20} aria-hidden="true" /></span>
        <span className="pc-client mono">{p.client}</span>
      </div>
      <h3>{p.name}</h3>
      <p className="pc-tagline">{p.tagline}</p>
      <p className="pc-badge">{p.badge}</p>
      <ul className="tags">{p.tech.slice(0, 6).map((t) => <li key={t}>{t}</li>)}</ul>
      <button className="pc-cta" onClick={() => openCase(p.id)} aria-label={`Read the ${p.name} case study`}>
        Read case study <ArrowUpRight size={16} aria-hidden="true" />
      </button>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Featured projects"
      title={<>Production systems for <span className="serif-accent">three</span> banks</>}
      lead="Client work delivered at I-Exceed. Each one handles real customer identity or money, so reliability and security came first."
    >
      <div className="project-grid">
        {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
      </div>
    </Section>
  );
}
