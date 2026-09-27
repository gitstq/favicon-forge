// Scalable SVG favicon builder. Modern browsers (Chrome/Edge/Firefox/Safari) and
// bookmark tools accept a single resolution-independent favicon.svg.
// Pure string builder, dependency-free, isomorphic.

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const EMOJI_FONT =
  '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif';
const TEXT_FONT =
  'Arial,"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif';

function autoFontSize(kind, text) {
  const len = [...String(text)].length;
  if (kind === 'emoji') {
    if (len <= 1) return 60;
    if (len === 2) return 42;
    if (len === 3) return 32;
    return 26;
  }
  if (len <= 1) return 66;
  if (len === 2) return 50;
  if (len === 3) return 38;
  return 30;
}

/**
 * Build an SVG favicon string on a 100x100 viewBox.
 * @param {Object} cfg
 * @param {'emoji'|'text'} cfg.kind
 * @param {string} cfg.text
 * @param {string} [cfg.textColor]
 * @param {Object} cfg.background
 * @param {'transparent'|'solid'|'gradient'} cfg.background.type
 * @param {string} [cfg.background.color]
 * @param {string} [cfg.background.color2]
 * @param {number} [cfg.background.angle] - CSS-style degrees (0 = up, 90 = right)
 * @param {number} [cfg.radius] - corner radius as fraction of edge, 0..0.5
 * @param {number} [cfg.fontSize] - override font size in viewBox units
 * @returns {string} standalone SVG document
 */
export function buildSvgFavicon(cfg) {
  const {
    kind = 'emoji',
    text = '🦞',
    textColor = '#ffffff',
    background = { type: 'solid', color: '#2563eb' },
    radius = 0.18,
  } = cfg;

  const rx = Math.max(0, Math.min(0.5, radius)) * 100;
  const fontSize = cfg.fontSize || autoFontSize(kind, text);
  const isEmoji = kind === 'emoji';
  const font = isEmoji ? EMOJI_FONT : TEXT_FONT;

  let defs = '';
  let fill = 'none';
  if (background.type === 'solid') {
    fill = background.color;
  } else if (background.type === 'gradient') {
    const angle = background.angle === undefined ? 90 : background.angle;
    const rad = (angle * Math.PI) / 180;
    const dx = Math.sin(rad);
    const dy = -Math.cos(rad);
    const x1 = 0.5 - dx / 2;
    const y1 = 0.5 - dy / 2;
    const x2 = 0.5 + dx / 2;
    const y2 = 0.5 + dy / 2;
    defs =
      `<defs><linearGradient id="g" x1="${x1.toFixed(4)}" y1="${y1.toFixed(4)}" ` +
      `x2="${x2.toFixed(4)}" y2="${y2.toFixed(4)}">` +
      `<stop offset="0" stop-color="${background.color}"/>` +
      `<stop offset="1" stop-color="${background.color2}"/></linearGradient></defs>`;
    fill = 'url(#g)';
  }

  const rect =
    background.type === 'transparent'
      ? ''
      : `<rect width="100" height="100" rx="${rx}" ry="${rx}" fill="${fill}"/>`;

  const textAttrs = isEmoji ? '' : `fill="${textColor}"`;
  const textEl =
    `<text x="50" y="51" text-anchor="middle" dominant-baseline="central" ` +
    `font-family='${font}' font-size="${fontSize}" ${textAttrs}>${escapeXml(text)}</text>`;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" ` +
    `width="100" height="100">${defs}${rect}${textEl}</svg>`
  );
}
