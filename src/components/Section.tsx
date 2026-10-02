import type { ReactNode } from 'react';

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
};

export function Section({ id, index, eyebrow, title, lead, children, className = '', aside }: Props) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section-head reveal">
          <div>
            <p className="eyebrow"><span className="mono">{index}</span> {eyebrow}</p>
            <h2 id={`${id}-title`}>{title}</h2>
            {lead && <p className="lead">{lead}</p>}
          </div>
          {aside}
        </header>
        {children}
      </div>
    </section>
  );
}
