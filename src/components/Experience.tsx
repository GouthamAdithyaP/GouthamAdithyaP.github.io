import { useState, type ReactNode } from 'react';
import { ArrowUpRight, Briefcase, ChevronDown, GraduationCap } from 'lucide-react';
import { education, experience, projects } from '../data/profile';
import { useUI } from '../context';
import { Section } from './Section';

function Expandable({ open, children, id }: { open: boolean; children: ReactNode; id: string }) {
  return (
    <div id={id} className={`expand ${open ? 'is-open' : ''}`}>
      <div className="expand-inner" inert={!open}>{children}</div>
    </div>
  );
}

export function Experience() {
  const { openCase } = useUI();
  const [roleOpen, setRoleOpen] = useState(true);
  const [openEng, setOpenEng] = useState<string | null>('aos');
  const engagements = projects.filter((p) => experience.engagements.includes(p.id));

  return (
    <Section id="experience" index="03" eyebrow="Experience" title="Career timeline" lead="Click any entry to expand it. Each client engagement links to its full case study.">
      <ol className="timeline">
        <li className="tl-item reveal">
          <span className="tl-node" aria-hidden="true"><Briefcase size={15} /></span>
          <article className="card tl-card">
            <button className="tl-toggle" aria-expanded={roleOpen} aria-controls="role-body" onClick={() => setRoleOpen(!roleOpen)}>
              <div className="tl-main">
                <span className="tl-period mono">{experience.period}</span>
                <h3>{experience.role}</h3>
                <p className="tl-org">{experience.company} · {experience.location}</p>
              </div>
              <ChevronDown size={18} className={`chev ${roleOpen ? 'up' : ''}`} aria-hidden="true" />
            </button>
            <p className="tl-summary">{experience.summary}</p>
            <Expandable open={roleOpen} id="role-body">
              <ul className="ticks">
                {experience.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              <h4 className="tl-sub mono">Client engagements</h4>
              <ul className="engagements">
                {engagements.map((p) => {
                  const on = openEng === p.id;
                  return (
                    <li key={p.id} className={`eng ${on ? 'is-open' : ''}`} style={{ ['--accent' as string]: p.accent }}>
                      <button className="eng-toggle" aria-expanded={on} aria-controls={`eng-${p.id}`} onClick={() => setOpenEng(on ? null : p.id)}>
                        <span className="eng-dot" aria-hidden="true" />
                        <span className="eng-name"><strong>{p.client}</strong> · {p.name}</span>
                        <span className="eng-domain">{p.domain}</span>
                        <ChevronDown size={16} className={`chev ${on ? 'up' : ''}`} aria-hidden="true" />
                      </button>
                      <Expandable open={on} id={`eng-${p.id}`}>
                        <ul className="ticks small">
                          {p.contribution.slice(0, 4).map((c) => <li key={c}>{c}</li>)}
                        </ul>
                        <button className="text-link" onClick={() => openCase(p.id)}>
                          Read the case study <ArrowUpRight size={14} aria-hidden="true" />
                        </button>
                      </Expandable>
                    </li>
                  );
                })}
              </ul>
              <ul className="tags">{experience.stack.map((t) => <li key={t}>{t}</li>)}</ul>
            </Expandable>
          </article>
        </li>

        <li className="tl-item reveal">
          <span className="tl-node alt" aria-hidden="true"><GraduationCap size={15} /></span>
          <article className="card tl-card">
            <div className="tl-main">
              <span className="tl-period mono">{education.period}</span>
              <h3>{education.degree}</h3>
              <p className="tl-org">{education.school}</p>
            </div>
            <p className="tl-summary">{education.detail}</p>
          </article>
        </li>
      </ol>
    </Section>
  );
}
