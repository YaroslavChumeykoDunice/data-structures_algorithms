import LinkedList from './LinkedList';

class HashTable<K, V> {
  private buckets: Array<LinkedList<{ key: K; value: V }>>;
  private size: number;

  constructor(initialCapacity: number = 16) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => new LinkedList<{ key: K; value: V }>());
    this.size = 0;
  }

  private hash(key: K): number {
    const stringKey = JSON.stringify(key);
    let hash = 0;

    for (let i = 0; i < stringKey.length; i++) {
      hash = (hash << 5) - hash + stringKey.charCodeAt(i);
      hash |= 0;
    }

    return Math.abs(hash) % this.buckets.length;
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const node = bucket.find(item => item.key === key);

    if (node) {
      node.value.value = value;
    } else {
      bucket.append({ key, value });
      this.size++;
    }
  }

  get(key: K): V | null {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const node = bucket.find(item => item.key === key);

    return node ? node.value.value : null;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const initialLength = bucket.length;

    bucket.remove(item => item.key === key);

    if (bucket.length < initialLength) {
      this.size--;
      return true;
    }

    return false;
  }

  has(key: K): boolean {
    return this.get(key) !== null;
  }

  keys(): K[] {
    const keys: K[] = [];

    this.buckets.forEach(bucket => {
      bucket.toArray().forEach(node => {
        keys.push(node.value.key);
      });
    });

    return keys;
  }

  values(): V[] {
    const values: V[] = [];

    this.buckets.forEach(bucket => {
      bucket.toArray().forEach(node => {
        values.push(node.value.value);
      });
    });

    return values;
  }

  getSize(): number {
    return this.size;
  }
}

export default HashTable;
