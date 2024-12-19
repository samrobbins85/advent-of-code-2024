export const fileToArray = (fileName: string) =>{
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(fileName);
  return decoder.decode(data).split("\n")
}