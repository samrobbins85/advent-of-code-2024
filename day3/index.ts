function mulToResult(string: string) {
  return string
    .split("(")[1]
    .slice(0, -1)
    .split(",")
    .reduce((p, c) => p * parseInt(c), 1);
}

function part1(fileName: string) {
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(fileName);
  return decoder
    .decode(data)
    .match(/mul\(\d*,\d*\)/g)
    ?.reduce((p, c) => p + mulToResult(c), 0);
}

function part2(fileName: string) {
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(fileName);
  const actions = decoder
    .decode(data)
    .match(/mul\(\d*,\d*\)|do\(\)|don\'t\(\)/g) as string[];

  return actions?.reduce<[number, boolean]>(
    (p, c) => {
      if (c === "do()") {
        return [p[0], true];
      } else if (c === "don't()") {
        return [p[0], false];
      } else {
        return [p[0] + (p[1] ? mulToResult(c) : 0), p[1]];
      }
    },
    [0, true]
  )[0];
}
console.log(part1("day3/small.txt"));
console.log(part2("day3/full.txt"));
