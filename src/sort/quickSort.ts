// Неустойчивая

// Time Complexity                              
// Best         Average         Worst           
// O(n*log(n))  O(n*log(n))     O(n^2)

const quickSort = (arr: number[]): number[]  => {
  if (arr.length < 2) return arr;
  const pivot = arr[0];
  const left: number[] = [];
  const right: number[] = [];
  for (let i = 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

export default quickSort;
