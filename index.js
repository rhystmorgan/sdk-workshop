import { ThorClient } from '@vechain/sdk-network'
import { printExpandedBlock } from './src/print.js'

export async function main() {
  const thor = ThorClient.at("https://testnet.vechain.org");

  const genesis = await thor.blocks.getBlockCompressed(12345678);
  // const best = await thor.blocks.getBestBlockExpanded();
  // const max = best.number

  // const qty = 10
  printExpandedBlock(genesis)

  // for (let i = 0; i < qty; i++) {
  //   const int = Math.floor(Math.random() * max)
  //   const block = await thor.blocks.getBlockExpanded(int);
  //   printExpandedBlock(block)
  //   console.log(``)
  // }

}

main()
