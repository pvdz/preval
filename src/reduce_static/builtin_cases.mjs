// Find cases of built-ins that may have an improvement
// For example, Array(1,2,3) is new Array(1,2,3) is [1,2,3]


import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset } from '../utils.mjs';
import * as AST from '../ast.mjs';

export function builtinCases(fdata) {
  group('\n\n\nSearching for usages of builtins\n');
  const r = _builtinCases(fdata);
  groupEnd();
  return r;
}
function _builtinCases(fdata) {
  let changes = 0;

  // Do for each global separately

  changes += processArray(fdata);

  if (changes) {
    log('Built-ins transformed:', changes, '. Restarting from phase1 to fix up read/write registry.');
    return 'phase1';
  }

  log('Built-ins transformed: 0.');
  return false;
}

function processArray(fdata) {
  let changes = 0;

  const meta = fdata.globallyUniqueNamingRegistry.get('Array');
  ASSERT(meta);
  ASSERT(meta.isBuiltin);

  meta.reads.forEach(read => {
    const parentNode = read.parentNode;

    if ((parentNode.type !== 'CallExpression' && parentNode.type !== 'NewExpression')) return; // Array() or new Array()
    if (read.parentProp !== 'callee') return; // It's the array that ought to be called here, not passed in as an arg

    const args = parentNode.arguments;

    if (args.length === 0) {
      rule('Calling new Array should be replaced with a literal');
      example('const x = new Array();', 'const x = [];');
      before(read.blockBody[read.blockIndex]);

      const newNode = AST.arrayExpression();
      if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
      else read.grandNode[read.grandProp][read.grandIndex] = newNode;

      after(read.blockBody[read.blockIndex]);
      ++changes;
      return;
    }
    else if (args.length === 1) {
      // Make sure to ignore NaN and Infinity here (even though they'd result in a runtime error so we could fix that too)
      if (AST.isNumber(args[0])) { // This only checks for literals
        if (args[0].raw === '0') {
          rule('Calling new Array(0) should be replaced with an empty array literal');
          example('const x = new Array(0);', 'const x = [];');
          before(read.blockBody[read.blockIndex]);

          const newNode = AST.arrayExpression();
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
          else read.grandNode[read.grandProp][read.grandIndex] = newNode;

          after(read.blockBody[read.blockIndex]);
          ++changes;
          return;
        }
        else if (String(parseInt(args[0].raw, 10)) === args[0].raw) { // Confirm it's an int
          rule('Calling new Array should be replaced with a literal');
          example('const x = new Array(4);', 'const x = [,,,,];'); // note: as many comma's as .length but for us it's an array of null's
          before(read.blockBody[read.blockIndex]);

          const num = parseInt(args[0].raw, 10);

          const newNode = AST.arrayExpression(Array.from(Array(num), () => null));
          if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
          else read.grandNode[read.grandProp][read.grandIndex] = newNode;

          after(read.blockBody[read.blockIndex]);
          ++changes;
          return;
        }
        else {
          // Most likely this will result in a runtime error but I'm not entirely sure how reliable our detection is here
          // Plus, how often would this happen in the real world, anyways.
        }
      }
      return;
    }
    else {
      rule('Calling new Array(1, 2, 3) with multiple args should be replaced with an array literal');
      example('const x = new Array(1, 2, 3);', 'const x = [1, 2, 3];');
      before(read.blockBody[read.blockIndex]);

      const newNode = AST.arrayExpression(args);
      if (read.grandIndex < 0) read.grandNode[read.grandProp] = newNode;
      else read.grandNode[read.grandProp][read.grandIndex] = newNode;

      after(read.blockBody[read.blockIndex]);
      ++changes;
      return;
    }
  });

  return changes;
}
