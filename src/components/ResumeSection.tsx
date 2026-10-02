import { Download, Eye, FileText } from 'lucide-react';
import { profile, resume } from '../data/profile';
import { Section } from './Section';

export function ResumeSection() {
  return (
    <Section id="resume" index="07" eyebrow="Resume" title="My resume" lead="Download it as a PDF or open it in your browser.">
      <article className="card resume-card reveal">
        <div className="resume-main">
          <div className="resume-top">
            <span className="resume-icon"><FileText size={22} aria-hidden="true" /></span>
            <div>
              <h3>{profile.name}</h3>
              <p className="resume-meta">{resume.title} · 2 pages</p>
            </div>
          </div>
          <p>{resume.blurb}</p>
          <ul className="tags">{resume.emphasis.map((e) => <li key={e}>{e}</li>)}</ul>
        </div>
        <div className="resume-actions">
          <a className="btn btn-primary" href={resume.pdf} download={resume.fileName}><Download size={16} aria-hidden="true" /> Download PDF</a>
          <a className="btn btn-ghost" href={resume.pdf} target="_blank" rel="noopener"><Eye size={16} aria-hidden="true" /> View in browser</a>
        </div>
      </article>
    </Section>
  );
}
