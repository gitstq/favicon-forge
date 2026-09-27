import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crc32 } from '../src/crc32.js';

const enc = new TextEncoder();

test('crc32 empty input is 0x00000000', () => {
  assert.equal(crc32(new Uint8Array(0)), 0x00000000);
});

test('crc32 standard check vector "123456789" = 0xCBF43926', () => {
  assert.equal(crc32(enc.encode('123456789')), 0xcbf43926);
});

test('crc32 "hello" = 0x3610A686', () => {
  assert.equal(crc32(enc.encode('hello')), 0x3610a686);
});

test('crc32 is incremental/chunk invariant', () => {
  const data = enc.encode('the quick brown fox jumps over the lazy dog');
  const whole = crc32(data);
  const a = crc32(data.slice(0, 10));
  const b = crc32(data.slice(10), a);
  assert.equal(b, whole);
});
