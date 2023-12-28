# .finally(React)

### 简约与功能性的完美结合

[![npm](https://img.shields.io/npm/v/finallyreact.svg?color=005711)](https://www.npmjs.com/package/finallyreact)
[![en](https://img.shields.io/badge/lang-English-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/README.md)
[![ja](https://img.shields.io/badge/lang-Japanese-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.ja.md)
[![es](https://img.shields.io/badge/lang-Spanish-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.es.md)
[![ko](https://img.shields.io/badge/lang-Korean-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.ko.md)

FinallyReact是一个以灵活性和可用性为理念创建的React设计库。

- 为您的React应用程序提供全面的设计和组件库
- 轻松移除任何组件的默认样式，让您可以用自己的品牌风格进行设计
- 您的类名优先于组件样式
- 提供全面的实用类快捷方式集，加快样式设计速度
- 专注于可访问性并经过测试

**`FinallyReact目前处于测试版（1.0版本之前）阶段，暂不建议用于生产环境`**

## 文档

您可以在[FinallyReact网站](https://finallyreact.com)上找到所有组件、设计和实用工具元素的示例（完全使用FinallyReact构建）。

## 在您的项目中使用

- `npm install finallyreact`
- 在您的应用程序中导入FinallyReact CSS，通常在顶级应用文件中：
  - `import 'finallyreact/main.css'`
- 根据需要导入组件，例如：
  - `import { Column, Row, Card } from 'finallyreact'`
- （可选）在项目的根目录创建配置文件（见下文）
- （可选）使用PurgeCSS来减少CSS包的大小（见下文）

### 配置（可选）

要设置全局设置，请在项目根目录创建一个`finally.config.js`文件。

以下是可用选项及其默认值：

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

### PurgeCSS（可选）

为了减小CSS包的大小，您可以使用PostCSS和PurgeCSS。以下是添加到PostCSS的示例配置：

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

注意：确保您的purgecss内容包括`node_modules/finallyreact/index.js`。如果您的应用位于monorepo中，请使用指向node_modules的路径，例如：`../../node_modules/finallyreact/index.js`

## 许可证

版权所有 © 2023 `dotfinally, LLC`

根据MIT许可证提供，这意味着任何人都可以免费使用FinallyReact，用于任何目的。在仓库中的LICENSE.txt文件中阅读完整的许可证文本。

FinallyReact与ReactJS团队或Meta Platforms, Inc没有关联，也未获得认可。

## 开发

如果您想在本地计算机上运行FinallyReact以进行更改或测试：

### 先决条件

- NodeJS 18.16.1或更高版本
- NPM 9.7.2或更高版本
- React 16.8或更高版本

（旧版本的Node可能工作但未经测试）

### 设置

- `npm install`

### 构建

- 从根目录运行`npm run build`以创建包含编译文件的lib文件夹
- 要在另一个应用程序中本地测试更改，请在创建的lib文件夹内运行`npm run link`并在外部应用程序中运行`npm link finallyreact`
- 从根目录运行`npm run build:watch`以在开发时构建并监视更改（确保至少首次运行`npm run build`）

### 测试

- `npm run test`

## 常见问题解答和故障排除

- 在包含FinallyReact样式后，我的项目构建大小太大

  - 尝试使用PurgeCSS来减少CSS包的大小（见上面的步骤）

- 在我的NextJS \_app.js文件中导入`finallyreact/main.css`后，样式没有正确应用

  - 尝试改为在一个单独的.scss文件中导入，使用`@import '~finallyreact/main.css';`

- 为什么大多数组件样式是在TS文件中编写的，而不是直接在SASS中？
  - 在SASS/CSS中拥有所有样式的最大问题是用自定义类覆盖它们。您可能在许多其他React组件库中遇到过这个问题，如果您使用自己的类，它们很难自定义。这通常导致需要检查组件以找到精确的、复杂的CSS结构进行定位。FinallyReact使这一过程变得更加容易！当您使用FinallyReact实用类名时，同一“组”的任何默认样式都将被移除，以支持您的覆盖。而且，您可以为任何组件设置`simple`属性来移除所有默认样式，使添加您自己的样式更加容易。
