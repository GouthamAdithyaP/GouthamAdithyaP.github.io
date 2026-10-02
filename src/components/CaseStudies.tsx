import { AlertCircle, CheckCircle2, Cpu, Lightbulb, Network, UserRound } from 'lucide-react';
import { projects } from '../data/profile';
import { useUI } from '../context';
import { Section } from './Section';
import { ArchDiagram, FlowStepper, LayerLegend } from './Architecture';

const story = [
  { id: 'problem', label: 'Problem', icon: AlertCircle },
  { id: 'solution', label: 'Solution', icon: Lightbulb },
  { id: 'contribution', label: 'My contribution', icon: UserRound },
  { id: 'tech', label: 'Technologies', icon: Cpu },
  { id: 'architecture', label: 'Architecture', icon: Network },
  { id: 'results', label: 'Results', icon: CheckCircle2 },
] as const;

export function CaseStudies() {
  const { activeCase, openCase } = useUI();
  const p = projects.find((x) => x.id === activeCase)!;
  const jump = (sid: string) => {
    document.getElementById(`cs-${sid}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Section
      id="case-studies"
      index="05"
      eyebrow="Case studies"
      title="How each system works, and what I did"
      lead="For interviewers who want the details. Click the parts of each diagram to explore, or play the step-by-step walkthrough."
      className="cs-section"
    >
      <div className="cs-tabs reveal" role="tablist" aria-label="Case studies">
        {projects.map((x) => (
          <button
            key={x.id}
            role="tab"
            id={`cs-tab-${x.id}`}
            aria-selected={x.id === activeCase}
            aria-controls="cs-panel"
            className={`cs-tab ${x.id === activeCase ? 'is-on' : ''}`}
            style={{ ['--accent' as string]: x.accent }}
            onClick={() => openCase(x.id, false)}
          >
            <span className="cs-tab-client mono">{x.client}</span>
            <span className="cs-tab-name">{x.name}</span>
          </button>
        ))}
      </div>

      <div className="cs-panel card reveal" id="cs-panel" role="tabpanel" aria-labelledby={`cs-tab-${p.id}`} style={{ ['--accent' as string]: p.accent }}>
        <header className="cs-header">
          <div>
            <p className="cs-client mono">{p.client} · {p.domain}</p>
            <h3>{p.name}{p.id === 'aos' ? ' (AOS)' : ''}</h3>
            <p className="cs-tagline">{p.tagline}</p>
          </div>
          <nav className="cs-story" aria-label="Case study outline">
            {story.map((s, k) => (
              <button key={s.id} onClick={() => jump(s.id)}>
                <span className="mono">{String(k + 1).padStart(2, '0')}</span> {s.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="cs-body">
          <div className="cs-narrative">
            <section id="cs-problem" className="cs-block">
              <h4><AlertCircle size={16} aria-hidden="true" /> Problem</h4>
              <p>{p.problem}</p>
            </section>
            <section id="cs-solution" className="cs-block">
              <h4><Lightbulb size={16} aria-hidden="true" /> Solution</h4>
              <p>{p.solution}</p>
            </section>
            <section id="cs-contribution" className="cs-block">
              <h4><UserRound size={16} aria-hidden="true" /> My contribution</h4>
              <ul className="ticks">{p.contribution.map((c) => <li key={c}>{c}</li>)}</ul>
            </section>
            <section id="cs-tech" className="cs-block">
              <h4><Cpu size={16} aria-hidden="true" /> Technologies</h4>
              <ul className="tags tags-lg">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
            </section>
          </div>

          <div className="cs-visual">
            <section id="cs-architecture" className="cs-block">
              <div className="cs-block-head">
                <h4><Network size={16} aria-hidden="true" /> Architecture</h4>
                <LayerLegend />
              </div>
              <ArchDiagram nodes={p.architecture.nodes} runtime={p.runtime} />
              {p.flow && (
                <>
                  <h5 className="cs-flow-title mono">{p.flow.title}</h5>
                  <FlowStepper steps={p.flow.steps} />
                </>
              )}
            </section>
            <section id="cs-results" className="cs-block cs-results">
              <h4><CheckCircle2 size={16} aria-hidden="true" /> Results</h4>
              <ul className="results">{p.results.map((r) => <li key={r}>{r}</li>)}</ul>
            </section>
          </div>
        </div>
      </div>
    </Section>
  );
}
