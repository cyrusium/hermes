// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import fs from "fs";
!process.env["SKIP_ENV_VALIDATION"] && (await import("./src/env.mjs"));

/** @type {string[]} */
const locales = fs
  .readdirSync("./locale")
  .filter((f) => fs
    .statSync(`./locale/${f}`)
    .isDirectory()
  );

/** @type {string} */
const defaultLocale = "br"


/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales,
    defaultLocale
  },
  // experimental: {
  //   forceSwcTransforms: true,
  // },
};


const linguirc = {
  locales,
  sourceLocale: defaultLocale,
  catalogs: [
    {
      path: "<rootDir>/locale/{locale}/messages",
      include: ["<rootDir>/"],
      exclude: ["**/node_modules/**"]
    }
  ]
}

fs.writeFileSync(".linguirc", JSON.stringify(linguirc, null, 2));

export default config;
