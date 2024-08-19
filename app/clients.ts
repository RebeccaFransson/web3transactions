import { http, createPublicClient } from "viem";
import { mainnet, polygon } from "viem/chains";
import { Network } from "./types";

const publicClientEthereum = createPublicClient({
  chain: mainnet,
  transport: http(),
});
const publicClientPolygon = createPublicClient({
  chain: polygon,
  transport: http(),
});

export const getClient = (network: Network) => {
  if (network === Network.Ethereum) return publicClientEthereum;
  if (network === Network.Polygon) return publicClientPolygon;
  throw Error(
    `Network must be one of accpeted networks: ${Object.keys(Network)}`
  );
};
