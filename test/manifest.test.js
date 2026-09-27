import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildManifest, buildHtmlLinks } from '../src/manifest.js';

test('manifest is valid JSON with expected fields', () => {
  const json = buildManifest({
    name: 'Demo',
    shortName: 'Demo',
    themeColor: '#123456',
    backgroundColor: '#ffffff',
  });
  const m = JSON.parse(json);
  assert.equal(m.name, 'Demo');
  assert.equal(m.short_name, 'Demo');
  assert.equal(m.theme_color, '#123456');
  assert.equal(m.background_color, '#ffffff');
  assert.equal(m.display, 'standalone');
  assert.ok(Array.isArray(m.icons) && m.icons.length >= 2);
  assert.ok(m.icons.some((i) => i.sizes === '512x512'));
});

test('HTML links reference every asset', () => {
  const html = buildHtmlLinks({ basePath: '/', themeColor: '#abc' });
  assert.match(html, /rel="icon" href="\/favicon.ico"/);
  assert.match(html, /favicon-16x16\.png/);
  assert.match(html, /favicon-32x32\.png/);
  assert.match(html, /favicon\.svg/);
  assert.match(html, /apple-touch-icon\.png/);
  assert.match(html, /site\.webmanifest/);
  assert.match(html, /name="theme-color" content="#abc"/);
});

test('basePath is joined without double slash', () => {
  const html = buildHtmlLinks({ basePath: '/static/icons' });
  assert.match(html, /href="\/static\/icons\/favicon\.ico"/);
  assert.ok(!html.includes('//favicon'));
});

test('svg and manifest can be disabled', () => {
  const html = buildHtmlLinks({ svg: false, manifest: false });
  assert.ok(!html.includes('favicon.svg'));
  assert.ok(!html.includes('webmanifest'));
});
