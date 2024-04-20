const plugins = {
  autoprefixer: {}
};

if (process.env.NODE_ENV === 'production') {
  plugins['@fullhuman/postcss-purgecss'] = {
    content: [
      './**/*.js',
      './**/*.jsx',
      './**/*.ts',
      './**/*.tsx',
      './**/*.html',
      '../../node_modules/finallyreact/index.js',
      '../../libs/ui/src/**/*.ts',
      '../../libs/ui/src/**/*.tsx',
      '../../libs/ui/src/**/*.js',
      '../../libs/ui/src/**/*.jsx'
    ],
    safelist: [
      /lava/,
      /apple/,
      /ruby/,
      /red/,
      /flamingo/,
      /lotus/,
      /sakura/,
      /pink/,
      /monarch/,
      /pumpkin/,
      /carrot/,
      /orange/,
      /calico/,
      /desert/,
      /coffee/,
      /brown/,
      /sun/,
      /banana/,
      /corn/,
      /yellow/,
      /leaf/,
      /emerald/,
      /frog/,
      /green/,
      /ocean/,
      /sky/,
      /blue/,
      /grape/,
      /lavender/,
      /violet/,
      /purple/,
      /fog/,
      /stone/,
      /cloud/,
      /gray/,
      /black/,
      /white/,
      /transparent/
    ],
    defaultExtractor: (content) => {
      const matches = content.match(/[\w-/:]+(?<!:)/g) || [];
      return matches.concat(matches.map((match) => match.replace(/\//g, '\\/')));
    }
  };
}

module.exports = {
  plugins: plugins
};
