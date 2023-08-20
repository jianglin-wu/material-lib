import type { Preview } from '@storybook/react';
import '../src/index.tailwind.css';
import '../src/pages/Todo/learnstorybook-code.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
