// Zero-dependency build: inline the ES module graph into a single, portable
// dist/favicon-forge.html that runs from file:// with no network or install.
// Uses a tiny CommonJS-style runtime so each source module keeps its own scope.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');

// ---- module graph collection ----
const graph = new Map(); // basename -> absolute path
function collect(file) {
  const abs = resolve(srcDir, file);
  const key = basename(abs);
  if (graph.has(key)) return;
  graph.set(key, abs);
  const code = readFileSync(abs, 'utf8');
  const re = /import\s[^;]*?from\s*['"]([^'"]+)['"];?/g;
  let m;
  while ((m = re.exec(code))) {
    if (m[1].startsWith('.')) collect(m[1]);
  }
}
collect('app.js');

// ---- transform ES module -> CJS-style function body ----
function transform(code) {
  const exported = [];

  // import { a, b } from './x.js'  ->  const { a, b } = require('x.js');
  code = code.replace(
    /import\s*\{([^}]*)\}\s*from\s*['"][^'"]*?([^/'"]+)['"];?/g,
    (m, names, base) => `const {${names.trim()}} = require('${base}');`
  );
  // side-effect imports (none expected)
  code = code.replace(/import\s*['"]([^'"]+)['"];?/g, '');

  // named declaration exports
  for (const kind of ['function', 'const', 'let', 'var', 'class']) {
    const re = new RegExp(`export\\s+${kind}\\s+([A-Za-z0-9_$]+)`, 'g');
    code = code.replace(re, (m, n) => {
      exported.push(n);
      return `${kind} ${n}`;
    });
  }
  // export { a, b };
  code = code.replace(/export\s*\{([^}]*)\};?/g, (m, names) => {
    names.split(',').forEach((n) => {
      const id = n.trim().split(/\s+as\s+/)[0].trim();
      if (id) exported.push(id);
    });
    return '';
  });

  const uniq = [...new Set(exported)];
  if (uniq.length) {
    code += `\nObject.assign(exports, { ${uniq.join(', ')} });\n`;
  }
  return code;
}

const sources = {};
for (const [key, abs] of graph) {
  sources[key] = transform(readFileSync(abs, 'utf8'));
}

// ---- inline into index.html ----
let html = readFileSync(join(root, 'index.html'), 'utf8');

const runtime = `
<script type="module">
(function(){
  var __src = ${JSON.stringify(sources, null, 2)};
  var __cache = {};
  function __require(key){
    if(__cache[key]) return __cache[key].exports;
    var module = { exports: {} };
    __cache[key] = module;
    var fn = new Function('module','exports','require', __src[key]);
    fn(module, module.exports, __require);
    return module.exports;
  }
  __require('app.js');
})();
</script>`.trim();

html = html.replace(
  /<script type="module" src="\.\/src\/app\.js"><\/script>/,
  runtime
);

mkdirSync(join(root, 'dist'), { recursive: true });
const out = join(root, 'dist', 'favicon-forge.html');
writeFileSync(out, html);
console.log('built', out, '(' + (Buffer.byteLength(html) / 1024).toFixed(1) + ' KB)');
console.log('modules inlined:', [...graph.keys()].join(', '));
