// Minimal ZIP archive writer (APPNOTE 6.3.x), STORE method (no compression).
// Favicons are already-compressed PNGs, so STORE is both correct and fast.
// Produces deterministic output for a fixed date. Pure, dependency-free, isomorphic.

import { crc32 } from './crc32.js';

const encoder = new TextEncoder();

function dosDateTime(date) {
  const year = date.getFullYear();
  if (year < 1980) {
    // DOS format has no representation before 1980; clamp to the epoch.
    return { dosTime: 0, dosDate: 0x21 }; // 1980-01-01
  }
  const dosTime =
    (date.getHours() << 11) | (date.getMinutes() << 5) | (Math.floor(date.getSeconds() / 2) & 0x1f);
  const dosDate =
    (((year - 1980) & 0x7f) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

/**
 * @typedef {Object} ZipFile
 * @property {string} name - path within the archive (use '/' separators)
 * @property {Uint8Array} data
 */

/**
 * Build a ZIP archive in memory.
 * @param {ZipFile[]} files
 * @param {Object} [opts]
 * @param {Date} [opts.date] - fixed modification time for deterministic archives
 * @returns {Uint8Array} complete .zip bytes
 */
export function buildZip(files, opts = {}) {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error('buildZip requires at least one file');
  }
  const date = opts.date || new Date(2026, 0, 1, 0, 0, 0);
  const { dosTime, dosDate } = dosDateTime(date);

  const localHeaders = [];
  const centralHeaders = [];
  let localOffset = 0;

  files.forEach((f) => {
    const name = encoder.encode(f.name);
    const data = f.data instanceof Uint8Array ? f.data : new Uint8Array(f.data);
    const crc = crc32(data);
    const size = data.length;

    // ---- Local file header (30 bytes + name) ----
    const lh = new Uint8Array(30 + name.length);
    const ldv = new DataView(lh.buffer);
    ldv.setUint32(0, 0x04034b50, true); // signature
    ldv.setUint16(4, 20, true); // version needed to extract (2.0)
    ldv.setUint16(6, 0x0800, true); // general purpose bit 11: UTF-8 names
    ldv.setUint16(8, 0, true); // compression method: 0 = stored
    ldv.setUint16(10, dosTime, true);
    ldv.setUint16(12, dosDate, true);
    ldv.setUint32(14, crc, true);
    ldv.setUint32(18, size, true); // compressed size
    ldv.setUint32(22, size, true); // uncompressed size
    ldv.setUint16(26, name.length, true);
    ldv.setUint16(28, 0, true); // extra field length
    lh.set(name, 30);

    const thisOffset = localOffset;
    localHeaders.push(lh, data);
    localOffset += lh.length + data.length;

    // ---- Central directory header (46 bytes + name) ----
    const ch = new Uint8Array(46 + name.length);
    const cdv = new DataView(ch.buffer);
    cdv.setUint32(0, 0x02014b50, true); // signature
    cdv.setUint16(4, 20, true); // version made by (2.0, DOS attribute host)
    cdv.setUint16(6, 20, true); // version needed
    cdv.setUint16(8, 0x0800, true); // UTF-8 flag
    cdv.setUint16(10, 0, true); // stored
    cdv.setUint16(12, dosTime, true);
    cdv.setUint16(14, dosDate, true);
    cdv.setUint32(16, crc, true);
    cdv.setUint32(20, size, true);
    cdv.setUint32(24, size, true);
    cdv.setUint16(28, name.length, true);
    cdv.setUint16(30, 0, true); // extra
    cdv.setUint16(32, 0, true); // comment
    cdv.setUint16(34, 0, true); // disk number start
    cdv.setUint16(36, 0, true); // internal file attributes
    cdv.setUint32(38, 0, true); // external file attributes
    cdv.setUint32(42, thisOffset, true); // relative offset of local header
    ch.set(name, 46);
    centralHeaders.push(ch);
  });

  const centralSize = centralHeaders.reduce((a, b) => a + b.length, 0);

  // ---- End of central directory record (22 bytes) ----
  const eocd = new Uint8Array(22);
  const edv = new DataView(eocd.buffer);
  edv.setUint32(0, 0x06054b50, true);
  edv.setUint16(4, 0, true); // disk number
  edv.setUint16(6, 0, true); // disk where central directory starts
  edv.setUint16(8, files.length, true); // entries on this disk
  edv.setUint16(10, files.length, true); // total entries
  edv.setUint32(12, centralSize, true);
  edv.setUint32(16, localOffset, true); // central directory offset
  edv.setUint16(20, 0, true); // comment length

  const total = localOffset + centralSize + 22;
  const out = new Uint8Array(total);
  let p = 0;
  for (const part of localHeaders) {
    out.set(part, p);
    p += part.length;
  }
  for (const part of centralHeaders) {
    out.set(part, p);
    p += part.length;
  }
  out.set(eocd, p);
  return out;
}
