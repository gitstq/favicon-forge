import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSvgFavicon } from '../src/svgfavicon.js';

test('solid emoji favicon contains rect and text', () => {
  const svg = buildSvgFavicon({
    kind: 'emoji',
    text: '🦞',
    background: { type: 'solid', color: '#2563eb' },
    radius: 0.2,
  });
  assert.match(svg, /^<svg xmlns/);
  assert.match(svg, /<rect [^>]*fill="#2563eb"/);
  assert.match(svg, /rx="20"/);
  assert.ok(svg.includes('🦞'));
  assert.match(svg, /Apple Color Emoji/);
});

test('transparent background renders no rect', () => {
  const svg = buildSvgFavicon({
    kind: 'text',
    text: 'A',
    textColor: '#111111',
    background: { type: 'transparent' },
  });
  assert.ok(!svg.includes('<rect'));
  assert.match(svg, /fill="#111111"/);
});

test('gradient background uses linearGradient and url fill', () => {
  const svg = buildSvgFavicon({
    kind: 'text',
    text: 'Go',
    background: { type: 'gradient', color: '#ff0000', color2: '#0000ff', angle: 90 },
  });
  assert.match(svg, /<linearGradient id="g"/);
  assert.match(svg, /fill="url\(#g\)"/);
  assert.ok(svg.includes('#ff0000'));
  assert.ok(svg.includes('#0000ff'));
});

test('XML special characters are escaped', () => {
  const svg = buildSvgFavicon({
    kind: 'text',
    text: 'A&B<C>',
    background: { type: 'solid', color: '#000' },
  });
  assert.ok(svg.includes('A&amp;B&lt;C&gt;'));
  assert.ok(!svg.includes('A&B'));
});

test('radius is clamped to half edge', () => {
  const svg = buildSvgFavicon({
    kind: 'emoji',
    text: 'X',
    background: { type: 'solid', color: '#000' },
    radius: 9,
  });
  assert.match(svg, /rx="50"/);
});
