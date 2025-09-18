import React, { useEffect, useMemo, useRef, useState } from 'react';
import coupleImg from './assets/img/1.jpeg';
import logo from './assets/logo.svg';

function App() {
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string; alt: string }>(
    { open: false, src: '', alt: '' }
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
        setLightbox({ open: false, src: '', alt: '' });
      }
    };
    if (lightbox.open) {
      window.addEventListener('keydown', onKey);
    }
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open]);

  // Build gallery from local images in src/assets/img (excluding hero 1.jpeg).
  // No external fallbacks; if none are found, the gallery remains empty.
  const reqAny = require as any;
  let images: { src: string; alt: string }[] = [];
  try {
    if (typeof reqAny?.context === 'function') {
      const galleryContext = reqAny.context('./assets/img', true, /\.(png|jpe?g|webp)$/i);
      const localGalleryFiles: string[] = galleryContext
        .keys()
        .filter((k: string) => !(/\/(?:)1\.jpe?g$/i.test(k) || /^\.\/1\.jpe?g$/i.test(k)))
        .sort();
      images = localGalleryFiles.map((key: string, index: number) => {
        const url: string = galleryContext(key);
        const name = (key.split('/').pop() || `photo-${index + 1}`).replace(/\.(png|jpe?g|webp)$/i, '');
        const nice = name.replace(/[-_]/g, ' ').trim();
        return { src: url, alt: `Gallery photo: ${nice || `photo ${index + 1}`}` };
      });
    }
  } catch (_) {
    // no fallback; gallery will be empty if no local images
  }

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
            <a href="#reception" className="rounded-md px-2 py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream">Reception</a>
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
            {images.map((img) => (
              <button
                key={img.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-primary/10 bg-white/20 backdrop-blur-sm shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream transform hover:-translate-y-0.5"
                onClick={() => setLightbox({ open: true, src: img.src, alt: img.alt })}
                aria-label={`Open photo: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
                <h3 className="font-semibold">Ceremony</h3>
                <p className="text-primary/70">2:00 PM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Join us under the oaks as we exchange vows.</p>
              </li>
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Cocktail Hour</h3>
                <p className="text-primary/70">3:30 PM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Sip, mingle, and enjoy light bites.</p>
              </li>
              <li className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-primary/20 transform hover:-translate-y-0.5">
                <h3 className="font-semibold">Dinner & Dancing</h3>
                <p className="text-primary/70">5:00 PM • St. George’s Height, Dobro on the Nsawam road</p>
                <p className="mt-2 text-sm text-primary/70">Celebrate the night away with us!</p>
              </li>
            </ul>
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
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Image lightbox" onClick={() => setLightbox({ open: false, src: '', alt: '' })}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox({ open: false, src: '', alt: '' })}
              className="absolute -top-3 -right-3 bg-white text-primary rounded-full w-10 h-10 shadow focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="Close"
            >
              ✕
            </button>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-lg" />
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
