# .finally(React)

### Where simplicity meets functionality

Version 0.0.1

FinallyReact is a React design library created with flexibility and usability in mind.

- A full design and component library for your React application
- Easily remove default styles on any component so you can style it with your own brand
- A comprehensive set of utility class shortcuts, for faster styling
- Your classnames take precedence over component styling
- Accessibility focused and tested

**`FinallyReact is currently in beta (pre version 1) and not recommended for production use yet`**

## Documentation

You can find examples of all component, design, and utility elements on the [FinallyReact website](https://finallyreact.com).

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

## Development

### Prerequisites

- NodeJS 18.16.1 or higher
- NPM 9.7.2 or higher

(older versions might work but are not tested)

### Setup

- `npm install`

### Build

- `npm run build` from the root to create a lib folder with compiled files
- To test changes in another app locally, run `npm run link` inside the lib folder created and `npm link finallyreact` in the external app
- `npm run build:watch` from the root to build and watch for changes while developing (make sure to run `npm run build` at least once first)

### Tests

- `npm run test`

## License

FinallyReact was created by and is maintained by `dotfinally, LLC`. It is open-source and available under the MIT license, which means anyone can use FinallyReact for free, for any purpose. Read the full license text in the LICENSE.txt file in the repo.

FinallyReact is not affiliated with nor endorsed by the ReactJS team or Meta Platforms, Inc.

## Contribute

Anyone is welcome to see source code, contribute new code, give suggestions for improvements, request features, or report issues. If you find a problem or have an idea for a new feature, please create an Issue on GitHub.

### Issues

FinallyReact is managed by a very small team. To make their lives easier, please follow the below guidelines for every Github Issue created:

- Search for existing Issues before creating a new one
- Use a clear and descriptive title for the Issue to identify the problem
- Describe the exact steps which reproduce the problem in as many details as possible


#### Issue Template

```
## Description of defect or feature request

(if defect):
## Steps to reproduce

## Expected behavior

## Actual behavior

## Your environment (OS, browser, Node version, etc.)
```

- Any issues that do not follow the above guidelines and template will be closed.

### Pull Requests

Pull Requests must follow the below guidelines:

- Use a clear and descriptive title for the pull request
- Provide a link to any related Issues
- Comment why this pull request is necessary - what does it solve?
- Include screenshots, GIFs, or videos in the pull request to illustrate any UI/UX changes

Technical requirements:

- Must pass all tests
- Must be formatted with Prettier config settings
- Must NOT use any external libraries except for React and React DOM

#### Pull Request Description Template

```
## Description and purpose of change

## Related Issue(s) in GitHub

## Does this PR introduce any breaking changes to previous versions?

## Screenshots, GIFs, or videos of changes (required)
```

- Any pull requests that do not follow the above guidelines and description template will be closed.

## FAQ

- Importing `finallyreact/main.css` in my NextJS _app.js file isn't working
  - Try importing it in the app.scss file instead, with `@import '~finallyreact/main.css';`

