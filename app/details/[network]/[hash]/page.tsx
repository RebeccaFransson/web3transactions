"use client";
import { Summary } from "@/app/_components/summary";
import { Network } from "@/app/types";
import type { Hex } from "viem";

export default function Details({
  params,
}: {
  params: { hash: Hex; network: string };
}) {
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <Summary
        hash={params.hash}
        network={Network[params.network as keyof typeof Network]}
      />
      hi
    </div>
  );
}
