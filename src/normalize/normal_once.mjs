// This step should normalize things that should not reappear in any other step of Preval.
// This step should not contain rules that may need to be re-applied multiple times throughout, unless required for this step.
// - Elimination of certain node types: SwitchStatement, FunctionDeclaration, ForStatement, ClassDeclaration, DoWhileStatement,
//                                      ExportDefaultDeclaration, ImportDefaultDeclaration
// - Hoisting and then elimination of FunctionStatements (these are FunctionDeclarations that are not direct child of Program or Block)
//   - Theoretically we could drop them but in practice they are treated as func decls so we should hoist them to the top of their scope
// - VarDeclaration with kind=var
// - Function param defaults
// - All kinds of patterns
// - All exports are converted to ExportNamedDeclaration with the `export {x as y}` style exclusively (even for default)
// - All imports are consolidated to regular import statements that import exactly one symbol im the `import {x} from "y"` style

import walk from '../../lib/walk.mjs';

import {
  BLUE,
  RESET,
  VERBOSE_TRACING,
  DIM,
} from '../constants.mjs';
import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  tmat,
  fmat,
  rule,
  example,
  before,
  after,
  findBodyOffsetExpensiveMaybe,
  assertNoDupeNodes, currentState,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {
  createFreshVar,
  findBoundNamesInVarDeclaration,
  findBoundNamesInVarDeclaratorOrVarStatement,
  getIdentUsageKind,
} from '../bindings.mjs';
import { addLabelReference, createFreshLabelStatement, updateGlobalLabelStatementRef } from '../labels.mjs';
import { cloneSortOfSimple, isSortOfSimpleNode, normalizeFunction, transformFunctionParams } from '../ast.mjs';
import { SYMBOL_FORIN, SYMBOL_FOROF, SYMBOL_MAX_LOOP_UNROLL, SYMBOL_COERCE } from '../symbols_preval.mjs';

// See also the prepare logic. TODO: move this to config.
const HOIST_FUNC_STMTS = false;

