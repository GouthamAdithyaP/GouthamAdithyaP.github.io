import { ShieldCheck, Sparkles, Target } from 'lucide-react';
import { about } from '../data/profile';
import { Section } from './Section';

const icons = [ShieldCheck, Sparkles, Target];

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title={<>Backend engineer who <span className="serif-accent">owns</span> the whole feature</>}>
      <div className="about-grid">
        <div className="about-copy reveal">
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <dl className="facts">
            {about.facts.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
        </div>
        <ul className="principles">
          {about.principles.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.title} className="card principle reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="principle-icon"><Icon size={18} aria-hidden="true" /></span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
