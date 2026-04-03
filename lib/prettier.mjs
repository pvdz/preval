// Prettier 3 (async):
//
// import prettier from './prettier3/prettier_3_8_1_standalone.mjs'
// import parserBabel from './prettier3/prettier_3_8_1_babel.mjs'
// import parserEstree from './prettier3/prettier_3_8_1_estree.mjs'
// export default const prettier => await prettier.format(code, {
//   parser: 'babel',
//   plugins: [parserBabel, parserEstree],
//   ...{
//       // maybe keep in sync with prettierrc? prolly fairly immutable and irrelevant for tests anyways...
//       printWidth: 140,
//       tabWidth: 2,
//       useTabs: false,
//       semi: true,
//       singleQuote: true,
//       quoteProps: 'as-needed',
//       trailingComma: 'all',
//       bracketSpacing: true,
//       arrowParens: 'always',
//       endOfLine: 'lf',
//     }
// })

// Prettier 2 (sync, slightly older):
//
import standalone from './prettier2/pretter_2_8_8_standalone.mjs';
import babel from './prettier2/prettier_2_8_8_parser-babel.mjs';
export default (code) => standalone.format(code, {
  parser: 'babel',
  plugins: [babel],
  ...{
    // maybe keep in sync with prettierrc? prolly fairly immutable and irrelevant for tests anyways...
    printWidth: 140,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',
  }
});

// export prettier from './prettier_old/bundle.mjs
