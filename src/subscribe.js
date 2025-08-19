import { subscriptions, TESTNET_URL } from '@vechain/sdk-network';
import WebSocket from 'isomorphic-ws';
import { printExpandedBlock } from './print.js'

export async function subscribe() {
  const wsURL = subscriptions.getBlockSubscriptionUrl('https://mainnet.vechain.org');

  const ws = new WebSocket(wsURL);

  ws.on('error', console.error);

  ws.on('open', () => {
    console.log('connected');
  });

  ws.on('message', (data) => {
    const block = JSON.parse(data)

    printExpandedBlock(block)
  });
}

subscribe()
