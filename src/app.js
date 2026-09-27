// Favicon Forge — UI controller and asset pipeline (browser only).

import { drawIcon, canvasToPng } from './render.js';
import { buildIco } from './ico.js';
import { buildZip } from './zip.js';
import { buildSvgFavicon } from './svgfavicon.js';
import { buildManifest, buildHtmlLinks } from './manifest.js';

const EMOJI_PRESETS = [
  '🦞','🚀','⭐','🔥','💧','🌊','🎯','🧩','🍀','🌸','🐳','🦊',
  '🍕','☕','🎵','⚡','🛰️','🧠','📦','🎨','🌙','🍊','🪐','👾',
];

const state = {
  source: 'emoji',
  text: '🦞',
  textColor: '#ffffff',
  image: null,
  imageFit: 'contain',
  background: { type: 'solid', color: '#2563eb', color2: '#1e3a8a', angle: 90 },
  radius: 0.18,
  padding: 0.06,
  appName: 'My App',
  themeColor: '#2563eb',
  bgColor: '#ffffff',
};

const $ = (id) => document.getElementById(id);

// ---------- toast ----------
let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

// ---------- helpers ----------
function renderCanvas(size, opts) {
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  drawIcon(c.getContext('2d'), size, state, opts);
  return c;
}

function download(bytes, filename, mime) {
  const blob = new Blob([bytes], { type: mime || 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

const MIME = {
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.zip': 'application/zip',
};
function mimeFor(name) {
  const i = name.lastIndexOf('.');
  return MIME[name.slice(i)] || 'application/octet-stream';
}

// ---------- preview ----------
function redrawPreview() {
  const draw = (id, size, opts) => {
    const cv = $(id);
    drawIcon(cv.getContext('2d'), size, state, opts);
  };
  draw('pvTab', 128, {});
  draw('pv16', 64, {});
  draw('pv32', 128, {});
  draw('pv48', 128, {});
  draw('pvApple', 180, { bleed: true, safePad: 0.1 });
  draw('pvAndroid', 192, { bleed: true, safePad: 0.1 });
  $('tabName').textContent = state.appName;
  $('htmlCode').textContent = buildHtmlLinks({ themeColor: state.themeColor });
}

// ---------- asset pipeline ----------
async function buildAssets() {
  const tabSizes = [16, 32, 48];
  const tabPng = {};
  for (const s of tabSizes) {
    tabPng[s] = await canvasToPng(renderCanvas(s, {}));
  }
  const ico = buildIco(tabSizes.map((s) => ({ width: s, height: s, data: tabPng[s] })));
  const apple = await canvasToPng(renderCanvas(180, { bleed: true, safePad: 0.1 }));
  const p192 = await canvasToPng(renderCanvas(192, { bleed: true, safePad: 0.1 }));
  const p512 = await canvasToPng(renderCanvas(512, { bleed: true, safePad: 0.1 }));

  const svgCfg =
    state.source === 'image'
      ? {
          kind: 'text',
          text: (state.appName.trim()[0] || 'A').toUpperCase(),
          textColor: state.textColor,
          background: state.background,
          radius: state.radius,
        }
      : {
          kind: state.source === 'text' ? 'text' : 'emoji',
          text: state.text,
          textColor: state.textColor,
          background: state.background,
          radius: state.radius,
        };
  const svg = buildSvgFavicon(svgCfg);

  const manifest = buildManifest({
    name: state.appName,
    shortName: state.appName,
    themeColor: state.themeColor,
    backgroundColor: state.bgColor,
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  });

  const enc = new TextEncoder();
  return [
    ['favicon-16x16.png', tabPng[16]],
    ['favicon-32x32.png', tabPng[32]],
    ['favicon-48x48.png', tabPng[48]],
    ['favicon.ico', ico],
    ['apple-touch-icon.png', apple],
    ['android-chrome-192x192.png', p192],
    ['android-chrome-512x512.png', p512],
    ['favicon.svg', enc.encode(svg)],
    ['site.webmanifest', enc.encode(manifest)],
  ];
}

// ---------- file list ----------
const LIST = [
  ['favicon.ico', '多分辨率 IE/桌面图标（16/32/48）'],
  ['favicon-16x16.png', '浏览器标签 16×16'],
  ['favicon-32x32.png', '浏览器标签 32×32'],
  ['favicon-48x48.png', 'Windows 磁贴 48×48'],
  ['apple-touch-icon.png', 'iOS 主屏 180×180'],
  ['android-chrome-192x192.png', 'Android/PWA 192×192'],
  ['android-chrome-512x512.png', 'Android/PWA 512×512（maskable）'],
  ['favicon.svg', '矢量图标，现代浏览器'],
  ['site.webmanifest', 'PWA 清单文件'],
];
function renderFileList() {
  const ul = $('fileList');
  ul.innerHTML = '';
  for (const [name, note] of LIST) {
    const li = document.createElement('li');
    li.innerHTML = `<span>📄 <b>${name}</b> · <small>${note}</small></span>`;
    const dl = document.createElement('button');
    dl.className = 'dl';
    dl.textContent = '下载';
    dl.onclick = async () => {
      const files = await buildAssets();
      const f = files.find((x) => x[0] === name);
      if (f) download(f[1], name, mimeFor(name));
    };
    li.appendChild(dl);
    ul.appendChild(li);
  }
}

// ---------- bindings ----------
function bind() {
  // source switch
  $('sourceSeg').querySelectorAll('button').forEach((b) => {
    b.onclick = () => {
      $('sourceSeg').querySelectorAll('button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      state.source = b.dataset.source;
      ['emoji', 'text', 'image'].forEach((s) => {
        $('pane-' + s).classList.toggle('hidden', s !== state.source);
      });
      state.text = state.source === 'text' ? $('textInput').value : $('emojiInput').value;
      redrawPreview();
    };
  });

  // emoji presets
  const grid = $('emojiGrid');
  EMOJI_PRESETS.forEach((e) => {
    const b = document.createElement('button');
    b.textContent = e;
    b.onclick = () => {
      $('emojiInput').value = e;
      state.text = e;
      redrawPreview();
    };
    grid.appendChild(b);
  });

  $('emojiInput').oninput = (e) => {
    state.text = e.target.value;
    redrawPreview();
  };
  $('textInput').oninput = (e) => {
    state.text = e.target.value;
    redrawPreview();
  };
  $('textColor').oninput = (e) => {
    state.textColor = e.target.value;
    redrawPreview();
  };

  // image upload
  const dz = $('dropzone');
  const fileInput = $('fileInput');
  dz.onclick = () => fileInput.click();
  fileInput.onchange = () => loadImageFile(fileInput.files[0]);
  ['dragover', 'dragenter'].forEach((ev) =>
    dz.addEventListener(ev, (e) => {
      e.preventDefault();
      dz.classList.add('drag');
    })
  );
  ['dragleave', 'drop'].forEach((ev) =>
    dz.addEventListener(ev, (e) => {
      e.preventDefault();
      dz.classList.remove('drag');
    })
  );
  dz.addEventListener('drop', (e) => {
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) loadImageFile(f);
  });

  document.querySelectorAll('input[name=fit]').forEach((r) => {
    r.onchange = () => {
      state.imageFit = document.querySelector('input[name=fit]:checked').value;
      redrawPreview();
    };
  });

  // background
  $('bgSeg').querySelectorAll('button').forEach((b) => {
    b.onclick = () => {
      $('bgSeg').querySelectorAll('button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      state.background.type = b.dataset.bg;
      $('bgSolidRow').classList.toggle('hidden', state.background.type !== 'solid');
      $('bgGradRow').classList.toggle('hidden', state.background.type !== 'gradient');
      redrawPreview();
    };
  });
  $('bgColor1').oninput = (e) => {
    state.background.color = e.target.value;
    redrawPreview();
  };
  $('bgColor2a').oninput = (e) => {
    state.background.color = e.target.value;
    redrawPreview();
  };
  $('bgColor2b').oninput = (e) => {
    state.background.color2 = e.target.value;
    redrawPreview();
  };
  $('bgAngle').oninput = (e) => {
    state.background.angle = Number(e.target.value);
    $('bgAngleVal').textContent = e.target.value + '°';
    redrawPreview();
  };

  // shape
  $('radius').oninput = (e) => {
    state.radius = Number(e.target.value) / 100;
    $('radiusVal').textContent = e.target.value + '%';
    redrawPreview();
  };
  $('padding').oninput = (e) => {
    state.padding = Number(e.target.value) / 100;
    $('paddingVal').textContent = e.target.value + '%';
    redrawPreview();
  };

  // PWA info
  $('appName').oninput = (e) => {
    state.appName = e.target.value || 'My App';
    redrawPreview();
  };
  $('themeColor').oninput = (e) => {
    state.themeColor = e.target.value;
    redrawPreview();
  };
  $('launchBg').oninput = (e) => {
    state.bgColor = e.target.value;
    redrawPreview();
  };

  // device mask controls
  document.querySelectorAll('[data-mask]').forEach((b) => {
    b.onclick = () => {
      document.querySelectorAll('[data-mask]').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      const m = b.dataset.mask;
      $('appleWrap').className = 'iconwrap ' + (m === 'ios' ? 'ios' : 'ios');
      $('androidWrap').className =
        'iconwrap ' + (m === 'ios' ? 'circle' : m) + ($('darkToggle').classList.contains('active') ? ' dark' : '');
    };
  });
  $('safeToggle').onclick = () => {
    $('safeToggle').classList.toggle('active');
    const hide = !$('safeToggle').classList.contains('active');
    $('szApple').classList.toggle('hidden', hide);
    $('szAndroid').classList.toggle('hidden', hide);
  };
  $('darkToggle').onclick = () => {
    $('darkToggle').classList.toggle('active');
    const dark = $('darkToggle').classList.contains('active');
    $('appleWrap').classList.toggle('dark', dark);
    $('androidWrap').classList.toggle('dark', dark);
  };

  // export
  $('btnZip').onclick = async () => {
    const assets = await buildAssets();
    const files = assets.map(([name, data]) => ({ name, data }));
    const zip = buildZip(files, { date: new Date(2026, 0, 1) });
    const slug = (state.appName || 'icons')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    download(zip, `${slug || 'favicon'}-icons.zip`, MIME['.zip']);
    toast('✅ 全套图标包已开始下载');
  };

  $('btnCopyHtml').onclick = async () => {
    const text = $('htmlCode').textContent;
    try {
      await navigator.clipboard.writeText(text);
      toast('📋 HTML 代码已复制到剪贴板');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      toast('📋 HTML 代码已复制');
    }
  };
}

function loadImageFile(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    state.image = img;
    const dz = $('dropzone');
    dz.innerHTML = `<img src="${url}" alt=""><div>${file.name}</div><small>点击可重新选择</small>`;
    redrawPreview();
  };
  img.src = url;
}

// ---------- init ----------
bind();
renderFileList();
redrawPreview();
