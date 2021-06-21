// Find calls to builtin constructors like Boolean, Number, and String and try to determine them obsolete
// `Number(+x)` -> `+x`

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  fmat,
  tmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';

export function globalCasting(fdata) {
  group('\n\n\nSearching for calls to global builtins that cast their arg\n');
  const r = _globalCasting(fdata);
  groupEnd();
  return r;
}
function _globalCasting(fdata) {
  const ast = fdata.tenkoOutput.ast;

  // `const a = x; f(a);` --> `f(x);`

  let queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (!meta.isBuiltin) return;
    if (!['Boolean', 'String', 'Number'].includes(name)) return;

    vgroup('- Checking an explicit cast using `' + name + '()` (', meta.reads.length, 'reads)');
    process(fdata, meta, name, queue);
    vgroupEnd();
  });

  if (queue.length) {
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ func }) => func());

    log('Global casters eliminated:', queue.length, '. Restarting from phase1');
    return 'phase1';
  }

  log('Global casters eliminated: 0.');
  return false;
}
function process(fdata, meta, name, queue) {
  meta.reads.forEach((read, ri) => {
    vlog('- Read', ri, ':', read.parentNode.type + '.' + read.parentProp);
    if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
      vlog('  - Not a call to this function.');
      return;
    }

    const args = read.parentNode['arguments'];
    if (args.length === 0) {
      vlog('  - Queuing for argless call');
      queue.push({
        pid: +read.parentNode.$p.pid,
        func: () => {
          if (name === 'Boolean') rule('Calling `Boolean()` without args results a `false`');
          if (name === 'Number') rule('Calling `Number()` without args results a `0`');
          if (name === 'String') rule('Calling `String()` without args results a `""`');
          example('Boolean()', 'false', () => name === 'Boolean');
          example('Number()', '0', () => name === 'Number');
          example('String()', '""', () => name === 'String');
          before(read.parentNode, read.blockBody[read.blockIndex]);

          const finalNode = name === 'Boolean' ? AST.fals() : name === 'String' ? AST.primitive('') : AST.literal(0);
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
          else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

          after(finalNode, read.blockBody[read.blockIndex]);
        },
      });
    } else if (args[0].type === 'Identifier') {
      const arg = args[0];
      const meta = fdata.globallyUniqueNamingRegistry.get(arg.name);
      if (meta.typing.mustBeType === (name === 'Boolean' ? 'boolean' : name === 'String' ? 'string' : 'number')) {
        vlog('  - Queuing for arged call');
        queue.push({
          pid: +read.parentNode.$p.pid,
          func: () => {
            if (name === 'Boolean') rule('Calling `Boolean()` on a value that we know must be a boolean is a noop');
            if (name === 'Number') rule('Calling `Number()` on a value that we know must be a number is a noop');
            if (name === 'String') rule('Calling `String()` on a value that we know must be a string is a noop');
            example('const x = a === b; f(Boolean(x));', 'const x = a === b; f(x);', () => name === 'Boolean');
            example('const x = +a; f(Number(x));', 'const x = +a; f(x);', () => name === 'Number');
            example('const x = ""+a; f(String(x));', 'const x = ""+a; f(x);', () => name === 'String');
            before(read.parentNode, read.blockBody[read.blockIndex]);

            if (read.grandIndex < 0) read.grandNode[read.grandProp] = arg;
            else read.grandNode[read.grandProp][read.grandIndex] = arg;
            read.blockBody.splice(read.blockIndex, 0, ...args.slice(1).map((enode) => AST.expressionStatement(enode)));

            after(arg, read.blockBody.slice(read.blockIndex, read.blockIndex + args.length));
          },
        });
      } else {
        vlog('  - First arg ident but not known to be a bool;', meta.typing.mustBeType);
      }
    } else {
      vlog('  - First arg exists and not an ident');
    }
  });
}
