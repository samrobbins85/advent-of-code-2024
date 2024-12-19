import { fileToArray } from "../common/utils.ts";

function preProcess(fileName: string) {
  return fileToArray(fileName)
    .map((item) => item.split("   "))
    .reduce<[number[], number[]]>(
      (p, c) => [
        [...p[0], parseInt(c[0])],
        [...p[1], parseInt(c[1])],
      ],
      [[], []]
    );
}
const pairArrays = ([arr1, arr2]: number[][]) =>
  arr1.map((item, index) => [item, arr2[index]]);

function part1() {
  return pairArrays(preProcess("day1/full.txt").map((item) => item.sort()))
    .map((item) => Math.abs(item[0] - item[1]))
    .reduce((p, c) => p + c, 0);
}

function part2() {
  const arr = preProcess("day1/full.txt");
  return arr[0]
    .map((item) => arr[1].reduce((p, c) => p + +(c === item), 0) * item)
    .reduce((p, c) => p + c, 0);
}

console.log(part1());
console.log(part2());
