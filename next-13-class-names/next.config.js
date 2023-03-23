/** @type {import('next').NextConfig} */

const regexEqual = (x, y) =>
  x instanceof RegExp &&
  y instanceof RegExp &&
  x.source === y.source &&
  x.global === y.global &&
  x.ignoreCase === y.ignoreCase &&
  x.multiline === y.multiline;

function cssLoaderOptions(modules) {
  const { getLocalIdent, ...others } = modules;
  return {
    getLocalIdent: (context, _, exportName, options) => {
      const localIdent = getLocalIdent(context, _, exportName, options);
      const customIdent = localIdent.match(/(?<=_).*/gi)[0];

      return customIdent;
    },
    ...others,
  };
}

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    const oneOf = config.module.rules.find(
      (rule) => typeof rule.oneOf === "object"
    );

    if (oneOf) {
      const moduleSassRule = oneOf.oneOf.find((rule) =>
        regexEqual(rule.test, /\.module\.(scss|sass)$/)
      );

      if (moduleSassRule) {
        const cssLoader = moduleSassRule.use.find(({ loader }) =>
          loader.includes("css-loader")
        );
        if (cssLoader) {
          cssLoader.options = {
            ...cssLoader.options,
            modules: cssLoaderOptions(cssLoader.options.modules),
          };
        }
      }
    }

    return config;
  },
};

module.exports = nextConfig;
