import { useEffect } from 'react';
import { UIProvider, useUI } from './context';
import { useRevealOnScroll } from './hooks';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { CaseStudies } from './components/CaseStudies';
import { Impact } from './components/Impact';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { Terminal } from './components/Terminal';
import { Toast } from './components/Toast';

function Shell() {
  const { setPaletteOpen, paletteOpen, setTerminalOpen, terminalOpen } = useUI();
  useRevealOnScroll();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.closest('input, textarea, [contenteditable="true"]');
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      } else if (e.key === '`' && !typing) {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, terminalOpen, setPaletteOpen, setTerminalOpen]);

  useEffect(() => {
    // A small hello for developers who open DevTools.
    console.log(
      '%c☕ Hi, fellow developer!%c\nPress ` (backtick) for a terminal, or Ctrl/⌘ + K for the command palette.\n→ gouthamadithya8@gmail.com',
      'font: 700 14px Inter, sans-serif; color: #7c83ff',
      'font: 12px JetBrains Mono, monospace; color: inherit',
    );
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <CaseStudies />
        <Impact />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <Terminal />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <UIProvider>
      <Shell />
    </UIProvider>
  );
}
