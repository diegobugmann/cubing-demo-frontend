import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "https://cubingdemo-app-eyd6ekdnhkazfjam.switzerlandnorth-01.azurewebsites.net",
  },
  output: "standalone",
};

export default nextConfig;