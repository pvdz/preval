import Prettier from 'prettier';
import { printer } from '../lib/printer.mjs';
import walk from '../lib/walk.mjs';

import { VERBOSE_TRACING, setVerboseTracing, YELLOW, ORANGE_DIM, PURPLE, RESET, DIM } from './constants.mjs';

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
    ASSERT_LOG('ASSERTION ARGS:');
    let n = m || '<assertion without desc>';
    ASSERT_LOG(...(rest.length ? rest : ['<assert had no further args>']));

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

// Certain things need to be loggable regardless
export const ASSERT_LOG = console.log;

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

export function before(node, parentNode, returnOnly) {
  if (VERBOSE_TRACING) {
    if (Array.isArray(node)) {
      return node.map((n, i) => before(n, i ? undefined : parentNode, returnOnly)).join('\n');
    }

    const anon = node.type.includes('Function') && 'id' in node && !node.id;
    if (anon) node.id = { type: 'Identifier', name: 'anon' };

    const parentCode =
      parentNode &&
      (Array.isArray(parentNode)
        ? '\n  ' + parentNode.map((node) => (typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' '))).join('\n  ')
        : typeof node === 'string'
        ? node
        : tmat(parentNode).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');

    let output = YELLOW + 'Before: ' + RESET + nodeCode;

    if (parentNode && parentCode !== nodeCode) {
      output = DIM + 'Parent: ' + parentCode + RESET + '\n' + output;
    }
    if (anon) node.id = null;

    if (returnOnly) return output;
    log(output);
  }
  return '';
}

export function source(node, force, callCount = 0) {
  if (VERBOSE_TRACING || force) {
    if (Array.isArray(node)) node.forEach((n) => source(n, force, callCount++));
    else {
      const anon = node.type?.includes('Function') && 'id' in node && node.id === null;
      if (anon) node.id = { type: 'Identifier', name: '$anon$' };
      let code = tmat(node, force);
      try {
        code = fmat(code, force); // May fail.
      } catch {}
      if (code.includes('\n')) {
        if (callCount === 0) log(ORANGE_DIM + 'Source:' + RESET);
        group();
        log(DIM + code + RESET);
        groupEnd();
      } else {
        if (callCount === 0) {
          // Print the Source thing only for the first line
          log(ORANGE_DIM + 'Source:' + RESET, DIM + code + RESET);
        } else {
          log(DIM + code + RESET);
        }
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
      const parentCode =
        parentNode &&
        (Array.isArray(parentNode)
          ? parentNode.map((node) => (typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' '))).join('\n')
          : typeof node === 'string'
          ? node
          : tmat(parentNode).replace(/\n/g, ' '));

      const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
      log(YELLOW + 'After :' + RESET, nodeCode);
      if (parentNode && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
      if (anon) node.id = null;
    }
  }
}

export function assertNoDupeNodes(node, prop, force = false) {
  if (!force && !VERBOSE_TRACING) return; // Disable this for large inputs but keep it for tests
  // Assert AST contains no duplicate node objects
  const refset = new Set();
  const map = new Map();
  walk(
    (node, down, type, path) => {
      if (!node || !node.$p) return;
      if (down) {
        if (map.has(node.$p.pid)) {
          ASSERT(refset.has(node), 'et tu? make sure ids are not re-used and then trigger this');
          console.log('(assertion triggered; debug data commented out)');
          //console.dir(node, { depth: null });
          //console.log('previous parent:', map.get(node.$p.pid));
          //console.log('current  parent:', path.nodes[path.nodes.length - 2]);
          //console.log('truncated node:', node);
          ASSERT(
            false,
            'every node should appear once in the ast. if this triggers then there is a transform that is injecting the same node twice',
            node,
          );
        }
        map.set(node.$p.pid, path.nodes[path.nodes.length - 2]);
        refset.add(node);
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
  // This can also be called on non-function body blocks. In that case it will loop through all elements and return -1.
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

export function toPrimitive(x, prefer) {
  ASSERT(prefer === 'string' || prefer === 'number', 'hint not optional and enum');
  // This should implement the spec ToPrimitive logic. Including Symbol.toPrimitive check.
  // https://tc39.es/ecma262/#sec-toprimitive

  if (!x) return x; // undefined, null, false
  if (typeof x === 'number' || typeof x === 'string' || x === true) return x;

  // Must be objecty type now
  const stp = x[Symbol.toPrimitive];
  if (stp != null) {
    // If the value is not nullish then it must be callable or JS will throw an error. So we assume this too.
    const v = stp.call(x, prefer ? 'string' : 'number');
    if (!v || typeof v === 'number' || typeof v === 'string' || v === true) return v;
  } else if (prefer === 'number') {
    // Try to do what JS does. Rely on the caller to know the difference between binary `+` and unary `+`, for example (hint).
    const ts = x.toString;
    if (typeof ts === 'function') {
      const v = ts.call(x);
      if (!v || typeof v === 'number' || typeof v === 'string' || v === true) return v;
    }
    const vo = x.valueOf;
    if (typeof vo === 'function') {
      const v = vo.call(x);
      if (!v || typeof v === 'number' || typeof v === 'string' || v === true) return v;
    }
  } else if (prefer === 'string') {
    const vo = x.valueOf;
    if (typeof vo === 'function') {
      const v = vo.call(x);
      if (!v || typeof v === 'number' || typeof v === 'string' || v === true) return v;
    }
    const ts = x.toString;
    if (typeof ts === 'function') {
      const v = ts.call(x);
      if (!v || typeof v === 'number' || typeof v === 'string' || v === true) return v;
    }
  } else {
    throw new Error('missing preference');
  }
  throw new Error('Preval: value was not coercible');
}
export function coerce(v, kind) {
  if (kind === 'string') {
    return String(v);
  } else if (kind === 'plustr') {
    return '' + v; // This is neither `String(v)` nor `String(Number(v))`. This is `String(ToPrimitive(v))`
  } else if (kind === 'number') {
    return Number(v);
  } else {
    ASSERT(false);
  }
}

export function isSameNodeByPrintingExpensive(A, B) {
  // We could try to prettier it but the same node should really just print the same so I don't think we need to
  return tmat(A, true) === tmat(B, true);
}
