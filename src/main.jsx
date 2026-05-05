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
  Youtube,
} from 'lucide-react';
import './styles.css';

const categories = ['UGC Ads', 'HYPE Ads', 'Voiceover', 'VSL', 'Podcast & AI', 'YouTube'];

const showreels = [
  {
    title: 'UGC Ads',
    summary: 'Creator-led edits for paid social: fast hooks, proof moments, captions, and thumb-stopping pacing.',
    accent: 'mint',
    moreUrl: 'https://photos.app.goo.gl/YPPkXLnuWomS3PSTA',
    samples: ['Creator testimonial', 'Problem-solution ad', 'Social proof montage'],
  },
  {
    title: 'HYPE Ads',
    summary: 'High-energy sports, creator, and launch edits built around rhythm, impact frames, and momentum.',
    accent: 'lime',
    moreUrl: '#contact',
    samples: ['Sports highlight', 'Lifestyle hype cut', 'App/product motion ad'],
  },
  {
    title: 'Voiceover & Bilingual Ads',
    summary: 'Voice-led edits with clean subtitle systems, natural timing, and multilingual ad structure.',
    accent: 'sky',
    moreUrl: 'https://photos.app.goo.gl/YPPkXLnuWomS3PSTA',
    samples: ['Founder voiceover', 'Bilingual explainer', 'Narrative testimonial'],
  },
  {
    title: 'Video Sales Letter (VSL)',
    summary: 'Long-form conversion videos shaped around problem, proof, mechanism, offer, and CTA.',
    accent: 'orange',
    moreUrl: 'https://photos.app.goo.gl/Fu2JqKmgsPzQyUDR6',
    samples: ['Offer breakdown', 'Brand proof section', 'CTA sequence'],
  },
  {
    title: 'Podcast & AI Ads',
    summary: 'Authority clips, podcast repurposing, AI-assisted concepts, and scroll-ready talking-head edits.',
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

function VideoPlaceholder({ label, index, accent }) {
  return (
    <article className={`videoCard ${accent}`}>
      <div className="videoChrome">
        <span className="format">9:16</span>
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
    <section className="reelRow" id={reel.title.toLowerCase().replaceAll(' ', '-')}>
      <div className="reelIntro">
        <p className="eyebrow">
          <Youtube size={17} /> Category showreel
        </p>
        <h3>{reel.title}</h3>
        <p>{reel.summary}</p>
      </div>
      <div className="reelGrid">
        {reel.samples.map((sample, index) => (
          <VideoPlaceholder key={sample} label={sample} index={index} accent={reel.accent} />
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
          <a href="#ai-creative">AI creative</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div className="heroCopy">
          <p className="eyebrow">
            <Sparkles size={18} /> Video editor for UGC, brand ads, VSLs and AI creative
          </p>
          <h1>Ads edited for the first three seconds.</h1>
          <p className="lede">
            I help brands and creators turn raw footage into sharp, caption-led videos that feel
            native to the feed and clear enough to sell.
          </p>
          <div className="heroProof">
            <span>Arafath Shafin</span>
            <span>Short-form ads</span>
            <span>Conversion edits</span>
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
            <strong>YouTube embed goes here</strong>
          </div>
          <div className="heroMini dark">
            <strong>5+</strong>
            <span>Portfolio categories</span>
          </div>
          <div className="heroMini warm">
            <BadgeCheck size={24} />
            <span>Hooks, pacing, captions, thumbnails, offers</span>
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
          <h2>Category-wise showreels, built for your YouTube links.</h2>
          <p>
            Each row mirrors the structure of your Canva portfolio: three featured video slots plus
            a “More here” folder card for the complete set.
          </p>
        </div>

        <div className="showreelStack">
          {showreels.map((reel) => (
            <ShowreelRow key={reel.title} reel={reel} />
          ))}
        </div>
      </section>

      <section id="ai-creative" className="aiCreative">
        <div>
          <p className="eyebrow">
            <Sparkles size={18} /> Additional capability
          </p>
          <h2>AI-assisted creative for faster ad testing.</h2>
          <p>
            When a project needs more angles, hooks, or visual directions, I can support the edit
            with AI-assisted concepting and asset prep without making the final video feel generic.
          </p>
        </div>
        <div className="capabilityPanel">
          <article>
            <strong>Hook angles</strong>
            <p>More opening ideas and script routes before choosing what deserves an edit.</p>
          </article>
          <article>
            <strong>Ad variations</strong>
            <p>Useful for testing different intros, captions, formats, and offer framing.</p>
          </article>
          <article>
            <strong>Visual direction</strong>
            <p>Reference boards and creative routes that help the final timeline move faster.</p>
          </article>
        </div>
      </section>

      <section id="clients" className="clients">
        <div className="sectionHeader split">
          <h2>Clients</h2>
          <p>Logo placeholders for now. We can swap in brand marks later without changing layout.</p>
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
          <h2>Send the YouTube URLs later. The embed slots are already mapped.</h2>
        </div>
        <a className="primaryBtn" href="mailto:shafinhaque123456@gmail.com">
          shafinhaque123456@gmail.com <ArrowUpRight size={20} />
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
