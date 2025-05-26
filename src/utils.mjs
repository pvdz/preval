import Prettier from '../lib/prettier.mjs';
import { printer, setPrintPids, setPrintVarTyping } from '../lib/printer.mjs';
import walk from '../lib/walk.mjs';

import { VERBOSE_TRACING, setVerboseTracing, YELLOW, ORANGE_DIM, PURPLE, RESET, DIM, ORANGE, GREEN, BLUE } from './constants.mjs';
import { SYMBOL_MAX_LOOP_UNROLL } from './symbols_preval.mjs';

/**
 * Allow the use of risky rules? These are rules that are not completely sound but should be okay in normal environments.
 * This includes TDZ related rules. On by default. Disabling this may lead to suboptimal results.
 *
 * - Will remove identifier statements even if they might trigger TDZ/implicitGlobal errors (normalize.mjs). Will not try to verify (because that's inherently unsound anyway or too limiting to be useful)
 * - Assume `console` is a global built-in exposed by the env.
 * - Bunch of JSF*CK specific rules that assume default state of built-ins, which is not tracked (property_lookup.mjs).
 *
 * @type {boolean}
 */
export let ALLOW_RISKY_RULES = false;
export function setRiskyRules(bool) {
  ALLOW_RISKY_RULES = bool;
}
export function useRiskyRules() {
  return !!ALLOW_RISKY_RULES;
}

export const ENABLE_REF_TRACKING = true;

export let REF_TRACK_TRACING = false;
export function setRefTracing(bool) {
  REF_TRACK_TRACING = bool;
}

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
    let json;
    try { json = JSON.stringify(rest) } catch { json = '<circular obj>'; }
    throw new Error(`PREVAL ASSERT: ${n}; args: ${json}`);
  }
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
  // Note: --> see setVerboseTracing()
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
  ASSERT(args.length === 0, 'vgroup does not accept args');
  if (VERBOSE_TRACING) groupEnd(...args);
}

let todoSink;
export function registerTodoSink(func) {
  todoSink = func
}
export function todo(...args) {
  log(PURPLE + '[TODO]', ...args, RESET);
  if (todoSink) todoSink(...args);
}

// Debugging
export function tmat(ast, shouldPrint = VERBOSE_TRACING) {
  if (shouldPrint) return printer(ast);
  return '<verbose=false>';
}
export function fmat(code, shouldPrint = VERBOSE_TRACING, silentError = true, ignoreErrorInSilence = false) {
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
    if (!silentError) {
      console.error('prettier error:', e.message);
      console.log(code);
    }
    if (ignoreErrorInSilence) return code;
    return `// Prettier threw an error on this code. Implies the resulting transform is invalid (or not supported).\n//${e}\n${code}`;
  }
}

export function rule(desc, ...rest) {
  log(PURPLE + 'Rule:' + RESET + ' "' + desc + '"', ...rest);
}

export function riskyRule(desc, ...rest) {
  log(ORANGE + 'RiskyRule:' + RESET + ' "' + desc + '"', ...rest);
}

export function example(from, to, condition) {
  if (VERBOSE_TRACING) {
    if (!condition || typeof condition !== 'function' || condition()) {
      log(PURPLE + '--' + RESET + ' `' + from + '` ' + PURPLE + '-->' + RESET + ' `' + to + '`');
    }
  }
}

