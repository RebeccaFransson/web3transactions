import type { Hex } from "viem";

export type Transaction = {
  timeStamp: number;
  value: number;
  functionName: string;
  blockHash: Hex;
  input: Hex;
};
