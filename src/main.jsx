import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BadgeCheck,
  Clapperboard,
  FolderOpen,
  Mail,
  MessageCircle,
  Play,
  Sparkles,
} from 'lucide-react';
import './styles.css';

const categories = ['Video Editor', 'UGC Editor', 'Brand Ads', 'YouTube', 'VSL', 'AI Creative'];

const showreels = [
  {
    title: 'UGC Ads',
    label: 'UGC',
    accent: 'mint',
    moreUrl: 'https://photos.app.goo.gl/YPPkXLnuWomS3PSTA',
    samples: ['Creator testimonial', 'Problem-solution ad', 'Social proof montage'],
  },
  {
    title: 'HYPE Ads',
    label: 'HYPE',
    accent: 'lime',
    moreUrl: '#contact',
    samples: ['Sports highlight', 'Lifestyle hype cut', 'App/product motion ad'],
  },
  {
    title: 'Voiceover & Bilingual Ads',
    label: 'Voiceover',
    accent: 'sky',
    moreUrl: 'https://photos.app.goo.gl/YPPkXLnuWomS3PSTA',
    samples: ['Founder voiceover', 'Bilingual explainer', 'Narrative testimonial'],
  },
  {
    title: 'Video Sales Letter (VSL)',
    label: 'VSL',
    accent: 'orange',
    moreUrl: 'https://photos.app.goo.gl/Fu2JqKmgsPzQyUDR6',
    format: '16:9',
    layout: 'wide',
    samples: ['Video Sales Letter placeholder'],
  },
  {
    title: 'Podcast & AI Ads',
    label: 'Podcast + AI',
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
        <h3>{reel.label}</h3>
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
            <Sparkles size={18} /> Video Editor | Motion-led Ads | UGC | VSL
          </p>
          <h1>Motion-led edits for ads that need to move fast.</h1>
          <p className="lede">Showreels, UGC ads, launch cuts, VSLs, and scroll-ready brand content.</p>
          <div className="heroProof">
            <span>Hook-first</span>
            <span>Caption clean</span>
            <span>Rhythm cuts</span>
            <span>Ad-ready</span>
          </div>
          <div className="heroActions">
            <a className="primaryBtn" href="https://wa.me/60178708152">
              <MessageCircle size={20} /> Hire me
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
            <strong>Showreel</strong>
            <small>YouTube embed placeholder</small>
          </div>
          <div className="heroMini dark motionCard">
            <div className="motionFrames">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <strong>Hook map</strong>
          </div>
          <div className="heroMini warm motionCard">
            <div className="timelineStrips">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <strong>Edit rhythm</strong>
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
        </div>

        <div className="showreelStack">
          {showreels.map((reel) => (
            <ShowreelRow key={reel.title} reel={reel} />
          ))}
        </div>
      </section>

      <section id="ai-creative" className="aiCreative">
        <div className="aiCopy">
          <p className="eyebrow">
            <Sparkles size={18} /> AI creative
          </p>
          <h2>More angles. Faster tests.</h2>
        </div>
        <div className="aiGrid">
          <article>
            <strong>Hook ideas</strong>
            <span>More openings to test.</span>
          </article>
          <article>
            <strong>Script routes</strong>
            <span>Cleaner ad structure.</span>
          </article>
          <article>
            <strong>Visual concepts</strong>
            <span>References before the edit.</span>
          </article>
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
        <a className="primaryBtn" href="https://wa.me/60178708152">
          WhatsApp me <ArrowUpRight size={20} />
        </a>
        <a className="secondaryBtn contactEmail" href="mailto:shafinhaque123456@gmail.com">
          <Mail size={20} /> Email
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
