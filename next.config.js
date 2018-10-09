const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { findPages } = require('./src/utils/find');


module.exports = {
  webpack: config => {
    const env = {};
    Object.keys(process.env).forEach(key => {
      env[key] = JSON.stringify(process.env[key]);
    });
    // 禁用弃用typography警告 https://material-ui.com/style/typography/#migration-to-typography-v2
    env.MUI_SUPPRESS_DEPRECATION_WARNINGS = true;
    // noinspection JSUnresolvedFunction
    const plugins = config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': env,
      }),
    ]);
    if (process.env.STATS_ENABLED) {
      plugins.push(
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          generateStatsFile: true,
          // Will be available at `.next/stats.json`
          statsFilename: 'stats.json',
        }),
      );
    }
    return Object.assign({}, config, {
      plugins,
      node: {
        fs: 'empty',
      },
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.(css|md)$/,
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]',
            },
          },
          {
            test: /\.(css|md)$/,
            loader: 'raw-loader',
          },
        ]),
      }),
    });
  },
  webpackDevMiddleware: config => config,
  // next.js also provide a `defaultPathMap` so we could simplify the logic.
  // However, we keep it in order to prevent any future regression on the `findPages()` side.
  // exportPathMap: () => {
  //   const map = {};
  //
  //   function generateMap(pages) {
  //     pages.forEach(page => {
  //       if (!page.children) {
  //         map[page.pathname] = {
  //           page: page.pathname,
  //         };
  //         return;
  //       }
  //
  //       generateMap(page.children);
  //     });
  //   }
  //
  //   generateMap(findPages());
  //
  //   return map;
  // },
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3, // default 2
  },
};
