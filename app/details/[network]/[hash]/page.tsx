"use client";
import {
  PositiveBadge,
  SecondaryBadge,
  WarningBadge,
} from "@/app/_components/badge";
import { Box } from "@/app/_components/box";
import { Link } from "@/app/_components/link";
import { Summary } from "@/app/_components/summary";
import { TextMedium } from "@/app/_components/text";
import { getClient } from "@/app/clients";
import { Network } from "@/app/types";
import { getCurrency } from "@/app/utils";
import { useEffect, useState } from "react";
import {
  formatEther,
  type Hex,
  type Transaction,
  type TransactionReceipt,
} from "viem";

export default function Details({
  params,
}: {
  params: { hash: Hex; network: string };
}) {
  const network = Network[params.network as keyof typeof Network];
  const [transaction, setTransaction] = useState<
    (TransactionReceipt & Transaction & { timestamp: Date }) | null
  >(null);
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "long",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      const client = getClient(network);
      const transactionReceipt = await client.getTransactionReceipt({
        hash: params.hash,
      });
      const transaction = await client.getTransaction({
        hash: params.hash,
      });
      const block = await client.getBlock({
        blockNumber: transaction.blockNumber,
      });
      setTransaction({
        ...transactionReceipt,
        ...transaction,
        timestamp: new Date(Number(block.timestamp) * 1000),
      });
    };
    fetchTransactions();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "reverted":
        return <SecondaryBadge>Reverted</SecondaryBadge>;
      case "success":
        return <PositiveBadge>Success</PositiveBadge>;
      default:
        return <WarningBadge>Loading</WarningBadge>;
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <Summary hash={params.hash} network={network} />
      <div className=" flex flex-col items-center p-2 sm:p-4">
        <div className="w-full md:w-[550px]">
          <Box className="p-4">
            {transaction ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-1 py-2">
                  <TextMedium bold className="text-gray w-[150px]">
                    Status
                  </TextMedium>
                  <div className="flex gap-2 items-center">
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
                <div className="flex items-center gap-1 py-2">
                  <TextMedium bold className="text-gray w-[150px]">
                    Amount
                  </TextMedium>
                  <div className="flex gap-2 items-center">
                    {formatEther(transaction.value)} {getCurrency(network)}
                  </div>
                </div>
                <div className="flex items-center gap-1 py-2">
                  <TextMedium bold className="text-gray w-[150px]">
                    Timestamp
                  </TextMedium>
                  <div className="flex gap-2 items-center">
                    {dateFormatter.format(transaction.timestamp)}
                  </div>
                </div>
                <div className="flex items-center gap-1 pb-4 pt-2">
                  <TextMedium bold className="text-gray w-[150px]">
                    Transaction fee
                  </TextMedium>
                  <div className="flex gap-2 items-center">
                    {transaction.status === "success"
                      ? formatEther(
                          transaction.effectiveGasPrice * transaction.gasUsed
                        )
                      : "-"}{" "}
                    {getCurrency(network)}
                  </div>
                </div>
                <div className="flex items-center gap-1 pt-4 pb-2 border-t">
                  <TextMedium bold className="text-gray w-[150px]">
                    To
                  </TextMedium>
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`https://${
                        network === Network.Ethereum
                          ? "etherscan"
                          : "polygonscan"
                      }.com/address/${transaction.to}`}
                    >
                      <TextMedium className=" text-pink-900 hover:text-pink-800">
                        {transaction.to ? transaction.to : "-"}
                      </TextMedium>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-1 py-2">
                  <TextMedium bold className="text-gray w-[150px]">
                    From
                  </TextMedium>
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`https://${
                        network === Network.Ethereum
                          ? "etherscan"
                          : "polygonscan"
                      }.com/address/${transaction.from}`}
                    >
                      <TextMedium className=" text-pink-900 hover:text-pink-800">
                        {transaction.from ? transaction.from : "-"}
                      </TextMedium>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>loading..</>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}
