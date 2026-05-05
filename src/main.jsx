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
} from 'lucide-react';
import './styles.css';

const categories = ['Video Editor', 'UGC Editor', 'Brand Ads', 'YouTube', 'VSL', 'AI Creative'];

const showreels = [
  {
    title: 'UGC Ads',
    summary: 'Paid social edits with hooks, captions, and proof.',
    accent: 'mint',
    moreUrl: 'https://photos.app.goo.gl/YPPkXLnuWomS3PSTA',
    samples: ['Creator testimonial', 'Problem-solution ad', 'Social proof montage'],
  },
  {
    title: 'HYPE Ads',
    summary: 'Fast, loud, high-retention cuts.',
    accent: 'lime',
    moreUrl: '#contact',
    samples: ['Sports highlight', 'Lifestyle hype cut', 'App/product motion ad'],
  },
  {
    title: 'Voiceover & Bilingual Ads',
    summary: 'Voice-led ads with clean subtitles.',
    accent: 'sky',
    moreUrl: 'https://photos.app.goo.gl/YPPkXLnuWomS3PSTA',
    samples: ['Founder voiceover', 'Bilingual explainer', 'Narrative testimonial'],
  },
  {
    title: 'Video Sales Letter (VSL)',
    summary: 'One wide VSL slot for long-form sales edits.',
    accent: 'orange',
    moreUrl: 'https://photos.app.goo.gl/Fu2JqKmgsPzQyUDR6',
    format: '16:9',
    layout: 'wide',
    samples: ['Video Sales Letter placeholder'],
  },
  {
    title: 'Podcast & AI Ads',
    summary: 'Podcast clips and AI-assisted ad concepts.',
    accent: 'pink',
    moreUrl: '#contact',
    samples: ['Podcast clip', 'AI concept ad', 'Talking-head authority edit'],
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

function VideoPlaceholder({ label, index, accent, format = '9:16', layout = 'portrait' }) {
  return (
    <article className={`videoCard ${accent} ${layout}`}>
      <div className="videoChrome">
        <span className="format">{format}</span>
        <button aria-label={`Play ${label} placeholder`}>
          <Play size={24} fill="currentColor" />
        </button>
        <span className="videoIndex">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h4>{label}</h4>
      <p>YouTube embed placeholder</p>
    </article>
  );
}

function ShowreelRow({ reel }) {
  return (
    <section
      className={`reelRow ${reel.layout === 'wide' ? 'wide' : ''}`}
      id={reel.title.toLowerCase().replaceAll(' ', '-')}
    >
      <div className="reelIntro">
        <h3>{reel.title}</h3>
        <p>{reel.summary}</p>
      </div>
      <div className="reelGrid">
        {reel.samples.map((sample, index) => (
          <VideoPlaceholder
            key={sample}
            label={sample}
            index={index}
            accent={reel.accent}
            format={reel.format}
            layout={reel.layout === 'wide' ? 'wide' : 'portrait'}
          />
        ))}
        <a className={`folderCard ${reel.accent}`} href={reel.moreUrl}>
          <FolderOpen size={44} />
          <span>More here</span>
          <small>Folder / full set placeholder</small>
        </a>
      </div>
    </section>
  );
}

function App() {
  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Arafath Shafin home">
          AS
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
            <Sparkles size={18} /> Video Editor | UGC Editor | Brand Ads | YouTube | VSL
          </p>
          <h1>Hello, I am <span>Shafin!</span></h1>
          <p className="lede">Scroll-stopping edits for brands, creators, and ads.</p>
          <div className="heroProof">
            <span>UGC Ads</span>
            <span>HYPE Ads</span>
            <span>Voiceover</span>
            <span>AI Creative</span>
          </div>
          <div className="heroActions">
            <a className="primaryBtn" href="mailto:shafinhaque123456@gmail.com">
              <Mail size={20} /> Hire me
            </a>
            <a className="secondaryBtn" href="#work">
              <Clapperboard size={20} /> Watch samples
            </a>
          </div>
        </div>

        <div className="heroBoard" aria-label="Portfolio summary">
          <div className="heroReel">
            <Play size={30} fill="currentColor" />
            <span>Featured reel</span>
            <strong>Showreel placeholder</strong>
          </div>
          <div className="heroMini dark">
            <strong>5+</strong>
            <span>Portfolio categories</span>
          </div>
          <div className="heroMini warm">
            <BadgeCheck size={24} />
            <span>Hooks, pacing, captions, thumbnails</span>
          </div>
        </div>
      </section>

      <section className="categoryRail" aria-label="Editing categories">
        {categories.map((category) => (
          <a href="#work" key={category}>
            {category}
          </a>
        ))}
      </section>

      <section id="work" className="work">
        <div className="sectionHeader">
          <p className="eyebrow">
            <Clapperboard size={18} /> Selected work
          </p>
          <h2>Video showreels</h2>
          <p>Three samples per category, with a folder card for the full set.</p>
        </div>

        <div className="showreelStack">
          {showreels.map((reel) => (
            <ShowreelRow key={reel.title} reel={reel} />
          ))}
        </div>
      </section>

      <section id="clients" className="clients">
        <div className="sectionHeader split">
          <h2>Clients</h2>
          <p>Brand marks can replace these placeholders later.</p>
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
          <h2>Send the YouTube links later. The slots are ready.</h2>
        </div>
        <a className="primaryBtn" href="mailto:shafinhaque123456@gmail.com">
          shafinhaque123456@gmail.com <ArrowUpRight size={20} />
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
