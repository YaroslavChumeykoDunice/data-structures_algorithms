class NodeItem<T> {
  value: T;
  next: NodeItem<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Queue<T> {
  private length: number;
  private head: NodeItem<T> | null;
  private tail: NodeItem<T> | null;

  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(value: T): number {
    const newNode = new NodeItem(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    return ++this.length;
  }

  shift(): NodeItem<T> | null {
    const node = this.head;
    this.head = node?.next ?? null;
    if (this.head === null) this.tail = null;
    this.length--;
    return node;
  }

  logValues(): void {
    let current = this.head;
    while (current !== null) {
      console.log(current.value);
      current = current.next;
    }
  }
}

export default Queue;
