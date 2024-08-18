"use client";
import { useEffect, useState } from "react";
import {
  PositiveBadge,
  PrimaryBadge,
  SecondaryBadge,
  WarningBadge,
} from "../_components/badge";
import { Box } from "../_components/box";
import { TextButton } from "../_components/button";
import { ArrowRightIcon } from "../_components/icons/arrowRight";
import { SortUpAndDownIcon } from "../_components/icons/sort";
import { H1, TextMedium } from "../_components/text";
import { WalletBalance } from "../_components/walletBalance";
import { EtherscanService } from "../services/etherscanService";
import type { Transaction } from "../services/response";
import {
  calculateTimeAgo,
  decodeAmount,
  formatAddressShort,
  formatEtherShort,
} from "../utils";
import { CopyIcon } from "../_components/icons/copy"; // Import everything
import Link from "next/link";
import { decodeAbiParameters, formatEther, type Hex } from "viem";

export default function Transactions({
  params,
}: {
  params: { address: string };
}) {
  const service = new EtherscanService();
  const [transactions, setTrasactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await service.fetchTransactions({ address: params.address });
      setTrasactions(data);
      console.log(data);
      //
    };
    fetchTransactions();
  }, []);

  const getFunctionBadge = (func: string) => {
    const type = func.split("(")[0];
    switch (type) {
      case "withdraw":
        return <PrimaryBadge>Withdraw</PrimaryBadge>;
      case "approve":
        return <SecondaryBadge>Approve</SecondaryBadge>;
      case "transfer":
        return <WarningBadge>Transfer</WarningBadge>;

      default:
        return <PositiveBadge>Recieve</PositiveBadge>;
    }
  };

  const formatAmount = (input: Hex) => {
    const amountInWei = decodeAmount(input);
    console.log("amountInWei", amountInWei);
    const amountInEth = Number(formatEther(amountInWei));
    //if (amountInEth < 1e3) return `${amountInEth} ETH`;
    //else return formatEtherShort(amountInEth, 2);
    return `${amountInEth} ETH`;
  };

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <WalletBalance address={params.address} />
      <div className=" flex flex-col items-center p-2 sm:p-4">
        <div className="w-full lg:w-[990px]">
          <H1 className="pl-5">TRANSACTIONS</H1>
          <Box className="">
            <table className="w-full">
              <thead className=" ">
                <tr className="border-b border-gray-100">
                  <th className="pt-4 pb-2 pl-4">
                    <TextButton
                      className="text-gray fill-gray hover:text-black hover:fill-black"
                      onClick={() => {}}
                    >
                      <TextMedium bold>Amount</TextMedium>
                      <SortUpAndDownIcon />
                    </TextButton>
                  </th>
                  <th className="pt-4 pb-2">
                    <TextButton
                      className="text-gray fill-gray hover:text-black hover:fill-black"
                      onClick={() => {}}
                    >
                      <TextMedium bold>Date</TextMedium>
                      <SortUpAndDownIcon />
                    </TextButton>
                  </th>
                  <th className="pt-4 pb-2">
                    <div className="flex items-center">
                      <TextMedium bold className="text-gray">
                        TX Hash
                      </TextMedium>
                    </div>
                  </th>
                  <th className="pt-4 pb-2 sm:table-cell hidden">
                    <div className="flex items-center">
                      <TextMedium bold className="text-gray">
                        Action
                      </TextMedium>
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.timeStamp}
                    className="border-b border-gray-50 group hover:bg-gray-50"
                  >
                    <th className="py-3 pl-4 text-left">
                      <TextMedium className="py-1 px-2 text-black">
                        {formatAmount(transaction.input)}
                      </TextMedium>
                    </th>
                    <th className="text-left">
                      <TextMedium className="py-1 px-2 text-black">
                        {calculateTimeAgo(
                          new Date(transaction.timeStamp * 1000)
                        )}
                      </TextMedium>
                    </th>
                    <th className="text-left ">
                      <div className="flex gap-1 items-center">
                        <Link
                          target="_blank"
                          href={`https://blockexplorer.one/ethereum/mainnet/tx/${transaction.hash}`}
                        >
                          <TextMedium className=" text-black hover:text-pink-900">
                            {formatAddressShort(transaction.hash)}
                          </TextMedium>
                        </Link>
                        <TextButton
                          className="stroke-pink-900 hover:bg-pink-transparent"
                          onClick={() => {}}
                        >
                          <CopyIcon small />
                        </TextButton>
                      </div>
                    </th>
                    <th className="text-left sm:table-cell hidden">
                      {getFunctionBadge(transaction.functionName)}
                    </th>
                    <th className="">
                      <div className="flex items-center justify-center">
                        <TextButton
                          className="fill-pink-900 group-hover:bg-pink-transparent"
                          href={`${params.address}/${transaction.hash}`}
                          small
                        >
                          <ArrowRightIcon />
                        </TextButton>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </div>
      </div>
    </div>
  );
}
