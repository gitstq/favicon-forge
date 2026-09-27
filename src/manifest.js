// Web App Manifest (W3C) and HTML <head> link snippet builders.
// Pure, dependency-free, isomorphic.

/**
 * Build site.webmanifest contents.
 * @param {Object} cfg
 * @param {string} cfg.name
 * @param {string} [cfg.shortName]
 * @param {string} [cfg.description]
 * @param {string} [cfg.themeColor]
 * @param {string} [cfg.backgroundColor]
 * @param {string} [cfg.startUrl]
 * @param {string} [cfg.display]
 * @param {Array<{src:string,sizes:string,type?:string,purpose?:string}>} [cfg.icons]
 * @returns {string} pretty JSON
 */
export function buildManifest(cfg) {
  const manifest = {
    name: cfg.name || 'My App',
    short_name: cfg.shortName || cfg.name || 'My App',
    description: cfg.description || '',
    icons: cfg.icons || [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: cfg.themeColor || '#2563eb',
    background_color: cfg.backgroundColor || '#ffffff',
    display: cfg.display || 'standalone',
    start_url: cfg.startUrl || '/',
  };
  // Drop empty description to keep the file clean.
  if (!manifest.description) delete manifest.description;
  return JSON.stringify(manifest, null, 2);
}

function trimSlash(p) {
  return p.endsWith('/') ? p.slice(0, -1) : p;
}

/**
 * Build the copy-paste <head> links for every generated asset.
 * @param {Object} [opts]
 * @param {string} [opts.basePath] - e.g. '/' or '/static/icons'
 * @param {boolean} [opts.svg]
 * @param {boolean} [opts.manifest]
 * @returns {string} HTML
 */
export function buildHtmlLinks(opts = {}) {
  const base = trimSlash(opts.basePath === undefined ? '/' : opts.basePath);
  const withSvg = opts.svg !== false;
  const withManifest = opts.manifest !== false;

  const lines = [
    '<link rel="icon" href="' + base + '/favicon.ico" sizes="32x32">',
    '<link rel="icon" href="' + base + '/favicon-16x16.png" sizes="16x16" type="image/png">',
    '<link rel="icon" href="' + base + '/favicon-32x32.png" sizes="32x32" type="image/png">',
  ];
  if (withSvg) {
    lines.push(
      '<link rel="icon" href="' + base + '/favicon.svg" type="image/svg+xml">'
    );
  }
  lines.push(
    '<link rel="apple-touch-icon" href="' + base + '/apple-touch-icon.png">' // 180x180
  );
  if (withManifest) {
    lines.push('<link rel="manifest" href="' + base + '/site.webmanifest">');
  }
  lines.push('<meta name="theme-color" content="' + (opts.themeColor || '#2563eb') + '">');
  return lines.join('\n');
}
