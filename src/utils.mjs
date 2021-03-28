import Prettier from 'prettier';
import { printer } from '../lib/printer.mjs';
import walk from '../lib/walk.mjs';

import { VERBOSE_TRACING, setVerboseTracing, YELLOW, PURPLE, RESET, DIM } from './constants.mjs';

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

    setVerboseTracing(true);

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

export function vlog(...args) {
  if (VERBOSE_TRACING) log(...args);
}
export function vgroup(...args) {
  if (VERBOSE_TRACING) group(...args);
}
export function vgroupEnd(...args) {
  if (VERBOSE_TRACING) groupEnd(...args);
}

// Debugging
export function tmat(ast, shouldPrint = VERBOSE_TRACING) {
  if (shouldPrint) return printer(ast);
  return '<verbose=false>';
}
export function fmat(code, shouldPrint = VERBOSE_TRACING) {
  if (!shouldPrint) return code; // '<verbose=false>';
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

export function rule(desc, ...rest) {
  log(PURPLE + 'Rule:' + RESET + ' "' + desc + '"', ...rest);
}

export function example(from, to, condition) {
  if (VERBOSE_TRACING) {
    if (!condition || condition()) {
      log(PURPLE + '--' + RESET + ' `' + from + '` ' + PURPLE + '-->' + RESET + ' `' + to + '`');
    }
  }
}

export function before(node, parent) {
  if (VERBOSE_TRACING) {
    if (Array.isArray(node)) node.forEach((n) => before(n, parent));
    else {
      const anon = node.type.includes('Function') && 'id' in node && !node.id;
      if (anon) node.id = { type: 'Identifier', name: 'anon' };
      const parentCode = parent && (typeof node === 'string' ? node : tmat(parent).replace(/\n/g, ' '));
      const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
      if (parent && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
      log(YELLOW + 'Before:' + RESET, nodeCode);
      if (anon) node.id = null;
    }
  }
}

export function source(node, force) {
  if (VERBOSE_TRACING || force) {
    if (Array.isArray(node)) node.forEach((n) => source(n));
    else {
      const anon = node.type?.includes('Function') && 'id' in node && node.id === null;
      if (anon) node.id = { type: 'Identifier', name: '$anon$' };
      let code = tmat(node, force);
      try {
        code = fmat(code, force); // May fail.
      } catch {}
      if (code.includes('\n')) {
        log(YELLOW + 'Source:' + RESET);
        group();
        log(code);
        groupEnd();
      } else {
        log(YELLOW + 'Source:' + RESET, code);
      }
      if (anon) node.id = null;
    }
  }
}

export function after(node, parentNode) {
  if (VERBOSE_TRACING) {
    if (Array.isArray(node)) node.forEach((n) => after(n, parentNode));
    else {
      const anon = node.type?.includes('Function') && 'id' in node && !node.id;
      if (anon) node.id = { type: 'Identifier', name: 'anon' };
      const parentCode = parentNode && (typeof node === 'string' ? node : tmat(parentNode).replace(/\n/g, ' '));
      const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
      log(YELLOW + 'After :' + RESET, nodeCode);
      if (parentNode && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
      if (anon) node.id = null;
    }
  }
}

export function assertNoDupeNodes(node, prop) {
  // Assert AST contains no duplicate node objects
  const map = new Map();
  walk(
    (node, down, type, path) => {
      if (!node || !node.$p) return;
      if (down) {
        if (map.has(node.$p.pid)) {
          console.dir(node, { depth: null });
          console.log('previous parent:', map.get(node.$p.pid));
          console.log('current  parent:', path.nodes[path.nodes.length - 2]);
          console.log('truncated node:', node);
          ASSERT(
            false,
            'every node should appear once in the ast. if this triggers then there is a transform that is injecting the same node twice',
            node,
          );
        }
        map.set(node.$p.pid, path.nodes[path.nodes.length - 2]);
      }
    },
    node,
    prop,
  );
}

export function findBodyOffset(funcNode) {
  // Find the first debugger statement in a function. It serves as our header boundary.
  // The header should contain, at most, one entry per param and two to alias `this` and `arguments`
  // So we start from there and walk backwards
  const body = funcNode.body.body;
  const offset = Math.min(funcNode.params.length + 2, body.length - 1);
  for (let i = offset; i >= 0; --i) {
    if (body[i].type === 'DebuggerStatement') {
      return i + 1;
    }
  }
  for (let i = offset; i < body.length; ++i) {
    if (body[i].type === 'DebuggerStatement') {
      return i + 1;
    }
  }
  console.log('Node:');
  console.log(funcNode);
  console.log('Started search at', offset, ', param count:', funcNode.params.length, ', body len:', body.length);
  ASSERT(false, 'findBodyOffset; the debugger statement should appear exactly once');
}

export function findBodyOffsetExpensiveMaybe(body) {
  // It's expensive because this is called when we don't have access to the params and have to scan from the start
  // Should not be a big deal for real world code tbh, as most functions won't have that many params anyways.
  for (let i = 0; i < body.length; ++i) {
    if (body[i].type === 'DebuggerStatement') {
      return i + 1;
    }
  }
  return -1;
}
export function findBodyOffsetExpensive(body) {
  const r = findBodyOffsetExpensiveMaybe(body);
  if (r >= 0) return r;
  ASSERT(false, 'findBodyOffset; the debugger statement should appear exactly once');
}
