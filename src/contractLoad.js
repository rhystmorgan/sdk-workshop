import { ABIContract } from "@vechain/sdk-core"
import { learnContract } from "./contract.js"
import { ThorClient } from "@vechain/sdk-network"

export async function loadContract() {
  const thor = ThorClient.at("https://testnet.vechain.org")
  const learnAbi = new ABIContract(learnContract.abi)

  console.log(`
     ------- Requesting App ID -------`)

  const appId = await thor.contracts.executeCall(
    '0x82311b8ecf38c74ac13a0d14894066695f4fd6a9',
    learnAbi.getFunction('appId'),
    []
  )

  console.log(`
    SUCCESS: ${appId.success}`)
  console.log(`
    APP ID: ${appId.result.plain}
    `)

  console.log(`
    --- Requesting Institute Data ---`)

  const institute = await thor.contracts.executeCall(
    '0x82311b8ecf38c74ac13a0d14894066695f4fd6a9',
    learnAbi.getFunction('getAvailableFunds'),
    []
  )

  console.log(institute)

  // console.log(`
  //   SUCCESS: ${institute.success}`)
  // return console.log(`
  //   INSTITUTE: ${institute.result.plain}
  //   `)
}

loadContract()