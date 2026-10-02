import { CheckCircle2 } from 'lucide-react';
import { useUI } from '../context';

export function Toast() {
  const { toastMsg } = useUI();
  return (
    <div className={`toast ${toastMsg ? 'show' : ''}`} role="status" aria-live="polite">
      {toastMsg && <><CheckCircle2 size={16} aria-hidden="true" /> {toastMsg}</>}
    </div>
  );
}
