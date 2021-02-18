import Prettier from 'prettier';
import { printer } from '../lib/printer.mjs';

const colorLess = typeof process !== 'undefined' && process.argv.includes('-C');

export const RED = colorLess ? '' : '\x1b[31;1m';
export const RED_WHITE = colorLess ? '' : '\x1b[41;1m';
export const GREEN = colorLess ? '' : '\x1b[32m';
export const YELLOW = colorLess ? '' : '\x1b[33;1m';
export const BLUE = colorLess ? '' : '\x1b[34;1m';
export const PURPLE = colorLess ? '' : '\x1b[35;1m';
export const WHITE = colorLess ? '' : '\x1b[37m';
export const RESET = colorLess ? '' : '\x1b[0m';
export const DIM = colorLess ? '' : '\x1b[30;1m';
export const BOLD = colorLess ? '' : '\x1b[;1;1m';
export const TRIBE = colorLess ? '' : '\x1b[36;1m';
export const WHITE_BLACK = colorLess ? '' : '\x1b[30;47m';

export function ASSERT(b, m = '', ...rest) {
  if (!b) {
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);

    error('Assertion error happened...');
    log('ASSERTION ARGS:');
    let n = m || '<assertion without desc>';
    log(...(rest.length ? rest : ['<assert had no further args>']));

    if (log !== console.log && typeof window !== 'undefined') {
      console.error('Assertion error happened...');
      console.log('ASSERTION ARGS:');
      console.log(...(rest.length ? rest : ['<assert had no further args>']));
    }
    console.trace(n + '; ' + rest.join(', '));
    throw new Error(n);
  }
}
export function ASSERT_LOC(loc) {
  ASSERT(typeof loc === 'object' && loc, 'loc should be an object', loc);
  ASSERT(typeof loc.filename === 'string', 'loc filename must be a string', loc);
  ASSERT(typeof loc.column === 'number' && loc.column >= 0, 'loc filename must be a number >=0', loc);
  ASSERT(typeof loc.line === 'number' && loc.line >= 1, 'loc filename must be a number >0', loc);
}

export function printNode(node) {
  ASSERT(node);
  ASSERT(node.type);
  switch (node.type) {
    case 'Identifier':
      return `<<${node.name}>>`;
    case 'Literal':
      return `<${node.raw}>`;
    case 'MemberExpression':
      return `${printNode(node.object)}.${printNode(node.property)}`;
    case 'CallExpression':
      return `${printNode(node.callee)}(${node.arguments.map(printNode).join(', ')})`;
    case 'FunctionDeclaration':
    case 'FunctionExpression':
      return `function${node.id ? ' ' + printNode(node.id) : ''}(${node.params.map(printNode).join(', ')})`;
    case 'ThisExpression':
      return 'this';
    case 'Super':
      return 'super';
    case 'AssignmentPattern':
      ASSERT(node.left.type === 'Identifier', 'todo, fixme if this is different');
      return printNode(node.left) + '=' + printNode(node.right);
    case 'NewExpression':
      return 'new ' + printNode(node.callee) + '(' + node.arguments.map(printNode).join(', ') + ')';
    default:
      return `<???${node.type}>`;
  }
  // return `${t}${path.nodes[i].name ? '<' + path.nodes[i].name + '>' : ''}${t === 'Literal' ? '<' + path.nodes[i].raw + '>' : ''}${path.props[i+1] && `[${path.props[i+1]}]` || ''}`
}

let VERBOSE = true;

const Console = {
  log: (...args) => console.log(...args),
  error: (...args) => console.error(...args),
  group: (...args) => console.group(...args),
  groupEnd: (...args) => console.groupEnd(...args),
  dir: (...args) => console.dir(...args),
};

export function setStdio(handler, verbose = VERBOSE) {
  VERBOSE = verbose;
  Console.log = (...args) => handler('L', ...args);
  Console.error = (...args) => handler('E', ...args);
  Console.group = (...args) => handler('G', ...args);
  Console.groupEnd = (...args) => handler('F', ...args);
  Console.dir = (...args) => handler('D', ...args);
}

export function clearStdio() {
  VERBOSE = true;
  Console.log = (...args) => console.log(...args);
  Console.error = (...args) => console.log(...args);
  Console.group = (...args) => console.group(...args);
  Console.groupEnd = (...args) => console.groupEnd(...args);
  Console.dir = (...args) => console.dir(...args);
}

let indent = 0;
export function log(...args) {
  if (VERBOSE) return Console.log(...args);
}
export function error(...args) {
  if (VERBOSE) return Console.error(...args);
}
export function group(...args) {
  ++indent;
  if (VERBOSE) return Console.group(...args);
}
export function groupEnd(...args) {
  --indent;
  if (VERBOSE) return Console.groupEnd(...args);
}
export function dir(...args) {
  if (VERBOSE) return Console.dir(...args);
}

// Debugging
export function tmat(ast, shouldPrint = VERBOSE) {
  if (shouldPrint) return printer(ast);
  return '<verbose=false>';
}
export function fmat(code, shouldPrint = VERBOSE) {
  if (!shouldPrint) return '<verbose=false>';
  try {
    return Prettier.format(code, {
      parser: 'babel',
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
      },
    }).trim();
  } catch (e) {
    // Prettier error implies invalid transformation. Uups.
    throw new Error('Prettier error. Implies the resulting transform is invalid.\n' + e);
  }
}
