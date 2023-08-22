import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../src/index.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
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
  //   console.log('conf file', postcssRule);
  //   console.log(JSON.stringify(postcssRule, null, 2));
  //   // throw Error('stop');
  //   return config;
  // },
};
export default config;
