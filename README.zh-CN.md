# .finally(React)

### 简洁与功能的完美结合

[![npm](https://img.shields.io/npm/v/finallyreact.svg?color=005711)](https://www.npmjs.com/package/finallyreact) [![English](https://img.shields.io/badge/lang-english-red.svg?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/README.md)

FinallyReact 是一个以灵活性和可用性为核心的 React 设计库。

- 为您的 React 应用程序提供完整的设计和组件库
- 轻松移除任何组件上的默认样式，以便您用您自己的品牌进行样式设计
- 您的类名优先于组件样式
- 一整套全面的实用类快捷方式，用于更快的样式设计
- 专注并进行无障碍测试

**`FinallyReact 目前处于 beta（预发布 1 版本）状态，尚不推荐用于生产环境`**

## 文档

您可以在 [FinallyReact 网站](https://finallyreact.com/zh) 上找到所有组件、设计和实用元素的示例（该网站完全由 FinallyReact 构建）。

## 在您的项目中使用

- `npm install finallyreact`
- 在您的应用程序中导入 FinallyReact CSS，最可能在顶级应用文件中：
  - `import 'finallyreact/main.css'`
- 根据需要导入组件，例如：
  - `import { Column, Row, Card } from 'finallyreact'`
- （可选）在您的项目根目录中创建一个配置文件（见下文）
- （可选）使用 PurgeCSS 来减小 CSS 包的大小（见下文）

### 配置（可选）

要设置全局设置，请在项目的根目录中创建一个 `finally.config.js` 文件。

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

要减小 CSS 包的大小，您可以使用 PostCSS 和 PurgeCSS。以下是要添加到 PostCSS 的示例配置：

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

注意：确保您的 purgecss 内容包括 `node_modules/finallyreact/index.js`。如果您的应用程序位于一个单体应用中，使用您的路径到 node_module，例如：`../../node_modules/finallyreact/index.js`

## 许可证

版权所有 © 2023 `dotfinally, LLC`

根据 MIT 许可证提供，这意味着任何人都可以免费使用 FinallyReact，用于任何目的。在 repo 中的 LICENSE.txt 文件中阅读完整的许可证文本。

FinallyReact 与 ReactJS 团队或 Meta Platforms, Inc. 没有任何关联或认可。

## 开发

如果您想在本地计算机上运行 FinallyReact 以进行或测试更改：

### 先决条件

- NodeJS 18.16.1 或更高版本
- NPM 9.7.2 或更高版本
- React 16.8 或更高版本

（更早版本的 Node 可能可以工作，但没有经过测试）

### 设置

- `npm install`

### 构建

- 从根目录运行 `npm run build` 以创建包含编译文件的 lib 文件夹
- 要在另一个应用程序中本地测试更改，请在创建的 lib 文件夹内运行 `npm run link`，然后在外部应用程序中运行 `npm link finallyreact`
- 从根目录运行 `npm run build:watch` 以构建并在开发时观察更改（确保首先至少运行一次 `npm run build`）

### 测试

- `npm run test`

## 贡献

任何人都可以查看源代码、贡献新代码、提出改进建议、请求新功能或报告问题。如果您发现问题或有新功能的想法，请在 [GitHub](https://github.com/dotfinally/finallyreact) 上创建一个 Issue。

### 问题

FinallyReact 是由一个非常小的团队管理的。为了使他们的生活更轻松，请遵循以下准则为每个创建的 GitHub Issue：

- 在创建新的 Issue 之前搜索现有的 Issue
- 使用清晰和描述性的标题来识别问题
- 尽可能详细地描述复现问题的确切步骤

#### Issue 模板

```
## 缺陷或功能请求的描述

## 预期行为

（如果是缺陷）：
## 实际行为

## 复现步骤

## 您的环境（操作系统，浏览器，Node 版本等）

（如果是功能请求）：
## 您会自己实现这个功能吗？（以避免多人重复工作）

```

- 任何不遵循上述准则和模板的问题都将被关闭。

### 拉取请求

拉取请求必须遵循以下准则：

- 从 `dev` 分支为您的更改创建一个新分支
- 将您的 PR 指向 `dev`
- 为拉取请求使用清晰和描述性的标题
- 提供与任何相关 GitHub Issues 的链接
- 描述为什么这个拉取请求是必要的 - 它解决了什么问题？
- 在拉取请求中包括截图、GIF 或视频，以说明任何 UI/UX 的更改（必需）
- 通过创建拉取请求，您承认您具有提交其代码的完全权限，并根据 MIT 许可证这样做

技术要求：

- 必须通过所有测试
- 不得使用除 React 和 React DOM 以外的任何外部库
- 必须使用 Prettier 配置设置进行格式化

#### 拉取请求描述模板

```
## 描述和更改目的

## GitHub 中的相关问题

## 此 PR 是否对以前版本造成任何破坏性更改？

## 更改的截图、GIF 或视频（必需）
```

- 任何不遵循上述准则和描述模板的拉取请求将被关闭。

## 常见问题和故障排除

- 在包括 FinallyReact 样式后，我的项目的构建大小过大

  - 尝试使用 PurgeCSS 来减小 CSS 包的大小（参见上面的步骤）

- 在我的 NextJS 的 \_app.js 文件中导入 `finallyreact/main.css` 样式没有正确应用

  - 尝试在单独的 .scss 文件中导入它，使用 `@import '~finallyreact/main.css';`

- 为什么大多数组件样式是在 TS 文件中编写的，而不是直接在 SASS 中？
  - 所有样式都在 SASS/CSS 中的最大问题是使用自定义类来覆盖它们。您可能已经遇到了使用其他 React 组件库的问题，如果使用您自己的类，它们很难自定义。这通常导致检查组件以找到要定位的确切、复杂的 CSS 结构。FinallyReact 让这一切变得更容易！当您使用 FinallyReact 实用程序类名时，同一“组”中的任何默认样式都将被您的覆盖所取代。此外，您可以为任何组件设置 `simple` 属性以删除所有默认样式，从而更容易添加您自己的样式。