import { Box } from "../_components/box";
import {
  PrimaryButton,
  SeconaryButton,
  TextButton,
  TextButtonOnColoredBg,
} from "../_components/button";
import { ArrowRightIcon } from "../_components/icons/arrowRight";
import { CopyIcon } from "../_components/icons/copy";
import { SortUpAndDownIcon } from "../_components/icons/sort";
import { H1, TextLarge, TextMedium } from "../_components/text";
import {
  calculateTimeAgo,
  formatAddressShort,
  formatDate,
  formatUSD,
} from "../utils";

export default function Transactions({
  params,
}: {
  params: { address: string };
}) {
  const test = [
    {
      amount: 9999,
      timestamp: new Date("2024-01-01"),
      hash: "123",
      address: "0x12345678910",
    },
    {
      amount: 8888,
      timestamp: new Date("2024-02-01"),
      hash: "123",
      address: "0x12345678910",
    },
    {
      amount: 7777,
      timestamp: new Date("2024-03-01"),
      hash: "123",
      address: "0x12345678910",
    },
    {
      amount: 6666,
      timestamp: new Date("2024-04-01"),
      hash: "123",
      address: "0x12345678910",
    },
    {
      amount: 5555,
      timestamp: new Date("2024-05-01"),
      hash: "123",
      address: "0x12345678910",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-16">
      <div className="rounded border-2 border-gray-100 p-4">
        <div className="flex gap-4 justify-start min-[862px]:justify-around flex-wrap">
          <div className="flex flex-col">
            <TextMedium bold className="text-gray">
              Address
            </TextMedium>
            <div className="flex gap-2 items-center">
              <TextLarge bold className=" text-pink-900">
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
              <TextLarge bold className=" text-pink-900 pr-4">
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
              <TextLarge bold className=" text-pink-900 pr-4">
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

      <div className=" flex flex-col items-center">
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
                        Other
                      </TextMedium>
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {test.map((transaction) => (
                  <tr className="border-b border-gray-50 group hover:bg-pink-50">
                    <th className="py-3 pl-4 text-left">
                      <TextMedium className="py-1 px-2 text-pink-900">
                        {formatUSD(transaction.amount)}
                      </TextMedium>
                    </th>
                    <th className="text-left">
                      <TextMedium className="py-1 px-2 text-pink-900">
                        {calculateTimeAgo(transaction.timestamp)}
                      </TextMedium>
                    </th>
                    <th className="text-left">
                      <TextMedium className="text-pink-900">
                        {formatAddressShort(transaction.address)}
                      </TextMedium>
                    </th>
                    <th className="text-left sm:table-cell hidden"></th>
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
