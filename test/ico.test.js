import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildIco } from '../src/ico.js';

// Minimal fake PNG: real 8-byte signature + arbitrary payload. The ICO container
// only cares about the bytes it stores; PNG validity is exercised separately.
function fakePng(seed, len = 40) {
  const b = new Uint8Array(len);
  b.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  for (let i = 8; i < len; i++) b[i] = (seed * 31 + i) & 0xff;
  return b;
}

test('ICONDIR header and entries are correct', () => {
  const imgs = [
    { width: 16, height: 16, data: fakePng(1) },
    { width: 32, height: 32, data: fakePng(2) },
    { width: 48, height: 48, data: fakePng(3) },
  ];
  const ico = buildIco(imgs);
  const dv = new DataView(ico.buffer, ico.byteOffset, ico.byteLength);

  assert.equal(dv.getUint16(0, true), 0, 'reserved');
  assert.equal(dv.getUint16(2, true), 1, 'type = icon');
  assert.equal(dv.getUint16(4, true), 3, 'count');

  imgs.forEach((im, i) => {
    const e = 6 + i * 16;
    assert.equal(dv.getUint8(e + 0), im.width, 'width');
    assert.equal(dv.getUint8(e + 1), im.height, 'height');
    assert.equal(dv.getUint8(e + 2), 0, 'palette');
    assert.equal(dv.getUint16(e + 4, true), 1, 'planes');
    assert.equal(dv.getUint16(e + 6, true), 32, 'bpp');
    assert.equal(dv.getUint32(e + 8, true), im.data.length, 'data size');
    const offset = dv.getUint32(e + 12, true);
    const stored = ico.slice(offset, offset + im.data.length);
    assert.deepEqual(stored, im.data, 'payload round-trips at offset');
  });
});

test('256px dimension is encoded as 0', () => {
  const ico = buildIco([{ width: 256, height: 256, data: fakePng(9) }]);
  const dv = new DataView(ico.buffer, ico.byteOffset, ico.byteLength);
  assert.equal(dv.getUint8(6), 0);
  assert.equal(dv.getUint8(7), 0);
});

test('rejects empty and oversized input', () => {
  assert.throws(() => buildIco([]));
  assert.throws(() => buildIco([{ width: 300, height: 300, data: fakePng(1) }]));
  assert.throws(() => buildIco([{ width: 16, height: 16, data: new Uint8Array(0) }]));
});
