import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BadgeCheck,
  Clapperboard,
  FolderOpen,
  Mail,
  Play,
  Sparkles,
  Star,
  Youtube,
} from 'lucide-react';
import './styles.css';

const categories = [
  'UGC Ads',
  'HYPE Ads',
  'Voiceover & Bilingual',
  'VSL',
  'Podcast & AI Ads',
  'YouTube',
];

const projects = [
  {
    title: 'UGC Ads',
    tag: 'Short-form performance edits',
    format: '9:16',
    tone: 'Fast hooks, captions, social proof',
    accent: 'mint',
  },
  {
    title: 'HYPE Ads',
    tag: 'Sports, creator, launch energy',
    format: '9:16',
    tone: 'Rhythm cuts, impact frames, speed ramps',
    accent: 'lime',
  },
  {
    title: 'Voiceover & Bilingual Ads',
    tag: 'English, bilingual, narrative ads',
    format: '9:16',
    tone: 'Voice-led pacing with clean subtitles',
    accent: 'sky',
  },
  {
    title: 'Video Sales Letter',
    tag: 'Long-form conversion stories',
    format: '16:9',
    tone: 'Problem, proof, offer, CTA',
    accent: 'orange',
  },
  {
    title: 'Podcast & AI Ads',
    tag: 'Talking-head, podcast, AI creative',
    format: '9:16 / 16:9',
    tone: 'Authority clips and synthetic concepts',
    accent: 'pink',
  },
  {
    title: 'YouTube Edits',
    tag: 'Retention-focused videos',
    format: '16:9',
    tone: 'Open loops, chapters, punchy pacing',
    accent: 'purple',
  },
];

const clients = [
  'VKTRY',
  'FreePrints',
  'RescueMD',
  'Trump Footwears',
  'Inside Success',
  'RS Chrono',
  'todaytix',
  'Analucia',
];

function App() {
  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Arafath Shafin home">
          <span>AS</span>
        </a>
        <div className="navlinks">
          <a href="#work">Work</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="heroCopy">
          <p className="eyebrow">
            <Sparkles size={18} /> Video Editor / UGC / Brand Ads / VSL
          </p>
          <h1>
            Hello, I am <span>Shafin</span>.
          </h1>
          <p className="lede">
            I turn raw footage into ads that feel sharp, human, and built for attention. This is a
            cleaner, faster, GitHub-hosted version of the portfolio, ready for YouTube embeds.
          </p>
          <div className="heroActions">
            <a className="primaryBtn" href="mailto:shafinhaque123456@gmail.com">
              <Mail size={20} /> Hire me
            </a>
            <a className="secondaryBtn" href="#work">
              <Clapperboard size={20} /> See work
            </a>
          </div>
        </div>

        <div className="heroBoard" aria-label="Portfolio summary">
          <div className="heroCard heroCardTall">
            <Play size={28} />
            <span>Video editing reel</span>
            <strong>YouTube embed placeholder</strong>
          </div>
          <div className="metricCard">
            <strong>6</strong>
            <span>Core editing categories</span>
          </div>
          <div className="shapeCard">
            <BadgeCheck size={26} />
            <span>Client-ready ads, captions, pacing, polish</span>
          </div>
        </div>
      </section>

      <section className="categoryRail" aria-label="Editing categories">
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
      </section>

      <section id="work" className="work">
        <div className="sectionHeader">
          <p className="eyebrow">
            <Star size={18} /> Featured work
          </p>
          <h2>Video sections with placeholders now, YouTube embeds later.</h2>
        </div>

        <div className="projectGrid">
          {projects.map((project, index) => (
            <article className={`projectCard ${project.accent}`} key={project.title}>
              <div className="videoShell">
                <div className="placeholderMark">
                  <Youtube size={34} />
                  <span>{project.format}</span>
                </div>
                <button aria-label={`Play ${project.title} placeholder`}>
                  <Play size={26} fill="currentColor" />
                </button>
                <p>Video {String(index + 1).padStart(2, '0')}</p>
              </div>
              <div className="projectMeta">
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.tone}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="clients" className="clients">
        <div className="sectionHeader split">
          <h2>Clients</h2>
          <p>Logo placeholders now, real brand marks can be swapped in when you want.</p>
        </div>
        <div className="clientGrid">
          {clients.map((client) => (
            <div className="clientLogo" key={client}>
              {client}
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <div>
          <p className="eyebrow">
            <FolderOpen size={18} /> Ready for links
          </p>
          <h2>Send the YouTube URLs later. The layout is already waiting.</h2>
        </div>
        <a className="primaryBtn" href="mailto:shafinhaque123456@gmail.com">
          shafinhaque123456@gmail.com <ArrowUpRight size={20} />
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
