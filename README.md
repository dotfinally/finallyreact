# .finally(React)

### Where simplicity meets functionality

[![npm](https://img.shields.io/npm/v/finallyreact.svg?color=005711)](https://www.npmjs.com/package/finallyreact)

FinallyReact is a React design library created with flexibility and usability in mind.

- A full design and component library for your React application
- Easily remove default styles on any component so you can style it with your own brand
- Your classnames take precedence over component styling
- A comprehensive set of utility class shortcuts, for faster styling
- Accessibility focused and tested

**`FinallyReact is currently in beta (pre version 1) and not recommended for production use yet`**

## Documentation

You can find examples of all component, design, and utility elements on the [FinallyReact website](https://finallyreact.com).

## To use in your project

- `npm install finallyreact`
- Import FinallyReact CSS in your app, most likely in a top level app file: `import 'finallyreact/main.css'`
- Import components as needed, for example: `import { Column, Row, Card } from 'finallyreact'`
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
}
```

### PurgeCSS (optional)
To reduce the size of the CSS bundle, you can use PostCSS and PurgeCSS. Below is example configuration to add to PostCSS:

```js
if (process.env.NODE_ENV === 'production') {
  plugins['@fullhuman/postcss-purgecss'] = {
    content: ['./**/*.js', './**/*.jsx', './**/*.ts', './**/*.tsx', './**/*.html'],
    defaultExtractor: (content) => {
      const matches = content.match(/[\w-/:]+(?<!:)/g) || [];
      return matches.concat(matches.map((match) => match.replace(/\//g, '\\/')));
    }
  };
}
```

## License

Copyright © 2023 `dotfinally, LLC`

Available under the MIT license, which means anyone can use FinallyReact for free, for any purpose. Read the full license text in the LICENSE.txt file in the repo.

FinallyReact is not affiliated with nor endorsed by the ReactJS team or Meta Platforms, Inc.

## Development

If you'd like to run FinallyReact locally on your computer to make or test changes:

### Prerequisites

- NodeJS 18.16.1 or higher
- NPM 9.7.2 or higher
- React 16.8 or higher

(older versions of Node might work but are not tested)

### Setup

- `npm install`

### Build

- `npm run build` from the root to create a lib folder with compiled files
- To test changes in another app locally, run `npm run link` inside the lib folder created and `npm link finallyreact` in the external app
- `npm run build:watch` from the root to build and watch for changes while developing (make sure to run `npm run build` at least once first)

### Tests

- `npm run test`

## Contribute

Anyone is welcome to see source code, contribute new code, give suggestions for improvements, request new features, or report issues. If you find a problem or have an idea for a new feature, please create an Issue on [GitHub](https://github.com/dotfinally/finallyreact).

### Issues

FinallyReact is managed by a very small team. To make their lives easier, please follow the below guidelines for every GitHub Issue created:

- Search for existing Issues before creating a new one
- Use a clear and descriptive title for the Issue to identify the problem
- Describe the exact steps which reproduce the problem in as many details as possible

#### Issue Template

```
## Description of defect or feature request

## Expected behavior

(if defect):
## Actual behavior

## Steps to reproduce

## Your environment (OS, browser, Node version, etc.)

(if feature request):
## Will you be working on this feature yourself? (to avoid duplicate work by multiple people)

```

- Any issues that do not follow the above guidelines and template will be closed.

### Pull Requests

Pull Requests must follow the below guidelines:

- Create a new branch from the `dev` branch for your changes
- Point your PR back to `dev`
- Use a clear and descriptive title for the pull request
- Provide a link to any related GitHub Issues
- Describe why this pull request is necessary - what does it solve?
- Include screenshots, GIFs, or videos in the pull request to illustrate any UI/UX changes (required)
- By creating a pull request, you acknowledge you have full authority to submit its code and do so under the MIT license

Technical requirements:

- Must pass all tests
- Must NOT use any external libraries except for React and React DOM
- Must be formatted with Prettier config settings

#### Pull Request Description Template

```
## Description and purpose of change

## Related Issue(s) in GitHub

## Does this PR introduce any breaking changes to previous versions?

## Screenshots, GIFs, or videos of changes (required)
```

- Any pull requests that do not follow the above guidelines and description template will be closed.

## FAQ and Troubleshooting

- The build size of my project is too large after including FinallyReact styles
  - Try using PurgeCSS to reduce the size of the CSS bundle (see steps above)

- Importing `finallyreact/main.css` in my NextJS _app.js file isn't applying styles correctly
  - Try importing it in a separate .scss file instead, with `@import '~finallyreact/main.css';`
