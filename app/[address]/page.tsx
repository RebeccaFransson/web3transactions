"use client";
import { useEffect, useState } from "react";
import { Box } from "../_components/box";
import {
  PrimaryButton,
  SeconaryButton,
  TextButton,
} from "../_components/button";
import { ArrowRightIcon } from "../_components/icons/arrowRight";
import { CopyIcon } from "../_components/icons/copy";
import { SortUpAndDownIcon } from "../_components/icons/sort";
import { H1, TextLarge, TextMedium } from "../_components/text";
import { EtherscanService } from "../services/etherscanService";
import { calculateTimeAgo, formatAddressShort, formatUSD } from "../utils";
import type { Transaction } from "../services/response";
import {
  PositiveBadge,
  PrimaryBadge,
  WarningBadge,
} from "../_components/badge";

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
    };
    fetchTransactions();
  }, []);

  const getFunctionBadge = (func: string) => {
    const type = func.split("(")[0];
    switch (type) {
      case "withdraw":
        return <PrimaryBadge>Withdraw</PrimaryBadge>;
      case "approve":
        return <PositiveBadge>Approve</PositiveBadge>;
      case "transfer":
        return <WarningBadge>Transfer</WarningBadge>;

      default:
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-16">
      <div className="rounded border-b-2 border-pink-50 p-4">
        <div className="flex gap-4 justify-start min-[862px]:justify-around flex-wrap">
          <div className="flex flex-col">
            <TextMedium bold className="text-gray">
              Address
            </TextMedium>
            <div className="flex gap-2 items-center">
              <TextLarge bold className=" text-black">
                {formatAddressShort(params.address)}
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
              <TextLarge bold className=" text-black pr-4">
                {formatUSD(1234567.89)}
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
              <SeconaryButton
                small
                className="text-pink-400"
                onClick={() => {}}
              >
                Button
              </SeconaryButton>
            </div>
          </div>
        </div>
      </div>

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
                        Wallet
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
                  <tr className="border-b border-gray-50 group hover:bg-gray-50">
                    <th className="py-3 pl-4 text-left">
                      <TextMedium className="py-1 px-2 text-black">
                        {formatUSD(transaction.value)}
                      </TextMedium>
                    </th>
                    <th className="text-left">
                      <TextMedium className="py-1 px-2 text-black">
                        {transaction.timeStamp}
                      </TextMedium>
                    </th>
                    <th className="text-left">
                      <TextMedium className="text-black">
                        {formatAddressShort(transaction.address)}
                      </TextMedium>
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
