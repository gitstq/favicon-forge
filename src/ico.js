// Windows ICO (.ico) container builder.
// Embeds PNG-compressed images, which is supported by Windows Vista+, all modern
// desktop browsers (Chrome/Edge/Firefox/Safari) and modern OS icon loaders.
// Reference: MS-ICO (Microsoft ICONDIR / ICONDIRENTRY) specification.
// Pure, dependency-free, isomorphic.

/**
 * @typedef {Object} IcoImage
 * @property {number} width  - pixel width (1..256)
 * @property {number} height - pixel height (1..256)
 * @property {Uint8Array} data - encoded PNG bytes
 */

/**
 * Build a multi-resolution favicon.ico.
 * @param {IcoImage[]} images
 * @returns {Uint8Array} complete .ico bytes
 */
export function buildIco(images) {
  if (!Array.isArray(images) || images.length === 0) {
    throw new Error('buildIco requires at least one image');
  }
  if (images.length > 65535) {
    throw new Error('ICO container supports at most 65535 images');
  }

  const n = images.length;
  const headerSize = 6 + n * 16;
  let total = headerSize;
  for (const im of images) {
    if (!im.data || im.data.length === 0) {
      throw new Error(`ICO entry ${im.width}x${im.height} has empty data`);
    }
    if (im.width > 256 || im.height > 256) {
      throw new Error('ICO entries must be <= 256px');
    }
    total += im.data.length;
  }

  const buf = new Uint8Array(total);
  const dv = new DataView(buf.buffer);

  // ICONDIR
  dv.setUint16(0, 0, true); // reserved, must be 0
  dv.setUint16(2, 1, true); // type: 1 = icon (.ico)
  dv.setUint16(4, n, true); // number of images

  let offset = headerSize;
  images.forEach((im, i) => {
    const e = 6 + i * 16; // ICONDIRENTRY start
    dv.setUint8(e + 0, im.width >= 256 ? 0 : im.width); // 0 => 256
    dv.setUint8(e + 1, im.height >= 256 ? 0 : im.height);
    dv.setUint8(e + 2, 0); // color count (0 = no palette)
    dv.setUint8(e + 3, 0); // reserved
    dv.setUint16(e + 4, 1, true); // color planes
    dv.setUint16(e + 6, 32, true); // bits per pixel
    dv.setUint32(e + 8, im.data.length, true); // size of image data
    dv.setUint32(e + 12, offset, true); // offset to image data
    buf.set(im.data, offset);
    offset += im.data.length;
  });

  return buf;
}
