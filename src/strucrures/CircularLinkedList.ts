class NodeItem<T> {
  value: T;
  next: NodeItem<T> | null;
  prev: NodeItem<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class CircularLinkedList<T> {
  head: NodeItem<T> | null;
  tail: NodeItem<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  append(value: T): number {
    const newNode = new NodeItem(value);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
      this.head.next = this.head;
      this.head.prev = this.head;
    } else {
      newNode.prev = this.tail;
      newNode.next = this.head;
      this.tail.next = newNode;
      this.head!.prev = newNode;
      this.tail = newNode;
    }
    return ++this.length;
  }


  prepend(value: T): number {
    const newNode = new NodeItem(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.head.next = this.head;
      this.head.prev = this.head;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;
      this.head.prev = newNode;
      this.tail!.next = newNode;
      this.head = newNode;
    }
    return ++this.length;
  }

  remove(callback: (value: T) => boolean): number {
    if (this.head === null) {
      return this.length;
    }

    let current = this.head;

    do {
      if (callback(current.value)) {
        if (current === this.head) {
          this.head = this.head.next;
          this.tail!.next = this.head;
          this.head!.prev = this.tail;
        } else if (current === this.tail) {
          this.tail = this.tail.prev;
          this.tail!.next = this.head;
          this.head.prev = this.tail;
        } else {
          current.prev!.next = current.next;
          current.next!.prev = current.prev;
        }

        this.length--;

        if (this.length === 0) {
          this.head = null;
          this.tail = null;
        }
        return this.length;
      }
      current = current.next!;
    } while (current !== this.head);

    return this.length;
  }

  find(callback: (value: T) => boolean): NodeItem<T> | null {
    if (this.head === null) return null;

    let current = this.head;

    do {
      if (callback(current.value)) {
        return current;
      }
      current = current.next!;
    } while (current !== this.head);

    return null;
  }

  logValues(): void {
    if (this.head === null) {
      console.log(null);
      return;
    }

    let current = this.head;
    const values = [];

    do {
      values.push(current.value);
      current = current.next!;
    } while (current !== this.head);

    console.log(values);
  }

  toArray(): NodeItem<T>[] {
    const nodes: NodeItem<T>[] = [];
    if (this.head === null) return nodes;

    let current = this.head;

    do {
      nodes.push(current);
      current = current.next!;
    } while (current !== this.head);

    return nodes;
  }

  update(callback: (value: T) => boolean, newValue: T): boolean {
    if (this.head === null) {
      return false;
    }

    let current = this.head;

    do {
      if (callback(current.value)) {
        current.value = newValue;
        return true;
      }
      current = current.next!;
    } while (current !== this.head);

    return false;
  }
}

export default CircularLinkedList;
