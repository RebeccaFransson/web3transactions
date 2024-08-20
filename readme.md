## Get started

1. Go to the [web3transactions vercel app](https://web3transactions-lqvi6il86-rebfras-projects.vercel.app/)
2. Paste and search for a wallet address.

## Notes

I am using Etherscan's API for fetching the transaction data. I understand it introduces an additional dependency risk and that a more reliable option would be be using calling the data with JSON-RPC via Viem/Ethers library, but I wanted to get the list of transactions for the wallet in a easy way for this project.

The amount = the ETH amount that is coming in and out of the wallet

I had a hard time trying to find out how to know if a transaction is in the "loading"-state.

```
"Once the block is added to the blockchain, a transaction receipt is generated and stored on the blockchain. The status of the transaction: "success" if the transaction was executed, otherwise "reverted" if the transaction reverted."  - viem docs
```

So I’m assuming that the loading state is when a receipt is pending a status. In the TODO I've added a task to add a listener to listen for the pendning/loading transaction.

## Todo:

- Caching on the frontend requests
- Loading states in the UI
- Not found states in the UI
- Refresh button
- Back button
- Fail safe the entire page
- Watching for new transactions
- Watching for pending/loading transactions
- USD conversion on all token values
- Bugs:
  - toggle between networks fast

## Setting up project locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
