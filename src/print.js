import { makeColourScheme } from './colourScheme.js'
import { makeMappedBlock } from './mapBlock.js'
import { listToLines } from './lines.js'

export function printExpandedBlock(block) {
  const blockNo = block.number
  const blockId = block.id
  const blockTimestamp = block.timestamp
  const blockTxs = block.transactions.length
  const blockGas = block.gasUsed
  const blockBeneficiary = block.beneficiary
  const blockSize = block.size
  const blockSigner = block.signer
  
  const blockData = [
    'Block Number: ', blockNo, 
    'Block ID: ', blockId, 
    'Timestamp: ', blockTimestamp, 
    'Transactions: ', blockTxs, 
    'Gas Used: ', blockGas,
    'Block Size: ', blockSize, 
    'Beneficiary: ', blockBeneficiary, 
    'Signer: ', blockSigner
  ]

  const colourScheme = makeColourScheme(block.id.slice(2,66))
  
  const mapped = makeMappedBlock(block.id.slice(2,66), colourScheme)
  
  const lines = listToLines(mapped, blockData, colourScheme)
  
  return lines

}