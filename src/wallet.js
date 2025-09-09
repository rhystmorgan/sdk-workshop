import { Mnemonic, Hex, HDKey, Address } from '@vechain/sdk-core'
import { makeColourScheme } from './colourScheme.js'
import { makeMappedBlock } from './mapBlock.js'
import { listToLines } from './lines.js'

export async function createWallet() {

  const mnemonic = Mnemonic.of()

  // console.log(`Mnemonic words: ${mnemonic}`)

  const rootPrivateKey = Mnemonic.toPrivateKey(mnemonic)

  // console.log(`Root private key: ${Hex.of(rootPrivateKey).toString()}`)

  const xprivHex = Hex.of(rootPrivateKey).toString()

  const hdNode = HDKey.fromMnemonic(mnemonic)

  // console.log(hdNode)
  let derivedAddresses = []

  for (let i = 0; i < 5; i++) {
    const child = hdNode.deriveChild(i)
    // console.log(
    //   `children ${i} address:
    //   ${Address.ofPublicKey(child.publicKey).toString()}
    //   `
    // )
    derivedAddresses.push(`Address${i}: `)
    derivedAddresses.push(Hex.of(child.privateKey).toString())
    // console.log(`children ${i} privateKey: ${child.privateKey}`)
  }

  const walletData = [
    'Mnemonic: ', mnemonic,
    'Root private key: ', xprivHex,
    'HD Fingerprint: ', hdNode.fingerprint,
    ...derivedAddresses
  ]

  const colourScheme = makeColourScheme(xprivHex.slice(2, 66))

  const mapped = makeMappedBlock(xprivHex.slice(2, 66), colourScheme)

  const lines = listToLines(mapped, walletData, colourScheme)

  return console.log(`
    SUCCESS!
    `)
}

createWallet()
