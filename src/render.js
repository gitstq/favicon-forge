// Canvas rendering engine: turns a design config into a raster icon at any size.
// Browser-only (depends on Canvas 2D). Knows the platform correctness rules:
//  - browser tab favicons may be transparent with rounded corners (bleed = false)
//  - Apple touch and Android (maskable) icons must be full-bleed & opaque and keep
//    their content inside the safe zone (bleed = true).

const EMOJI_FONT =
  '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif';
const TEXT_FONT =
  'Arial,"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif';

function roundedRectPath(ctx, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

// Gradient direction matching CSS linear-gradient(angle): 0deg = up, 90deg = right.
function makeGradient(ctx, size, bg) {
  const angle = bg.angle === undefined ? 90 : bg.angle;
  const rad = (angle * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);
  const g = ctx.createLinearGradient(
    size * (0.5 - dx / 2),
    size * (0.5 - dy / 2),
    size * (0.5 + dx / 2),
    size * (0.5 + dy / 2)
  );
  g.addColorStop(0, bg.color);
  g.addColorStop(1, bg.color2);
  return g;
}

function autoFontScale(kind, text) {
  const len = [...String(text)].length;
  if (kind === 'emoji') {
    if (len <= 1) return 0.6;
    if (len === 2) return 0.42;
    if (len === 3) return 0.32;
    return 0.26;
  }
  if (len <= 1) return 0.66;
  if (len === 2) return 0.5;
  if (len === 3) return 0.38;
  return 0.3;
}

/**
 * Draw the icon described by `cfg` onto an existing canvas context.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} size - target edge in device pixels
 * @param {Object} cfg - design config
 * @param {Object} [opts]
 * @param {boolean} [opts.bleed] - full-bleed opaque icon (Apple/Android)
 * @param {number}  [opts.safePad] - extra safe-zone padding for full-bleed icons
 */
export function drawIcon(ctx, size, cfg, opts = {}) {
  const bleed = !!opts.bleed;
  const radius = bleed ? 0 : Math.max(0, Math.min(0.5, cfg.radius || 0));

  ctx.clearRect(0, 0, size, size);

  // Resolve background. Full-bleed icons must be opaque even if user picked transparent.
  let bg = cfg.background || { type: 'solid', color: cfg.themeColor || '#2563eb' };
  if (bleed && bg.type === 'transparent') {
    bg = { type: 'solid', color: cfg.themeColor || '#ffffff' };
  }

  // Outer shape path (square when bleed, rounded otherwise).
  const r = radius * size;
  roundedRectPath(ctx, 0, 0, size, size, r);

  if (bg.type !== 'transparent') {
    ctx.fillStyle =
      bg.type === 'gradient' ? makeGradient(ctx, size, bg) : bg.color;
    ctx.fill();
  }
  ctx.save();
  roundedRectPath(ctx, 0, 0, size, size, r);
  ctx.clip();

  // Content metrics.
  const basePad = Math.max(0, cfg.padding || 0);
  const pad = bleed ? Math.max(basePad, opts.safePad || 0.1) : basePad;
  const inner = size * (1 - pad * 2);
  const cx = size / 2;
  const cy = size / 2;

  if (cfg.source === 'image' && cfg.image) {
    const img = cfg.image;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (cfg.imageFit === 'cover') {
      const s = Math.max(inner / iw, inner / ih);
      const dw = iw * s;
      const dh = ih * s;
      ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
    } else {
      const s = Math.min(inner / iw, inner / ih);
      const dw = iw * s;
      const dh = ih * s;
      ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
    }
  } else {
    const kind = cfg.source === 'text' ? 'text' : 'emoji';
    const text = cfg.text || (kind === 'emoji' ? '🦞' : 'A');
    const font = kind === 'text' ? TEXT_FONT : EMOJI_FONT;
    const fontSize = inner * autoFontScale(kind, text);
    ctx.font = `${fontSize}px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (kind === 'text') ctx.fillStyle = cfg.textColor || '#ffffff';
    // Emoji glyphs sit slightly high; nudge down for visual centering.
    ctx.fillText(text, cx, cy + (kind === 'emoji' ? size * 0.02 : 0));
  }

  ctx.restore();
}

/**
 * Render to a fresh canvas and return it.
 * @returns {HTMLCanvasElement}
 */
export function renderCanvas(size, cfg, opts) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  drawIcon(ctx, size, cfg, opts);
  return canvas;
}

/** Convert a canvas to PNG bytes. */
export function canvasToPng(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('PNG encoding failed'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(blob);
    }, 'image/png');
  });
}
