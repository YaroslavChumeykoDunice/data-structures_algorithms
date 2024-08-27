// Устойчивая

// Time Complexity                              
// Best         Average         Worst           
// O(n*log(n))  O(n*log(n))     O(n*log(n))
const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) {
      return arr;
  }

  const mid = Math.floor(arr.length / 2);

  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  return merge(sortedLeft, sortedRight);
}

const merge = (left: number[], right: number[]): number[] => {
  const result: number[] = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
      } else {
          result.push(right[rightIndex]);
          rightIndex++;
      }
  }

  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

export default mergeSort;
