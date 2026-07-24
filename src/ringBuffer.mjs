export class LockFreeRingBuffer {
  constructor(capacity = 8) {
    // Ensure power of 2
    this.capacity = Math.pow(2, Math.ceil(Math.log2(capacity)));
    this.mask = this.capacity - 1;
    this.buffer = new Array(this.capacity);
    this.head = 0; // write index
    this.tail = 0; // read index
  }

  enqueue(item) {
    if (this.head - this.tail >= this.capacity) {
      return false; // Buffer Full
    }
    this.buffer[this.head & this.mask] = item;
    this.head++;
    return true;
  }

  dequeue() {
    if (this.head === this.tail) {
      return null; // Buffer Empty
    }
    const item = this.buffer[this.tail & this.mask];
    this.buffer[this.tail & this.mask] = null;
    this.tail++;
    return item;
  }

  size() {
    return this.head - this.tail;
  }
}
