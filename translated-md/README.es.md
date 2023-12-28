# .finally(React)

### Donde la simplicidad se encuentra con la funcionalidad

[![npm](https://img.shields.io/npm/v/finallyreact.svg?color=005711)](https://www.npmjs.com/package/finallyreact)
[![en](https://img.shields.io/badge/lang-English-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/README.md)
[![ja](https://img.shields.io/badge/lang-Japanese-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.ja.md)
[![ko](https://img.shields.io/badge/lang-Korean-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.ko.md)
[![zh-CN](https://img.shields.io/badge/lang-Simplified--Chinese-green?color=1a5296)](https://github.com/dotfinally/finallyreact/blob/main/translated-md/README.zh-CN.md)

FinallyReact es una biblioteca de diseño para React creada con flexibilidad y usabilidad en mente.

- Una biblioteca completa de diseño y componentes para tu aplicación React
- Elimina fácilmente los estilos predeterminados en cualquier componente para que puedas personalizarlo con tu propia marca
- Tus nombres de clase tienen prioridad sobre el estilo del componente
- Un conjunto completo de atajos de clases de utilidad para un estilo más rápido
- Enfoque y pruebas en accesibilidad

## Documentación

Puedes encontrar ejemplos de todos los componentes, diseños y elementos de utilidad en el [sitio web de FinallyReact](https://finallyreact.com) (construido enteramente con FinallyReact).

## Para usar en tu proyecto

- `npm install finallyreact`
- Importa el CSS de FinallyReact en tu aplicación, probablemente en un archivo de aplicación de nivel superior:
  - `import 'finallyreact/main.css'`
- Importa los componentes según sea necesario, por ejemplo:
  - `import { Column, Row, Card } from 'finallyreact'`
- (opcional) crea un archivo de configuración en la raíz de tu proyecto (ver abajo)
- (opcional) usa PurgeCSS para reducir el tamaño del paquete de CSS (ver abajo)

### Configuración (opcional)

Para configurar ajustes globales, crea un archivo `finally.config.js` en la raíz de tu proyecto.

A continuación, se muestran las opciones disponibles, con valores predeterminados:

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

### PurgeCSS (opcional)

Para reducir el tamaño del paquete de CSS, puedes usar PostCSS y PurgeCSS. A continuación se muestra un ejemplo de configuración para añadir a PostCSS:

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

Nota: Asegúrate de que tu contenido de purgecss incluya `node_modules/finallyreact/index.js`. Si tu aplicación está en un monorepo, utiliza tu ruta a node_module, por ejemplo: `../../node_modules/finallyreact/index.js`

## Licencia

Derechos de autor © 2023 `dotfinally, LLC`

Disponible bajo la licencia MIT, lo que significa que cualquiera puede usar FinallyReact de forma gratuita, para cualquier propósito. Lee el texto completo de la licencia en el archivo LICENSE.txt en el repositorio.

FinallyReact no está afiliado ni respaldado por el equipo de ReactJS ni por Meta Platforms, Inc.

## Desarrollo

Si deseas ejecutar FinallyReact localmente en tu computadora para hacer o probar cambios:

### Prerrequisitos

- NodeJS 18.16.1 o superior
- NPM 9.7.2 o superior
- React 16.8 o superior

(las versiones anteriores de Node podrían funcionar pero no están probadas)

### Configuración

- `npm install`

### Construcción

- `npm run build` desde la raíz para crear una carpeta lib con archivos compilados
- Para probar cambios en otra aplicación localmente, ejecuta `npm run link` dentro de la carpeta lib creada y `npm link finallyreact` en la aplicación externa
- `npm run build:watch` desde la raíz para construir y observar los cambios mientras desarrollas (asegúrate de ejecutar `npm run build` al menos una vez primero)

### Pruebas

- `npm run test`

## Preguntas Frecuentes y Solución de Problemas

- El tamaño de construcción de mi proyecto es demasiado grande después de incluir los estilos de FinallyReact

  - Intenta usar PurgeCSS para reducir el tamaño del paquete de CSS (ver pasos arriba)

- Importar `finallyreact/main.css` en mi archivo \_app.js de NextJS no está aplicando los estilos correctamente

  - Intenta importarlo en un archivo .scss separado, con `@import '~finallyreact/main.css';`

- ¿Por qué la mayoría de los estilos de los componentes están escritos en archivos TS en lugar de directamente en SASS?
  - El mayor problema de tener todos los estilos en SASS/CSS es sobrescribirlos con clases personalizadas. Es posible que hayas experimentado este problema con muchas otras bibliotecas de componentes React, que son difíciles de personalizar si usas tus propias clases. Esto a menudo lleva a inspeccionar el componente para encontrar la estructura CSS exacta y complicada a la que apuntar. ¡FinallyReact hace esto mucho más fácil! Cuando usas los nombres de clase de utilidad de FinallyReact, cualquier estilo predeterminado en el mismo 'grupo' se eliminará en favor de tus sobrescrituras. Y además de eso, puedes establecer la propiedad `simple` para cualquier componente para eliminar todos los estilos predeterminados, facilitando aún más la adición de tus propios estilos.
