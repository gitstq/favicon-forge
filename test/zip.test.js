import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildZip } from '../src/zip.js';
import { crc32 } from '../src/crc32.js';

const enc = new TextEncoder();

// Minimal reader for the STORE archives we produce (enough to round-trip verify).
function readZip(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  // Locate EOCD by scanning backward for its signature.
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (dv.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  assert.ok(eocd >= 0, 'EOCD present');
  const total = dv.getUint16(eocd + 10, true);
  let cd = dv.getUint32(eocd + 16, true);
  const files = [];
  for (let n = 0; n < total; n++) {
    assert.equal(dv.getUint32(cd, true), 0x02014b50);
    const method = dv.getUint16(cd + 10, true);
    const crc = dv.getUint32(cd + 16, true);
    const size = dv.getUint32(cd + 24, true);
    const nameLen = dv.getUint16(cd + 28, true);
    const extraLen = dv.getUint16(cd + 30, true);
    const commentLen = dv.getUint16(cd + 32, true);
    const name = new TextDecoder().decode(buf.slice(cd + 46, cd + 46 + nameLen));
    const localOff = dv.getUint32(cd + 42, true);
    const lNameLen = dv.getUint16(localOff + 26, true);
    const lExtraLen = dv.getUint16(localOff + 28, true);
    const dataStart = localOff + 30 + lNameLen + lExtraLen;
    const data = buf.slice(dataStart, dataStart + size);
    files.push({ name, method, crc, size, data });
    cd += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

test('ZIP round-trips names, contents and CRC', () => {
  const files = [
    { name: 'favicon-16x16.png', data: enc.encode('aaa-png-bytes-16') },
    { name: 'nested/favicon.svg', data: enc.encode('<svg></svg>') },
    { name: 'site.webmanifest', data: enc.encode('{"name":"x"}') },
  ];
  const zip = buildZip(files, { date: new Date(2026, 0, 1) });
  const read = readZip(zip);

  assert.equal(read.length, files.length);
  read.forEach((r, i) => {
    assert.equal(r.name, files[i].name);
    assert.equal(r.method, 0, 'stored');
    assert.deepEqual(r.data, files[i].data, 'content identical');
    assert.equal(r.crc, crc32(files[i].data), 'crc matches');
    assert.equal(r.size, files[i].data.length);
  });
});

test('ZIP is deterministic for a fixed date', () => {
  const f = [{ name: 'a.txt', data: enc.encode('hello') }];
  const z1 = buildZip(f, { date: new Date(2026, 5, 6, 12, 30, 0) });
  const z2 = buildZip(f, { date: new Date(2026, 5, 6, 12, 30, 0) });
  assert.deepEqual(z1, z2);
});

test('handles binary (non-UTF8) payloads', () => {
  const bin = new Uint8Array(256);
  for (let i = 0; i < 256; i++) bin[i] = i;
  const zip = buildZip([{ name: 'x.bin', data: bin }]);
  const [r] = readZip(zip);
  assert.deepEqual(r.data, bin);
});

test('rejects empty archive', () => {
  assert.throws(() => buildZip([]));
});
