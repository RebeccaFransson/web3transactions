"use client";
import { Box } from "./_components/box";
import { H1 } from "./_components/text";
import { PrimaryButton } from "./_components/button";
import { useState } from "react";

export default function Home() {
  const sampleAddress = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";
  const [address, setAddress] = useState("");

  const onSearch = () => {
    window.location.href = `/${address !== "" ? address : sampleAddress}`;
  };

  return (
    <div className=" flex flex-col items-center p-2 sm:p-4">
      <div className="w-full md:w-[550px]">
        <H1 className="pl-2 pt-8 sm:pt-12">Search for wallet address</H1>
        <Box className="flex gap-2 p-2">
          <input
            className="w-full border p-2 rounded"
            value={address}
            placeholder={sampleAddress}
            onChange={(e) => setAddress(e.target.value)}
          />
          <PrimaryButton onClick={onSearch}>Search</PrimaryButton>
        </Box>
      </div>
    </div>
  );
}
