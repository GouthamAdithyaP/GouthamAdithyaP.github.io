import { useCallback, useEffect, useRef, useState } from 'react';

export type Theme = 'dark' | 'light';

const canUseDOM = typeof window !== 'undefined';

export function prefersReducedMotion(): boolean {
  return canUseDOM && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Theme lives on <html data-theme>. The inline script in index.html sets it before paint. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    setThemeState((document.documentElement.getAttribute('data-theme') as Theme) || 'dark');
  }, []);

  const setTheme = useCallback((next: Theme, origin?: { x: number; y: number }) => {
    const apply = () => {
      document.documentElement.setAttribute('data-theme', next);
      setThemeState(next);
      try { localStorage.setItem('theme', next); } catch { /* storage unavailable */ }
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || prefersReducedMotion()) { apply(); return; }
    const x = origin?.x ?? window.innerWidth - 40;
    const y = origin?.y ?? 40;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const t = doc.startViewTransition(apply);
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 520, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => {});
  }, []);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark', origin);
  }, [setTheme]);

  return { theme, setTheme, toggle };
}

/** Adds .in to every .reveal element when it scrolls into view. */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'));
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Tracks which section is in the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** 0..1 page scroll progress. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? window.scrollY / h : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return p;
}

/** Animates a number from 0 to `to` the first time the element enters the viewport. Renders the final value on the server. */
export function useCountUp(to: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already visible: keep the final number
    setValue(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return { ref, value };
}

/** Rotating typewriter text. Static first item on the server and with reduced motion. */
export function useTypewriter(words: readonly string[]) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let wi = 0, ci = words[0].length, deleting = true, timer = 0;
    const tick = () => {
      const w = words[wi];
      ci += deleting ? -1 : 1;
      setText(w.slice(0, ci));
      let delay = deleting ? 32 : 65;
      if (!deleting && ci === w.length) { deleting = true; delay = 2000; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 280; }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

export async function copyText(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}
