import { Award, GraduationCap, Rocket, Users } from 'lucide-react';
import { metrics, recognition } from '../data/profile';
import { useCountUp } from '../hooks';
import { Section } from './Section';

const icons = { award: Award, users: Users, rocket: Rocket, grad: GraduationCap } as const;

function Metric({ m, i }: { m: (typeof metrics)[number]; i: number }) {
  const { ref, value } = useCountUp(m.value);
  return (
    <li className="metric reveal" style={{ transitionDelay: `${i * 70}ms` }}>
      <span className="metric-value">
        <span ref={ref}>{value}</span>{m.suffix}
      </span>
      <span className="metric-label">{m.label}</span>
      <span className="metric-detail">{m.detail}</span>
    </li>
  );
}

export function Impact() {
  return (
    <Section id="impact" index="06" eyebrow="Achievements & impact" title="The numbers, and the recognition" lead="Every figure here comes straight from my work history. Nothing is estimated.">
      <ul className="metrics">
        {metrics.map((m, i) => <Metric key={m.label} m={m} i={i} />)}
      </ul>
      <ul className="recognition">
        {recognition.map((r, i) => {
          const Icon = icons[r.icon];
          return (
            <li key={r.title} className="card rec reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="rec-icon"><Icon size={18} aria-hidden="true" /></span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
