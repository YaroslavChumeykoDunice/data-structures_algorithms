// Устойчивая

// Time Complexity                              
// Best         Average         Worst           
// O(n)         O(n^2)          O(n^2)
const bubbleSort = (arr: number[]): number[]  => {
  const len = arr.length;
  let helper = 0;
  do {
    helper = 0
    for(let i = 0; i < len; i++) {
      if(arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        helper+=1;
      }
    }
  } while(helper > 0);
  return arr;
}

export default bubbleSort;
