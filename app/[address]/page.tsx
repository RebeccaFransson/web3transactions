"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Hex } from "viem";
import {
  PositiveBadge,
  SecondaryBadge,
  WarningBadge,
} from "../_components/badge";
import { Box } from "../_components/box";
import { TextButton } from "../_components/button";
import { ArrowRightIcon } from "../_components/icons/arrowRight";
import { CopyIcon } from "../_components/icons/copy";
import { SortUpAndDownIcon } from "../_components/icons/sort";
import { Summary } from "../_components/summary";
import { H1, TextMedium } from "../_components/text";
import { EtherscanService } from "../services/etherscanService";
import type { Transaction } from "../services/response";
import { Network } from "../types";
import { calculateTimeAgo, formatHexShort } from "../utils";

export default function Transactions({ params }: { params: { address: Hex } }) {
  const service = new EtherscanService();
  const [transactions, setTrasactions] = useState<Transaction[]>([]);
  const [network, setNetwork] = useState<Network>(Network.Ethereum);

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
        return <SecondaryBadge>Withdraw</SecondaryBadge>;
      case "approve":
        return <PositiveBadge>Approve</PositiveBadge>;
      case "transfer":
        return <WarningBadge>Transfer</WarningBadge>;
      default:
        return "";
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <Summary
        address={params.address}
        network={network}
        setNetwork={setNetwork}
      />
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
                      <TextMedium bold>Age</TextMedium>
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
                        Method
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
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <th className="py-3 pl-4 text-left">
                      <TextMedium className="py-1 px-2 text-black">
                        {transaction.value} ETH
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
                          href={`https://etherscan.io/tx/${transaction.hash}`}
                          className="cursor-pointer underline decoration-pink-900 hover:decoration-pink-800 "
                        >
                          <TextMedium className=" text-pink-900 hover:text-pink-800">
                            {formatHexShort(transaction.hash)}
                          </TextMedium>
                        </Link>
                        <TextButton
                          className="stroke-pink-900 hover:bg-pink-transparent"
                          onClick={() => {
                            navigator.clipboard.writeText(transaction.hash);
                          }}
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
                          className="fill-pink-900 hover:bg-pink-transparent"
                          href={`details/${transaction.hash}`}
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
