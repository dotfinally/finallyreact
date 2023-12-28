# .finally(React)

### 단순함이 기능성을 만나는 곳

[![npm](https://img.shields.io/npm/v/finallyreact.svg?color=005711)](https://www.npmjs.com/package/finallyreact)
[![en](https://img.shields.io/badge/lang-English-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/README.md)
[![ja](https://img.shields.io/badge/lang-Japanese-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.ja.md)
[![es](https://img.shields.io/badge/lang-Spanish-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.es.md)
[![zh-CN](https://img.shields.io/badge/lang-Simplified--Chinese-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.zh-CN.md)

FinallyReact는 유연성과 사용성을 염두에 두고 만들어진 React 디자인 라이브러리입니다.

- React 애플리케이션을 위한 완벽한 디자인 및 컴포넌트 라이브러리
- 어떤 컴포넌트의 기본 스타일도 쉽게 제거하여 자신의 브랜드 스타일로 꾸밀 수 있습니다
- 클래스명이 컴포넌트 스타일링보다 우선합니다
- 더 빠른 스타일링을 위한 종합적인 유틸리티 클래스 단축키 세트
- 접근성에 중점을 두고 테스트됨

**`FinallyReact는 현재 베타 버전(1.0 버전 이전)이며 아직 생산 사용에는 권장되지 않습니다`**

## 문서화

[FinallyReact 웹사이트](https://finallyreact.com)에서 모든 컴포넌트, 디자인 및 유틸리티 요소의 예시를 찾을 수 있습니다 (전적으로 FinallyReact로 구축됨).

## 프로젝트에서 사용하기

- `npm install finallyreact`
- 앱의 최상위 앱 파일에서 FinallyReact CSS를 가져오기:
  - `import 'finallyreact/main.css'`
- 필요에 따라 컴포넌트 가져오기, 예를 들어:
  - `import { Column, Row, Card } from 'finallyreact'`
- (선택 사항) 프로젝트의 루트에 설정 파일 생성 (아래 참조)
- (선택 사항) CSS 번들 크기를 줄이기 위해 PurgeCSS 사용 (아래 참조)

### 설정 (선택 사항)

전역 설정을 하려면 프로젝트의 루트에 `finally.config.js` 파일을 생성합니다.

아래에 사용 가능한 옵션과 기본값이 있습니다:

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

### PurgeCSS (선택 사항)

CSS 번들 크기를 줄이기 위해 PostCSS와 PurgeCSS를 사용할 수 있습니다. 아래는 PostCSS에 추가할 예제 설정입니다:

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

참고: PurgeCSS 내용에 `node_modules/finallyreact/index.js`가 포함되어 있는지 확인하세요. 앱이 모노레포에 있는 경우, 예를 들어 `../../node_modules/finallyreact/index.js`와 같이 node_module 경로를 사용하세요.

## 라이선스

저작권 © 2023 `dotfinally, LLC`

MIT 라이선스 하에 사용 가능하며, 이는 누구나 무료로 어떤 목적으로든 FinallyReact를 사용할 수 있음을 의미합니다. 라이선스의 전문은 저장소의 LICENSE.txt 파일에서 읽을 수 있습니다.

FinallyReact는 ReactJS 팀이나 Meta Platforms, Inc.와 제휴되거나 승인된 것이 아닙니다.

## 개발

컴퓨터에서 로컬로 FinallyReact를 실행하여 변경 사항을 만들거나 테스트하고 싶다면:

### 필수 조건

- NodeJS 18.16.1 이상
- NPM 9.7.2 이상
- React 16.8 이상

(이전 버전의 Node도 작동할 수 있지만 테스트되지 않았습니다)

### 설정

- `npm install`

### 빌드

- 루트에서 `npm run build`를 실행하여 컴파일된 파일이 포함된 lib 폴더 생성
- 로컬에서 다른 앱에서 변경 사항을 테스트하려면 생성된 lib 폴더 내에서 `npm run link`를 실행하고 외부 앱에서 `npm link finallyreact`를 실행
- 개발 중 변경 사항을 빌드하고 감시하기 위해 루트에서 `npm run build:watch`를 실행하세요 (처음에는 최소한 한 번 `npm run build`를 실행해야 합니다)

### 테스트

- `npm run test`

## 자주 묻는 질문 및 문제 해결

- FinallyReact 스타일을 포함한 후 프로젝트 빌드 크기가 너무 커졌습니다

  - CSS 번들 크기를 줄이기 위해 PurgeCSS를 사용해보세요 (위의 단계 참조)

- 내 NextJS의 \_app.js 파일에서 `finallyreact/main.css`를 가져오는 것이 스타일을 제대로 적용하지 않습니다

  - 별도의 .scss 파일에서 대신 가져와보세요, `@import '~finallyreact/main.css';`를 사용합니다

- 대부분의 컴포넌트 스타일이 SASS가 아닌 TS 파일에 직접 작성된 이유는 무엇입니까?
  - SASS/CSS에 모든 스타일을 갖는 가장 큰 문제는 사용자 정의 클래스로 그것들을 덮어쓰는 것입니다. 자신의 클래스를 사용할 때 다른 React 컴포넌트 라이브러리들을 사용자 정의하기 어려운 문제를 경험했을 수 있습니다. 이것은 정확하고 복잡한 CSS 구조를 찾기 위해 컴포넌트를 검사해야 하는 것을 의미합니다. FinallyReact는 이를 훨씬 쉽게 만듭니다! FinallyReact 유틸리티 클래스명을 사용할 때, 동일한 '그룹'의 모든 기본 스타일은 사용자의 오버라이드를 위해 제거됩니다. 그리고 그 위에, 어떤 컴포넌트에도 `simple` 속성을 설정하여 모든 기본 스타일을 제거할 수 있어, 자신의 스타일을 추가하기가 더
