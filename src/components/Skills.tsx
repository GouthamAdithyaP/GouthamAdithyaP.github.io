import { useMemo, useState } from 'react';
import { Braces, Database, Monitor, Plug, Server, ShieldCheck, Workflow, ArrowUpRight } from 'lucide-react';
import { projects, skillGroups, type Skill } from '../data/profile';
import { useUI } from '../context';
import { Section } from './Section';

const groupIcons: Record<string, typeof Server> = {
  server: Server, braces: Braces, plug: Plug, database: Database, shield: ShieldCheck, monitor: Monitor, workflow: Workflow,
};
const projectName = Object.fromEntries(projects.map((p) => [p.id, p.client]));

export function Skills() {
  const { openCase } = useUI();
  const [groupId, setGroupId] = useState(skillGroups[0].id);
  const group = useMemo(() => skillGroups.find((g) => g.id === groupId)!, [groupId]);
  const [selected, setSelected] = useState<Skill>(group.skills[0]);

  const pickGroup = (id: string) => {
    const g = skillGroups.find((x) => x.id === id)!;
    setGroupId(id);
    setSelected(g.skills[0]);
  };

  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Technical skills"
      title="The stack I ship with"
      lead={<>Pick a category, then a skill, to see what I used it for and where. No made-up percentages: each skill is marked as <em>production</em> or <em>working knowledge</em>.</>}
    >
      <div className="skills reveal">
        <div className="skill-tabs" role="tablist" aria-label="Skill categories">
          {skillGroups.map((g) => {
            const Icon = groupIcons[g.icon];
            const on = g.id === groupId;
            return (
              <button
                key={g.id}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={on}
                aria-controls="skill-panel"
                tabIndex={on ? 0 : -1}
                className={`skill-tab ${on ? 'is-on' : ''}`}
                onClick={() => pickGroup(g.id)}
                onKeyDown={(e) => {
                  const i = skillGroups.findIndex((x) => x.id === groupId);
                  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); const n = skillGroups[(i + 1) % skillGroups.length]; pickGroup(n.id); document.getElementById(`tab-${n.id}`)?.focus(); }
                  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); const n = skillGroups[(i - 1 + skillGroups.length) % skillGroups.length]; pickGroup(n.id); document.getElementById(`tab-${n.id}`)?.focus(); }
                }}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{g.label}</span>
                <span className="count mono">{g.skills.length}</span>
              </button>
            );
          })}
          <p className="skill-total mono">{total} skills · {skillGroups.length} areas</p>
        </div>

        <div className="skill-panel card" id="skill-panel" role="tabpanel" aria-labelledby={`tab-${groupId}`}>
          <p className="skill-blurb">{group.blurb}</p>
          <ul className="skill-chips" key={groupId}>
            {group.skills.map((s, i) => (
              <li key={s.name} style={{ animationDelay: `${i * 28}ms` }}>
                <button
                  className={`chip ${s.level} ${selected.name === s.name ? 'is-on' : ''}`}
                  onClick={() => setSelected(s)}
                  onMouseEnter={() => setSelected(s)}
                  aria-pressed={selected.name === s.name}
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="skill-detail" aria-live="polite">
            <div className="skill-detail-head">
              <h3>{selected.name}</h3>
              <span className={`level ${selected.level}`}>{selected.level === 'production' ? 'Used in production' : 'Working knowledge'}</span>
            </div>
            <p>{selected.note}</p>
            {selected.usedIn && (
              <div className="used-in">
                <span>Used in</span>
                {selected.usedIn.map((id) => (
                  <button key={id} className="used-link" onClick={() => openCase(id)}>
                    {projectName[id]} <ArrowUpRight size={13} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="legend"><span className="swatch production" /> Production <span className="swatch familiar" /> Working knowledge</p>
        </div>
      </div>
    </Section>
  );
}
