// Find assignments to values that are closures where we can still prove the assignment is never observed
// The point is that the code that follows may be less than trivial making generic heuristics less effective.
//
//    let x = 1; function g() { $(1); } function f(){ $(x); } f(); x = 2; g();
//                                                                 ^^^^^
//

import walk from '../../lib/walk.mjs';
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
  findBodyOffset, riskyRule,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { isStringType } from '../ast.mjs';

export function unusedAssigns(fdata) {
  group('\n\n\n[unusedAssigns] Finding assignments that can not be read throuh complex tails\n');
  //currentState(fdata, 'unusedAssigns'. true);
  const r = _unusedAssigns(fdata);
  groupEnd();
  return r;
}
function _unusedAssigns(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let changes = 0;

  walk(_walker, ast, 'ast');
  function _walker(assignNode, beforeWalk, nodeType, path) {
    if (beforeWalk) return;
    if (assignNode.type !== 'AssignmentExpression') return;
    if (assignNode.left.type !== 'Identifier') return;

    const lhs = assignNode.left;
    const lhsName = assignNode.left.name;

    // If the lhs is NOT a closure then return here. Ref tracking will accurately
    // and more efficiently deal with anything this plugin searches for.

    const meta = fdata.globallyUniqueNamingRegistry.get(lhsName);

    if (meta.singleScoped) return; // vlog('- bail: var is single scope, other rules can deal with it better');

    vlog('Have assignment expression to ident @', +lhs.$p.pid, ';', lhsName);

    // Starting at this assignment, check if it's the last of the file
    const write = meta.writes.filter(read => read.node === assignNode.left)[0];
    ASSERT(write, 'should find it, write?', meta.writes);

    // If the assignment is not in toplevel global, bail. For now.
    if (write.blockChain !== '1') return;

    vlog('Have assignment expression in global to ident @', +lhs.$p.pid, ';', lhsName);

    let currIndex = write.blockIndex + 1;
    vlog('Checking whether the assignment to', lhsName, 'at node @', +write.node.$p.pid, 'at block index', currIndex-1, 'can be observed later');
    while (write.blockBody[currIndex]) {
      const currStmt = write.blockBody[currIndex];
      switch (currStmt.type) {
        case 'ExpressionStatement': {
          if (exprNodeSpyOnBinding(currStmt.expression, fdata, lhsName)) return vlog('- bail: expression statement spies');
          break;
        }
        case 'VarStatement': {
          if (exprNodeSpyOnBinding(currStmt.init, fdata, lhsName)) return vlog('- bail: var init spies');
          break;
        }
        default:
          //log('currStmt.type:', currStmt.type)
          //TODO // verify that return etc dont refer to the ident
          return
      }
      ++currIndex;
    }
    vlog('Seems no statement in this block followed that could observe the assignment. Can we drop it?');

    rule('When an assignment can not be observed it can be dropped');
    example('let x = 1; $(x); x = 2; f();', 'let x = 1; $(x); ; f();');
    before(write.blockBody[write.blockIndex]);

    ASSERT(write.blockBody[write.blockIndex].type === 'ExpressionStatement', 'must be an expr stmt in normalized code');

    const rhs = write.blockBody[write.blockIndex].expression.right;
    // Keep the rhs in most cases, drop the assignment in all cases
    if (rhs.type === 'FunctionExpression') {
      write.blockBody[write.blockIndex] = AST.emptyStatement();
    } else {
      write.blockBody[write.blockIndex].expression = write.blockBody[write.blockIndex].expression.right;
    }

    after(write.blockBody[write.blockIndex]);
    ++changes;
    return;

    //const parentNode = path.nodes[path.nodes.length - 2];
    //const parentProp = path.props[path.props.length - 1];
    //const parentIndex = path.indexes[path.indexes.length - 1];
    //const grandNode = path.nodes[path.nodes.length - 3];
    //const grandProp = path.props[path.props.length - 2];
    //const grandIndex = path.indexes[path.indexes.length - 2];

    //tothierenverder
  }

  if (changes) {
    log('Found', changes, 'assignments that were not observed. Restarting from phase1');
    return {what: 'unusedAssigns', changes: changes, next: 'phase1'};
  }

  log('Assignments that were not observed: 0');
}

