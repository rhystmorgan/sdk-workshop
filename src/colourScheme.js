import chalk from "chalk";
import { colours } from "./colours.js";
import { chars } from "./chars.js";

export function makeColourScheme(list) {
  const reversed = list.split('').reverse()
  const base = reversed[0]
  const contrast = (reversed[5] === base) ? reversed[3] : reversed[5];

  const colour1 = colours[base]
  const colour2 = colours[contrast]

  console.log(`
    ColourScheme: ${chalk.hex(colour1)(chars[base])} ${chalk.hex(colour2)(chars[contrast])}`)
  return [colour1, colour2]
}