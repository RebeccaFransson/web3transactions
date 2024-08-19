"use client";
import { useEffect, useState } from "react";
import { EtherscanService } from "../services/etherscanService";
import { formatHexShort, formatEtherShort } from "../utils";
import { TextButton, PrimaryButton, SeconaryButton } from "./button";
import { CopyIcon } from "./icons/copy";
import { TextMedium, TextLarge } from "./text";
import { EthIcon } from "./icons/eth";
import { formatEther } from "viem";
import { Toggle } from "./toggle";
import { Network } from "../types";
import Link from "next/link";

export const Summary = ({
  address,
  hash,
  network,
  setNetwork,
}: {
  address?: string;
  hash?: string;
  network: Network;
  setNetwork: (network: Network) => void;
}) => {
  const service = new EtherscanService();
  const [balance, setBalance] = useState<bigint | null>(null);

  useEffect(() => {
    if (address) {
      const fetchTransactions = async () => {
        const data = await service.fetchBalance({ address: address });
        setBalance(data);
      };
      fetchTransactions();
    }
  }, []);

  return (
    <div className="rounded border-b-2 border-pink-50 p-4">
      <div className="flex gap-4 justify-start min-[862px]:justify-around flex-wrap">
        {address ? (
          <div className="flex flex-col gap-1">
            <TextMedium bold className="text-gray">
              Address
            </TextMedium>
            <div className="flex gap-2 items-center">
              <TextLarge bold className=" text-black">
                {formatHexShort(address)}
              </TextLarge>
              <TextButton
                className="stroke-pink-900 hover:bg-pink-transparent"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                }}
              >
                <CopyIcon />
              </TextButton>
            </div>
          </div>
        ) : null}
        {hash ? (
          <div className="flex flex-col gap-1">
            <TextMedium bold className="text-gray">
              Hash
            </TextMedium>
            <div className="flex gap-2 items-center">
              <Link
                target="_blank"
                href={`https://etherscan.io/tx/${hash}`}
                className="cursor-pointer underline decoration-pink-900 hover:decoration-pink-800 "
              >
                <TextLarge bold className=" text-pink-900 hover:text-pink-800">
                  {formatHexShort(hash)}
                </TextLarge>
              </Link>
              <TextButton
                className="stroke-pink-900 hover:bg-pink-transparent"
                onClick={() => {
                  navigator.clipboard.writeText(hash);
                }}
              >
                <CopyIcon />
              </TextButton>
            </div>
          </div>
        ) : null}
        {balance || address ? (
          <div className="flex flex-col gap-1">
            <TextMedium bold className="text-gray">
              Balance
            </TextMedium>

            <div className="flex gap-4 items-center">
              <TextLarge
                bold
                className="flex gap-2 items-center text-black pr-4"
              >
                <EthIcon />{" "}
                {balance ? `${Number(formatEther(balance)).toFixed(2)}` : "-"}{" "}
                ETH
              </TextLarge>
              <PrimaryButton small onClick={() => {}}>
                Action
              </PrimaryButton>
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          <TextMedium bold className="text-gray">
            Network
          </TextMedium>

          <div className="flex gap-4 items-center">
            <Toggle
              values={["Ethereum", "Polygon"]}
              activeIndex={network === Network.Etherium ? 0 : 1}
              onClick={(index: number) =>
                setNetwork(index === 0 ? Network.Etherium : Network.Polygon)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