function exprNodeSpyOnBinding(exprNode, fdata, bindingName) {
  // A node may spy on binding when it could, say, log out the value
  // of the bindingName as a side effect of whatever the node is doing.
  // For example; the property read on an object may trigger a getter
  // which can do anything, including reading the value of the ident.
  // Another example: coercing a value to string may trigger a custom
  // toString or valueOf method which may do anything, inc reading ident.

  // assignment, binary, unary, call, func, ident, param, templateliteral, this, await, yield, literal, class, new, array, object

  if (exprNode.type === 'AssignmentExpression') {
    if (exprNode.left.type === 'Identifier' && exprNode.left.name === bindingName) return true;
    if (exprNode.left.type === 'MemberExpression') return true; // eh we can do better here
    return exprNodeSpyOnBinding(exprNode.right, fdata, bindingName);
  }

  if (exprNode.type === 'Identifier') {
    // We ignore TDZ errors but if this ident is the needle then we still return true
    return exprNode.name === bindingName;
  }
  if (AST.isPrimitive(exprNode)) return false;
  if (exprNode.type === 'Literal') return false; // Regex (or whatever lit) has no side effect in itself

  if (exprNode.type === 'BinaryExpression') {
    if (AST.complexExpressionNodeMightSpy(exprNode, fdata)) return true;
    // operands must be simple now, not member
    if (exprNode.left.type === 'Identifier' && exprNode.left.name === bindingName) return true;
    if (exprNode.right.type === 'Identifier' && exprNode.right.name === bindingName) return true;
    return false;
  }

  if (exprNode.type === 'UnaryExpression') {
    if (AST.complexExpressionNodeMightSpy(exprNode, fdata)) return true;
    // operands must be simple now, not member
    if (exprNode.argument.type === 'Identifier' && exprNode.argument.name === bindingName) return true;
    return false;
  }

  if (exprNode.type === 'CallExpression') {
    if (exprNode.callee.type === 'Identifier' && exprNode.callee.name === bindingName) return true;
    if (
      exprNode.callee.type === 'MemberExpression' &&
      exprNode.callee.object.type === 'Identifier' &&
      exprNode.callee.object.name === bindingName
    ) return true;
    if (
      exprNode.callee.type === 'MemberExpression' &&
      exprNode.callee.computed &&
      exprNode.callee.property.name === bindingName
    ) return true;
    if (exprNode.arguments.some(anode => anode.type === 'Identifier' && anode.name === bindingName)) return true;

    // The call is not referencing the ident. It's probably got side effects but maybe not? Like parseInt on a number is fine.

    if (AST.complexExpressionNodeMightSpy(exprNode, fdata)) {
      vlog('- call node is complex; type:', exprNode.type, ', can we salvage it?');
      if (exprNode.callee.type === 'MemberExpression') {
        if (
          AST.isStringType(exprNode.callee.object, fdata, false) &&
          !exprNode.callee.computed &&
          exprNode.callee.property.name === 'replace'
        ) {
          // This is `const x = 'foo'.replace(...)`
          //ASSERT(!AST.complexNodeMightSpy(exprNode.callee, fdata), 'Since this is a string, it shouldnt be able to spy ...');
          const arg1 = exprNode.arguments[0];
          if (AST.complexExpressionNodeMightSpy(arg1, fdata)) {
            // This arg should be a string or regex. A regex can technically spy (it holds offset state for
            // global regexes) but this can not refer to a binding so we can skip that case here too.

            if (arg1.type === 'Identifier') {
              const arg1meta = fdata.globallyUniqueNamingRegistry.get(arg1.name);
              if (arg1meta.isConstant && AST.isNewRegexLit(arg1meta.varDeclRef?.node)) {
                vlog('- first arg is a regex const');
              } else {
                vlog('- bail: string replace and the first arg spies;', arg1.type, arg1.name);
                return true;
              }
              // ok
            } else {
              vlog('- bail: string replace and the first arg is a non-ident that spies;', arg1.type);
              return true;
            }
          }
          const arg2 = exprNode.arguments[1];
          if (AST.complexExpressionNodeMightSpy(arg2, fdata)) {

            // The second arg can be a func. If so, verify that it doesn't spy

            if (arg2.type === 'Identifier') {
              const arg2meta = fdata.globallyUniqueNamingRegistry.get(arg2.name);
              if (arg2meta.isConstant && arg2meta.varDeclRef?.node.type === 'FunctionExpression') {
                vlog('- scanning func arg');
                if (arg2meta.varDeclRef.node.body.body.some(stmt => {
                  if (stmt.type === 'VarStatement') {
                    const spies = AST.complexExpressionNodeMightSpy(stmt.init, fdata);
                    vlog('  -', stmt.type, 'may spy?', spies, stmt.init?.type);
                    return spies;
                  } else if (stmt.type === 'ExpressionStatement') {
                    const spies = AST.complexExpressionNodeMightSpy(stmt.expression, fdata);
                    vlog('  -', stmt.type, 'may spy?', spies);
                    return spies;
                  } else if (stmt.type === 'DebuggerStatement') {
                    // ok
                  } else if (stmt.type === 'ReturnStatement') {
                    // ok
                  } else {
                    vlog('  -', stmt.type, 'is an unexpected/unsupported type, considering it spyable');
                    return true;
                  }
                })) {
                  vlog('- bail: the func arg to string replace might be spying');
                  return true;
                }
                vlog('- checked string replace func arg and it seemed ok');
                // is ok.
              } else {
                vlog('- bail: the second arg to string replace was not a const function');
                return true;
              }
              // is ok.
            } else {
              vlog('- bail: string replace and one of the arg spies')
              return true;
            }
          }

          // Neither the callee nor the first two args spies themselves
          // Check whether the function arg is a constant and whether its body spies

          vlog('- string replacement and it should not spy');
          return false;
        }

        vlog('- bail: unsupported method call', exprNode.callee.object.name, exprNode.callee.property.name);
        return true;
      }
      else if (exprNode.callee.type === 'Identifier') {
        const meta = fdata.globallyUniqueNamingRegistry.get(exprNode.callee.name);
        if (meta.isImplicitGlobal || meta.isBuiltin) {
          // Let's consider implicit globals to not be able to access the local globals... in module scope I think that's correct?
          vlog('- Ignoring implicit global or builtin', exprNode.callee.name);
        } else {
          vlog('- bail: unsupported ident call...', exprNode.callee.name);
          return true;
        }
      }
      else {
        ASSERT(false, 'what else can we call?', exprNode.callee.type);
      }
    }

    return false; // I guess? like isNaN(x)
  }

  if (exprNode.type === 'FunctionExpression') return false;
  if (exprNode.type === 'ClassExpression') return false;
  if (exprNode.type === 'Param') return false; // Unlikely but
  if (exprNode.type === 'TemplateLiteral') return false; // even with expressions those should be coerced at this point
  if (exprNode.type === 'ThisExpression') return false; // Unlikely but
  if (exprNode.type === 'AwaitExpression') return true; // await may be relevant. what if the value changes during the suspend?
  if (exprNode.type === 'YieldExpression') return true; // await may be relevant. what if the value changes during the suspend?
  if (AST.isPrimitive(exprNode)) return false;
  if (exprNode.type === 'NewExpression') return true; // basically a call tho
  if (exprNode.type === 'ArrayExpression') return exprNode.elements.some(enode => enode?.type === 'Identifier' && enode.name === bindingName);
  if (exprNode.type === 'ObjectExpression') return exprNode.properties.some(pnode => pnode.value.type === 'Identifier' && pnode.value.name === bindingName);

  if (exprNode.type === 'MemberExpression') return true; // TODO: we can support some cases here

  ASSERT(false, 'missing expr here...', exprNode.type);
}
