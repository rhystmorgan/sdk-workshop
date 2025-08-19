import { ThorClient } from "@vechain/sdk-network"
import { learnContract } from "./contract.js"
import { ABIContract, HDKey, Address } from "@vechain/sdk-core"
import { student1 } from "./user.js"

export async function getEventLogs() {
  const thor = ThorClient.at("https://testnet.vechain.org")
  // const learnAbi = new ABIContract(learnContract.abi)

  const learnLoad = thor.contracts.load(
    '0x82311b8ecf38c74ac13a0d14894066695f4fd6a9',
    learnContract.abi
  )

  const events = learnLoad.filters.SubmissionReceived()

  return console.log(events)
}

getEventLogs()