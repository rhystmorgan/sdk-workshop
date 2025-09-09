import { ThorClient } from '@vechain/sdk-network'
import { vthoAbi } from './abi.js';
import { ABIContract } from '@vechain/sdk-core';

export async function balancePast() {
  const thor = ThorClient.at('https://mainnet.vechain.org');

  const contractABI = new ABIContract(vthoAbi);

  const balancePast = await thor.contracts.executeCall(
    '0x0000000000000000000000000000456e65726779',
    contractABI.getFunction('balanceOf'),
    ['0x0000000000000000000000000000000000000000'],
    { revision: "12345678" }
  );

  console.log('Balance Past', balancePast.result.plain / 1000000000000000000n);
}

balancePast()
