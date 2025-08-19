import { chars3 } from './chars.js'

export function mapColours(list, colourScheme) {
  const mapped = []
  for (let i = 0; i < list.length; i++) {
    const pickColour = (list[i] % 2 === 0) ? colourScheme[0] : colourScheme[1]
    const pair = [pickColour, chars3[list[i]]]
    mapped.push(pair)
  }
  return mapped
}

export function makeMappedBlock(list, colourScheme) {
  
  const mapped = mapColours(list, colourScheme)
  console.log(``)
  
  return mapped
}