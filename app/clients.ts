import { http, createPublicClient } from "viem";
import { mainnet } from "viem/chains";

export const publicClientEthereum = createPublicClient({
  chain: mainnet,
  transport: http(),
});
