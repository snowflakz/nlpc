export function imageSrcSet(url: string) {
  if (url.startsWith('/images/') && url.endsWith('-1600.webp')) {
    return [480, 960, 1600].map(width => `${url.replace('-1600.webp', `-${width}.webp`)} ${width}w`).join(', ');
  }
  if (!url.startsWith('https://images.pexels.com/')) return undefined;
  return [480, 768, 1200, 1920].map(width => `${url.replace(/([?&])w=\d+/, `$1w=${width}`)} ${width}w`).join(', ');
}
