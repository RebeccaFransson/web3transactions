/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ETHERSCAN_KEY: process.env.ETHERSCAN_KEY,
    POLYGONSCAN_KEY: process.env.POLYGONSCAN_KEY,
    PHONE_NUMBER: process.env.PHONE_NUMBER,
    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  },
};

export default nextConfig;
