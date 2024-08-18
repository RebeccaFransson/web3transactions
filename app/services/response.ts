import type { Hex } from "viem";

export type Transaction = {
  timeStamp: number;
  value: number;
  functionName: string;
  hash: Hex;
  input: Hex;
};

export type ContractStatus = { isError: "1" | "0"; errDescription: string };
