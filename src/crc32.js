// CRC-32 (ISO 3309 / zlib polynomial 0xEDB88320), reflected, init 0xFFFFFFFF, xorOut 0xFFFFFFFF.
// Pure, dependency-free, isomorphic (browser + Node). Used by the ZIP writer.

const TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    t[n] = c >>> 0;
  }
  return t;
})();

/**
 * Compute CRC-32 over a byte array.
 * @param {Uint8Array} data
 * @param {number} [prev] - running CRC for incremental use (raw, pre-xor)
 * @returns {number} unsigned 32-bit CRC
 */
export function crc32(data, prev) {
  let c = prev === undefined ? 0xffffffff : prev ^ 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    c = TABLE[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}
