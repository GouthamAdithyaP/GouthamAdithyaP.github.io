import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { layerMeta, type ArchNode, type FlowStep, type Layer } from '../data/profile';
import { prefersReducedMotion } from '../hooks';

const order: Layer[] = ['client', 'service', 'external', 'data'];

export function ArchDiagram({ nodes, runtime }: { nodes: ArchNode[]; runtime: string }) {
  const [sel, setSel] = useState<ArchNode>(nodes.find((n) => n.layer === 'service') ?? nodes[0]);
  useEffect(() => { setSel(nodes.find((n) => n.layer === 'service') ?? nodes[0]); }, [nodes]);
  const rows = order.map((l) => ({ layer: l, items: nodes.filter((n) => n.layer === l) })).filter((r) => r.items.length);

  return (
    <div className="arch">
      <div className="arch-rows">
        {rows.map((r, ri) => (
          <div key={r.layer} className="arch-row" style={{ ['--lc' as string]: layerMeta[r.layer].color }}>
            <span className="arch-layer mono">{layerMeta[r.layer].label}</span>
            <div className="arch-nodes">
              {r.items.map((n) => (
                <button
                  key={n.id}
                  className={`arch-node ${sel.id === n.id ? 'is-on' : ''}`}
                  onClick={() => setSel(n)}
                  onMouseEnter={() => setSel(n)}
                  aria-pressed={sel.id === n.id}
                >
                  {n.label}
                </button>
              ))}
            </div>
            {ri < rows.length - 1 && <span className="arch-link" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="arch-detail" aria-live="polite" style={{ ['--lc' as string]: layerMeta[sel.layer].color }}>
        <div className="arch-detail-head">
          <span className="arch-pill mono">{layerMeta[sel.layer].label}</span>
          <strong>{sel.label}</strong>
        </div>
        <p>{sel.detail}</p>
        <ul className="tags">{sel.tech.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <p className="arch-runtime mono">Runtime: {runtime}</p>
    </div>
  );
}

export function FlowStepper({ steps }: { steps: FlowStep[] }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setI(0); setPlaying(false); }, [steps]);
  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => {
      setI((v) => {
        if (v >= steps.length - 1) { setPlaying(false); return v; }
        return v + 1;
      });
    }, 1100);
    return () => clearInterval(t);
  }, [playing, steps.length]);

  const play = () => {
    if (prefersReducedMotion()) { setI(steps.length - 1); return; }
    if (i >= steps.length - 1) setI(0);
    setPlaying(!playing);
  };

  const s = steps[i];
  return (
    <div className="flow">
      <div className="flow-head">
        <button className="flow-play" onClick={play} aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          {playing ? 'Pause' : 'Play walkthrough'}
        </button>
        <span className="mono flow-count">Step {i + 1} / {steps.length}</span>
      </div>
      <ol className="flow-steps" style={{ ['--progress' as string]: `${(i / (steps.length - 1)) * 100}%` }}>
        {steps.map((st, k) => (
          <li key={st.label} style={{ ['--lc' as string]: layerMeta[st.layer].color }}>
            <button
              className={`flow-step ${k === i ? 'is-on' : ''} ${k < i ? 'is-done' : ''}`}
              onClick={() => { setPlaying(false); setI(k); }}
              aria-current={k === i ? 'step' : undefined}
            >
              <span className="flow-num mono">{k + 1}</span>
              <span className="flow-label">{st.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="flow-detail" aria-live="polite" style={{ ['--lc' as string]: layerMeta[s.layer].color }}>
        <span className="arch-pill mono">{layerMeta[s.layer].label}</span> {s.detail}
      </p>
    </div>
  );
}

export function LayerLegend() {
  return (
    <ul className="legend-row" aria-label="Diagram legend">
      {order.map((l) => (
        <li key={l} style={{ ['--lc' as string]: layerMeta[l].color }}><span aria-hidden="true" />{layerMeta[l].label}</li>
      ))}
    </ul>
  );
}
