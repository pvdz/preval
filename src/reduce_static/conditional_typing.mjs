// Find if statements where a certain branch knows a binding to be or not to be a certain value
// `const x = a === 50; if (a) f(a === 50); else f(a === 50);`
// -> `const x = a === 50; if (true) f(a); else f(false);`

import walk from '../../lib/walk.mjs';
import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  fmat,
  tmat,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function conditionalTyping(fdata) {
  group('\n\n\n[conditionalTyping] Checking for known types under condition');
  const ast = fdata.tenkoOutput.ast;
  //currentState(fdata, 'conditionalTyping'. true, fdata);
  const r = _conditionalTyping(fdata);
  groupEnd();
  return r;
}
function _conditionalTyping(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk) {
    if (beforeWalk) return;

    if (node.type !== 'IfStatement') return;
    if (node.test.type !== 'Identifier') return;

    vgroup('Found an `if` with ident testing on `' + node.test.name + '`');
    ifOnIdent(node, fdata);
    vgroupEnd();
  }

  if (changed) {
    log('Conditional types resolved:', changed, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'conditionalTyping', changes: changed, next: 'phase1'};
  }

  log('Conditional types resolved: 0.');

  function ifOnIdent(node, fdata) {
    // First find the `var x = a === b``
    const ifTestMeta = fdata.globallyUniqueNamingRegistry.get(node.test.name);
    if (ifTestMeta.isBuiltin) return;
    if (ifTestMeta.isImplicitGlobal) return;
    if (ifTestMeta.varDeclRef.varDeclNode.type !== 'VarStatement') return; // catch, for-x, ???
    //if (meta.writes.length > 1) return; // TODO: fixme if broken

    const varDeclRef = ifTestMeta.writes.find((write) => write.kind === 'var');
    if (!varDeclRef) {
      vlog('The binding was not a var. Bailing');
      return;
    }

    if (!ifTestMeta.isConstant) {
      // TODO: we can still do the same thing as long as we can guarantee that the value does not change. But it's much more expensive.
      return;
    }

    const beforeValueNode = ifTestMeta.varDeclRef.node;
    vlog('If on a constant. The var init is a:', beforeValueNode.type);

    if (beforeValueNode.type === 'BinaryExpression') {
      vgroup();
      onBinary(ifTestMeta, varDeclRef, beforeValueNode, node, fdata);
      vgroupEnd();
    } else {
      vlog('Ignoring this type for now...');
    }
  }

  function onBinary(ifTestMeta, varDeclRef, beforeValueNode, node, fdata) {
    let opbefore = beforeValueNode.operator;
    vgroup('The var init operator is `' + opbefore + '` with lhs', beforeValueNode.left.type, 'and rhs', beforeValueNode.right.type);
    if (opbefore === '===' || opbefore === '!==') {
      binaryEqNeq(ifTestMeta, varDeclRef, beforeValueNode, opbefore, node, fdata);
    } else {
      vlog('Ignoring this operator...');
    }
    vgroupEnd();
  }

  function binaryEqNeq(ifTestMeta, varDeclRef, beforeValueNode, opbefore, node, fdata) {
    const left = beforeValueNode.left;
    const right = beforeValueNode.right;

    let value;
    let targetName;
    if (left.type === 'Identifier' && AST.isPrimitive(right) && !AST.isPrimitive(left)) {
      targetName = left.name;
      value = AST.getPrimitiveValue(right);
    } else if (right.type === 'Identifier' && AST.isPrimitive(left) && !AST.isPrimitive(right)) {
      value = AST.getPrimitiveValue(left);
      targetName = right.name;
    }

    if (targetName) {
      vlog('targetName: `' + targetName + '`, value:', value);
      // Find all references by this name inside the branch, when op is `===`
      // In the consequent branch, replace all occurrences with the primitive value found
      // In the alternate branch, find all refs and try to resolve their context (like `>=` etc) where possible
      // For the op is `!==` case, do the opposite.
      // Scope and loops should not matter since those functions should invariantly copy the state of the var

      const targetMeta = fdata.globallyUniqueNamingRegistry.get(targetName);

      if (targetMeta.isImplicitGlobal) {
        vlog('The name is an implicit global. Not safe to continue.');
        return;
      }

      if (!targetMeta.isConstant) {
        vlog('The name is not a constant. Not safe to continue.');
        return;
      }

      vgroup('The init is an ident and a primitive. Walking all', targetMeta.reads.length, 'reads now...');
      targetMeta.reads.forEach((read, ri) => {
        vgroup('- read', ri);
        binaryEqNeqRead(read, ri, value, targetName, ifTestMeta, varDeclRef, beforeValueNode, opbefore, node, fdata);
        vgroupEnd();
      });
      vgroupEnd();
    } else {
      vlog('The binary expression was not an ident and primitive. Bailing');
    }
  }

  function binaryEqNeqRead(read, ri, value, targetName, ifTestMeta, varDeclRef, beforeValueNode, opbefore, node) {
    let whichBranch = '';
    if (+read.node.$p.pid > +node.consequent.$p.pid && +read.node.$p.pid <= +node.consequent.$p.lastPid) {
      vlog('ref in if branch');
      whichBranch = 'if';
    } else if (+read.node.$p.pid > +node.alternate.$p.pid && +read.node.$p.pid <= +node.alternate.$p.lastPid) {
      vlog('ref in else branch');
      whichBranch = 'else';
    } else {
      vlog('ref not inside `if` statement at all');
    }

    const opafter = read.parentNode.operator;

    if (
      (opbefore === '===' && whichBranch === 'if' && opafter === '===') ||
      (opbefore === '!==' && whichBranch === 'else' && opafter === '!==')
    ) {
      vlog(
        'either this was checked to be equal and this is the if branch, or it was checked not to be equal and this is the else branch but it should be the same',
      );
      vlog('Replacing the occurrence with the value');

      rule('An if that confirmed the value for a constant should be inlined inside that branch');
      example(
        'const x = f(); const a = x === 100; if (a) { g(x); }',
        'const x = f(); const a = x === 100; if (a) { g(100); }',
        () => whichBranch === 'if',
      );
      example(
        'const x = f(); const a = x !== 100; if (a) else { g(x); }',
        'const x = f(); const a = x !== 100; if (a) else { g(100); }',
        () => whichBranch === 'else',
      );
      before(varDeclRef.blockBody[read.blockIndex]);
      before(ifTestMeta.varDeclRef.varDeclNode);
      before(read.blockBody[read.blockIndex], node);

      ++changed;
      if (read.parentIndex < 0) read.parentNode[read.parentProp] = AST.primitive(value);
      else read.parentNode[read.parentProp][read.parentIndex] = AST.primitive(value);

      after(read.blockBody[read.blockIndex]);
    } else if (whichBranch) {
      // Trickier because we only know what value it is _not_.
      // This may still allow us to assert a few things to be false

      if (read.parentNode.type === 'BinaryExpression') {
        const otherNode = read.parentProp === 'left' ? read.parentNode.right : read.parentNode.left;
        const isPrimitive = AST.isPrimitive(otherNode);
        if (isPrimitive) {
          const primValue = AST.getPrimitiveValue(otherNode);
          switch (opafter) {
            case '===':
            case '!==': {
              /*
            const x = f();
            const a = x === 5;
            if (a) {
              // Not here. We are in the else branch
            } else {
              if (a === 5) { // false
                ...
              }
              if (a !== 5) { // true
                ...
              }
              if (a > 5) { // unknown (it may be <)
                ...
              }
            }
            */

              if (Object.is(value, primValue)) {
                vlog(
                  'op before if:',
                  opbefore,
                  ', op now:',
                  opafter,
                  ', primValue:',
                  primValue,
                  ', targetName:',
                  targetName,
                  ', we are in the `else` branch',
                );
                if (opbefore === '===') {
                  // We know `name` actually is a constant with `value`
                  // Since this is comparing it to the exact same value, the answer must be `true`.
                  if (opafter === '===') {
                    // If it was not eq before, it is not eq now, so this must be false

                    ASSERT(whichBranch === 'else', 'the === if === case is handled above');

                    rule('when the if-test determines a value, their refs may be optimized inside each branch; === ===');
                    example(
                      'const x = f(); const a = x === 100; if (x) {} else { g(x === 100); }',
                      'const x = f(); const a = x === 100; if (x) {} else { g(false); }',
                      () => whichBranch === 'else',
                    );
                    before(varDeclRef.blockBody[read.blockIndex]);
                    before(ifTestMeta.varDeclRef.varDeclNode);
                    before(read.blockBody[read.blockIndex], node);

                    if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(false);
                    else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(false);
                    ++changed;

                    after(read.blockBody[read.blockIndex]);
                  } else if (opafter === '!==') {
                    rule('when the if-test determines a value, their refs may be optimized inside each branch; === !==');
                    example(
                      'const x = f(); const a = x === 100; if (x) { g(x !== 100); } else {}',
                      'const x = f(); const a = x === 100; if (x) { g(false); } else {}',
                      () => whichBranch === 'if',
                    );
                    example(
                      'const x = f(); const a = x === 100; if (x) {} else { g(x !== 100); }',
                      'const x = f(); const a = x === 100; if (x) {} else { g(true); }',
                      () => whichBranch === 'else',
                    );
                    before(varDeclRef.blockBody[read.blockIndex]);
                    before(ifTestMeta.varDeclRef.varDeclNode);
                    before(read.blockBody[read.blockIndex], node);

                    if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(whichBranch === 'else');
                    else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(whichBranch === 'else');
                    ++changed;

                    after(read.blockBody[read.blockIndex]);
                  } else {
                    ASSERT(false);
                  }
                } else if (opbefore === '!==') {
                  // We know the constant `name` is not given value `value` so we know this comparison must be `false`

                  if (opafter === '===') {
                    // If it was not eq before, it is not eq now, so this must be true

                    rule('when the if-test determines a value, their refs may be optimized inside each branch; !== ===');
                    example(
                      'const x = f(); const a = x !== 100; if (x) { g(x === 100); } else {}',
                      'const x = f(); const a = x !== 100; if (x) { g(false); } else {}',
                      () => whichBranch === 'if',
                    );
                    example(
                      'const x = f(); const a = x !== 100; if (x) {} else { g(x === 100); }',
                      'const x = f(); const a = x !== 100; if (x) {} else { g(true); }',
                      () => whichBranch === 'else',
                    );
                    before(varDeclRef.blockBody[read.blockIndex]);
                    before(ifTestMeta.varDeclRef.varDeclNode);
                    before(read.blockBody[read.blockIndex], node);

                    if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(whichBranch === 'else');
                    else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(whichBranch === 'else');
                    ++changed;

                    after(read.blockBody[read.blockIndex]);
                  } else if (opafter === '!==') {
                    ASSERT(whichBranch === 'if', 'the !== else !== case is handled above');
                    rule('when the if-test determines a value, their refs may be optimized inside each branch !== !==');
                    example(
                      'const x = f(); const a = x !== 100; if (x) { g(x !== 100); } else {}',
                      'const x = f(); const a = x !== 100; if (x) { g(true); } else {}',
                      () => whichBranch === 'if',
                    );
                    before(varDeclRef.blockBody[read.blockIndex]);
                    before(ifTestMeta.varDeclRef.varDeclNode);
                    before(read.blockBody[read.blockIndex], node);

                    if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(true);
                    else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(true);
                    ++changed;

                    after(read.blockBody[read.blockIndex]);
                  } else {
                    ASSERT(false);
                  }
                } else {
                  ASSERT(false);
                }
              }
              break;
            }
            // I think we can do some other ops as well, knowing that x it's not a certain value...
            //default:
            //  TODO;
          }
        }
      }
    } else {
      vlog('not in either branch');
    }
  }
}
