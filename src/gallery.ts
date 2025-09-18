export type GalleryImg = { src: string; alt: string };

// Discovers local gallery images under src/assets/img using webpack's require.context
// - Recursively includes png/jpg/jpeg/webp
// - Excludes the hero image 1.jpeg
export function getGalleryImages(): GalleryImg[] {
  const reqAny = require as any;
  try {
    if (typeof reqAny?.context === 'function') {
      const ctx = reqAny.context('./assets/img', true, /\.(png|jpe?g|webp)$/i);
      const files: string[] = ctx
        .keys()
        .filter((k: string) => !(/^\.\/1\.jpe?g$/i.test(k) || /\/1\.jpe?g$/i.test(k)))
        .sort();
      const images = files.map((key: string, index: number) => {
        const url: string = ctx(key);
        const name = (key.split('/').pop() || `photo-${index + 1}`).replace(/\.(png|jpe?g|webp)$/i, '');
        const nice = name.replace(/[-_]/g, ' ').trim();
        return { src: url, alt: `Gallery photo: ${nice || `photo ${index + 1}`}` };
      });
      if (process.env.NODE_ENV !== 'production' && images.length === 0) {
        // Helpful note during development; does not affect tests/build
        // eslint-disable-next-line no-console
        console.warn('[Gallery] No images found in src/assets/img. Place images there (excluding 1.jpeg for hero).');
      }
      return images;
    }
  } catch {
    // swallow and return empty; App renders an empty gallery gracefully
  }
  return [];
}
