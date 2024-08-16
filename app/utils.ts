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

export const formatUSD = (
  amount: number,
  noFractionDigits: Boolean = false
) => {
  const extraOptions = !noFractionDigits
    ? {
        maximumFractionDigits: 0,
      }
    : {};
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...extraOptions,
  }).format(amount);
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
