export const abi = [
  {
    inputs: [
      { internalType: 'string', name: 'message', type: 'string' },
      { internalType: 'uint256', name: 'optimizedTimestamp', type: 'uint256' },
    ],
    name: 'storeMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // ... other functions like getMessageCount, getMessage, getMessagesBySender
  // ... events and additional contract interface items
] as const;