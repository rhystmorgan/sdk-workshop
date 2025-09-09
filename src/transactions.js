import { ThorClient } from '@vechain/sdk-network'
import { makeColourScheme } from './colourScheme.js'
import { makeMappedBlock } from './mapBlock.js'
import { listToLines } from './lines.js'

export async function findTransactions() {
  const thor = ThorClient.at('https://testnet.vechain.org');

  const tx = await thor.transactions.getTransaction('0xc76c62e153590fab9bfd02b8f0a7ffd23eb3d3c31ece557cd52382af22076239')

  const id = tx.id
  const blockRef = tx.blockRef
  const timestamp = tx.meta.blockTimestamp
  const clauses = tx.clauses.length
  const gas = tx.gas
  const size = tx.size
  const origin = tx.origin
  const nonce = tx.nonce

  const txData = [
    'ID: ', id,
    'Block: ', blockRef,
    'Timestamp: ', timestamp,
    'Clauses: ', clauses,
    'Gas: ', gas,
    'Size: ', size,
    'Origin: ', origin,
    'Nonce: ', nonce
  ]

  const colourScheme = makeColourScheme(tx.id.slice(2, 66))

  const mapped = makeMappedBlock(tx.id.slice(2, 66), colourScheme)

  const lines = listToLines(mapped, txData, colourScheme)
  console.log(tx)

  return console.log(`
    SUCCESS!
  `)

}

findTransactions()