export function before(node, parentNode = undefined, returnOnly = false, force = false) {
  if (VERBOSE_TRACING || force) {
    if (Array.isArray(node)) {
      return node.map((n, i) => before(n, i ? undefined : parentNode, returnOnly)).join('\n');
    }
    ASSERT(node?.type, 'should receive a node...?', typeof node, node);

    const anon = node.type.includes('Function') && 'id' in node && !node.id;
    if (anon) node.id = { type: 'Identifier', name: 'anon' };

    const parentCode =
      parentNode &&
      (Array.isArray(parentNode)
        ? '\n  ' + parentNode.map((node) => (typeof node === 'string' ? node : tmat(node, true).replace(/\n/g, ' '))).join('\n  ')
        : typeof node === 'string'
        ? node
        : tmat(parentNode).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node, true).replace(/\n/g, ' ');

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

export function source(node, force = false, callCount = 0) {
  if (VERBOSE_TRACING || force) {
    if (Array.isArray(node)) node.forEach((n) => source(n, force, callCount++));
    else {
      const anon = node.type?.includes('Function') && 'id' in node && node.id === null;
      if (anon) node.id = { type: 'Identifier', name: '$anon$' };
      let code = tmat(node, force);
      try {
        code = fmat(code, force, true, true); // May fail.
      } catch {}
      if (code.includes('\n')) {
        if (callCount === 0) log(ORANGE_DIM + 'Source:' + RESET);
        group();
        log(DIM + code + RESET);
        groupEnd();
      } else {
        if (force === 'superforce') {
          log(ORANGE_DIM + 'Source:\n' + RESET + DIM + '| ' + code + RESET);
        } else if (callCount === 0) {
          // Print the Source thing only for the first line
          log(ORANGE_DIM + 'Source:\n' + RESET + DIM + '| ' + code + RESET);
        } else {
          log(DIM + '| ' + code + RESET);
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
          ? '\n  ' + parentNode.map((node) => (typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' '))).join('\n  ')
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

export function currentState(fdata, suffix, withTyping=false, fdataForTyping, force=false, withPids = false) {
  ASSERT((typeof fdata === 'object' && fdata) || typeof fdata === 'string', 'arg type bad', fdata);
  ASSERT(!withTyping || fdataForTyping, 'when requesting typing you have to set fdata as teh last arg but you didnt');
  //ASSERT(suffix !== undefined, 'give me something');
  if (VERBOSE_TRACING || force) {
    if (withTyping) setPrintVarTyping(true, fdataForTyping); // Handy typing details
    if (withPids) setPrintPids(true); // TODO: huh why is this ignored
    try {
      let code;
      try {
        if (typeof fdata === 'string') {
          code = fdata;
        }
        else {
          code = tmat(fdata.tenkoOutput.ast, true);
        }
        try {
          code = fmat(code, true);
        } catch (e) {
          //
          code = `// fmat failed (prettier failed on syntax?): ${e}\n` + code;
        }
      } catch (e) {
        console.log('tmat failed...');
        console.log(e);
        console.log(fdata?.tenkoOutput?.ast ?? fdata);
        console.log('tmat failed...');
        ASSERT(false, 'dont throw while tmat the ast', e);
      }
      console.log('\n'+PURPLE+'## Current state'+RESET+' '+suffix+'\n--------------\n' + code + '\n--------------\n');
    } catch (e) {
      console.log('*gasp* printing ast failed');
      console.log(e);
      console.log(fdata?.tenkoOutput?.ast ?? fdata);
      console.log('*gasp* printing ast failed');
      ASSERT(false, 'dont throw while printing the ast', e);
    }
    if (withTyping) setPrintVarTyping(false);
    if (withPids) setPrintPids(false);
  }
}

export function createOpenRefsState(globallyUniqueNamingRegistry) {
  const arr = [];
  let maxlen = 10;
  Array.from(globallyUniqueNamingRegistry.entries()).map(([name, meta]) => {
    if (meta.isImplicitGlobal || meta.isGlobal || meta.isBuiltin) return;
    arr.push(`${name}:`);
    // Note: meta.reOrder is created in phase2
    (meta.reads || []).concat(meta.writes || []).sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
      +a < +b ? -1 : +a > +b ? 1 : 0,
    ).forEach(rw => {
      maxlen = Math.max(maxlen, rw.node.name.length);
      arr.push([
          '  - ' + rw.action[0] + (' @' + rw.node.$p.pid).padEnd(maxlen - 2, ' ') + ' ',
          rw.action === 'read' ? (rw.reachesWrites.size ? ' | ' + Array.from(rw.reachesWrites).map(write => +write.node.$p.pid).sort((a,b)=>a-b) : ' | none (unreachable?)').padEnd(10, ' ') : ' | '.padEnd(13, '#'),
          rw.action === 'write' ? (rw.reachedByReads.size ? ' | ' + Array.from(rw.reachedByReads).map(read => +read.node.$p.pid).sort((a,b)=>a-b) : ' | not read').padEnd(14, ' ') : '',
          rw.action === 'write' ? (rw.reachesWrites.size ? ' | ' + Array.from(rw.reachesWrites).map(write => +write.node.$p.pid).sort((a,b)=>a-b) : ' | none').padEnd(17, ' ') : '',
          rw.action === 'write' ? (rw.reachedByWrites.size ? ' | ' + Array.from(rw.reachedByWrites).map(write => +write.node.$p.pid).sort((a,b)=>a-b) : ' | none') : '',
        ].filter(Boolean).join('').trimEnd()
      );
    });
    arr.push('');
  });
  arr.unshift('    ' + (' '.repeat(maxlen)) + ' | reads      | read by     | overWrites     | overwritten by');
  return arr.join('\n');
}

export function assertNoDupeNodes(rootNode, prop, force = false, ...desc) {
  if (!VERBOSE) return; // When silent=true it's more like running in prod mode, less about tests.
  if (!force && !VERBOSE_TRACING) return; // Disable this for large inputs but keep it for tests

  if (Array.isArray(rootNode)) rootNode = { type: 'BlockStatement', body: rootNode, specialNoDupeAssertionPlaceholder: true };

  // Assert AST contains no duplicate node objects
  const refset = new Set();
  const map = new Map();
  walk(
    (node, down, type, path) => {
      if (!node || !node.$p) return;
      if (down) {
        if (type === 'ArrayExpression') {
          ASSERT(node.elements.length === Object.keys(node.elements).length, 'the ast array elements should not have elided arrays, even if the source codes', node.elements);
        }
        if (map.has(node.$p.pid)) {

          console.log('\n\n')
          console.log('This is the AST printed with PIDs for easier debug. PID', +node.$p.pid, 'will appear at least twice here, which is bad');
          setPrintPids(true);
          console.log('`````Whole node\n' + fmat(tmat(rootNode, true)).trim() + '\n`````');
          console.log('\n\n')
          console.log('`````Bad node\n' + fmat(tmat(node, true)).trim() + '\n`````');
          setPrintPids(false);
          console.log('\n\n')

          //if (!refset.has(node)) {
          //  console.log('map:', map)
          //}
          ASSERT(refset.has(node), 'et tu? make sure node pids are not re-used and then trigger this, node used more than once:', node, desc, 'prev:', map.get(node.$p.pid), map.has(node.$p.pid), node.$p.pid, path.nodes[path.nodes.length - 2]);
          console.log('(assertion triggered; debug data commented out)');
          //console.dir(node, { depth: null });
          //console.log('previous parent:', map.get(node.$p.pid));
          //console.log('current  parent:', path.nodes[path.nodes.length - 2]);
          //console.log('truncated node:', node);
          ASSERT(
            false,
            'every node should appear once in the ast. if this triggers then there is a transform that is injecting the same node twice',
            node,
            desc
          );
        }
        ASSERT(path.nodes.length < 2 || path.nodes[path.nodes.length - 2], 'should get the parent for a given node', path.nodes.slice(-2), node);
        map.set(node.$p.pid, path.nodes[path.nodes.length - 2]);
        refset.add(node);
      }
    },
    rootNode,
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
    ASSERT(false, 'huh?', [kind]);
  }
}

export function isSameNodeByPrintingExpensive(A, B) {
  // We could try to prettier it but the same node should really just print the same so I don't think we need to
  return tmat(A, true) === tmat(B, true);
}

export function allReadsAreCallsOrAliasingOrRecursive(fdata, meta, recursionBlockChain) {
  // Given a binding, determine if all reads from this binding are regular calls.
  // Allow for aliases, only as constants (so only as var decls, not assignments)
  // and in that case also do the same check for the alias.
  // The alias must have 1 read and 1 write and must be called immediately because
  // otherwise it may still cause problems. We check it mostly to eliminate a red herring.
  if (meta.reads.some((rw, i) => {
    ASSERT(rw.kind === 'read', 'a read is a read'); // If this fails just return false here

    // If the usage is _inside_ the inner func then that's fine. We don't care what happens
    // to the func once it can call the inner func. So ignore any recursive reads.
    if (rw.blockChain.startsWith(recursionBlockChain)) {
      vlog('  - this is a recursive usage; ignored', recursionBlockChain, '<=', rw.blockChain);
      return false;
    }


    if (rw.parentNode.type === 'CallExpression') {
      if (rw.parentProp !== 'callee') {
        vlog('   - bail: function was used as an arg');
        return true;
      }
      return false;
    }

    if (rw.parentNode.type === 'VarStatement' && rw.parentProp === 'init') {
      ASSERT(rw.parentProp === 'init', 'if not right then it would not be a read');

      // Verify that left is only assigned to once and only called otherwise
      const aliasMeta = fdata.globallyUniqueNamingRegistry.get(rw.parentNode.id.name);

      if (aliasMeta.writes.length !== 1) {
        vlog('   - bail: alias is written more than once');
        return true;
      }
      if (aliasMeta.reads.length !== 1) {
        vlog('   - bail: alias is read more than once');
        return true;
      }

      if (aliasMeta.reads[0].parentNode.type !== 'CallExpression' || aliasMeta.reads[0].parentProp !== 'callee') {
        vlog('   - bail: alias was not only called');
        return true;
      }

      if (
        aliasMeta.writes[0].blockBody !== aliasMeta.reads[0].blockBody ||
        aliasMeta.writes[0].blockIndex + 1 !== aliasMeta.reads[0].blockIndex
      ) {
        vlog('  - bail: alias was not immediately invoked');
        return true;
      }

      return false;
    }
    // Not called, not assigned, not var decl init. Not our target.
    vlog('   - bail: func ref was used in observable ways');
    return true;
  })) {
    vlog('   - bail: at least one usage of the binding was not a func call');
    return false;
  }

  return true;
}

function isOneSetBit(v) {
  // Bit counting is relatively expensive. ES6 added Math.clz32, which counts the number of leading bits of a 32bit number.
  // So what we can do here, rather than bit fiddle to get the whole count, is to get the number of leading zeroes, and then
  // check whether 2^(31-count) equals our value. If so, it's a single bit. If not, it's not.
  // Alternative, we could create an object/Set with 32 entries and do a straight lookup. Not sure what's faster. Won't matter much here.

  return 1 << (31 - Math.clz32(v)) === v;
}

/**
 * @param {Map<string, Set<Write>>} map
 * @returns {string}
 */
export function debugStringMapOfSetOfReadOrWrites(map) {
  const entries = Array.from(map.entries());
  return entries.filter(([name]) => name !== SYMBOL_MAX_LOOP_UNROLL).map(([name, set]) => {
    return `${name}:${debugStringListOfReadOrWrites(set)}`;
  }).join(', ') || '<none>';
}

/**
 * @param {Set<Write> | Array<Write> | undefined}set
 * @returns {string}
 */
export function debugStringListOfReadOrWrites(set) {
  ASSERT(!set || set instanceof Array || set instanceof Set, 'set array or undefined');
  return (set && Array.from(set).map((write) => {
    return `@${write.node.$p.pid}`;
  }).join(',')) || '(none)';
}
