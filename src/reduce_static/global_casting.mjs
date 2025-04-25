// Find calls to builtin constructors like Boolean and $coerce (`Number`, and `String`) and try to determine them obsolete
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
import { SYMBOL_COERCE } from '../symbols_preval.mjs';
import { symbo } from '../symbols_builtins.mjs';

export function globalCasting(fdata) {
  group('\n\n\n[globalCasting] Searching for calls to global builtins that cast their arg\n');
  //currentState(fdata, 'globalCasting'. true);
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
    if (![symbo('boolean', 'constructor'), SYMBOL_COERCE].includes(name)) return;

    vgroup('- Checking an explicit cast using `' + name + '()` (', meta.reads.length, 'reads)');
    process(fdata, meta, name, queue);
    vgroupEnd();
  });

  if (queue.length) {
    queue.sort(({ pid: a }, { pid: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ func }) => func());

    log('Global casters eliminated:', queue.length, '. Restarting from phase1');
    return {what: 'globalCasting', changes: queue.length, next: 'phase1'};
  }

  log('Global casters eliminated: 0.');
}
function process(fdata, meta, name, queue) {
  meta.reads.forEach((read, ri) => {
    vlog('- Read', ri, ':', read.parentNode.type + '.' + read.parentProp);
    if (read.parentNode.type !== 'CallExpression' || read.parentProp !== 'callee') {
      vlog('  - Not a call to this function.');
      return;
    }

    const args = read.parentNode['arguments'];
    ASSERT(
      name === symbo('boolean', 'constructor') || args.length === 2,
      'We completely control $coerce and it should always have exactly two args',
      read.parentNode,
    );
    const kind = name === SYMBOL_COERCE ? AST.getPrimitiveValue(args[1]) : 'boolean';

    if (args.length === 0) {
      ASSERT(name === symbo('boolean', 'constructor'), '(should not be coerce, and not be Boolean)');
      vlog('  - Queuing for argless call to Boolean()');
      queue.push({
        pid: +read.parentNode.$p.pid,
        func: () => {
          rule('Calling `Boolean()` without args results a `false`');
          example('Boolean()', 'false');
          before(read.parentNode, read.blockBody[read.blockIndex]);

          const finalNode = AST.fals();
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = finalNode;
          else read.grandNode[read.grandProp][read.grandIndex] = finalNode;

          after(finalNode, read.blockBody[read.blockIndex]);
        },
      });
    } else if (args[0].type === 'Identifier') {
      const arg = args[0];
      const meta = fdata.globallyUniqueNamingRegistry.get(arg.name);
      ASSERT(['boolean', 'number', 'string', 'plustr'].includes(kind), 'enum plus an extra one here', kind);
      if (meta.typing.mustBeType === (kind === 'plustr' ? 'string' : kind)) {
        vlog('  - Queuing for arged call');
        queue.push({
          pid: +read.parentNode.$p.pid,
          func: () => {
            if (kind === 'boolean') rule('Calling `Boolean()` on a value that we know must be a boolean is a noop');
            if (kind === 'number') rule('Calling `$coerce(x, "number")` on a value that we know must be a number is a noop');
            if (kind === 'string') rule('Calling `$coerce(x, "string")` on a value that we know must be a string is a noop');
            if (kind === 'plustr') rule('Calling `$coerce(x, "plustr")` on a value that we know must be a string is a noop');
            example('const x = a === b; f(Boolean(x));', 'const x = a === b; f(x);');
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
