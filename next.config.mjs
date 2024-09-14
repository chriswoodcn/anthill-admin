import createNextJsObfuscator from "nextjs-obfuscator";
import nextMdx from "@next/mdx";

const withMdx = nextMdx({
  // By default only the `.mdx` extension is supported.
  extension: /\.mdx?$/,
  // Optionally provide remark and rehype plugins
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

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
  reactStrictMode: true,
  pageExtensions: ["md", "mdx", "tsx", "ts"],
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
    ? withNextJsObfuscator(withMdx(nextConfig))
    : withMdx(nextConfig);

export default finalNextConfig;
