import type { StorybookConfig } from '@storybook/react-webpack5';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    // {
    //   name: '@storybook/addon-postcss',
    //   options: {
    //     cssLoaderOptions: {
    //       // When you have splitted your css over multiple files
    //       // and use @import('./other-styles.css')
    //       importLoaders: 1,
    //     },
    //     postcssLoaderOptions: {
    //       // When using postCSS 8
    //       implementation: require('postcss'),
    //     },
    //   },
    // },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  // webpackFinal: async (config: any) => {
  //   console.log(Object.keys(config));
  //   // config.module.rules[4].oneOf[5].use[2].options.postcssOptions.plugins.push(
  //   //   'tailwindcss',
  //   // );
  //   // config.module.rules[4].oneOf[5].use[2].options.postcssOptions.plugins.push(
  //   //   'autoprefixer',
  //   // );
  //   const oneOfRule = config.module.rules.filter((item) => !!item.oneOf);
  //   if (oneOfRule.length === 0 || oneOfRule.length > 1) {
  //     throw Error('not find oneOf rule');
  //   }
  //   const cssRule = oneOfRule[0].oneOf.find(
  //     (item) => item.test.source === '\\.css$',
  //   );
  //   if (!cssRule) {
  //     throw Error('not find css rule');
  //   }
  //   const postcssRule = cssRule.use.find(
  //     (item) =>
  //       typeof item.loader === 'string' &&
  //       item.loader.includes('postcss-loader'),
  //   );
  //   if (!postcssRule) {
  //     throw Error('not find postcss rule');
  //   }

  //   console.log('conf file', postcssRule);
  //   // postcssRule.options.postcssOptions.plugins.push(
  //   //   require('tailwindcss')(path.resolve(__dirname, '../tailwind.config.js')),
  //   // );
  //   console.log(JSON.stringify(postcssRule, null, 2));
  //   // throw Error('stop');
  //   // config.module.rules.push({
  //   //   test: /\.css$/,
  //   //   use: [
  //   //     {
  //   //       loader: 'postcss-loader',
  //   //       options: {
  //   //         postcssOptions: {
  //   //           plugins: [
  //   //             require('tailwindcss'),
  //   //             require('autoprefixer'),
  //   //           ],
  //   //         },
  //   //       },
  //   //     },
  //   //   ],
  //   //   include: path.resolve(__dirname, '../'),
  //   // })
  //   return config;
  // },
};
export default config;
