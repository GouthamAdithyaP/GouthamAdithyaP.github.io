import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Send } from 'lucide-react';
import { profile } from '../data/profile';
import { useUI } from '../context';
import { copyText } from '../hooks';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

export function Contact() {
  const { toast } = useUI();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', message: '' });

  const onCopy = async () => {
    const ok = await copyText(profile.email);
    toast(ok ? 'Email copied to clipboard' : profile.email);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  };

  // No backend: compose the message in the visitor's own email app.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Opportunity for ${profile.firstName}${form.company ? ` at ${form.company}` : ''}`;
    const body = `${form.message}\n\n${form.name}${form.company ? `\n${form.company}` : ''}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card reveal">
          <div className="contact-copy">
            <p className="eyebrow"><span className="mono">08</span> Contact</p>
            <h2 id="contact-title">Let’s build something <span className="serif-accent">reliable</span>.</h2>
            <p className="lead">I’m open to Java Backend, Java Full-Stack and Spring Boot roles in Bengaluru or remote. Email is the fastest way to reach me.</p>
            <ul className="contact-list">
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button className="icon-btn sm" onClick={onCopy} aria-label="Copy email address">
                  {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                </button>
              </li>
              <li><LinkedInIcon size={16} /><a href={profile.linkedin} target="_blank" rel="noopener">{profile.linkedinLabel} <ArrowUpRight size={13} aria-hidden="true" /></a></li>
              <li><GitHubIcon size={16} /><a href={profile.github} target="_blank" rel="noopener">{profile.githubLabel} <ArrowUpRight size={13} aria-hidden="true" /></a></li>
              <li><MapPin size={16} aria-hidden="true" /><span>{profile.location}</span></li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="cf-name">Your name</label>
              <input id="cf-name" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="cf-company">Company <span className="muted">(optional)</span></label>
              <input id="cf-company" autoComplete="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="cf-msg">Message</label>
              <textarea id="cf-msg" required rows={4} placeholder="Tell me about the role or project…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <button className="btn btn-primary" type="submit"><Send size={16} aria-hidden="true" /> Compose email</button>
            <p className="form-note">Opens your email app with the message filled in. Nothing is stored.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
