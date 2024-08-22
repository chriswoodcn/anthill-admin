import createNextJsObfuscator from "nextjs-obfuscator";

const obfuscatorOptions = {};
const pluginOptions = {
  //  enabled: "detect",
  //  obfuscateFiles: {
  //    buildManifest: true,
  //    ssgManifest: true,
  //    webpack: true,
  //    additionalModules: ["echarts-wordcloud"],
  //  },
  //  log: true,
};
const withNextJsObfuscator = createNextJsObfuscator(
  obfuscatorOptions,
  pluginOptions
);

/** @type {import('next').NextConfig} */
import configuration from "./configuration.mjs";
const nextConfig = {
  basePath: configuration.BasePath,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV == "development",
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/index", // Change this to your desired destination
        permanent: false, // Set to true for permanent redirect (301)
      },
      {
        source: "/admin",
        destination: "/admin/index", // Change this to your desired destination
        permanent: false, // Set to true for permanent redirect (301)
      },
      {
        source: "/template",
        destination: "/template/index", // Change this to your desired destination
        permanent: false, // Set to true for permanent redirect (301)
      },
    ];
  },
  experimental: {
    //support app router tree shaking
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  output: "standalone",
};

const finalNextConfig =
  process.env.NODE_ENV == "production"
    ? withNextJsObfuscator(nextConfig)
    : nextConfig;

export default finalNextConfig;
