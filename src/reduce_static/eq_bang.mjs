// Look for comparisons that are inverted which are tested in an `if` or `while` test and not used otherwise.
// `const x = a === b; f(!x);`
// -> `const x = a !== b; f(x);`

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

export function eqBang(fdata) {
  group('\n\n\n[eqBang] Searching for the eq-bang pattern\n');
  const r = _eqBang(fdata);
  groupEnd();
  return r;
}
function _eqBang(fdata) {
  let changed = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;
    if (!meta.isConstant) return;

    // We're looking for this pattern
    // `const x = a === b; !x;`

    if (!meta.reads.length) return; // meh?

    // Check if all reads are either a bang or an if-test. Also make sure there's at least one bang at all.
    let bangs = false;
    if (
      meta.reads.some((r) => {
        if (r.parentNode.type === 'UnaryExpression') {
          if (r.parentNode.operator === '!') {
            bangs = true;
            return;
          }
          return true; // fail
        }
        if (r.parentNode.type === 'IfStatement' && r.parentProp === 'test') {
          return;
        }

        return true; // fail
      })
    ) {
      //vlog('  - At least one read was not a bang or if-test, bailing');
      return;
    }
    if (!bangs) {
      // None of the reads banged so there's nothing to do here
      return;
    }

    vlog('- `' + name + '` is only read as a bang arg or if-test');

    ASSERT(meta.writes.length === 1, 'this is a constant, so ...');

    const varWrite = meta.writes[0];
    ASSERT(varWrite.kind === 'var', 'this is a constant and the write should be the var', varWrite);

    // Confirm that x is the result of `===` or `!==`
    const init = varWrite.parentNode.init;
    if (init.type !== 'BinaryExpression' || (init.operator !== '===' && init.operator !== '!==')) {
      vlog('  - The binding did not have an init with `===` or `!==`, bailing');
      return;
    }

    // The pattern is found, but now we have to confirm that the value of x is not used in places where we can't flip it too.
    // This means that all reads must occur either as the arg of a bang or the test of an `if`. In some cases, `while` works too?

    rule('The arg of a bang (!) that is the result of a comparison can use the opposite operator if all its uses allow it');
    example('const x = a === b; f(!x);', 'const x = a !== b; f(x);');

    before(varWrite.blockBody[varWrite.blockIndex]);
    // Now we should be able to convert all reads of x and assign x to y without the bang
    init.operator = init.operator === '===' ? '!==' : '===';
    after(varWrite.blockBody[varWrite.blockIndex]);

    meta.reads.forEach((read) => {
      if (read.parentNode.type === 'IfStatement') {
        ASSERT(read.parentProp === 'test');

        before(read.blockBody[read.blockIndex]);
        // Flip the branches
        const bak = read.parentNode.consequent;
        read.parentNode.consequent = read.parentNode.alternate;
        read.parentNode.alternate = bak;
        after(read.blockBody[read.blockIndex]);
      } else if (read.parentNode.type === 'UnaryExpression') {
        ASSERT(read.parentProp === 'argument');
        // Replace the unary with its arg

        before(read.blockBody[read.blockIndex]);
        if (read.grandIndex < 0) read.grandNode[read.grandProp] = read.node;
        else read.grandNode[read.grandProp][read.grandIndex] = read.node;
        after(read.blockBody[read.blockIndex]);
      } else {
        ASSERT(false);
      }
    });

    ++changed;
  });

  if (changed) {
    log('Bangs eliminated:', changed, '. Restarting from phase1');
    return {what: 'eqBang', changes: changed, next: 'phase1'};
  }

  log('Bangs eliminated: 0.');
}
