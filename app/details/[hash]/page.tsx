"use client";
import { Summary } from "@/app/_components/summary";
import { Network } from "@/app/types";
import { useState } from "react";

export default function Details({ params }: { params: { hash: string } }) {
  const [network, setNetwork] = useState<Network>(Network.Etherium);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <Summary hash={params.hash} network={network} setNetwork={setNetwork} />
      hi
    </div>
  );
}
