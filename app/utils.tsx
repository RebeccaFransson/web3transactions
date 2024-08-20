import type { Hex } from "viem";
import { decodeAbiParameters, formatEther } from "viem/utils";
import { Network } from "./types";
import { EthIcon } from "./_components/icons/eth";
import { PolygonIcon } from "./_components/icons/polygon";

export const formatDate = (date: Date) => {
  // TODO: get translations into the date
  return Intl.DateTimeFormat("en-UK", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
};

export const calculateTimeAgo = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    throw new TypeError("Invalid date");
  }
  let seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + " weeks ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const formatEtherShort = (ether: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: " Ether" },
    { value: 1e3, symbol: " KEther" },
    { value: 1e6, symbol: " MEther" },
    { value: 1e9, symbol: " GEther" },
    { value: 1e12, symbol: " TEther" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => ether >= item.value);
  return item
    ? (ether / item.value)
        .toFixed(digits)
        .replace(regexp, "")
        .concat(item.symbol)
    : "0";
};

export const formatHexShort = (address: Hex | string) => {
  if (!address) return "";
  const length = address.length;
  const firstFive = address.split("").splice(0, 5).join("");
  const lastFive = address
    .split("")
    .splice(length - 5, length)
    .join("");
  return `${firstFive}...${lastFive}`;
};

export const decodeAmount = (input: Hex) => {
  if (input == "0x") return BigInt(0);
  const values = decodeAbiParameters(
    [{ name: "amount", type: "uint256" }],
    `0x${input.slice(10)}`
  );
  return values[0];
};

export const getCurrency = (network: Network, small = false) => {
  return network === Network.Ethereum ? (
    <div className="flex gap-1 items-center">
      ETH <EthIcon small={small} />
    </div>
  ) : (
    <div className="flex gap-1 items-center">
      MATIC <PolygonIcon small={small} />
    </div>
  );
};
