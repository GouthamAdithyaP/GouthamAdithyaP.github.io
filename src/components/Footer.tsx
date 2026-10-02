import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';
import { scrollToId } from '../hooks';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <button className="text-link" onClick={() => scrollToId('top')}>Back to top <ArrowUp size={14} aria-hidden="true" /></button>
      </div>
    </footer>
  );
}
