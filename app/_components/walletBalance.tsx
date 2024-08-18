"use client";
import { useEffect, useState } from "react";
import { EtherscanService } from "../services/etherscanService";
import { formatAddressShort, formatEtherShort } from "../utils";
import { TextButton, PrimaryButton, SeconaryButton } from "./button";
import { CopyIcon } from "./icons/copy";
import { TextMedium, TextLarge } from "./text";
import { EthIcon } from "./icons/eth";
import { formatEther } from "viem";

export const WalletBalance = ({ address }: { address: string }) => {
  const service = new EtherscanService();
  const [balance, setBalance] = useState<bigint | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await service.fetchBalance({ address: address });
      setBalance(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="rounded border-b-2 border-pink-50 p-4">
      <div className="flex gap-4 justify-start min-[862px]:justify-around flex-wrap">
        <div className="flex flex-col">
          <TextMedium bold className="text-gray">
            Address
          </TextMedium>
          <div className="flex gap-2 items-center">
            <TextLarge bold className=" text-black">
              {formatAddressShort(address)}
            </TextLarge>
            <TextButton
              className="stroke-pink-900 hover:bg-pink-transparent"
              onClick={() => {}}
            >
              <CopyIcon />
            </TextButton>
          </div>
        </div>
        <div className="flex flex-col">
          <TextMedium bold className="text-gray">
            Balance
          </TextMedium>

          <div className="flex gap-4 items-center">
            <TextLarge bold className="flex gap-2 items-center text-black pr-4">
              <EthIcon />{" "}
              {balance ? `${Number(formatEther(balance)).toFixed(2)} ETH` : "-"}
            </TextLarge>
            <PrimaryButton small onClick={() => {}}>
              Action
            </PrimaryButton>
          </div>
        </div>
        <div className="flex flex-col">
          <TextMedium bold className="text-gray">
            Other
          </TextMedium>

          <div className="flex gap-4 items-center">
            <TextLarge bold className=" text-black pr-4">
              Something
            </TextLarge>
            <SeconaryButton small className="text-pink-400" onClick={() => {}}>
              Button
            </SeconaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
