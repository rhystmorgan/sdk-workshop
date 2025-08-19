import chalk from "chalk"

export function printLine(line, pair, colourScheme) {
    
  console.log(`${chalk.hex(line[0][0])(line[0][1])}${chalk.hex(line[1][0])(line[1][1])}${chalk.hex(line[2][0])(line[2][1])}${chalk.hex(line[3][0])(line[3][1])}${chalk.hex(line[4][0])(line[4][1])}${chalk.hex(line[5][0])(line[5][1])}${chalk.hex(line[6][0])(line[6][1])}${chalk.hex(line[7][0])(line[7][1])}  ${chalk.hex(colourScheme[0])(pair[0])}${chalk.hex(colourScheme[1])(pair[1])}`)
  
  return
}

export function listToLines(list, blockData, colourScheme) {
  const line = list.slice(0, 8)
  if (line.length === 0) {
    return []
  }

  return [printLine(line, [blockData[0], blockData[1]], colourScheme), ...listToLines(list.slice(8), blockData.slice(2), colourScheme)]
}