export function phaseNormalOnce(fdata) {
  const ast = fdata.tenkoOutput.ast;
  const thisStack = [];
  const loopStack = [];

  group('\n\n\n##################################\n## phaseNormalOnce  ::  ' + fdata.fname + '\n##################################\n\n\n');
  currentState(fdata, 'start of once');

  fdata.globallyUniqueLabelRegistry = new Map();

  // Process exports first. They are the only statements (in this phase) that must split in multiple statements that can
  // not be wrapped in a block (since export decls _must_ be toplevel). Our walker does not revisit etc so this is better.

  hoistingOnce(ast, 'program');

  for (let i = 0; i < ast.body.length; ++i) {
    const node = ast.body[i];

    switch (node.type) {
      case 'ExportNamedDeclaration': {
        // TODO: eliminate anything other than `export {..}`
        if (node.declaration) {
          // `export let x = 10` or something. Need to split this up. The node cannot be anon (func/class). Should be simple.
          rule('Named export declaration must be split');
          example('export let foo = 10;', 'let foo = 10; export {foo};');
          before(node);

          const decl = node.declaration;
          const names = [];
          if (decl.type === 'FunctionDeclaration' || decl.type === 'ClassDeclaration') {
            names.push(decl.id.name);
          } else {
            // Note: this var decl is not yet normalized so we must iterate the declarators individually
            node.declaration.declarations.forEach((decr) => findBoundNamesInVarDeclaratorOrVarStatement(decr, names));
          }
          ast.body.splice(i, 1, node.declaration, AST._exportNamedDeclarationFromNames(names.map((s) => AST.identifier(s))));

          after(ast.body[i]);
          after(ast.body[i + 1]);
          --i; // Restart from current index
        } else {
          // This must be `export {x}`, which is what we want, so ignore it.
        }
        break;
      }
      case 'ExportDefaultDeclaration': {
        // TODO: convert to local func and named export

        if (node.declaration.type === 'FunctionDeclaration' || node.declaration.type === 'ClassDeclaration') {
          // Split the export up in two declarations; function/class declaration and a named exports
          // This changes the .name property of the declaration. We are okay with that for now.
          if (node.declaration.id) {
            rule('Default export declaration with name should be split');
            example('export default function f(){}', 'function f(){}; export {f as default};');
            before(node);

            ast.body.splice(
              i,
              1,
              AST.variableDeclaration(node.declaration.id, node.declaration, 'let', true),
              AST._exportNamedDeclarationFromNames(node.declaration.id.name),
            );
            if (node.declaration.type === 'FunctionDeclaration') {
              node.declaration.type = 'FunctionExpression';
              node.declaration.id = null;
            } else {
              node.declaration.type = 'ClassExpression';
              node.declaration.id = null;
            }

            after(ast.body[i]);
            after(ast.body[i + 1]);
          } else {
            rule('Default export declaration without name should be split');
            example('export default function(){}', 'function tmp(){}; export {tmp as default};');
            before(node);

            const tmpName = createFreshVar('tmpAnonDefaultExport', fdata);
            ast.body.splice(
              i,
              1,
              AST.variableDeclaration(tmpName, node.declaration, 'const', true),
              AST._exportNamedDeclarationFromNames(tmpName, 'default'),
            );
            if (node.declaration.type === 'FunctionDeclaration') node.declaration.type = 'FunctionExpression';
            else node.declaration.type = 'ClassExpression';

            after(ast.body[i]);
            after(ast.body[i + 1]);
          }
        } else {
          // This is a default exports of some kind of expression. The reference, if any, is "dead".
          // For normalization sake, put the value in a local binding (it will not be referenced otherwise)
          // and export this binding as default.
          rule('Default export expression should be split');
          example('export default f()', 'const tmp = f(); export {tmp as default};');
          before(node);

          const tmpName = createFreshVar('tmpAnonDefaultExport', fdata);
          ast.body.splice(
            i,
            1,
            AST.variableDeclaration(tmpName, node.declaration, 'const', true),
            AST._exportNamedDeclarationFromNames(tmpName, 'default'),
          );

          after(ast.body[i]);
          after(ast.body[i + 1]);
        }
        break;
      }
    }
  }

  if (VERBOSE_TRACING) vlog('\nState after export normalization\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  // All other transforms in this file can be wrapped in a block, so they shouldn't need to change the parent child count/order.

  walk(_walker, ast, 'ast');
  function _walker(node, beforeNode, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    vgroup(BLUE + nodeType + ':' + (beforeNode ? 'before' : 'after'), `;; ${DIM}@${node.$p.pid}${RESET}`);

    const key = nodeType + ':' + (beforeNode ? 'before' : 'after');
    switch (key) {
      case 'ArrowFunctionExpression:before': {
        if (parentNode.type === 'ExpressionStatement') {
          // Edge case. Not very likely to appear in real code
          rule('Arrow as statement should be eliminated');
          example('() => {};', ';');
          before(node, parentNode);

          parentNode.expression = AST.identifier('undefined');

          after(parentNode);
          return true; // Stops traversal of the arrow
        }

        // Must make sure the body is a block
        if (node.expression) {
          ASSERT(node.body.type !== 'BlockStatement');
          rule('Arrow body must be block');
          example('() => 5', '() => { return 5; }');
          before(node);

          node.body = AST.blockStatement(AST.returnStatement(node.body));
          node.expression = false;

          after(node);
        }

        hoistingOnce(node, 'arrow');

        const [headLogic, bodyLogic] = transformFunctionParams(node, fdata);
        const deb = AST.debuggerStatement();
        node.body.body.unshift(
          // Arrows do not create `this` or `arguments` so don't add those aliases here
          ...headLogic,
          deb,
          ...bodyLogic,
        );
        deb.$p.funcHeader = true; // Makes sure this statement won't be deleted in this normal_once step
        break;
      }
      case 'BlockStatement:before': {
        if (!HOIST_FUNC_STMTS) {
          if (node.$p.hasFuncDecl) {
            vlog('Should find at least one func decl in this block...');
          }
          const funcsToHoist = []; // Note: these are block scoped var decls.
          for (let i = 0; i < node.body.length; ++i) {
            const enode = node.body[i];
            if (enode.type === 'FunctionDeclaration') {
              if (enode.$p.isBlockFuncDecl) {
                ASSERT(node.$p.hasFuncDecl, 'parent block should be marked as having a func decl', node);
                vlog('- Found a func decl');
                // Hoist it to the top of the block as a var statement...
                funcsToHoist.push(enode);
                node.body.splice(i, 1);
                --i;
              }
            }
          }

          if (funcsToHoist.length) {
            rule('Hoist block scoped var decls to the top of the block, sort them, and convert them to `let` decls');
            example('{ f(); function f(){} }', '{ let f = function(){}; f(); }');
            before(node);

            funcsToHoist.sort(({ id: a }, { id: b }) => (a < b ? -1 : a > b ? 1 : 0));
            const newNodes = funcsToHoist.map((enode) => {
              group();
              before(enode);

              const decl = AST.variableDeclaration(enode.id, enode, 'let', true); // If we did not have strict mode then this would be var. But import code is strict so this is let, probably even const.
              enode.type = 'FunctionExpression';
              enode.id = null;
              enode.$p.isBlockFuncDecl = false;

              after(decl);
              groupEnd();
              return decl;
            });

            // This is a block and that may still be the body of a function, or not. Try to find the debugger
            // statement, which is our function header marker, and start after its index if it exists, zero otherwise.
            let bodyOffset = findBodyOffsetExpensiveMaybe(node.body);
            if (bodyOffset < 0) bodyOffset = 0;
            node.body.splice(bodyOffset, 0, ...newNodes);

            node.$p.hasFuncDecl = false;

            after(node);
          }
        }
        break;
      }
      case 'BlockStatement:after': {
        if (HOIST_FUNC_STMTS) {
          // Note: There is some magic in prepare phase because the parser will assign the func
          //       stmt name to the block scope. But, in webcompat mode, that should be func scope.
          if (node.$p.hasFuncDecl) {
            vlog('Should find at least one func decl in this block...');
          }
          const funcStmtsToHoist = []; // Note: these are block scoped var decls.
          for (let i = 0; i < node.body.length; ++i) {
            const enode = node.body[i];
            if (enode.$p.isBlockFuncDecl && enode.type === 'FunctionDeclaration') {
              ASSERT(node.$p.hasFuncDecl, 'parent block should be marked as having a func decl', node);
              vlog('- Found a func statement that needs to be hoisted');
              // Hoist it to the top of the block as a var statement...
              funcStmtsToHoist.push(enode);
              node.body.splice(i, 1);
              --i;
              enode.$p.isBlockFuncDecl = false; // it will be.
            }
          }
          if (funcStmtsToHoist.length) {
            let where = path.nodes.length - 2;
            let scopeNode = path.nodes[where];
            while (scopeNode.type !== 'FunctionExpression' && scopeNode.type !== 'FunctionDeclaration' && scopeNode.type !== 'Program') {
              ASSERT(where > 0, 'should always find the func/global scope');
              --where;
              scopeNode = path.nodes[where]
            }

            funcStmtsToHoist.sort(({ id: a }, { id: b }) => (a < b ? -1 : a > b ? 1 : 0));
            funcStmtsToHoist.forEach((enode) => {
              group();

              rule('Hoist block scoped function statement to the top of the scope block and convert them to `let` decls');
              example('{ f(); function f(){} }', 'let f = function(){}; { f(); }');
              before(enode, scopeNode);

              const decl = AST.variableDeclaration(enode.id, enode, 'let', true); // If we did not have strict mode then this would be var. But import code is strict so this is let, probably even const.
              enode.type = 'FunctionExpression';
              enode.id = null;
              enode.$p.isBlockFuncDecl = false;

              if (scopeNode.type === 'Program') {
                const body = scopeNode.body;
                let bodyOffset = findBodyOffsetExpensiveMaybe(body);
                if (bodyOffset < 0) bodyOffset = 0;
                body.splice(bodyOffset, 0, decl);
              }
              else {
                // This is a block and that may still be the body of a function, or not. Try to find the debugger
                // statement, which is our function header marker, and start after its index if it exists, zero otherwise.
                const body = scopeNode.body.body;
                let bodyOffset = findBodyOffsetExpensiveMaybe(body);
                if (bodyOffset < 0) bodyOffset = 0;
                body.splice(bodyOffset, 0, decl);
              }

              after(decl, scopeNode);
              groupEnd();

              hoistingOnce(enode, 'funcstmt');

              normalizeFunction(enode, enode, fdata);

              return decl;
            });

            node.$p.hasFuncDecl = false;
          }
        }
        break;
      }
      case 'ClassDeclaration:before': {
        rule('Class declaration should be let expression'); // Probably const...
        example('class x {}', 'let x = class {}');
        before(node);

        // It's probably const. We could even make this a config option although it shouldn't matter much for us.
        const newNode = AST.variableDeclaration(node.id, AST.classExpression(null, node.superClass, node.body), 'let', true);
        if (parentIndex < 0) parentNode[parentProp] = newNode;
        else parentNode[parentProp][parentIndex] = newNode;

        after(newNode);
        break;
      }
      case 'ContinueStatement:before': {
        // Eliminate in favor of a `break $continue`. Regardless.

        let target;
        if (node.label) {
          rule('Eliminate continue statements');
          example('A: while (x) { f(); continue A; }', 'A: while (x) { B: { f(); break B; } }');

          // Walk the loop stack and check each loops parent
          // Note: the parser should enforce that one of the ancestor loops is labeled with this label so we must find it
          let i = loopStack.length - 1;

          while (loopStack[i].$p.parentLabel !== node.label.name) {
            vlog('Loop', i, 'parent label', loopStack[i].$p.parentLabel, ', looking for:', node.label.name)
            --i;
            ASSERT(i>=0, 'must find the labeled loop node');
          }
          target = loopStack[i];
        } else {
          rule('Eliminate continue statements');
          example('while (x) { f(); continue; }', 'while (x) { A: { f(); break A; } }');

          target = loopStack[loopStack.length - 1];
        }
        vlog('Eliminating `continue` (label=', node.label?.name ?? '<no label>', '), targeting loop @', target.$p.pid);
        before(target);

        // Check loop already has labeled body (`while(x) { label: { <body> } }`)
        if (!(
          target.body.type === 'BlockStatement' &&
          target.body.body.length === 1 &&
          target.body.body[0].type === 'LabeledStatement' &&
          target.body.body[0].body.type === 'BlockStatement'
        )) {
          // We need to wrap the current body in a labeled block
          // Be mindful that this is not normalized code: We must first replace the continue before replacing the loop body.
          const labelStatementNode = createFreshLabelStatement('$continue', fdata, AST.blockStatement(target.body));

          // Replace the continue now. Otherwise this case can break: `while (x) continue` when replacing the loop body first.
          const freshBreakNode = AST.breakStatement(AST.identifier(labelStatementNode.label.name));
          if (parentIndex < 0) parentNode[parentProp] = freshBreakNode;
          else parentNode[parentProp][parentIndex] = freshBreakNode;
          addLabelReference(fdata, freshBreakNode.label, parentNode.body, parentIndex, true);

          vlog('Wrapping loop body in fresh label;', freshBreakNode.name);
          target.body = AST.blockStatement(labelStatementNode);
        } else {
          ASSERT(target.body.body[0].label?.type === 'Identifier', 'should have been asserted and ensured above', target);
          if (parentIndex < 0) parentNode[parentProp] = AST.breakStatement(target.body.body[0].label.name);
          else parentNode[parentProp][parentIndex] = AST.breakStatement(target.body.body[0].label.name);
        }

        after(target);
        break;
      }
      case 'DoWhileStatement:before': {
        loopStack.push(node);
        if (parentNode.type === 'LabeledStatement') {
          node.$p.parentLabel = parentNode.label.name;
        }
        break;
      }
      case 'DoWhileStatement:after': {
        loopStack.pop();

        rule('A do-while must be simple regular while');
        //example('do { f(); } while (g());', 'let tmp = true; while (tmp) { f(); tmp = g(); }');
        example('do { f(); } while (g());', 'while (true) { f(); if (!g()) break; }');
        before(node, parentNode);

        const newNodes = AST.whileStatement(true, AST.blockStatement(
          node.body,
          AST.ifStatement(node.test, AST.blockStatement(), AST.blockStatement(AST.breakStatement())),
        ))

        if (parentIndex < 0) parentNode[parentProp] = newNodes;
        else parentNode[parentProp][parentIndex] = newNodes;

        after(newNodes, parentNode);

        // Byebye do-while
        break; // Walker will revisit changed current node
      }
      case 'DebuggerStatement:before': {
        if (!node.$p.funcHeader) {
          // Maybe this isn't a problem yet but for now let's just drop these
          rule('Drop debugger statement');
          example('debugger;', ';');
          before(node, parentNode);

          if (parentIndex < 0) parentNode[parentProp] = AST.emptyStatement();
          else parentNode[parentProp][parentIndex] = AST.emptyStatement();

          after(parentNode);
        }
        break;
      }
      case 'ForStatement:before': {
        loopStack.push(node);
        if (parentNode.type === 'LabeledStatement') {
          node.$p.parentLabel = parentNode.label.name;
        }

        break;
      }
      case 'ForStatement:after': {
        loopStack.pop();

        rule('Regular `for` loops must be `while`');
        example('for (a(); b(); c()) d();', '{ a(); while (b()) { d(); c(); } }');
        before(node);

        const newNode = AST.blockStatement(
          node.init ? (node.init.type === 'VariableDeclaration' ? node.init : AST.expressionStatement(node.init)) : AST.emptyStatement(),
          AST.whileStatement(
            node.test || AST.tru(),
            AST.blockStatement(node.body, node.update ? AST.expressionStatement(node.update) : AST.emptyStatement()),
          ),
        );

        if (parentIndex < 0) parentNode[parentProp] = newNode;
        else parentNode[parentProp][parentIndex] = newNode;

        after(newNode);

        break;
      }
      case 'ForInStatement:before': {
        loopStack.push(node);
        if (parentNode.type === 'LabeledStatement') {
          node.$p.parentLabel = parentNode.label.name;
        }
        break;
      }
      case 'ForInStatement:after': {
        loopStack.pop();

        // Note: code is NOT normalized so patterns and all kinds of LHS's are possible here and we must carefully outline them.
        // Note: this transform is pretty much identical to the for-in. Changes here probably apply there as well (!)

        // Warning:
        // Consider `for (let x in x) ...`
        //   This pre-transform will cause the header-rhs read of `x` to be in a
        //   different scope than the header-lhs that declares it. While the vars are
        //   renamed properly, this still changes the semantic from a TDZ error to an
        //   unknown implicit global error (and potentially refers to the wrong value
        //   in case a global with the same name does exist! Although Preval should
        //   at least prevent that case due to unique naming and avoiding globals).
        //   (Not even sure what the transform would look like to preserve that proper)

        if (node.left.type === 'VariableDeclaration') {
          // for (var x in y)
          // for (let x in y)
          // for (const x in y)

          rule('The for-in loop must be a while');
          example(
            'for (const x in y) f(y);',
            'const forInGen = $forIn(y); while (true) { const next = forInGen.next(); if (next.done) { break; } else { const x = next.value(); { f(x); } } }'
          );
          before(node);

          const genName = createFreshVar('tmpForInGen', fdata);
          const valName = createFreshVar('tmpForInNext', fdata);

          // Minor trickery; if the lhs was a var decl then we must update the init, otherwise dump it in the lhs of an assignment
          // The lhs is evaluated before the rhs so any side effects should trigger before the generator is generated. But only once (!)
          node.left.declarations[0].init = AST.memberExpression(AST.identifier(valName), AST.identifier('value'));

          const newNode = AST.blockStatement(
            // const forInGen = $forIn(x)
            AST.variableDeclaration(genName, AST.callExpression(AST.identifier(SYMBOL_FORIN), [node.right]), 'const', true),
            // while (true) {}
            // (It probably doesn't make sense for for-in/of loops to get unrolled because there's no base case right now, maybe later tho, but that's probably handled differently?)
            AST.whileStatement(AST.identifier(SYMBOL_MAX_LOOP_UNROLL), AST.blockStatement(
              // const next = forInGen.next();
              AST.variableDeclaration(valName, AST.callExpression(AST.identifier(genName), []), 'const', true),
              // if (x.done)
              AST.ifStatement(AST.memberExpression(AST.identifier(valName), AST.identifier('done'), false),
                AST.blockStatement(
                  AST.breakStatement(),
                ),
                AST.blockStatement(
                  // <lhs> = valName;
                  // <for body Block>
                  node.left,
                  node.body
                ),
              ),
            ))
          );

          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;

          assertNoDupeNodes(newNode, 'body', true);
          after(newNode);
          break;
        }

        // for (x in y)
        // for (x.prop in y)
        // for (x[prop] in y)
        // for ((f(),x).prop in y)

        // Even in the last (exotic) case, the whole lhs is evaluated every time before each loop, after calling .next() on the generator


        rule('The for-in loop must be a while');
        example(
          'for (x in y) f(y);',
          'const forInGen = $forIn(y); while (true) { const next = forInGenNext(); if (next.done) { break; } else { x = next.value(); { f(x); } } }'
        );
        example(
          'for ([x] in y) f(y);',
          'const forInGen = $forIn(y); while (true) { const next = forInGenNext(); if (next.done) { break; } else { [x] = next.value(); { f(x); } } }'
        );
        before(node);

        const genName = createFreshVar('tmpForInGenNext', fdata);
        const valName = createFreshVar('tmpForInNext', fdata);

        // If prop is computed, it is not evaluated until the loop and also after the iterator is called each loop, so we
        // should be able to simply do something like `x[f()] = g().value` and maintain code execution order
        const newNode = AST.blockStatement(
          // const forInGen = $forIn(x)
          AST.variableDeclaration(genName, AST.callExpression(AST.identifier(SYMBOL_FORIN), [node.right]), 'const', true),
          // while (true) {}
          // (It probably doesn't make sense for for-in/of loops to get unrolled because there's no base case right now, maybe later tho, but that's probably handled differently?)
          AST.whileStatement(AST.identifier(SYMBOL_MAX_LOOP_UNROLL), AST.blockStatement(
            // const next = forInGenNext();
            AST.variableDeclaration(valName, AST.callExpression(AST.identifier(genName), []), 'const', true),
            // if (x.done)
            AST.ifStatement(AST.memberExpression(AST.identifier(valName), AST.identifier('done'), false),
              AST.blockStatement(
                AST.breakStatement(),
              ),
              AST.blockStatement(
                // x.prop = valName;
                // <for body Block>
                AST.expressionStatement(AST.assignmentExpression(node.left, AST.memberExpression(AST.identifier(valName), AST.identifier('value')))),
                node.body
              ),
            ),
          ))
        );

        if (parentIndex < 0) parentNode[parentProp] = newNode;
        else parentNode[parentProp][parentIndex] = newNode;

        assertNoDupeNodes(newNode, 'body', true);
        after(newNode);
        break;
      }
      case 'ForOfStatement:before': {
        loopStack.push(node);
        if (parentNode.type === 'LabeledStatement') {
          node.$p.parentLabel = parentNode.label.name;
        }
        break;
      }
      case 'ForOfStatement:after': {
        loopStack.pop();

        // Note: code is NOT normalized so patterns and all kinds of LHS's are possible here and we must carefully outline them.
        // Note: this transform is pretty much identical to the for-in. Changes here probably apply there as well (!)

        // Warning:
        // Consider `for (let x of x) ...`
        //   This pre-transform will cause the header-rhs read of `x` to be in a
        //   different scope than the header-lhs that declares it. While the vars are
        //   renamed properly, this still changes the semantic from a TDZ error to an
        //   unknown implicit global error (and potentially refers to the wrong value
        //   in case a global with the same name does exist! Although Preval should
        //   at least prevent that case due to unique naming and avoiding globals).
        //   (Not even sure what the transform would look like to preserve that proper)

        if (node.left.type === 'VariableDeclaration') {
          // for (var x of y)
          // for (let x of y)
          // for (const x of y)

          rule('The for-of loop must be a while');
          example(
            'for (const x of y) f(y);',
            'const forOfGen = $forOf(y); while (true) { const next = forOfGenNext(); if (next.done) { break; } else { const x = next.value(); { f(x); } } }'
          );
          before(node);


          const genName = createFreshVar('tmpForOfGenNext', fdata);
          const valName = createFreshVar('tmpForOfNext', fdata);

          // Minor trickery; if the lhs was a var decl then we must update the init, otherwise dump it in the lhs of an assignment
          // The lhs is evaluated before the rhs so any side effects should trigger before the generator is generated. But only once (!)
          node.left.declarations[0].init = AST.memberExpression(AST.identifier(valName), AST.identifier('value'));

          const newNode = AST.blockStatement(
            // const forOfGen = $forOf(x)
            AST.variableDeclaration(genName, AST.callExpression(AST.identifier(SYMBOL_FOROF), [node.right]), 'const', true),
            // while (true) {}
            // (It probably doesn't make sense for for-in/of loops to get unrolled because there's no base case right now, maybe later tho, but that's probably handled differently?)
            AST.whileStatement(AST.identifier(SYMBOL_MAX_LOOP_UNROLL), AST.blockStatement(
              // const next = forOfGenNext();
              AST.variableDeclaration(valName, AST.callExpression(AST.identifier(genName), []), 'const', true),
              // if (x.done)
              AST.ifStatement(AST.memberExpression(AST.identifier(valName), AST.identifier('done'), false),
                AST.blockStatement(
                  AST.breakStatement(),
                ),
                AST.blockStatement(
                  // <lhs> = valName;
                  // <for body Block>
                  node.left,
                  node.body
                ),
              ),
            ))
          );

          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;

          assertNoDupeNodes(newNode, 'body', true);
          after(newNode);
          break;
        }

        // for (x of y)
        // for (x.prop of y)
        // for (x[prop] of y)
        // for ((f(),x).prop of y)

        // Even in the last (exotic) case, the whole lhs is evaluated every time before each loop, after calling .next() on the generator

        rule('The for-of loop must be a while');
        example(
          'for (x of y) f(y);',
          'const forOfGen = $forOf(y); while (true) { const next = forOfGen.next(); if (next.done) { break; } else { x = next.value(); { f(x); } } }'
        );
        example(
          'for ([x] of y) f(y);',
          'const forOfGen = $forOf(y); while (true) { const next = forOfGen.next(); if (next.done) { break; } else { [x] = next.value(); { f(x); } } }'
        );
        before(node);

        const genName = createFreshVar('tmpForOfGen', fdata);
        const valName = createFreshVar('tmpForOfNext', fdata);

        // If prop is computed, it is not evaluated until the loop and also after the iterator is called each loop, so we
        // should be able to simply do something like `x[f()] = g().value` and maintain code execution order
        const newNode = AST.blockStatement(
          // const forOfGen = $forOf(x)
          AST.variableDeclaration(genName, AST.callExpression(AST.identifier(SYMBOL_FOROF), [node.right]), 'const', true),
          // while (true) {}
          // (It probably doesn't make sense for for-of/of loops to get unrolled because there's no base case right now, maybe later tho, but that's probably handled differently?)
          AST.whileStatement(AST.identifier(SYMBOL_MAX_LOOP_UNROLL), AST.blockStatement(
            // const next = forOfGen.next();
            AST.variableDeclaration(valName, AST.callExpression(AST.identifier(genName), []), 'const', true),
            // if (x.done)
            AST.ifStatement(AST.memberExpression(AST.identifier(valName), AST.identifier('done'), false),
              AST.blockStatement(
                AST.breakStatement(),
              ),
              AST.blockStatement(
                // x.prop = valName;
                // <for body Block>
                AST.expressionStatement(AST.assignmentExpression(node.left, AST.memberExpression(AST.identifier(valName), AST.identifier('value')))),
                node.body
              ),
            ),
          ))
        );

        if (parentIndex < 0) parentNode[parentProp] = newNode;
        else parentNode[parentProp][parentIndex] = newNode;

        assertNoDupeNodes(newNode, 'body', true);
        after(newNode);
        break;
      }
      case 'FunctionExpression:before': {
        if (parentNode.type === 'ExpressionStatement') {
          // Edge case. Not very likely to appear in real code
          rule('Function expression as statement should be eliminated');
          example('(function(){});', ';');
          before(node, parentNode);

          parentNode.expression = AST.identifier('undefined');

          after(parentNode);
          return true; // Stops traversal of the arrow
        }

        hoistingOnce(node, 'funcexpr');

        normalizeFunction(node, node, fdata);

        thisStack.push(node);

        break;
      }
      case 'FunctionExpression:after': {
        thisStack.pop();
        break;
      }
      case 'Identifier:before': {
        if (parentNode.type === 'ExpressionStatement') {
          let remove = false;
          if (node.name === 'arguments') {
            remove = true;
          } else {
            const meta = fdata.globallyUniqueNamingRegistry.get(node.name);
            ASSERT(meta, 'yeah?');
            if (!meta.isImplicitGlobal && !meta.isBuiltin) {
              remove = true;
            }
          }
          if (remove) {
            // Tbh this is mostly to get rid of `arguments` as a statement. An edge case. Maybe it speeds up other cases too.
            rule('A statement that is just an identifier should be removed');
            example('foo;', 'null;');
            before(node, parentNode);

            vlog('Eliminating expression statement that is just an identifier');
            if (parentIndex < 0) parentNode[parentProp] = AST.nul();
            else parentNode[parentProp][parentIndex] = AST.nul();

            after(parentNode);
            return true;
          }
        }

        if (node.name === 'arguments' && !node.$p.forAlias) {
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];
          const kind = getIdentUsageKind(parentNode, parentProp);
          vlog('- Ident kind:', kind);

          vlog('- Parent node: `' + parentNode.type + '`, prop: `' + parentProp + '`');
          if (kind === 'read') {
            // Note: this could be a property write, but it's not a binding mutation.
            // Ignore occurrences in global space (or in global nested arrows)
            const thisFunc = thisStack[thisStack.length - 1];
            // Do not count cases like where the arguments have no observable side effect or our own alias
            // This makes sure the `arguments` reference does not stick around unnecessarily as an artifact
            if (
              parentNode.type === 'MemberExpression' &&
              parentNode.object === node &&
              parentNode.property.type === 'Identifier' &&
              parentNode.property.name === 'length' &&
              !parentNode.computed
            ) {
              // Leave global occurrences. They should error out (and in tests don't lead to false positives since that uses eval).
              if (thisFunc?.$p.argumentsLenAliasName) {
                // Get the parent of the member expression so we can replace it
                const grandNode = path.nodes[path.nodes.length - 3];
                const grandProp = path.props[path.props.length - 2];
                const grandIndex = path.indexes[path.indexes.length - 2];

                const newNode = AST.identifier(thisFunc?.$p.argumentsLenAliasName);
                if (grandIndex < 0) grandNode[grandProp] = newNode;
                else grandNode[grandProp][grandIndex] = newNode;
                break;
              }
            } else {
              // Leave global occurrences. They should error out (and in tests don't lead to false positives since that uses eval).
              if (thisFunc?.$p.argumentsAliasName) {
                const newNode = AST.identifier(thisFunc?.$p.argumentsAliasName);
                if (parentIndex < 0) parentNode[parentProp] = newNode;
                else parentNode[parentProp][parentIndex] = newNode;
                break;
              }
            }
          }
        }

        break;
      }
      case 'LabeledStatement:before': {
        // This was never really part of the code so do we need it?
        //const labelNode = createFreshLabel(node.label.name, fdata);
        //if (node.label.name !== labelNode.name) {
        //  node.label = labelNode;
        //}
        break;
      }
      case 'Literal:before': {
        if (typeof node.value === 'number') {
          // Doesn't matter what the value is as long as it's not the current value...
          // Check whether the second characters is bBoOxX. Apparently there's some legacy
          // around parseInt('0x500') so let's be semi-lazy here.
          // Note: this doesn't really change the AST, only how numbers are printed.
          if (node.raw.length > 1 && !isFinite(parseInt(node.raw[1], 10))) {
            // Any bigger number will get distorted and then I'd just prefer to keep the existing representation
            const s = String(node.value);
            // Large enough representations might lose precision so make sure we only print ints here
            if (/^-?\d+$/.test(s)) {
              node.raw = s;
            }
          }
        }

        if (typeof node.value === 'string') {
          // Note: this file also converts literals to strings. Since these should not be revisited this should not lead to infinite loops
          // Note: technically certain things can not be templates, like import source and property keys. But I don't think we
          //       actually care about that distinction. Within Preval we treat templates (post pre-normalization) as strings.
          rule('Strings should be templates');
          example('"foo"', '`foo`');
          before(parentNode);

          if (parentIndex < 0) parentNode[parentProp] = AST.templateLiteral(node.value);
          else parentNode[parentProp][parentIndex] = AST.templateLiteral(node.value);

          after(parentNode);
        }
        break;
      }
      case 'MethodDefinition:after': {
        if (node.computed) {
          break;
        }
        if (node.key.type === 'Identifier') {
          break;
        }
        ASSERT(node.key.type === 'Literal' || node.key.type === 'TemplateLiteral', 'obj key is ident or lit right?', node);
        rule('Class method keys must be ident or computed, no string/number');
        example('class c { "foo.bar"() {} }', 'class c { ["foo.bar"]() {} }');
        before(node);
        node.computed = true;
        after(node);
        break;
      }
      case 'Property:after': {
        if (node.computed) {
          break;
        }
        if (node.key.type === 'Identifier') {
          break;
        }
        ASSERT(node.key.type === 'Literal' || node.key.type === 'TemplateLiteral', 'obj key is ident or lit right?', node);
        rule('Object properties must be ident or computed, no string/number');
        example('o = {"foo.bar": x}', 'o = {["foo.bar"]: x}');
        before(node);
        node.computed = true;
        after(node);
        break;
      }
      case 'SwitchStatement:before': {
        vlog('Eliminating switch...');

        // We can take a simple path if and only if
        // - the case explicitly stops at the end
        // - the case does not explicitly stop anywhere else
        // - the switch does not contain a default that is not the last case
        // Either way we must still do the variable hoisting step first

        const wrapper = AST.blockStatement();
        const newLabelNode = createFreshLabelStatement('tmpSwitchBreak', fdata, wrapper);
        const newLabelIdentNode = newLabelNode.label;

        // Variables declared on the toplevel of a switch case have to be hoisted to before the switch case, and const
        // converted to let, to ensure that all cases still have access to that binding after the transformations.
        // Function declarations need to be converted to hoisted vars, and their init outlined before anything else.
        const vars = [];
        const lets = [];
        const funcdecls = [];
        let hasDefaultAt = -1;
        node.cases.forEach((cnode, i) => {
          if (!cnode.test) hasDefaultAt = i;

          // Keep repeating as long as case-top-level var decls are encountered that introduce multiple bindings
          while (
            cnode.consequent.some((snode, j) => {
              if (snode.type === 'VariableDeclaration') {
                const names = [];
                snode.declarations.forEach((n) => findBoundNamesInVarDeclaratorOrVarStatement(n, names));
                vlog('- Var decl binds these names:', names);
                // Declare these names before the switch and "drop" the `var/let/const` keyword to have it be an assignment

                if (snode.kind === 'var') vars.push(...names);
                else lets.push(...names);

                rule('[1.a/2] Switch case toplevel declaration should be outlined; [1/2] replacing decls with their inits');
                example('switch (x) { case a: let b = 10, c = 20; }', 'let b, c; switch (x) { case a: b = 10, c = 20; }');
                example('switch (x) { case a: let b; }', 'let b = undefined; switch (x) { case a: }');
                example('switch (x) { case a: let [b, c] = [10, 20]; }', 'let b, c; switch (x) { case a: [b, c] = [10, 20]; }');
                before(snode);

                const varsWithInit = snode.declarations.filter((n) => !!n.init);
                if (varsWithInit.length) {
                  const newNode = AST.expressionStatement(
                    AST.sequenceExpression(varsWithInit.map((dnode) => AST.assignmentExpression(dnode.id, dnode.init))),
                  );
                  cnode.consequent[j] = newNode;
                  after(newNode);
                } else {
                  cnode.consequent[j] = AST.emptyStatement();
                  after(AST.emptyStatement());
                }
              } else if (snode.type === 'FunctionDeclaration') {
                rule('[1.b/2] Function declaration in a switch block must be handled');
                example(
                  'switch (x) { case x: f(); break; case y: function f(){} }',
                  'let f = function(){}; switch(x) { case x: f(); case y: }',
                );
                before(snode, parentNode);

                ASSERT(snode.id, 'since this cannot be an export, the id must be present');
                const newNode = AST.variableDeclaration(snode.id, snode, 'let', true);
                // TODO: create a fresh var that clones snode props instead...
                snode.type = 'FunctionExpression';
                snode.id = null;
                cnode.consequent[j] = AST.emptyStatement();

                after(newNode, parentNode);
                funcdecls.push(newNode);
              }
            })
          );
        });

        if (vars.length || lets.length || funcdecls.length) {
          // TODO: if the vars are only used inside the case then we could inline them, perhaps keep the `const` tag. nbd
          rule('[2/2] Switch case toplevel declaration should be outlined; adding var and func decls before the switch');
          example('switch (x) { case y: let a = 10, b = 20; }', '{ let a; let b; switch (x) { case y: a = 10, b = 10; } }');

          wrapper.body.push(
            ...vars.map((name) => AST.variableDeclaration(name, undefined, 'var', true)),
            ...lets.map((name) => AST.variableDeclaration(name, undefined, 'let', true)),
            ...funcdecls,
          );

          after(wrapper);
        }

        // These are the cases to consider when doing abrupt completion analysis. The last case is irrelevant since we
        // only have to do this to cover fall-through (etc) situations.
        const casesForAbruptAnalysis = node.cases.slice(0, -1);

        // The case tests do not spy, just like if/while tests. So order is not very relevant.
        // If there is a fall-through case that has no body then the simple transform becomes `a === x || b === x`. That's okay.

        vlog('Does it have a middle default?', node.$p.hasMiddleDefaultCase);

        const allCasesAbrupt = casesForAbruptAnalysis.every((c,i) => {
          // If the c completes, that's fine because it means one of its children completes directly
          // There's at least one statement of the consequent that explicitly breaks the code flow.
          if (c.$p.completesAbrupt) {
            vlog('- case', i, 'is $p.completesAbrupt=true');
            return true;
          }
          // If the consequent is empty, then that's a case we can work with
          if (!c.consequent.length) {
            vlog('- case', i, 'has no statements, so it does not complete abruptly');
            return false;
          }

          // Lastly, if there is any statement that is _guaranteed_ to complete abruptly then we are good to go
          const r = c.consequent.some((c) => simpleAbruptCheck(c));
          vlog('- ', c.test ? 'case' : 'default', i+1, '/', casesForAbruptAnalysis.length + 1, '; simple analysis result:', r);
          return r;
        });
        vlog('(Last case is not checked because it doesnt matter)');

        vlog('Do all cases complete abruptly?', allCasesAbrupt);

        if (!node.$p.hasMiddleDefaultCase && allCasesAbrupt) {
          // Verify that the case is guaranteed to complete abrupt, and not conditionally (if/loop/try).
          rule('Simple switch transform');
          example(
            'switch (x) { case 1: f(); break; case 2: g(); break; }',
            'const tmp = x; if (x === 1) { f(); } else { if (x === 2) { g(); } }',
          );
          before(node);

          const tmpName = createFreshVar('tmpSwitchDisc', fdata);
          const varNode = AST.variableDeclaration(tmpName, node.discriminant, 'const', true);
          node.$p.regularBreaks.forEach(({ parentNode, parentProp, parentIndex }) => {
            // Explicitly point all breaks to the label that replaces the root switch node
            // This preserves the abrupt completion semantics in cases where it matters since
            // we are not yet in normalized state and DCE has not happened yet.
            // There are other normalization steps that will eliminate redundant label usages.
            if (parentIndex < 0) parentNode[parentProp] = AST.identifier(newLabelIdentNode.name);
            else parentNode[parentProp][parentIndex].label = AST.identifier(newLabelIdentNode.name);
          });
          const ifRoot = node.cases
            .slice(0)
            .reverse()
            .reduce(
              (prev, c) => {
                const caseTestNode = c.test === null ? AST.tru() : AST.binaryExpression('===', tmpName, c.test);
                if (c.consequent.length === 0) {
                  if (prev.type === 'BlockStatement') {
                    // This means the last case/default was empty. Make sure the prev was an `if`.
                    prev = AST.ifStatement(AST.tru(), AST.blockStatement(), AST.blockStatement());
                  }
                  // This is a fall-through case with empty body. `switch (x) { case a: case b: f(); }`
                  // Amend the test of the previous `if` with an `|| x === b` and let normalization deal with the rest
                  if (prev.test.type === 'Literal' && prev.test.value === true) {
                    // Most likely the second-to-last case where the last is a default. The previous node has an
                    // if-test that is just `true`. We should be able to replace it rather than amend it.
                    // (It's less noisy, although I think we should just let other rules clean it up...)
                    prev.test = caseTestNode;
                  } else {
                    prev.test = AST.binaryExpression('||', caseTestNode, prev.test);
                  }
                  return prev;
                }
                return AST.ifStatement(caseTestNode, AST.blockStatement(c.consequent), prev);
              },
              AST.blockStatement(),
            );
          wrapper.body.push(varNode, ifRoot);

          if (parentIndex < 0) parentNode[parentProp] = newLabelNode;
          else parentNode[parentProp][parentIndex] = newLabelNode;

          after(wrapper);
          break;
        }

        // The idea is to pull out all cases tests in order, compare the discriminant against it, and
        // remember the index of the first case that matches. If none match, remember test case count.
        // The next step is taking all the case/default bodies, in order, and wrapping them in `if index <= x`
        // (using zero for the default case). That way a case match will match its own case plus all
        // cases (and/or default) after it until the first case that breaks the control flow, or the
        // last case if none break. The default will properly apply its behavior in the same way.

        rule('Switch transform, the long version');
        example(
          'switch (x) { case a(): b(); break; default: c(); case d(): e(); }',
          'let i = 1; if (x === a()) i = 0; else if (x === d()) i = 2; label: { if (i <= 0) b(); break label; if (i <= 1) c(); if (i <= 2) e(); }',
        );
        before(node);

        const tmpNameValue = createFreshVar('tmpSwitchValue', fdata);
        const tmpNameCase = createFreshVar('tmpSwitchCaseToStart', fdata);
        const defaultIndex = node.cases.findIndex((n) => !n.test);

        // All breaks without an explicit label should point to the fresh label that will be injected as the root of the switch-transform
        node.$p.unqualifiedLabelUsages.forEach((n) => {
          ASSERT(!n.label, 'prepare should collect all and only unqualified breaks');
          n.label = AST.identifier(newLabelIdentNode.name);
        });
        node.$p.unqualifiedLabelUsages.length = 0;

        const labelStmt =AST.labeledStatement(
          newLabelIdentNode,
          AST.blockStatement(
            ...node.cases.map((cnode, i) => {
              return AST.ifStatement(AST.binaryExpression('<=', tmpNameCase, AST.literal(i)), AST.blockStatement(cnode.consequent));
            }),
          ),
        )
        updateGlobalLabelStatementRef(fdata, labelStmt);

        const newNodes = [
          AST.variableDeclaration(tmpNameValue, node.discriminant, 'let', true),
          AST.variableDeclaration(tmpNameCase, AST.literal(defaultIndex >= 0 ? defaultIndex : node.cases.length), 'let', true),
          node.cases
            .slice(0)
            .reverse()
            .reduce((prev, cnode, i) => {
              if (!cnode.test) return prev;
              return AST.ifStatement(
                AST.binaryExpression('===', cnode.test, tmpNameValue),
                AST.expressionStatement(AST.assignmentExpression(tmpNameCase, AST.literal(node.cases.length - i - 1))),
                prev,
              );
            }, AST.emptyStatement()),
          labelStmt,
        ];
        wrapper.body.push(...newNodes);

        if (parentIndex < 0) parentNode[parentProp] = wrapper;
        else parentNode[parentProp][parentIndex] = wrapper;

        after(newNodes);

        // byebye SwitchStatement
        break; // Walker will revisit changed current node
      }
      case 'TaggedTemplateExpression:after': {
        // Convert the tag to a regular function call
        // foo`x ${1} y ${2} z`
        // becomes
        // foo(['x ', ' y ', ' z'], 1, 2),

        rule('Tagged templates should be regular func calls');
        example('foo`a${b}c${d}`', 'foo(["a", "c", ""], b, d)');
        before(node, parentNode);

        // Note: this file also converts strings to templates. Since these should not be revisited this should not lead to infinite loops
        const finalNode = AST.callExpression(node.tag, [
          // TODO: this breaks if the code relies on the tagged template literal allowing illegal escapes... can we fix it?
          AST.arrayExpression(node.quasi.quasis.map((q) => AST.templateLiteral(q.value.cooked))),
          ...node.quasi.expressions,
        ]);
        if (parentIndex < 0) parentNode[parentProp] = finalNode;
        else parentNode[parentProp][parentIndex] = finalNode;

        after(finalNode, parentNode);
        break;
      }
      case 'TemplateLiteral:after': {
        if (parentNode.type !== 'TaggedTemplateExpression' && node.expressions.length > 0) {
          // See next case
          // Convert the template to a string concat
          // `a${b}c${d}e`
          // becomes
          // 'a'+b+'c'+d+'e';

          // Note: templates will explicitly cast to String whereas `"" + x` will call `.valueOf()` first. Relevant difference.
          rule('Template literals become string concats explicitly cast with String');
          example('x = `a${b}c`', 'x = "a" + String(b) + "c"');
          before(node, parentNode);

          // Note: this file also converts strings to templates. Since these should not be revisited this should not lead to infinite loops
          // Zip them up into a single expression. No need to inject multiple expressions. Regular normalization will take care of that.
          // Start with the first string. If there are expressions there is also always another string that follows it.
          // There is always at lest one string, there may not be any expressions.
          let finalNode = AST.templateLiteral(node.quasis[0].value.cooked);
          for (let i = 0; i < node.expressions.length; ++i) {
            // a = (a + expr) + b
            finalNode = AST.binaryExpression(
              '+',
              AST.binaryExpression('+', finalNode, AST.callExpression(SYMBOL_COERCE, [node.expressions[i], AST.primitive('string')])),
              AST.templateLiteral(node.quasis[i + 1].value.cooked),
            );
          }
          if (parentIndex < 0) parentNode[parentProp] = finalNode;
          else parentNode[parentProp][parentIndex] = finalNode;

          after(finalNode, parentNode);
        }
        break;
      }
      case 'ThisExpression:before': {
        if (!node.$p.forAlias) {
          const newNode = AST.identifier(thisStack[thisStack.length - 1]?.$p.thisAliasName ?? 'undefined');
          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;
        }
        break;
      }
      case 'TryStatement:after': {
        if (node.handler && !node.handler.param) {
          rule('Catch clauses must have a var');
          example('try {} catch {}', 'try {} catch (e) {}');
          before(node);

          node.handler.param = AST.identifier(createFreshVar('e', fdata));

          after(node);
        }

        if (node.handler && node.finalizer) {
          // Note: the transform is expecting try-catch-finally to be split up so we monkeypatch it here.
          rule('Try with both handler and finalizer should be split');
          example('try {} catch {} finally {}', 'try { try {} catch {} } finally {}');
          before(node);

          const tmp = AST.tryCatchStatement(node.block, null, AST.blockStatement(), true);
          tmp.handler = node.handler;
          node.block = AST.blockStatement(tmp);
          node.handler = null;

          after(node);
        }

        // Eliminate finally in favor of a catch and some boiler plate. Finally is just a far more complex beast to reason about.
        if (node.finalizer) {
          // Finally is actually a complex beast, especially for reference tracking
          // and code flow analysis and it's so much easier not to have to worry about it.
          rule('A finally must be converted to a Catch');
          example('try { a } finally { b }', 'let $action = 0; let $use = undefined; try { a } catch (e) { $action = 1; $use = e; } b; if ($action === 1) throw $use;');
          example('try { return a(); } finally { b }', 'let $action = 0; let $use = undefined; A: { try { $action = 1; $use = a; break A; } catch (e) { $action = 2; $use = e; } } b; if ($action === 1) return $use; if ($action === 2) throw $use;');
          example('try { return a } finally { return b }', 'let $action = 0; let $use = undefined; A: { try { $action = 1; $use = a; break A; } catch (e) { $action = 2; $use = e; } } return b; if ($action === 1) return $use; if ($action === 2) throw $use;');

          before(node);

          // This one is non-trivial but not _that_ difficult
          // We need to collect all abrupt completions that could be trapped by the finally
          // - must be same function
          // - we walk in-to-out so I think there cannot be any nested finally left, so we don't have to worry about that
          // - so we scan for all the keywords; return, throw, break (continue should be out already).
          //   - for throw, make sure it's not caught by a nested catch
          //   - for break, make sure the target label is an ancestor of the try otherwise they're irrelevant
          // Next:
          // - Inject an $action let
          // - For each return/throw keyword, inject a dedicated $use<i> let (ignore for break), plus one for the fresh catch
          // - Create a fresh label
          // - Wrap the try in a labeled block with this label
          // - Replace each keyword with a keyword-specific transform, where i is the nth keyword to transform:
          //   - throw: { $action = ++i; $use<i> = <node.argument>; break <label> }
          //   - return: { $action = ++i; $use<i> = <node.argument>; break <label> }
          //   - break: { $action = ++i; break <label> }
          // - Move the contents of the finally block to after the (new label)
          //   - Wrap the label in a new block to inject this stuff into
          // - Replace the now empty `finally {}` with `catch(e) { $action = ++i; $use = e; }`
          // - At the end of the (fresh) outer block, append abrupt completions, one for each keyword + the (new) catch:
          //   - return/throw: `if ($action === <i>) return $use<i> / throw $use<i>`
          //   - break: `if ($action === <i>) break;` and compile the label name if the keyword had one.


          const breakStack = [];
          const tryNodeStack = [];
          const labelNodeStack = [];

          // {keyword: string, actionName: string, argName: string, labelName: string}
          const keywords = [
            // Implicit throw must go first otherwise logic may be incorrect
            {keyword: 'throw', actionName: createFreshVar('$implicitThrow', fdata), argName: createFreshVar('$finalCatchArg', fdata)}
          ];
          // Note: this is just a placeholder because we don't know the body yet.
          const labelStatementNode = createFreshLabelStatement('$finally', fdata, AST.blockStatement());

          const rootNode = node;
          function _walker(node, beforeWalk, nodeType, path) {
            ASSERT(node, 'node should be truthy', node);
            ASSERT(nodeType === node.type);

            const pathNodes = path.nodes;
            const pathProps = path.props;
            const pathIndexes = path.indexes;

            const parentNode = pathNodes[pathNodes.length - 2];
            const parentProp = pathProps[pathProps.length - 1];
            const parentIndex = pathIndexes[pathIndexes.length - 1];

            const key = nodeType + ':' + (beforeWalk ? 'before' : 'after');
            switch (key) {
              case 'SwitchStatement:before':
                ASSERT(false, 'switch shouldnt exist anymore on the way back because it was eliminated by this phase??');
                breakStack.push(node);
                // fall-through
              case 'DoWhileStatement:before':
                ASSERT(false, 'dowhile shouldnt exist anymore on the way back because it was eliminated by this phase?');
                // fall-through
              case 'ForStatement:before':
              case 'ForInStatement:before':
              case 'ForOfStatement:before':
              case 'WhileStatement:before':
              {
                breakStack.push(node);
                break;
              }

              case 'SwitchStatement:after':
                ASSERT(false, 'switch shouldnt exist anymore on the way back because it was eliminated by this phase?');
                breakStack.pop();
              // fall-through
              case 'DoWhileStatement:after':
                ASSERT(false, 'dowhile shouldnt exist anymore on the way back because it was eliminated by this phase?');
                // fall-through
              case 'ForStatement:after':
              case 'ForInStatement:after':
              case 'ForOfStatement:after':
              case 'WhileStatement:after':
              {
                if (node.$p.newAbrupt) parentNode.$p.newAbrupt = true;
                breakStack.pop(node);
                break;
              }

              case 'FunctionDeclaration:before':
                ASSERT(false, 'funcdecl shouldnt exist anymore on the way back because it was eliminated by this phase?');
                // fall-through
              case 'FunctionExpression:before':
              case 'ArrowFunctionExpression:before'
              : {
                return true; // Do not traverse
              }

              case 'BlockStatement:before': {
                if (node !== rootNode.block) {
                  if (parentNode.type === 'TryStatement' && parentNode.block === node) {
                    // This is the Try Block. That's important because the Catch Block is not trapped.
                    ASSERT(!node.finalizer, 'we should be on the way down the AST and any sub-tree finally should be eliminated already');
                    tryNodeStack.push(node);
                  }
                }
                break;
              }
              case 'BlockStatement:after': {
                if (node.$p.newAbrupt && (parentNode && parentProp === 'block')) parentNode.$p.newAbrupt = true;
                if (node !== rootNode.block) {
                  if (parentNode.type === 'TryStatement' && parentNode.block === node) {
                    tryNodeStack.pop();
                  }
                }
                break;
              }

              case 'LabeledStatement:before': {
                labelNodeStack.push(node);
                break;
              }
              case 'LabeledStatement:after': {
                if (node.$p.newAbrupt) parentNode.$p.newAbrupt = true;
                labelNodeStack.pop();
                break;
              }

              case 'ReturnStatement:after': {
                parentNode.$p.newAbrupt = true;
                const arg = createFreshVar('$finalArg', fdata);
                const actionName = createFreshVar('$finalStep', fdata);
                keywords.push({keyword: 'return', actionName, argName: arg});
                const labelNode = AST.identifier(labelStatementNode.label.name)
                const freshNode = AST.blockStatement(
                  AST.expressionStatement(AST.assignmentExpression(actionName, AST.primitive(true))),
                  AST.expressionStatement(AST.assignmentExpression(arg, node.argument ?? AST.identifier('undefined'))),
                  AST.breakStatement(labelNode),
                );
                addLabelReference(fdata, labelNode, freshNode.body, 2);
                if (parentIndex < 0) parentNode[parentProp] = freshNode;
                else parentNode[parentProp][parentIndex] = freshNode;
                break;
              }
              case 'ThrowStatement:after': {
                parentNode.$p.newAbrupt = true;
                if (tryNodeStack.length) {
                  // Ignore. This throw is unconditionally caught by the catch. So unless the
                  // catch throws too, we don't care. And if the catch throws we'll handle it.
                } else {
                  before(node, parentNode);
                  const arg = createFreshVar('$finalArg', fdata);
                  const actionName = createFreshVar('$finalStep', fdata);
                  keywords.push({keyword: 'throw', actionName, argName: arg});
                  const labelNode = AST.identifier(labelStatementNode.label.name)
                  const freshNode = AST.blockStatement(
                    AST.expressionStatement(AST.assignmentExpression(actionName, AST.primitive(true))),
                    AST.expressionStatement(AST.assignmentExpression(arg, node.argument)), // throw arg can't be null
                    AST.breakStatement(labelNode),
                  );
                  addLabelReference(fdata, labelNode, freshNode.body, 2);
                  if (parentIndex < 0) parentNode[parentProp] = freshNode;
                  else parentNode[parentProp][parentIndex] = freshNode;
                  after(freshNode, parentNode);
                }
                break;
              }
              case 'BreakStatement:after': {
                parentNode.$p.newAbrupt = true;
                if (node.label) {
                  if (labelNodeStack.some(node => node.label.name === node.label.name)) {
                    // Ignore. The break stays inside the try
                  } else {
                    const actionName = createFreshVar('$finalStep', fdata);
                    keywords.push({keyword: 'break', actionName, labelName: node.label.name});

                    const labelNode = AST.identifier(labelStatementNode.label.name)
                    const freshNode = AST.blockStatement(
                      AST.expressionStatement(AST.assignmentExpression(actionName, AST.primitive(true))),
                      AST.breakStatement(labelNode),
                    );
                    addLabelReference(fdata, labelNode, freshNode.body, 1);
                    if (parentIndex < 0) parentNode[parentProp] = freshNode;
                    else parentNode[parentProp][parentIndex] = freshNode;
                  }
                } else {
                  if (breakStack.length) {
                    // Ignore
                  } else {
                    const actionName = createFreshVar('$finalStep', fdata);
                    keywords.push({keyword: 'break', actionName, labelName: undefined});

                    const labelNode = AST.identifier(labelStatementNode.label.name)
                    const freshNode = AST.blockStatement(
                      AST.expressionStatement(AST.assignmentExpression(actionName, AST.primitive(true))),
                      AST.breakStatement(labelNode),
                    );
                    addLabelReference(fdata, labelNode, freshNode.body, 1);
                    if (parentIndex < 0) parentNode[parentProp] = freshNode;
                    else parentNode[parentProp][parentIndex] = freshNode;
                  }
                }
                break;
              }

              case 'TryStatement:after': {
                // Both the try block and the catch must complete abruptly for the code after the Try to be guaranteed to be unreachable
                if (node.block.$p.newAbrupt && node.handler.body.$p.newAbrupt) {
                  parentNode.$p.newAbrupt = true;
                }

                break;
              }
            } // switch(key)
          } // /walker

          vgroup();
          vgroup();
          vgroup('Walking try again...');
          walk(_walker, node.block, 'block');
          vgroupEnd();
          vgroupEnd();
          vgroupEnd();

          const implicitName = createFreshVar('$finalImplicit', fdata);

          // If the finally had one or two (or three?) simple statements with no children then instead it should
          // copy these with a forced throw in the catch, because it's simpler than the if/else boilerplate.

          const fbody = node.finalizer.body;

          let newCatchBody;
          let skipCatchBoiler = false;

          vlog('Checking if finally is small and simple...');
          if (fbody.length === 1 && fbody[0].type === 'ExpressionStatement' && isSortOfSimpleNode(fbody[0].expression)) {
            vlog('- Finally has one simplish expression statement');
            newCatchBody = AST.blockStatement(
              AST.expressionStatement(cloneSortOfSimple(fbody[0].expression)),
              AST.throwStatement(AST.identifier(implicitName)),
            );
            skipCatchBoiler = true;
          }
          else if (
            fbody.length === 2 &&
            fbody[0].type === 'ExpressionStatement' && isSortOfSimpleNode(fbody[0].expression) &&
            fbody[1].type === 'ExpressionStatement' && isSortOfSimpleNode(fbody[1].expression)
          ) {
            vlog('- Finally has two simplish expression statements');
            newCatchBody = AST.blockStatement(
              AST.expressionStatement(cloneSortOfSimple(fbody[0].expression)),
              AST.expressionStatement(cloneSortOfSimple(fbody[1].expression)),
              AST.throwStatement(AST.identifier(implicitName)),
            );
            skipCatchBoiler = true;
          }
          else if (
            fbody.length === 2 &&
            fbody[0].type === 'ExpressionStatement' && isSortOfSimpleNode(fbody[0].expression) &&
            fbody[1].type === 'ExpressionStatement' && isSortOfSimpleNode(fbody[1].expression) &&
            fbody[2].type === 'ExpressionStatement' && isSortOfSimpleNode(fbody[2].expression)
          ) {
            vlog('- Finally has two simplish expression statements');
            newCatchBody = AST.blockStatement(
              AST.expressionStatement(cloneSortOfSimple(fbody[0].expression)),
              AST.expressionStatement(cloneSortOfSimple(fbody[1].expression)),
              AST.expressionStatement(cloneSortOfSimple(fbody[2].expression)),
              AST.throwStatement(AST.identifier(implicitName)),
            );
            skipCatchBoiler = true;
          }
          if (skipCatchBoiler) {
            keywords.unshift(); // Remove the first element, which is the implicit throw
          } else {
            newCatchBody = AST.blockStatement(
              // $action = ++i
              // $use = $implicit
              AST.expressionStatement(AST.assignmentExpression(AST.identifier(keywords[0].actionName), AST.primitive(true))),
              AST.expressionStatement(AST.assignmentExpression(AST.identifier(keywords[0].argName), AST.identifier(implicitName))),
            );
          }


          const catchNode = AST.tryCatchStatement(node.block, implicitName, newCatchBody);
          const labelBody = AST.blockStatement(
            catchNode,
          );

          // All these keywords are conditionally to being executed. However, if all the completions
          // in the Try Block are (explicitly) abrupt then the last condition can be skipped because
          // we know it's guaranteed to be true. This allows us to create an if-else chain which is
          // easier to reason about down the line.
          // However, when the Try Block also implicitly complete we have to add an empty Block to
          // the conditions to make sure it does check whether the last completion code path was or
          // wasn't executed.
          // Note that if the original finally body would complete explicitly then that would still
          // override any of these in the transformation because those are appended to the body now.

          const conditions = keywords.map(({keyword, actionName, argName, labelName}) => {
            return [
              AST.identifier(actionName),
              keyword === 'return'
                ? AST.returnStatement(AST.identifier(argName)) :
                keyword === 'throw'
                ? AST.throwStatement(AST.identifier(argName)) :
                keyword === 'break'
                ? AST.breakStatement(labelName) :
                ASSERT(false, `what keyword? ${keyword}`)
            ];
          });
          if (!node.block.$p.newAbrupt) {
            conditions.push([null, AST.blockStatement()]); // Empty else
          }

          const finalLabelStatementNode = AST.labeledStatement(AST.identifier(labelStatementNode.label.name), labelBody);
          updateGlobalLabelStatementRef(fdata, finalLabelStatementNode);
          const wrapper = AST.blockStatement(
            ...keywords.map(({actionName}) => AST.variableDeclaration(actionName, AST.primitive(false), 'let', true)),
            ...keywords.map(({argName}) => argName && AST.variableDeclaration(argName, AST.primitive(undefined), 'let', true)).filter(Boolean),
            finalLabelStatementNode,
            node.finalizer, // We won't be using this anymore anyways since we'll replace it
            AST.ifElseChain(conditions, undefined, true)
          );

          assertNoDupeNodes(wrapper);

          if (parentIndex < 0) parentNode[parentProp] = wrapper;
          else parentNode[parentProp][parentIndex] = wrapper;

          after(wrapper);

          // byebye TryStatement
          break;
        }

        break;
      }
      case 'WhileStatement:before': {
        loopStack.push(node);
        if (parentNode.type === 'LabeledStatement') {
          node.$p.parentLabel = parentNode.label.name;
        }
        break;
      }
      case 'WhileStatement:after': {
        loopStack.pop();
        break;
      }
    }

    vgroupEnd();
  }

  //currentState(fdata, 'end of once', true, fdata);

  groupEnd();
}
function hoistingOnce(hoistingRoot, from) {
  ASSERT(
    ['Program', 'FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(hoistingRoot.type),
    'hoisting should only apply to hoisting roots',
    hoistingRoot,
  );

  ASSERT(hoistingRoot.$p.hoistedVars, 'the hoistedVars should exist on anything that can hoist', hoistingRoot);
  vlog('hoistingOnce; Hoisting', hoistingRoot.$p.hoistedVars.length, 'elements from hoistingroot @', +hoistingRoot.$p.pid);

  // There are two things in three contexts that we hoist
  // - functions and variables
  // - exports and non-exports
  // - named exports and default export (with id)

  // The function declaration can appear in a root scope (global / func), an export default, or named export
  // The var decls can appear in scope roots, blocks, or named exports
  // So the table looks like this:
  // - func decl in global
  // - func decl in func
  // - func decl in named export
  // - func decl in default export (must have id, we ignore anon funcs)
  // - var decl in global
  // - var decl in func
  // - var decl in block
  // - var decl in named export
  // - var decl in for-loop (regular), shouldn't matter where the for is
  // - var decl in for-of / for-in loop, shouldn't matter where the for is
  // (There's a base test case for at least each of these)

  // The exports are all rewritten to named exports in the `export {X}` form
  // The default export needs to use the `{f as default}` form
  // The set of var names needs to be reduced by the name of hoisted functions
  // Actions:
  // - All vars are printed as `var x;` at the top, ordered by name
  // - All functions are moved to the top, below the hoisted var names, ordered by name
  // - All exported names are added at the bottom
  // - All var decls with inits are replaced with assignments
  // - All decls in a for-in or for-of header lhs are replaced with the .id

  const rootBody = hoistingRoot.type === 'Program' ? hoistingRoot.body : hoistingRoot.body.body;

  if (hoistingRoot.$p.hoistedVars.length) {
    // Note: the parent can be a scope root (global/func), or export (named/default)
    // hoistedVars -> Array<[node, parentNode, parentProp, parentIndex]>
    group();
    vlog('Step 1: process bindings');
    rule('Bindings with `var` and function declarations should be pre-hoisted in AST, even if exported');
    example('f(x); var x = 10; f(x);', 'let x; f(x); x = 10; f(x);');
    example('f(x); export var x = 10; f(x);', 'let x; f(x); x = 10; f(x); export {x};');
    example('f(x); export default function f() {}; f(x);', 'let f = function(){} f(x); f(x); export {f as default};');
    before(hoistingRoot);

    const funcsToMove = [];
    const varNames = [];
    const exportedNames = new Set();
    let exportDefault = ''; // There's at most one of these.
    hoistingRoot.$p.hoistedVars.forEach(([what, hoistNode, parentNode, parentProp, parentIndex, exportIndex]) => {
      group();
      vlog(
        '  - Hoisting step. From ' +
          from +
          '; what = ' +
          what +
          '. Node is a `' +
          hoistNode.type +
          '`, parent: `' +
          parentNode.type +
          '.' +
          parentProp +
          (parentIndex >= 0 ? '[' + parentIndex + ']' : '') +
          '`' +
          (exportIndex >= 0 ? ', export node at global.body[' + exportIndex + ']' : '') +
          (' (`' + (hoistNode.id?.name ?? hoistNode.declarations?.[0]?.id?.name ?? '<unknown>') + '`)'),
      );
      group();

      ASSERT(
        (parentIndex >= 0 ? parentNode[parentProp][parentIndex] : parentNode[parentProp]) === hoistNode,
        'indexes should not be stale',
      );
      ASSERT(parentNode.type.includes('Export') === exportIndex >= 0, 'export index is set iif the parent is an export');
      ASSERT(parentNode.type !== 'FunctionExpression' && parentNode.type !== 'ArrowFunctionExpression', 'why not check this?');

      switch (parentNode.type) {
        case 'Program':
        case 'FunctionDeclaration':
        case 'BlockStatement': {
          if (hoistNode.type === 'FunctionDeclaration') {
            vlog('Queueing Function to be moved from program/func/block, removing it from its current parent');
            funcsToMove.push([hoistNode, parentNode, parentProp, parentIndex, exportIndex]);
            // We will inject this node at the top
            if (parentIndex < 0) parentNode[parentProp] = AST.emptyStatement();
            else parentNode[parentProp][parentIndex] = AST.emptyStatement();
          } else {
            vlog('Queueing bindings to be moved from program/func/block');
            before(hoistNode);
            const newNodes = [];

            // Decl is not normalized. Can have any number of declarators, can still be pattern
            vlog('Searching through', hoistNode.declarations.length, 'decrs');
            hoistNode.declarations.forEach((decr) => {
              vlog('Searching', decr)
              findBoundNamesInVarDeclaratorOrVarStatement(decr, varNames);
              vlog('- Decr defined these names:', varNames);
              // Now we have the names, remove the var keyword from the declaration
              // If there was no init, ignore this step
              // Patterns must have an init (strict syntax) except as lhs of for-in/for-of
              if (decr.init) {
                newNodes.push(AST.assignmentExpression(decr.id, decr.init));
              }
            });
            // Must replace one node with one new node to preserve indexes of other var statements that appear later
            ASSERT(parentIndex >= 0, 'var decls in global/func/block must be inside a body array');
            const newNode = newNodes.length === 0
              ? AST.emptyStatement()
              : AST.expressionStatement(newNodes.length === 1 ? newNodes[0] : AST.sequenceExpression(newNodes));
            if (parentIndex < 0) parentNode[parentProp] = newNode;
            else parentNode[parentProp][parentIndex] = newNode;

            after(newNodes);
          }
          break;
        }

        case 'ForStatement': {
          if (parentProp === 'body') {
            // for (..) var x = y;

            rule('A for-sub-statement that is a variable declaration should be hoisted');
            example('if (x) var y = z;', 'var y; if (x) y = z;');
            before(hoistNode, parentNode);

            findBoundNamesInVarDeclaration(hoistNode, varNames);
            parentNode.body = AST.expressionStatement(
              AST.assignmentExpression(hoistNode.declarations[0].id, hoistNode.declarations[0].init || AST.identifier('undefined')),
            );

            after(hoistNode);
          } else {
            // Regular loop. If there's an init, replace with assignment. Otherwise drop it entirely.
            before(hoistNode, parentNode);
            const newNodes = [];

            // Decl is not normalized. Can have any number of declarators, can still be pattern
            hoistNode.declarations.forEach((decl) => {
              findBoundNamesInVarDeclaratorOrVarStatement(decl, varNames);
              // Now we have the names, remove the var keyword from the declaration
              // If there was no init, ignore this step
              // Patterns must have an init (strict syntax) except as lhs of for-in/for-of
              if (decl.init) {
                newNodes.push(AST.assignmentExpression(decl.id, decl.init));
              }
            });
            // Must replace one node with one new node to preserve indexes of other var statements that appear later
            ASSERT(parentIndex === -1, 'var decls in global/func/block must be inside a body array');
            parentNode[parentProp] =
              newNodes.length === 0 ? AST.identifier('undefined') : newNodes.length === 1 ? newNodes[0] : AST.sequenceExpression(newNodes);

            after(newNodes, parentNode);
          }
          break;
        }

        case 'ForInStatement':
        case 'ForOfStatement':
          if (parentProp === 'body') {
            // for (..) var x = y;

            rule('A forx-sub-statement that is a variable declaration should be hoisted');
            example('if (x) var y = z;', 'var y; if (x) y = z;');
            before(hoistNode, parentNode);

            findBoundNamesInVarDeclaration(hoistNode, varNames);
            parentNode.body = AST.expressionStatement(
              AST.assignmentExpression(hoistNode.declarations[0].id, hoistNode.declarations[0].init || AST.identifier('undefined')),
            );

            after(hoistNode);
          } else {
            // For of/in.
            // Should always be var decl, not func decl
            // Should always introduce one binding
            // Should not have an init (syntax bound)
            // Always replace decl with the .id, even if pattern.
            ASSERT(hoistNode.type === 'VariableDeclaration');
            ASSERT(hoistNode.declarations.length === 1, 'should have exactly one declarator');
            ASSERT(!hoistNode.declarations[0].init, 'should not have init');

            before(hoistNode, parentNode);
            const newNodes = [];

            // Decl is not normalized but somewhat limited due to for-syntax
            findBoundNamesInVarDeclaration(hoistNode, varNames);
            ASSERT(parentIndex === -1, 'var decls in for-header are not in an array', parentIndex);
            parentNode[parentProp] = hoistNode.declarations[0].id;

            after(newNodes, parentNode);
          }
          break;

        case 'ExportNamedDeclaration': {
          // Must be the `var` or `function` form to reach here.
          // Same as global except we must also eliminate the original export and track the exported names
          if (hoistNode.type === 'FunctionDeclaration') {
            funcsToMove.push([hoistNode, parentNode, parentProp, parentIndex]);
            hoistingRoot.body[exportIndex] = AST.emptyStatement();
            exportedNames.add(hoistNode.id.name);
          } else {
            before(hoistNode);
            const newNodes = [];

            // Decl is not normalized. Can have any number of declarators, can still be pattern
            hoistNode.declarations.forEach((decl) => {
              const boundNames = findBoundNamesInVarDeclaratorOrVarStatement(decl);
              boundNames.forEach((name) => {
                varNames.push(name);
                exportedNames.add(name);
              });

              // If there was an init prepare an assignment to retain semantics
              // Patterns must have an init (strict syntax) except as lhs of for-in/for-of so it should work out
              if (decl.init) {
                newNodes.push(AST.assignmentExpression(decl.id, decl.init));
              }
            });
            // Delete the export node. Replace it with the assignments or an empty statement. We'll inject a new one later.
            ASSERT(hoistingRoot.body[exportIndex] === parentNode, 'this is why we pass on exportIndex');
            hoistingRoot.body[exportIndex] =
              newNodes.length === 0
                ? AST.emptyStatement()
                : newNodes.length === 1
                ? AST.expressionStatement(newNodes[0])
                : AST.expressionStatement(AST.sequenceExpression(newNodes));

            after(newNodes.length === 0 ? AST.emptyStatement() : newNodes);
          }
          break;
        }

        case 'ExportDefaultDeclaration': {
          ASSERT(hoistNode.type === 'FunctionDeclaration');
          funcsToMove.push([hoistNode, parentNode, parentProp, parentIndex]);
          hoistingRoot.body[exportIndex] = AST.emptyStatement();
          exportedNames.add(hoistNode.id.name);
          exportDefault = hoistNode.id.name; // max one of these ever
          break;
        }

        case 'SwitchCase': {
          // Switch case shares scope with all other in the same switch body. For hoisting not special.
          // If there's an init, replace with assignment. Otherwise drop it entirely.
          before(hoistNode, parentNode);
          const newNodes = [];

          if (hoistNode.type === 'FunctionDeclaration') {
            funcsToMove.push([hoistNode, parentNode, parentProp, parentIndex, exportIndex]);
            // We will inject this node at the top
            if (parentIndex < 0) parentNode[parentProp] = AST.emptyStatement();
            else parentNode[parentProp][parentIndex] = AST.emptyStatement();
          } else {
            // Decl is not normalized. Can have any number of declarators, can still be pattern
            hoistNode.declarations.forEach((decl) => {
              findBoundNamesInVarDeclaratorOrVarStatement(decl, varNames);
              // Now we have the names, remove the var keyword from the declaration
              // If there was no init, ignore this step
              // Patterns must have an init (strict syntax) except as lhs of for-in/for-of
              if (decl.init) {
                newNodes.push(AST.assignmentExpression(decl.id, decl.init));
              }
            });
            // Must replace one node with one new node to preserve indexes of other var statements that appear later
            ASSERT(parentIndex >= 0, 'var decls in switch case must be inside an array');
            parentNode[parentProp][parentIndex] = AST.expressionStatement(
              newNodes.length === 0 ? AST.identifier('undefined') : newNodes.length === 1 ? newNodes[0] : AST.sequenceExpression(newNodes),
            );
          }

          after(newNodes, parentNode);
          break;
        }

        case 'DoWhileStatement':
        case 'IfStatement':
        case 'LabeledStatement':
        case 'WhileStatement': {
          // if (x) var y = z;
          // do var x = y; while (z);
          // while (x) var y = z;

          ASSERT(
            parentNode.type === 'IfStatement' ? parentProp === 'consequent' || parentProp === 'alternate' : parentProp === 'body',
            'this should concern a var decl as the body of a statement',
            parentProp,
          );

          rule('A sub-statement that is a variable declaration should be hoisted');
          example('do var y = z; while (x);', 'var y; do y = z; while (x);', () => parentNode.type === 'DoWhileStatement');
          example('if (x) var y = z;', 'var y; if (x) y = z;', () => parentNode.type === 'IfStatement');
          example('foo: var y = z;', 'var y; foo: y = z;', () => parentNode.type === 'LabeledStatement');
          example('while (x) var y = z;', 'var y; while (x) y = z;', () => parentNode.type === 'WhileStatement');
          before(hoistNode, parentNode);

          // Note: this var may introduce multiple bindings (!)
          const newNodes = [];
          hoistNode.declarations.forEach((decl) => {
            findBoundNamesInVarDeclaratorOrVarStatement(decl, varNames);
            // Now we have the names, remove the var keyword from the declaration
            // If there was no init, ignore this step
            // Patterns must have an init (strict syntax) except as lhs of for-in/for-of
            if (decl.init) {
              newNodes.push(AST.assignmentExpression(decl.id, decl.init));
            }
          });

          parentNode[parentProp] =
            newNodes.length === 0
              ? AST.emptyStatement()
              : newNodes.length === 1
              ? AST.expressionStatement(newNodes[0])
              : AST.expressionStatement(AST.sequenceExpression(newNodes));

          after(parentNode[parentProp]);
          break;
        }

        default:
          console.dir(parentNode, { depth: null });
          ASSERT(false, 'what other node holds var or func decls?', parentNode);
      }

      log('End of Hoisting step');
      groupEnd();
      groupEnd();
    });

    // All the `var` names in this hoistingRoot
    const declarVarNamesSet = new Set(varNames);
    vgroup('Step 2: Removing func.id and prune param names from the hoisted var decl set (', declarVarNamesSet.size, ' names before)');
    // Drop func names from the list of hoisted var names (anon func decl export should not end up in this list)
    const dupeFunc = new Map();
    funcsToMove.forEach(([hoistNode, rootIndex, rootChild, exportProp]) => {
      declarVarNamesSet.delete(hoistNode.id.name);
      // Note: if there are two func decls with the same name in the same scope then we only keep the last one.
      dupeFunc.set(hoistNode.id.name, hoistNode);
    });
    vgroupEnd();
    const uniqueFuncs = Array.from(dupeFunc.values());

    // Try to find a param on function.params
    vgroup('Step 3: drop names that are also params (set now has', declarVarNamesSet.size, 'names)');
    if (hoistingRoot.type !== 'Program') {
      declarVarNamesSet.forEach((name) => {
        if (hoistingRoot.params.some((pnode) => pnode.type === 'Identifier' && pnode.name === name)) {
          declarVarNamesSet.delete(name);
          vlog('- The binding name `' + name + '` was also a parameter so not adding the var decl for it (', declarVarNamesSet.size, ' names left)');
        }
      });
    }
    vgroupEnd()

    vlog(
      'Queued',
      funcsToMove.length,
      'functions and',
      varNames.length,
      'var names and',
      exportedNames.size,
      'exports for hoisting (actually adding',
      declarVarNamesSet.size,
      'var names after filtering)',
    );

    // This will invalidate all cached indexes moving forward!

    vgroup('Step 4: sort func list and generate new let decls for them (' + uniqueFuncs.size + ' funcs to do)');
    // Sort them and then inject them at the top.
    uniqueFuncs.sort((a, b) => (a.id.name < b.id.name ? -1 : a.id.name > b.id.name ? 1 : 0));
    const newFuncs = uniqueFuncs.map((hoistNode) => {
      // Convert to let assignment. Strip the name (prevents accidental shadowing)
      const name = hoistNode.id.name;
      hoistNode.id = null;
      hoistNode.type = 'FunctionExpression';
      return AST.variableDeclaration(name, hoistNode, 'let', true); // probably const eventually
    });
    rootBody.unshift(...newFuncs);
    vgroupEnd();

    vgroup('Step 5: Create new vars for the var decls to be hoisted (' + declarVarNamesSet.size + ' names)');
    const sorted = Array.from(declarVarNamesSet).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    rootBody.unshift(
      ...sorted.map((name) => {
        // Exports are already replaced
        // Create lets with explicit init to `undefined`. Eliminates all vars this way.
        return AST.variableDeclaration(name, AST.identifier('undefined'), 'let', true);
      }),
    );
    vgroupEnd();

    // Push the named exports at the end of the body (doesn't really matter where they appear; they will be live bindings)
    // Special case the default export. Note that default function exports are live bindings as well, unlike default expressions.
    rootBody.push(
      ...Array.from(exportedNames).map((name) => AST._exportNamedDeclarationFromNames(name, name === exportDefault ? 'default' : name)),
    );

    hoistingRoot.$p.hoistedVars.length = 0; // Clear it. We don't need it anymore.

    after(hoistingRoot);

    groupEnd();
    vlog('/Hoisting true');
    return true;
  }

  vlog('/Hoisting false');

  return false;
}

function simpleAbruptCheck(node) {
  // This is for a switch case pre-check
  if (node.type === 'ReturnStatement') return true;
  if (node.type === 'BreakStatement') return true;
  if (node.type === 'ThrowStatement') return true;
  if (node.type === 'ContinueStatement') return true;

  if (node.type === 'BlockStatement') {
    if (node.body.length === 0) return false;
    // If the last statement returns abruptly then break must abrupt
    // Since this isn't normalized there may be more cases (prior to DCE) that this logic does not capture.
    if (simpleAbruptCheck(node.body[node.body.length - 1])) return true;
    return node.$p.completesAbrupt;
  }
  if (node.type === 'IfStatement') {
    return (
      node.alternate && // Code is not yet normalized so the `else` may not exist. In that case the `if` does not always complete.
      (node.$p.completesAbruptConsequent || simpleAbruptCheck(node.consequent)) &&
      (node.$p.completesAbruptAlternate || simpleAbruptCheck(node.alternate))
    );
  }
  // Try, loops, nested switches, etc are unsafe.
  // TODO: if we'd distinct between throw/return and break/continue then loops would work too. try is much harder tho.
  return false;
}
