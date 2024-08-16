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
    return Math.floor(interval) + "y ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + "m ago";
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + "w ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + "d ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + "h ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + "m ago";
  }
  return Math.floor(seconds) + "s ago";
};

export const formatEtherShort = (num: number, digits: number) => {
  const lookup = [
    { value: 0.001, symbol: "KEther" },
    { value: 1, symbol: "Ether" },
    { value: 1e3, symbol: "Finney" },
    { value: 1e6, symbol: "Szabo" },
    { value: 1e9, symbol: "GWei" },
    { value: 1e12, symbol: "MWei" },
    { value: 1e15, symbol: "KWei" },
    { value: 1e18, symbol: "Wei" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
};

export const formatAddressShort = (address: `0x${string}` | string) => {
  if (!address) return "";
  const length = address.length;
  const firstFive = address.split("").splice(0, 5).join("");
  const lastFive = address
    .split("")
    .splice(length - 5, length)
    .join("");
  return `${firstFive}...${lastFive}`;
};
