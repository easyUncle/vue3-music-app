//洗牌函数
export function knuthShuffle(list) {
  const arr = list.slice(0);
  console.log(arr.length);
  for (let i = arr.length - 1; i > 0; i--) {
    let j = getRandom(i);
    swap(arr, i, j);
  }
  return arr;
}
function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
