/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APPLICATIONID: process.env.APPLICATIONID,
    APPLICATIONKEYS: process.env.APPLICATIONKEYS,
  },
};

module.exports = nextConfig
