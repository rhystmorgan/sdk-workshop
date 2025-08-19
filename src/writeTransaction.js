import { Address, Clause, Transaction, VET, HDKey } from '@vechain/sdk-core';
import { ThorClient } from '@vechain/sdk-network';
import { user1 } from './user.js';

export async function writeTransactions() {

  const thorClient = ThorClient.at('https://testnet.vechain.org');

  const child = HDKey.fromMnemonic(user1.split(' ')).deriveChild(0);
  const privateKey = child.privateKey;
  const address = Address.ofPublicKey(child.publicKey).toString();
  console.log(address)

  const clauses = [
    Clause.transferVET(
      Address.of('0x37715e9625FB048e46b7d11A9a1E8c2441ea66f5'),
      VET.of(10)
    )
  ];

  const gasResult = await thorClient.gas.estimateGas(clauses, address);
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

  const txId = (await thorClient.transactions.sendRawTransaction(encodedTx)).id;
  const receipt = await thorClient.transactions.waitForTransaction(txId);

  return console.log('Receipt:', receipt);
}

writeTransactions()
