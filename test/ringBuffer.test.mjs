import { test, describe } from 'node:test';
import assert from 'node:assert';
import { LockFreeRingBuffer } from '../src/ringBuffer.mjs';

describe('Lock-Free Ring Buffer Suite', () => {
  test('should enqueue and dequeue in FIFO order with mask wraparound', () => {
    const ring = new LockFreeRingBuffer(4);
    assert.strictEqual(ring.enqueue('A'), true);
    assert.strictEqual(ring.enqueue('B'), true);
    assert.strictEqual(ring.dequeue(), 'A');

    ring.enqueue('C');
    ring.enqueue('D');
    ring.enqueue('E');
    assert.strictEqual(ring.enqueue('OVERFLOW'), false); // Buffer full

    assert.strictEqual(ring.dequeue(), 'B');
    assert.strictEqual(ring.dequeue(), 'C');
  });
});
