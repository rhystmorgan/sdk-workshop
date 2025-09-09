import { Address, Clause, ABIContract, HDKey, VET, Transaction } from "@vechain/sdk-core"
import { ThorClient } from "@vechain/sdk-network"
import { learnContract } from "./contract.js"
import { student2 } from "./user.js"

export async function registerStudent() {
  const thor = ThorClient.at("https://testnet.vechain.org")
  const learnAbi = new ABIContract(learnContract.abi)

  const child = HDKey.fromMnemonic(student2.split(' ')).deriveChild(0);
  const privateKey = child.privateKey;
  const address = Address.ofPublicKey(child.publicKey).toString();
  console.log(address)

  // const contract = thor.contracts.load(
  //   '0x82311b8ecf38c74ac13a0d14894066695f4fd6a9',
  //   learnContract.abi
  // )

  const addStudent = Clause.callFunction(
    Address.of('0x82311b8ecf38c74ac13a0d14894066695f4fd6a9'),
    learnAbi.getFunction('addStudent'),
    ["Bobby", "Beans"],
    VET.of(1)
  );

  const gasResult = await thor.gas.estimateGas(
    [addStudent],
    address
  );

  const defaultBodyOptions =
    await thor.transactions.fillDefaultBodyOptions();

  const tx = await thor.transactions.buildTransactionBody(
    [addStudent],
    gasResult.totalGas,
    defaultBodyOptions
  )

  const txClass = Transaction.of(tx);
  const txSigned = txClass.sign(privateKey);
  const encodedTx = '0x' + Buffer.from(txSigned.encoded).toString('hex');

  const txId = (await thor.transactions.sendRawTransaction(encodedTx)).id;
  const receipt = await thor.transactions.waitForTransaction(txId);

  return console.log('Receipt:', receipt);
}

registerStudent()