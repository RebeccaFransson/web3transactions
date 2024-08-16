/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ETHERSCAN_KEY: process.env.ETHERSCAN_KEY, // pulls from .env file
  },
};

export default nextConfig;
