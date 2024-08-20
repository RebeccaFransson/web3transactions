"use client";
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
import { ScanService } from "../services/etherscanService";
import type { Transaction } from "../services/response";
import { Network } from "../types";
import { calculateTimeAgo, formatHexShort, getCurrency } from "../utils";
import { Link } from "../_components/link";

export default function Transactions({ params }: { params: { address: Hex } }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [network, setNetwork] = useState<Network>(Network.Ethereum);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await new ScanService(network).fetchTransactions({
        address: params.address,
      });
      setTransactions(data);
    };
    fetchTransactions();
  }, [network]);

  const getMethodBadge = (func: string) => {
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
    <div className="w-full flex flex-col">
      <Summary
        address={params.address}
        network={network}
        setNetwork={setNetwork}
      />
      <div className=" flex flex-col items-center p-2 sm:p-4">
        <div className="w-full lg:w-[990px]">
          <H1 className="pl-5  pt-8 sm:pt-12 text-orange-500">TRANSACTIONS</H1>
          <Box>
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
                  <th className="pt-4 pb-2 hidden sm:table-cell">
                    <div className="flex items-center">
                      <TextMedium bold className="text-gray">
                        TX Hash
                      </TextMedium>
                    </div>
                  </th>
                  <th className="pt-4 pb-2 hidden sm:table-cell">
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
                      <TextMedium className="flex gap-2 items-center flex-wrap py-1 px-2 text-black">
                        {transaction.value} {getCurrency(network, true)}
                      </TextMedium>
                    </th>
                    <th className="text-left">
                      <TextMedium className="py-1 px-2 text-black">
                        {calculateTimeAgo(
                          new Date(transaction.timeStamp * 1000)
                        )}
                      </TextMedium>
                    </th>
                    <th className="text-left hidden sm:table-cell">
                      <div className="flex gap-1 items-center">
                        <Link
                          href={`https://${
                            network === Network.Ethereum
                              ? "etherscan"
                              : "polygonscan"
                          }.com/tx/${transaction.hash}`}
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
                    <th className="text-left hidden sm:table-cell">
                      {getMethodBadge(transaction.functionName)}
                    </th>
                    <th className="">
                      <div className="flex items-center justify-center">
                        <TextButton
                          className="fill-pink-900 hover:bg-pink-transparent"
                          href={`details/${Network[network]}/${transaction.hash}`}
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
