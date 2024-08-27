class NodeItem<T> {
  value: T;
  next: NodeItem<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList<T> {
  head: NodeItem<T> | null;
  tail: NodeItem<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }


  append(value: T) {
    const newNode = new NodeItem(value);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }


  prepend(value: T) {
      const newNode = new NodeItem(value);
      newNode.next = this.head;
      this.head = newNode;
      if (this.tail === null) {
        this.tail = newNode;
      }
      this.length++;
      return this;
  }

  remove(callback: (value: T) => boolean): number {
    if (this.head === null) {
      return this.length;
    }

    if (callback(this.head.value)) {
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      }
      this.length--;
      return this.length;
    }

    let current = this.head;
    while (current.next !== null && !callback(current.next.value)) {
      current = current.next;
    }

    if (current.next !== null) {
      current.next = current.next.next;
      if (current.next === null) {
        this.tail = current;
      }
      this.length--;
    }

    return this.length;
  }

  find(callback: (value: T) => boolean): NodeItem<T> | null {
    let currentNode = this.head;

    while (currentNode) {
      if (callback(currentNode.value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  logValues(): void {
    let current = this.head;
    const values = [];

    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }

    console.log(values);
  }

  toArray(): NodeItem<T>[] {
    const nodes: NodeItem<T>[] = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  update(callback: (value: T) => boolean, newValue: T): boolean {
    if (this.head === null) {
      return false;
    }

    let current = this.head;

    while (current !== null) {
      if (callback(current.value)) {
        current.value = newValue;
        return true;
      }
      if (current.next === null) return false;
      current = current.next;
    }

    return false;
  }
}

export default LinkedList;
