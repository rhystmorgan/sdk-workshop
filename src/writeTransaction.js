import { Address, Clause, Transaction, VET, HDKey } from '@vechain/sdk-core';
import { ThorClient } from '@vechain/sdk-network';
import { student2, user1 } from './user.js';
// import { findTransactions } from './transactions.js';

export async function writeTransactions() {

  const thorClient = ThorClient.at('https://testnet.vechain.org');

  const child = HDKey.fromMnemonic(student2.split(' ')).deriveChild(0);
  const privateKey = child.privateKey;
  const address = Address.ofPublicKey(child.publicKey).toString();
  // console.log(child)
  // console.log(address)

  const child1 = HDKey.fromMnemonic(user1.split(' ')).deriveChild(0);
  const privateKey1 = child1.privateKey;
  const address1 = Address.ofPublicKey(child1.publicKey).toString();

  // console.log(address1)

  const clauses = [
    Clause.transferVET(
      Address.of(address1),
      VET.of(1)
    )
  ];

  const gasResult = await thorClient.gas.estimateGas(clauses, address);

  // return console.log(gasResult)

  const defaultBodyOptions =
    await thorClient.transactions.fillDefaultBodyOptions();

  const txBody = await thorClient.transactions.buildTransactionBody(
    clauses,
    gasResult.totalGas,
    defaultBodyOptions
  );

  const txClass = Transaction.of(txBody);
  const txSigned = txClass.sign(privateKey);
  const encodedTx = '0x' + Buffer.from(txSigned.encoded).toString('hex');

  const transaction = await thorClient.transactions.sendRawTransaction(encodedTx)
  const txId = transaction.id;

  console.log(txId)
  // findTransactions(txId)

  const receipt = await thorClient.transactions.waitForTransaction(txId);

  // console.log(`Transaction: ${transaction}`)

  return console.log(receipt);
}

writeTransactions()
