import { fileToArray } from "../common/utils.ts";

function increasingOrDecreasing(array: number[]) {
  return (
    array.every(
      (item, index) => !array?.[index - 1] || item > array[index - 1]
    ) ||
    array.every((item, index) => !array?.[index - 1] || item < array[index - 1])
  );
}

function safeDifference(array: number[]) {
  return array.every(
    (item, index) =>
      !array?.[index - 1] || Math.abs(item - array[index - 1]) <= 3
  );
}

function part1(fileName: string) {
  return fileToArray(fileName)
    .map((row) => row.split(" ").map((item) => parseInt(item)))
    .map((row) => increasingOrDecreasing(row) && safeDifference(row))
    .filter(Boolean).length;
}

function processRow(row: number[]) {
  if (increasingOrDecreasing(row) && safeDifference(row)) {
    return true;
  }
  return row.some((_, index) => {
    return (
      increasingOrDecreasing(row.toSpliced(index, 1)) &&
      safeDifference(row.toSpliced(index, 1))
    );
  });
}

function part2(fileName: string) {
  return fileToArray(fileName)
    .map((row) => row.split(" ").map((item) => parseInt(item)))
    .map((row) => processRow(row))
    .filter(Boolean).length;
}
console.log(part1("day2/full.txt"));

console.log(part2("day2/full.txt"));
