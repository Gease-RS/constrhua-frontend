import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ⚠️ Para que cookies funcionem entre domínios
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Access-Control-Allow-Credentials",
          value: "true",
        },
        {
          key: "Access-Control-Allow-Origin",
          value: "http://localhost:3001",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,POST,OPTIONS",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type,Authorization",
        },
      ],
    },
  ],
};

export default nextConfig;
