/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ETHERSCAN_KEY: process.env.ETHERSCAN_KEY,
    POLYGONSCAN_KEY: process.env.POLYGONSCAN_KEY,
  },
};

export default nextConfig;
