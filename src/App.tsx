import React, { useEffect, useMemo, useRef, useState } from 'react';
import coupleImg from './assets/img/1.jpeg';
import logo from './assets/logo.svg';
import treeImg from './assets/tree.jpeg';
import { getGalleryImages, getGalleryVideos } from './gallery';

function App() {
  const [lightbox, setLightbox] = useState<{ open: boolean; kind: 'image' | 'video'; src: string; alt: string }>(
    { open: false, kind: 'image', src: '', alt: '' }
  );

  // Countdown state
  const weddingDate = useMemo(() => new Date('2025-10-25T00:00:00'), []);
  type Countdown = { d: number; h: number; m: number; s: number; done: boolean };
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = weddingDate.getTime() - now;
      if (diff <= 0) {
        setCountdown({ d: 0, h: 0, m: 0, s: 0, done: true });
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown({ d, h, m, s, done: false });
    };
    update();
    intervalRef.current = window.setInterval(update, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [weddingDate]);

  // Close on ESC when lightbox is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox({ open: false, kind: 'image', src: '', alt: '' });
      }
    };
    if (lightbox.open) {
      window.addEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open]);

  // Build gallery from local images and videos.
  const images = getGalleryImages();
  const videos = getGalleryVideos();
  const media = [
    ...images.map((i) => ({ kind: 'image' as const, ...i })),
    ...videos.map((v) => ({ kind: 'video' as const, ...v })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white text-primary font-body">
      {/* Skip to content for accessibility */}
      <a href="#mainContent" className="absolute left-[-9999px] focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:text-primary focus:px-3 focus:py-2 focus:rounded-md focus:shadow" aria-label="Skip to main content">
        Skip to content
      </a>
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="inline-flex items-center gap-2" aria-label="Clemence & Antoinette">
            <img src={logo} alt="Clemence & Antoinette logo" className="h-10 w-auto" />
          </a>
          <div className="space-x-4 text-sm">
            <a href="#gallery" className="rounded-md px-2 py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream">Gallery</a>
            <a href="#program" className="rounded-md px-2 py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream">Program</a>
            <a href="#side-activity" className="rounded-md px-2 py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream">Side Activity</a>
            <a href="#song-131" className="rounded-md px-2 py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream">Songs</a>
            <a href="#reception" className="rounded-md px-2 py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream">Reception</a>
            <a href="https://maps.app.goo.gl/4DUjqpYckgba1k2w8?g_st=iw" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-md bg-accent text-white px-3 py-1.5 shadow hover:bg-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream" aria-label="Open directions in Google Maps (opens in new tab)">
              <span aria-hidden="true">📍</span>
              <span>Directions</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="home" className="relative isolate overflow-hidden">
        {/* Decorative background accents */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={coupleImg}
                alt="Clemence and Antoinette smiling together"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-96 md:h-[32rem] object-cover rounded-md border border-primary/10 ring-4 ring-accent/60 ring-offset-2 ring-offset-cream drop-shadow-[0_0_28px_rgba(180,120,104,0.55)]"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-accent uppercase tracking-widest text-sm mb-3">We are getting married</p>
              <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-tight mb-4">Clemence Ayekple & Antoinette Seyram Agbo</h1>
              <p className="text-lg md:text-xl text-primary/80">Saturday, October 25, 2025</p>
              <p className="text-base md:text-lg text-primary/70">St. George’s Height, Dobro on the Nsawam road</p>
              <div className="mt-4">
                <a
                  href="https://maps.app.goo.gl/4DUjqpYckgba1k2w8?g_st=iw"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-md bg-accent text-white px-5 py-3 text-base shadow hover:bg-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  aria-label="Get directions to St. George’s Height (opens in new tab)"
                >
                  <span aria-hidden="true">📍</span>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {countdown && (
        <section id="countdown" aria-label="Wedding countdown" className="max-w-6xl mx-auto px-4 py-10 md:py-16">
          {countdown.done ? (
            <p className="font-display text-4xl md:text-6xl text-primary text-center" aria-live="polite" aria-atomic="true">
              Happily Married!
            </p>
          ) : (
            <div role="timer" aria-live="polite" aria-atomic="true" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl border border-primary/10 bg-white p-6 text-center shadow-sm">
                <div className="font-display text-5xl md:text-7xl text-primary">{countdown.d}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-primary/70">Days</div>
              </div>
              <div className="rounded-xl border border-primary/10 bg-white p-6 text-center shadow-sm">
                <div className="font-display text-5xl md:text-7xl text-primary">{String(countdown.h).padStart(2, '0')}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-primary/70">Hours</div>
              </div>
              <div className="rounded-xl border border-primary/10 bg-white p-6 text-center shadow-sm">
                <div className="font-display text-5xl md:text-7xl text-primary">{String(countdown.m).padStart(2, '0')}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-primary/70">Minutes</div>
              </div>
              <div className="rounded-xl border border-primary/10 bg-white p-6 text-center shadow-sm">
                <div className="font-display text-5xl md:text-7xl text-primary">{String(countdown.s).padStart(2, '0')}</div>
                <div className="mt-2 text-sm uppercase tracking-widest text-primary/70">Seconds</div>
              </div>
            </div>
          )}
        </section>
      )}

      <main id="mainContent" aria-hidden={lightbox.open} tabIndex={-1}>
        {/* Gallery */}
        <section id="gallery" aria-labelledby="gallery-heading" className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <h2 id="gallery-heading" className="font-display text-3xl md:text-4xl mb-6">Our Gallery</h2>
          <p className="text-primary/70 mb-8">A few of our favorite moments together.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {media.map((item) => (
              <button
                key={item.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-primary/10 bg-white/20 backdrop-blur-sm shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream transform hover:-translate-y-0.5"
                onClick={() => setLightbox({ open: true, kind: item.kind, src: item.src, alt: item.alt })}
                aria-label={`Open ${item.kind === 'video' ? 'video' : 'photo'}: ${item.alt}`}
              >
                {item.kind === 'video' ? (
                  <>
                    <video src={item.src} muted playsInline preload="metadata" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-5xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">▶</span>
                    </div>
                  </>
                ) : (
                  <img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Program */}
        <section id="program" aria-labelledby="program-heading" className="bg-white/60 py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="program-heading" className="font-display text-3xl md:text-4xl mb-6">Program of the Day</h2>
            <ul className="grid md:grid-cols-3 gap-6">
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Musical Interlude</h3>
                <p className="text-primary/70">10:00 AM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Prelude music to welcome everyone.</p>
              </li>
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Arrival of Guests</h3>
                <p className="text-primary/70">11:00 AM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Guests arrive and take their seats.</p>
              </li>
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Arrival of Groom & Bride</h3>
                <p className="text-primary/70">11:45 AM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Processional and grand entrance.</p>
              </li>
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Chairman's Opening Remarks</h3>
                <p className="text-primary/70">11:50 AM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Welcome and opening address by the chairman.</p>
              </li>
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Song 131 & Opening Prayer</h3>
                <p className="text-primary/70">1:55 AM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Congregational song followed by prayer.</p>
              </li>
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Marriage Discourse "Honorable Marriage in God's Sight"</h3>
                <p className="text-primary/70">12:00 PM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">A discourse on the sanctity and honor of marriage.</p>
              </li>
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Song 132 & Closing Prayer</h3>
                <p className="text-primary/70">12:30 PM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Final song and closing prayer.</p>
              </li>
            </ul>
          </div>
        </section>

        
        {/* Song 131 */}
        <section id="song-131" aria-labelledby="song131-heading" className="max-w-6xl mx-auto px-4 py-14 md:py-20 text-center">
          <h2 id="song131-heading" className="font-display text-3xl md:text-4xl mb-2">Song 131 — “What God Has Yoked Together”</h2>
          <p className="text-primary/70 mb-6">(Matthew 19:5, 6)</p>
          <div className="space-y-6 leading-relaxed text-primary/90">
            <div>
              <h3 className="font-semibold mb-2">1. Verse</h3>
              <p>With dignity and joy,</p>
              <p>A threefold cord is bound.</p>
              <p>With God and men to witness,</p>
              <p>These sacred vows resound.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Chorus 1</h3>
              <p>He vowed before Jehovah</p>
              <p>To love her from the heart.</p>
              <p>“What God has yoked together,</p>
              <p>Let no man put apart.”</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Verse</h3>
              <p>They both have searched God’s Word</p>
              <p>To learn to do his will,</p>
              <p>And now they seek his blessing,</p>
              <p>Their promise to fulfill.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Chorus 2</h3>
              <p>She vowed before Jehovah</p>
              <p>To love him from the heart.</p>
              <p>“What God has yoked together,</p>
              <p>Let no man put apart.”</p>
            </div>
          </div>
        </section>

        {/* Song 132 */}
        <section id="song-132" aria-labelledby="song132-heading" className="max-w-6xl mx-auto px-4 py-14 md:py-20 text-center">
          <h2 id="song132-heading" className="font-display text-3xl md:text-4xl mb-2">Song 132 — “Now We Are One”</h2>
          <p className="text-primary/70 mb-6">(Genesis 2:23, 24)</p>
          <div className="space-y-6 leading-relaxed text-primary/90">
            <div>
              <h3 className="font-semibold mb-2">1. Verse</h3>
              <p>This is at last bone of my bone,</p>
              <p>Flesh of my flesh; now I’m not alone.</p>
              <p>God has provided a partner,</p>
              <p>Someone to call my own.</p>
              <p>Now we are one; now there can be</p>
              <p>Blessings to share for you and for me.</p>
              <p>As man and woman together,</p>
              <p>We are a family.</p>
              <p>Ev’ry day we’ll serve our God above.</p>
              <p>As he shows the way,</p>
              <p>Unfailing love we’ll display.</p>
              <p>As we have vowed, so may it be.</p>
              <p>Seasons of joy, may we come to see.</p>
              <p>Oh, may we honor Jehovah,</p>
              <p>And may you always be my love.</p>
            </div>
          </div>
        </section>

        {/* Side Activities */}
        <section id="side-activity" aria-labelledby="side-activity-heading" className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <h2 id="side-activity-heading" className="font-display text-3xl md:text-4xl mb-6">Side Activity</h2>
          <p className="text-primary/70 mb-8">A special keepsake alongside the main program.</p>

          {/* Thumbprint Tree Guestbook */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
            <div className="rounded-xl overflow-hidden border border-primary/10 bg-white">
              <img src={treeImg} alt="Thumbprint tree guestbook" loading="lazy" className="w-full h-auto object-contain" />
            </div>
            <div>
              <h3 className="font-semibold text-2xl mb-3">Thumbprint Tree Guestbook</h3>
              <p className="text-primary/80">Please help us grow our tree:</p>
              <ul className="mt-3 space-y-2 text-primary/80">
                <li>• Dab your thumb on the ink pad.</li>
                <li>• Gently press a leaf onto the tree.</li>
                <li>• Sign your name next to your leaf.</li>
              </ul>
              <p className="mt-4 text-sm text-primary/70">Wet wipes and pens are provided. Thank you for leaving your mark on our special day!</p>
            </div>
          </div>

        </section>

        {/* Reception */}
        <section id="reception" aria-labelledby="reception-heading" className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <h2 id="reception-heading" className="font-display text-3xl md:text-4xl mb-6">Reception</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-primary/80">St. George’s Height</p>
              <p className="text-primary/60">Dobro on the Nsawam road</p>
              <a
                className="inline-block mt-4 text-accent underline underline-offset-4 hover:text-primary"
                href="https://maps.google.com/?q=St.%20George%E2%80%99s%20Height%2C%20Dobro%20on%20the%20Nsawam%20road"
                target="_blank" rel="noreferrer"
              >
                View on Google Maps
              </a>
              <p className="mt-6 text-sm text-primary/70">Formal attire. Valet parking available.</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-primary/10">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop"
                alt="Reception hall interior"
                loading="lazy"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </section>

      </main>

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Media lightbox" onClick={() => setLightbox({ open: false, kind: 'image', src: '', alt: '' })}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox({ open: false, kind: 'image', src: '', alt: '' })}
              className="absolute -top-3 -right-3 bg-white text-primary rounded-full w-10 h-10 shadow focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close"
            >
              ✕
            </button>
            {lightbox.kind === 'video' ? (
              <video src={lightbox.src} controls autoPlay playsInline className="w-full rounded-lg" />
            ) : (
              <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-lg" />
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 text-center text-sm text-primary/70" aria-hidden={lightbox.open}>
        <p>Made with love • Clemence & Antoinette • 2025</p>
      </footer>
    </div>
  );
}

export default App;
