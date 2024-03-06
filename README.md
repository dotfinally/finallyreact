# .finally(React)

### Where simplicity meets functionality

[![npm](https://img.shields.io/npm/v/finallyreact.svg?color=005711)](https://www.npmjs.com/package/finallyreact)
[![ja](https://img.shields.io/badge/lang-Japanese-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.ja.md)
[![es](https://img.shields.io/badge/lang-Spanish-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.es.md)
[![ko](https://img.shields.io/badge/lang-Korean-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.ko.md)
[![zh-CN](https://img.shields.io/badge/lang-Simplified--Chinese-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.zh-CN.md)

FinallyReact is a React design library created with flexibility and usability in mind.

- A full design and component library for your React application
- Easily remove default styles on any component so you can style it with your own brand
- Your classnames take precedence over component styling
- A comprehensive set of utility class shortcuts, for faster styling
- Accessibility focused and tested

## Documentation

You can find examples of all component, design, and utility elements on the [FinallyReact website](https://finallyreact.com) (built entirely with FinallyReact).

## To use in your project

- `npm install finallyreact`
- Import FinallyReact CSS in your app, most likely in a top level app file:
  - `import 'finallyreact/main.css'`
- Import components as needed, for example:
  - `import { Column, Row, Card } from 'finallyreact'`
- (optional) create a config file in the root of your project (see below)
- (optional) use PurgeCSS to reduce the size of the CSS bundle (see below)

### Config (optional)

To set global settings, create a `finally.config.js` file in the root of your project.

Below are the available options, with default values:

```js
export default {
  breakpoints: {
    xs: 600,
    sm: 900,
    md: 1200,
    lg: 1600,
    xl: 2000,
    xxl: 2400
  },
  simple: false
};
```

### PurgeCSS (optional)

To reduce the size of the CSS bundle, you can use PostCSS and PurgeCSS. Below is example configuration to add to PostCSS:

```js
if (process.env.NODE_ENV === 'production') {
  plugins['@fullhuman/postcss-purgecss'] = {
    content: [
      './**/*.ts',
      './**/*.tsx',
      './**/*.html',
      '../../node_modules/finallyreact/index.js',
      '../../libs/ui/src/**/*.ts',
      '../../libs/ui/src/**/*.tsx',
    ],
    safelist: [
      /lava/,
      /apple/,
      /ruby/,
      /red/,
      /flamingo/,
      ...(any other colors you use)
    ],
    defaultExtractor: (content) => {
      const matches = content.match(/[\w-/:]+(?<!:)/g) || [];
      return matches.concat(matches.map((match) => match.replace(/\//g, '\\/')));
    }
  };
}
```

Note: Ensure your purgecss content includes `node_modules/finallyreact/index.js`. If your app is in a monorepo, use your path to node_module, for example: `../../node_modules/finallyreact/index.js`

## License

Copyright © 2023-2024 `dotfinally, LLC`

Available under the MIT license, which means anyone can use FinallyReact for free, for any purpose. Read the full license text in the LICENSE.txt file in the repo.

FinallyReact is not affiliated with nor endorsed by the ReactJS team or Meta Platforms, Inc.

## Development

If you'd like to run FinallyReact locally on your computer to make or test changes:

### Prerequisites

- NodeJS 20.x or higher
- NPM 10.x or higher
- React 18.x or higher

(older versions of Node might work but are not tested)

### Setup

- `npm install`

### Build

- `npm run build` from the root to create a lib folder with compiled files
- To test changes in another app locally, run `npm run link` inside the lib folder created and `npm link finallyreact` in the external app
- `npm run build:watch` from the root to build and watch for changes while developing (make sure to run `npm run build` at least once first)

### Tests

- `npm run test`

## FAQ and Troubleshooting

- For better stack traces while developing locally: change "mode" in webpack.config.js to "development"

- The build size of my project is too large after including FinallyReact styles

  - Try using PurgeCSS to reduce the size of the CSS bundle (see steps above)

- Importing `finallyreact/main.css` in my NextJS \_app.js file isn't applying styles correctly

  - Try importing it in a separate .scss file instead, with `@import '~finallyreact/main.css';`

- Why are most component styles written in TS files instead of directly in SASS?
  - The biggest issue with having all styles in SASS/CSS is overriding them with custom classes. You may have experienced the issue with many other React component libraries, which are difficult to customize if you use your own classes. This often leads to inspecting the component to find the exact, complicated CSS structure to target. FinallyReact makes this much easier! When you use FinallyReact utility classnames, any default styles in the same 'group' will be removed in favor of your overrides. And you can set the `simple` prop for any component to remove all default styles, making it even easier to add your own styles.
