import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import type { ProjectId } from './data/profile';
import { scrollToId, useTheme, type Theme } from './hooks';

type UI = {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  toast: (msg: string) => void;
  toastMsg: string | null;
  activeCase: ProjectId;
  openCase: (id: ProjectId, scroll?: boolean) => void;
};

const Ctx = createContext<UI | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeCase, setActiveCase] = useState<ProjectId>('aos');
  const timer = useRef<number>(0);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToastMsg(null), 2200);
  }, []);

  const openCase = useCallback((id: ProjectId, scroll = true) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduce && !scroll) doc.startViewTransition(() => setActiveCase(id));
    else setActiveCase(id);
    if (scroll) requestAnimationFrame(() => scrollToId('case-studies'));
  }, []);

  const value = useMemo<UI>(() => ({
    theme, toggleTheme: toggle, paletteOpen, setPaletteOpen, terminalOpen, setTerminalOpen,
    toast, toastMsg, activeCase, openCase,
  }), [theme, toggle, paletteOpen, terminalOpen, toast, toastMsg, activeCase, openCase]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useUI must be used inside UIProvider');
  return v;
}
