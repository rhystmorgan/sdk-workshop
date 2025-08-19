import { ThorClient } from "@vechain/sdk-network"
import { learnContract } from "./contract.js"
import { ABIContract, HDKey, Address, Transaction } from "@vechain/sdk-core"
import { student1 } from "./user.js"

export async function submitProof() {
  console.log(`
    --------- Submitting proof ---------
  `)

  const thor = ThorClient.at("https://testnet.vechain.org")
  const learnAbi = new ABIContract(learnContract.abi)

  const child = HDKey.fromMnemonic(student1.split(' ')).deriveChild(0);
  const privateKey = child.privateKey;
  const address = Address.ofPublicKey(child.publicKey).toString();
  console.log(`
    Address: ${address}
  `)

  const submitProofClause = {
    to: '0x82311b8ecf38c74ac13a0d14894066695f4fd6a9',
    data: learnAbi.getFunction('submitProof').encodeData(['0x1234567890abcdef']).toString(),
    value: '0x0'
  }

  const gasResult = await thor.gas.estimateGas(
    [submitProofClause],
    address
  )

  console.log(`
    Gas: ${gasResult.totalGas}
  `)

  const defautBodyOptions = await thor.transactions.fillDefaultBodyOptions();

  const tx = await thor.transactions.buildTransactionBody(
    [submitProofClause],
    gasResult.totalGas,
    defautBodyOptions
  )

  const txClass = Transaction.of(tx)
  const txSigned = txClass.sign(privateKey)
  const encodedTx = '0x' + Buffer.from(txSigned.encoded).toString('hex');
  const txId = (await thor.transactions.sendRawTransaction(encodedTx)).id;

  const receipt = await thor.transactions.waitForTransaction(txId);

  return console.log(receipt)

}

submitProof()