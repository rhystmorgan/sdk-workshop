import { ThorClient } from "@vechain/sdk-network"
import { learnContract } from "./contract.js"
import { ABIContract, HDKey, Address } from "@vechain/sdk-core"
import { student1 } from "./user.js"

export async function checkStudent() {
  const thor = ThorClient.at("https://testnet.vechain.org")
  const learnAbi = new ABIContract(learnContract.abi)

  const child = HDKey.fromMnemonic(student1.split(' ')).deriveChild(0);
  const privateKey = child.privateKey;
  const address = Address.ofPublicKey(child.publicKey).toString();
  console.log(address)

  const student = await thor.contracts.executeCall(
    '0x82311b8ecf38c74ac13a0d14894066695f4fd6a9',
    learnAbi.getFunction('students'),
    [address]
  )

  return console.log(student.result.plain)
}

checkStudent()