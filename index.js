import { ThorClient } from '@vechain/sdk-network'
import { printExpandedBlock } from './src/print.js'

export async function main() {
  const thor = ThorClient.at("https://mainnet.vechain.org");

  const compressed = await thor.blocks.getBestBlockCompressed();
  const expanded = await thor.blocks.getFinalBlockExpanded(12345678);

  // printExpandedBlock(compressed)

  // printExpandedBlock(expanded)


  console.log(compressed)
  console.log(expanded)
}

main()
