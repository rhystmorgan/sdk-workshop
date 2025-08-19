import { ThorClient } from '@vechain/sdk-network'

export async function returnBalance() {
  const thor = ThorClient.at('https://testnet.vechain.org')

  const account = '0x37715e9625FB048e46b7d11A9a1E8c2441ea66f5'

  const balance = await thor.accounts.getAccount(account)

  console.log(`VET Balance ${BigInt(balance.balance) / 1000000000000000000n}`)
  console.log(`VTHO Balance ${BigInt(balance.energy) / 1000000000000000000n}`)
}

returnBalance()