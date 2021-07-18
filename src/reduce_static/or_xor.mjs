// Replacing or-xor cases with and
// `a | b ^ b` -> `a & (-1^b)`

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, fmat, tmat } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function orXor(fdata) {
  group('\n\n\nChecking OrXor cases\n');
  const r = _orXor(fdata);
  groupEnd();
  return r;
}
function _orXor(fdata) {
  const queue = [];

  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.typing.orredWith) return; // (undefined, false, 0) phase1 will have done the necessary checks for the init. we should not need to check the rest?
    if (!meta.isConstant) return;

    ASSERT(typeof meta.typing.orredWith === 'number', 'undefined, false, or number', meta.typing.orredWith);

    vgroup('- `' + name + '`: is a const var whose value was ORed to:', '0b' + meta.typing.orredWith.toString(2));
    process(meta, name, queue);
    vgroupEnd();
  });

  function process(meta, name, queue) {
    const varWrite = meta.writes.find((write) => write.kind === 'var');
    ASSERT(varWrite, 'constants must have a var');
    ASSERT(
      varWrite.parentNode.init.type === 'BinaryExpression' && varWrite.parentNode.init.operator === '|',
      'parent should be binary on OR because typing.orredWith was set',
      meta.typing,
    );

    const ilp = AST.isPrimitive(varWrite.parentNode.init.left);
    const irp = AST.isPrimitive(varWrite.parentNode.init.right);
    ASSERT(ilp || irp, 'at east one');

    if (ilp && irp) {
      vlog('Both sides are numbers. Probably an IR artifact. Bailing');
      return;
    }
    // This should be the node that was orred then xorred. Confirm that it's a constant.
    const sourceNode = ilp ? varWrite.parentNode.init.right : varWrite.parentNode.init.left;

    // Actual node is irrelevant since we can guarantee the outcome of an `|` with a number, and that's all we care about.
    if (AST.isComplexNode(sourceNode)) {
      // We need to clone this. Can probably also do complex nodes here tbf.
      vlog('The source was not a simple node. Bailing');
      return;
    }

    // Find usages of this value with a xor expression
    vgroup('Confirmed that the source is a constant. Scanning for all reads');
    meta.reads.forEach((read, ri) => {
      vlog('-', ri, read.parentNode.type + '.' + read.parentProp);
      if (read.parentNode.type === 'BinaryExpression') {
        vlog('Is binary expression with operator: `' + read.parentNode.operator + '`');

        if (read.parentNode.operator === '^') {
          vlog('Is xor. Checking if other side is primitive');

          const unknown = read.parentNode.left === read.node ? read.parentNode.right : read.parentNode.left;
          if (AST.isPrimitive(unknown)) {
            vlog('This is `const x = a | n; const y = x ^ m;` where x and y are constants and n and m are primitives');

            const ov = meta.typing.orredWith;
            const xv = AST.getPrimitiveValue(unknown);
            const overlap = ov & xv;

            if (overlap === ov) {
              if (overlap === xv) {
                queue.push({
                  index: read.blockIndex,
                  func: () => {
                    vlog('The overlap matches the OR and XOR values so we can replace them with one AND');
                    rule('A bitwise OR and XOR on the same value can be one AND');
                    example('const a = source | 32; const b = a ^ 32; f(b);', 'const a = source | 32; const b = source & -33; f(b);');
                    before(varWrite.blockBody[varWrite.blockIndex]);
                    before(read.blockBody[read.blockIndex]);

                    read.parentNode.left = AST.cloneSimple(sourceNode);
                    read.parentNode.right = AST.primitive(-1 ^ overlap);
                    read.parentNode.operator = '&';

                    after(varWrite.blockBody[varWrite.blockIndex]);
                    after(read.blockBody[read.blockIndex]);
                  },
                });
              } else {
                vlog(
                  'The overlap matches the OR value but not the XOR value. We can replace the OR with an AND but have to keep part of the XOR as well.',
                );

                // This will undo the OR but not the XOR

                queue.push({
                  index: read.blockIndex,
                  func: () => {
                    rule('A bitwise OR and XOR with overlap can be an OR and an AND');
                    example(
                      'const a = source | 32; const b = a ^ 48; f(b);',
                      'const a = source | 32; const tmp = source & -33; const b = tmp ^ 16; f(b);',
                    );
                    before(varWrite.blockBody[varWrite.blockIndex]);
                    before(read.blockBody[read.blockIndex]);

                    const tmp = createFreshVar('tmpOrXor', fdata);
                    const varNode = AST.variableDeclaration(
                      tmp,
                      AST.binaryExpression('&', AST.cloneSimple(sourceNode), AST.primitive(-1 ^ overlap)),
                    );

                    // Drop the overlap from the primitive of the existing xor
                    read.parentNode.right = AST.primitive(xv ^ overlap);
                    read.parentNode.left = AST.identifier(tmp);
                    read.blockBody.splice(read.blockIndex, 0, varNode);

                    after(varWrite.blockBody[varWrite.blockIndex]);
                    after(read.blockBody[read.blockIndex]);
                  },
                });
              }
            } else if (overlap === xv) {
              vlog('The overlap matches the XOR value so we can drop the xor entirely and inject an AND next to the remainder of the OR');

              queue.push({
                index: read.blockIndex,
                func: () => {
                  rule('A bitwise OR and XOR with overlap on the OR should replace the XOR');
                  example('const a = source | 48; const b = a ^ 32; f(b);', 'const a = source | 16; const b = a & -33; f(b);');
                  before(varWrite.blockBody[varWrite.blockIndex]);
                  before(read.blockBody[read.blockIndex]);

                  // Drop the overlap from the OR
                  if (ilp) {
                    varWrite.parentNode.init.left = AST.primitive(ov ^ overlap);
                  } else {
                    varWrite.parentNode.init.right = AST.primitive(ov ^ overlap);
                  }
                  // Replace the XOR with an AND
                  read.parentNode.left = AST.identifier(name);
                  read.parentNode.right = AST.primitive(-1 ^ overlap);
                  read.parentNode.operator = '&';

                  after(varWrite.blockBody[varWrite.blockIndex]);
                  after(read.blockBody[read.blockIndex]);
                },
              });
            }
          } else {
            vlog('The xor does not have a primitive');
          }
        }
      } else {
        // TODO: Can still do `~` and `!` here
        vlog('Not binary operator');
      }
    });
    vgroupEnd();
  }

  if (queue.length) {
    queue.sort(({ index: a }, { index: b }) => (a < b ? 1 : a > b ? -1 : 0));
    queue.forEach(({ index, func }) => func());

    log('Found orxors:', queue.length, '. Restarting from phase1');
    return 'phase1';
  }

  log('Found orxors: 0.');
}
