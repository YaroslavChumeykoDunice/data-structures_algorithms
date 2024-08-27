class NodeItem<T> {
  value: T;
  prev: NodeItem<T> | null;

  constructor(value: T) {
    this.value = value;
    this.prev = null;
  }
}

class Stack<T> {
  private limit: number;
  private length: number;
  private current: NodeItem<T> | null;

  constructor(limit = 10) {
    this.limit = limit;
    this.length = 0;
    this.current = null;
  }

  push(value: T): number {
    if (this.length === this.limit) return this.length;

    const newNode = new NodeItem(value);
    newNode.prev = this.current;
    this.current = newNode;

    return ++this.length;
  }

  pop(): NodeItem<T> | undefined {
    if (this.current === null) return;

    const node = this.current;
    this.current = this.current.prev;
    this.length--;

    return node;
  }

  print() {
    let node = this.current;
    while (node !== null) {
      console.log(node.value)
      node = node.prev;
    }
  }
}

export default Stack;
