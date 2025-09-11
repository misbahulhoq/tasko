export function getProfileChars(name: string) {
  const words = name.split(" ");
  let chars = words[0][0];
  if (words.length > 1) {
    chars = words[0][0] + words[1][0];
  }
  return chars;
}
