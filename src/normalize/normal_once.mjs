// This step should normalize things that should not reappear in any other step of Preval.
// This step should not contain rules that may need to be re-applied multiple times throughout, unless required for this step.
// - Elimination of certain node types: SwitchStatement, FunctionDeclaration, ForStatement, ClassDeclaration, DoWhileStatement,
//                                      ExportDefaultDeclaration, ImportDefaultDeclaration
// - VarDeclaration with kind=var
// - Function param defaults
// - All kinds of patterns
// - All exports are converted to ExportNamedDeclaration with the `export {x as y}` style exclusively (even for default)
// - All imports are consolidated to regular import statements that import exactly one symbol im the `import {x} from "y"` style

import walk from '../../lib/walk.mjs';

import { BLUE, RESET , THIS_ALIAS_BASE_NAME, ARGUMENTS_ALIAS_BASE_NAME, ARGLENGTH_ALIAS_BASE_NAME} from '../constants.mjs';
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
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import {
  createFreshLabel,
  createFreshVar,
  findBoundNamesInVarDeclaration,
  findBoundNamesInVarDeclarator,
  getIdentUsageKind,
} from '../bindings.mjs';

export function phaseNormalOnce(fdata) {
  const ast = fdata.tenkoOutput.ast;
  const thisStack = [];

  group('\n\n\n##################################\n## phaseNormalOnce  ::  ' + fdata.fname + '\n##################################\n\n\n');

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
            node.declaration.declarations.forEach((decr) => findBoundNamesInVarDeclarator(decr, names));
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
              AST.variableDeclaration(node.declaration.id, node.declaration, 'let'),
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
              AST.variableDeclaration(tmpName, node.declaration, 'const'),
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
            AST.variableDeclaration(tmpName, node.declaration, 'const'),
            AST._exportNamedDeclarationFromNames(tmpName, 'default'),
          );

          after(ast.body[i]);
          after(ast.body[i + 1]);
        }
        break;
      }
    }
  }

  vlog('\nState after export normalization\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  // All other transforms in this file can be wrapped in a block, so they shouldn't need to change the parent child count/order.

  walk(_walker, ast, 'ast');
  function _walker(node, beforeNode, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    vgroup(BLUE + nodeType + ':' + (beforeNode ? 'before' : 'after'), RESET);

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
        if (node.$p.hasFuncDecl) {
          vlog('Should find at least one func decl in this block...');
        }
        const varDeclsToHoist = []; // Note: these are block scoped var decls.
        for (let i = 0; i < node.body.length; ++i) {
          const enode = node.body[i];
          if (enode.type === 'FunctionDeclaration') {
            if (enode.$p.isBlockFuncDecl) {
              ASSERT(node.$p.hasFuncDecl, 'parent block should be marked as having a func decl', node);
              vlog('- Found a func decl');
              // Hoist it to the top of the block as a var statement...
              varDeclsToHoist.push(enode);
              node.body.splice(i, 1);
              --i;
            }
          }
        }
        if (varDeclsToHoist.length) {
          rule('Hoist block scoped var decls to the top of the block, sort them, and convert them to `let` decls');
          example('{ f(); function f(){} }', '{ let f = function(){}; f(); }');
          before(node);

          varDeclsToHoist.sort(({ id: a }, { id: b }) => (a < b ? -1 : a > b ? 1 : 0));
          const newNodes = varDeclsToHoist.map((enode) => {
            group();
            before(enode);

            const decl = AST.variableDeclaration(enode.id, enode, 'let'); // If we did not have strict mode then this would be var. But import code is strict so this is let, probably even const.
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
        break;
      }
      case 'ClassDeclaration:before': {
        rule('Class declaration should be let expression'); // Probably const...
        example('class x {}', 'let x = class {}');
        before(node);

        // It's probably const. We could even make this a config option although it shouldn't matter much for us.
        const newNode = AST.variableDeclaration(node.id, AST.classExpression(null, node.superClass, node.body), 'let');
        if (parentIndex < 0) parentNode[parentProp] = newNode;
        else parentNode[parentProp][parentIndex] = newNode;

        after(newNode);
        break;
      }
      case 'DoWhileStatement:after': {
        // We have to convert do-while to regular while because if the body contains a continue it will jump to the end
        // which means it would skip any outlined code, unless we add worse overhead.
        // So instead we had to bite the bullet

        // Would love to merge the while's into one, but how...
        // `do {} while (f());` --> `let tmp = true; while (tmp || f()) { tmp = false; }`
        // `while (f()) {}` --> `if (f()) { do {} while(f()); }`
        // `for (a(); b(); c()) d();` --> `a(); if (b()) { do { d(); c(); } while (b());`

        if (parentNode.type === 'LabeledStatement') {
          // This is a labeled loop. We have to be careful here because a labeled continue is syntactically
          // required to point to a label that is a direct parentNode of a loop. And obviously we want to
          // preserve which loop the continue points too, as well.
          // To this end, we will rename the old label (parentNode) to something unused. Another rule will
          // drop the then unused label. The child of the label will become a block that contians a new
          // labeled (regular) while loop with the same label name as the old label. There are tests.

          rule('Labeled do-while must be labeled regular while');
          example(
            'foo: do { f(); continue foo; } while(g());',
            'unused: { let tmp = true; foo: while (tmp || g()) { tmp = false; g(); continue foo; } }',
          );
          before(node, parentNode);

          const labelName = parentNode.label.name;
          const newLabelNode = createFreshLabel('dropme', fdata); // This label will not be used so will be eliminated
          const tmpName = createFreshVar('tmpDoWhileFlag', fdata);
          const newNodes = AST.blockStatement([
            AST.variableDeclaration(tmpName, AST.tru(), 'let'),
            AST.labeledStatement(
              labelName,
              AST.whileStatement(
                AST.logicalExpression('||', tmpName, node.test),
                AST.blockStatement(AST.expressionStatement(AST.assignmentExpression(tmpName, AST.fals())), ...node.body.body),
              ),
            ),
          ]);
          parentNode.label = newLabelNode;
          parentNode.body = newNodes;

          after(newNodes, parentNode);
        } else if (!node.$p.doesContinue) {
          // We can use a simpler pattern for this case. The continue case is harder since every occurrence would first need to
          // do the assignment as well which would lead to more code duplication. Maybe that's still acceptable, something TBD.
          rule('Do-while without continue must be simple regular while');
          example('do { f(); } while (g());', 'let tmp = true; while (tmp) { f(); tmp = g(); }');
          before(node, parentNode);

          const tmpName = createFreshVar('tmpDoWhileFlag', fdata);
          const newNodes = AST.blockStatement([
            AST.variableDeclaration(tmpName, AST.tru(), 'let'),
            AST.whileStatement(
              AST.identifier(tmpName),
              AST.blockStatement(node.body, AST.expressionStatement(AST.assignmentExpression(tmpName, node.test))),
            ),
          ]);

          if (parentIndex < 0) parentNode[parentProp] = newNodes;
          else parentNode[parentProp][parentIndex] = newNodes;

          after(newNodes, parentNode);
        } else {
          rule('Do-while must be regular while');
          example('do { f(); } while(g());', 'let tmp = true; while (tmp || g()) { tmp = false; g(); }');
          before(node, parentNode);

          const tmpName = createFreshVar('tmpDoWhileFlag', fdata);
          const newNodes = AST.blockStatement([
            AST.variableDeclaration(tmpName, AST.tru(), 'let'),
            AST.whileStatement(
              AST.logicalExpression('||', tmpName, node.test),
              AST.blockStatement(AST.expressionStatement(AST.assignmentExpression(tmpName, AST.fals())), node.body),
            ),
          ]);

          if (parentIndex < 0) parentNode[parentProp] = newNodes;
          else parentNode[parentProp][parentIndex] = newNodes;

          after(newNodes, parentNode);
        }

        // Byebye do-while
        break;
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
        if (parentNode.type === 'LabeledStatement') {
          // This is a labeled loop. We have to be careful here because a labeled continue is syntactically
          // required to point to a label that is a direct parentNode of a loop. And obviously we want to
          // preserve which loop the continue points too, as well.
          // To this end, we will rename the old label (parentNode) to something unused. Another rule will
          // drop the then unused label. The child of the label will become a block that contians a new
          // labeled (regular) while loop with the same label name as the old label. There are tests.

          rule('Labeled regular for-loop must be labeled regular while');
          example('foo: for(a(); b(); c()) { f(); continue foo; }', 'unused: { a(); foo: while (b()) { c(); f(); continue foo; } }');
          before(node, parentNode);

          const labelName = parentNode.label.name;
          const newLabelNode = createFreshLabel('dropme', fdata); // This label will not be used so will be eliminated
          const newNodes = AST.blockStatement(
            node.init ? (node.init.type === 'VariableDeclaration' ? node.init : AST.expressionStatement(node.init)) : AST.emptyStatement(),
            AST.labeledStatement(
              labelName,
              AST.whileStatement(
                node.test || AST.tru(),
                AST.blockStatement(node.body, node.update ? AST.expressionStatement(node.update) : AST.emptyStatement()),
              ),
            ),
          );
          parentNode.label = newLabelNode;
          parentNode.body = newNodes;

          after(newNodes, parentNode);
        } else {
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
        }
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

        const [headLogic, bodyLogic] = transformFunctionParams(node, fdata);
        const deb = AST.debuggerStatement();

        const aliases = [];

        if (node.$p.thisAccess) {
          const tmpName = createFreshVar(THIS_ALIAS_BASE_NAME, fdata);
          const thisNode = AST.thisExpression();
          thisNode.$p.forAlias = true;
          const newNode = AST.variableDeclaration(tmpName, thisNode, 'const');
          aliases.push(newNode);
          node.$p.thisAliasName = tmpName;
        }
        if (node.$p.readsArgumentsAny) {
          const tmpName = createFreshVar(ARGUMENTS_ALIAS_BASE_NAME, fdata);
          const argNode = AST.identifier('arguments');
          argNode.$p.forAlias = true;
          const newNode = AST.variableDeclaration(tmpName, argNode, 'const');
          aliases.push(newNode);
          node.$p.argumentsAliasName = tmpName;
        }
        if (node.$p.readsArgumentsLen) {
          const tmpName = createFreshVar(ARGLENGTH_ALIAS_BASE_NAME, fdata);
          const argNode = AST.memberExpression('arguments', 'length');
          argNode.$p.forAlias = true;
          argNode.object.$p.forAlias = true;
          const newNode = AST.variableDeclaration(tmpName, argNode, 'const');
          aliases.push(newNode);
          node.$p.argumentsLenAliasName = tmpName;
        }

        node.body.body.unshift(...aliases, ...headLogic, deb, ...bodyLogic);
        deb.$p.funcHeader = true; // Makes sure this statement won't be deleted in this normal_once step

        thisStack.push(node);

        break;
      }
      case 'FunctionExpression:after': {
        thisStack.pop();

        break;
      }
      case 'LabeledStatement': {
        const labelNode = createFreshLabel(node.label.name, fdata);
        if (node.label.name !== labelNode.name) {
          node.label = labelNode;
        }
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
          before(node, parentNode);

          if (parentIndex < 0) parentNode[parentProp] = AST.templateLiteral(node.value);
          else parentNode[parentProp][parentIndex] = AST.templateLiteral(node.value);

          after(parentNode);
        }
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
      case 'SwitchStatement:before': {
        vlog('Eliminating switch...');

        // We can take a simple path if and only if
        // - the case explicitly stops at the end
        // - the case does not explicitly stop anywhere else
        // - the switch does not contain a default that is not the last case
        // Either way we must still do the variable hoisting step first

        const newLabelIdentNode = createFreshLabel('tmpSwitchBreak', fdata);
        const wrapper = AST.blockStatement();
        const newLabelNode = AST.labeledStatement(newLabelIdentNode, wrapper);

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
                snode.declarations.forEach((n) => findBoundNamesInVarDeclarator(n, names));
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
                const newNode = AST.variableDeclaration(snode.id, snode, 'let');
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
            ...vars.map((name) => AST.variableDeclaration(name, undefined, 'var')),
            ...lets.map((name) => AST.variableDeclaration(name)),
            ...funcdecls,
          );

          after(wrapper);
        }

        // These are the cases to consider when doing abrupt completion analysis. The last case is irrelevant since we
        // only have to do this to cover fall-through (etc) situations.
        const casesForAbruptAnalysis = node.cases.slice(0, -1);

        // The case tests do not spy, just like if/while tests. So order is not very relevant.
        // If there is a fall-through case that has no body then the simple transform becomes `a === x || b === x`. That's okay.

        if (
          !node.$p.hasMiddleDefaultCase &&
          casesForAbruptAnalysis.every((c) => {
            // If the c completes, that's fine because it means one of its children completes directly
            // There's at least one statement of the consequent that explicitly breaks the code flow.
            if (c.$p.completesAbrupt) return true;
            // If the consequent is empty, then that's a case we can work with
            if (!c.consequent.length) return true;
            // Lastly, if there is any statement that is _guaranteed_ to complete abruptly then we are good to go
            return c.consequent.some((c) => simpleAbruptCheck(c));
          })
        ) {
          // Verify that the case is guaranteed to complete abrupt, and not conditionally (if/loop/try).
          rule('Simple switch transform');
          example(
            'switch (x) { case 1: f(); break; case 2: g(); break; }',
            'const tmp = x; if (x === 1) { f(); } else { if (x === 2) { g(); } }',
          );
          before(node);

          const tmpName = createFreshVar('tmpSwitchDisc', fdata);
          const varNode = AST.variableDeclaration(tmpName, node.discriminant, 'const');
          node.$p.regularBreaks.forEach(({ parentNode, parentProp, parentIndex }) => {
            // Explicitly point all breaks to the label that replaces the root switch node
            // This preserves the abrupt completion semantics in cases where it matters since
            // we are not yet in normalized state and DCE has not happened yet.
            // There are other normalization steps that will eliminate redundant label usages.
            parentNode[parentProp][parentIndex].label = AST.identifier(newLabelIdentNode.name);
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

          parentNode[parentProp][parentIndex] = newLabelNode;

          after(wrapper);
          break;
        }

        // The idea is to pull out all cases tests in order, compare the discriminant against it, and
        // remember the index of the first case that matches. If none match, remember test case count.
        // The next step is taking all the case/default bodies, in order, and wrapping them in `if index <= x`
        // (using zero for the default case). That way a case match will match its own case plus all
        // cases (and/or default) after it until the first case that breaks the control flow, or the
        // last case if none break. The default will properly apply its behavior in the same way.

        rule('Switch transform, part 2');
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
          ASSERT(!n.label, 'prepare should collect all and only unqualified break/continues');
          n.label = AST.identifier(newLabelIdentNode.name);
        });
        node.$p.unqualifiedLabelUsages.length = 0;

        const newNodes = [
          AST.variableDeclaration(tmpNameValue, node.discriminant, 'const'),
          AST.variableDeclaration(tmpNameCase, AST.literal(defaultIndex >= 0 ? defaultIndex : node.cases.length)),
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
          AST.labeledStatement(
            newLabelIdentNode,
            AST.blockStatement(
              ...node.cases.map((cnode, i) => {
                return AST.ifStatement(AST.binaryExpression('<=', tmpNameCase, AST.literal(i)), AST.blockStatement(cnode.consequent));
              }),
            ),
          ),
        ];
        wrapper.body.push(...newNodes);

        if (parentIndex < 0) parentNode[parentProp] = wrapper;
        else parentNode[parentProp][parentIndex] = wrapper;

        after(newNodes);
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
              AST.binaryExpression('+', finalNode, AST.callExpression('$coerce', [node.expressions[i], AST.primitive('string')])),
              AST.templateLiteral(node.quasis[i + 1].value.cooked),
            );
          }
          if (parentIndex < 0) parentNode[parentProp] = finalNode;
          else parentNode[parentProp][parentIndex] = finalNode;

          after(finalNode, parentNode);
        }
        break;
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
      case 'ThisExpression:before': {
        if (!node.$p.forAlias) {
          const newNode = AST.identifier(thisStack[thisStack.length - 1]?.$p.thisAliasName ?? 'undefined');
          if (parentIndex < 0) parentNode[parentProp] = newNode;
          else parentNode[parentProp][parentIndex] = newNode;
        }
        break;
      }
    }

    vgroupEnd();
  }

  vlog('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
}
function hoistingOnce(hoistingRoot, from) {
  ASSERT(
    ['Program', 'FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(hoistingRoot.type),
    'hoisting should only apply to hoisting roots',
    hoistingRoot,
  );

  ASSERT(hoistingRoot.$p.hoistedVars, 'the hoistedVars should exist on anything that can hoist', hoistingRoot);
  vlog('Hoisting', hoistingRoot.$p.hoistedVars.length, 'elements');

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

  const hoistedVars = hoistingRoot.$p.hoistedVars;
  if (hoistedVars.length) {
    // Note: the parent can be a scope root (global/func), or export (named/default)
    // hoistedVars -> Array<[node, parentNode, parentProp, parentIndex]>
    group();
    rule('Bindings with `var` and function declarations should be pre-hoisted in AST, even if exported');
    example('f(x); var x = 10; f(x);', 'let x; f(x); x = 10; f(x);');
    example('f(x); export var x = 10; f(x);', 'let x; f(x); x = 10; f(x); export {x};');
    example('f(x); export default function f() {}; f(x);', 'let f = function(){} f(x); f(x); export {f as default};');

    const funcs = [];
    const names = [];
    const exportedNames = new Set();
    let exportDefault = ''; // There's at most one of these.
    hoistedVars.forEach(([what, hoistNode, parentNode, parentProp, parentIndex, exportIndex]) => {
      group();
      rule(
        '- Hoisting step. From ' +
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
            vlog('Queueing function node to be moved');
            funcs.push([hoistNode, parentNode, parentProp, parentIndex, exportIndex]);
            // We will inject this node at the top
            parentNode[parentProp][parentIndex] = AST.emptyStatement();
          } else {
            vlog('Queueing bindings to be moved');
            before(hoistNode);
            const newNodes = [];

            // Decl is not normalized. Can have any number of declarators, can still be pattern
            hoistNode.declarations.forEach((decl) => {
              findBoundNamesInVarDeclarator(decl, names);
              // Now we have the names, remove the var keyword from the declaration
              // If there was no init, ignore this step
              // Patterns must have an init (strict syntax) except as lhs of for-in/for-of
              if (decl.init) {
                newNodes.push(AST.assignmentExpression(decl.id, decl.init));
              }
            });
            // Must replace one node with one new node to preserve indexes of other var statements that appear later
            ASSERT(parentIndex >= 0, 'var decls in global/func/block must be inside a body array');
            parentNode[parentProp][parentIndex] =
              newNodes.length === 0
                ? AST.emptyStatement()
                : AST.expressionStatement(newNodes.length === 1 ? newNodes[0] : AST.sequenceExpression(newNodes));

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

            findBoundNamesInVarDeclaration(hoistNode, names);
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
              findBoundNamesInVarDeclarator(decl, names);
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

            findBoundNamesInVarDeclaration(hoistNode, names);
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
            findBoundNamesInVarDeclaration(hoistNode, names);
            ASSERT(parentIndex === -1, 'var decls in for-header are not in an array', parentIndex);
            parentNode[parentProp] = hoistNode.declarations[0].id;

            after(newNodes, parentNode);
          }
          break;

        case 'ExportNamedDeclaration': {
          // Must be the `var` or `function` form to reach here.
          // Same as global except we must also eliminate the original export and track the exported names
          if (hoistNode.type === 'FunctionDeclaration') {
            funcs.push([hoistNode, parentNode, parentProp, parentIndex]);
            hoistingRoot.body[exportIndex] = AST.emptyStatement();
            exportedNames.add(hoistNode.id.name);
          } else {
            before(hoistNode);
            const newNodes = [];

            // Decl is not normalized. Can have any number of declarators, can still be pattern
            hoistNode.declarations.forEach((decl) => {
              const boundNames = findBoundNamesInVarDeclarator(decl);
              boundNames.forEach((name) => {
                names.push(name);
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
          funcs.push([hoistNode, parentNode, parentProp, parentIndex]);
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
            funcs.push([hoistNode, parentNode, parentProp, parentIndex, exportIndex]);
            // We will inject this node at the top
            parentNode[parentProp][parentIndex] = AST.emptyStatement();
          } else {
            // Decl is not normalized. Can have any number of declarators, can still be pattern
            hoistNode.declarations.forEach((decl) => {
              findBoundNamesInVarDeclarator(decl, names);
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
            findBoundNamesInVarDeclarator(decl, names);
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

    const set = new Set(names);
    vlog('Removing any func decl names and param names from the hoisted var decl set (' + set.size + ' names before)');
    // Drop func names from the list of hoisted var names (anon func decl export should not end up in this list)
    const dupeFunc = new Map();
    funcs.forEach(([hoistNode, rootIndex, rootChild, exportProp]) => {
      set.delete(hoistNode.id.name);
      // Note: if there are two func decls with the same name in the same scope then we only keep the last one.
      dupeFunc.set(hoistNode.id.name, hoistNode);
    });
    const uniqueFuncs = [...dupeFunc.values()];

    // Try to find a param on function.params
    if (hoistingRoot.type !== 'Program') {
      set.forEach((name) => {
        if (hoistingRoot.params.some((pnode) => pnode.type === 'Identifier' && pnode.name === name)) {
          set.delete(name);
          vlog('- The binding name `' + name + '` was also a parameter so not adding the var decl for it (' + set.size + ' names left)');
        }
      });
    }

    vlog(
      'Queued',
      funcs.length,
      'functions and',
      names.length,
      'var names and',
      exportedNames.size,
      'exports for hoisting (actually adding',
      set.size,
      'var names after filtering)',
    );

    // This will invalidate all cached indexes moving forward!

    // Sort them and then inject them at the top.
    uniqueFuncs.sort((a, b) => (a.id.name < b.id.name ? -1 : a.id.name > b.id.name ? 1 : 0));
    const newFuncs = uniqueFuncs.map((hoistNode) => {
      // Convert to let assignment. Strip the name (prevents accidental shadowing)
      const name = hoistNode.id.name;
      hoistNode.id = null;
      hoistNode.type = 'FunctionExpression';
      return AST.variableDeclaration(name, hoistNode, 'let'); // probably const eventually
    });
    rootBody.unshift(...newFuncs);

    const sorted = [...set].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    rootBody.unshift(
      ...sorted.map((name) => {
        // Exports are already replaced
        // Create lets with explicit init to `undefined`. Eliminates all vars this way.
        return AST.variableDeclaration(name, AST.identifier('undefined'), 'let');
      }),
    );

    // Push the named exports at the end of the body (doesn't really matter where they appear; they will be live bindings)
    // Special case the default export. Note that default function exports are live bindings as well, unlike default expressions.
    rootBody.push(
      ...[...exportedNames].map((name) => AST._exportNamedDeclarationFromNames(name, name === exportDefault ? 'default' : name)),
    );

    hoistedVars.length = 0; // Clear it. We don't need it anymore.

    groupEnd();
    vlog('/Hoisting true');
    return true;
  }

  vlog('/Hoisting false');

  return false;
}
function transformFunctionParams(node, fdata) {
  // This transform should move patterns and param defaults to the body of the function.
  // It should not bother to transform patterns away (we'll have to do this in the normalization step, anyways)

  // Create local copies of all params. Treat actual params as special, not as bindings anymore.
  // In this approach we could set the args to a fixed $$0 $$1 $$2 and assign then inside the body.
  // That way we can treat all bindings as var bindings, eliminating the (currently) last variant
  // of the kind a binding can have (var vs param). And all bindings would have a block as parent.

  const bodyLogic = []; // patterns and default logic go in here. We don't want logic in the function header
  const headLogic = node.params
    .map((n, i) => {
      // Note: Preval treats $$123 as reserved keywords throughout. All occurrences in the original code get replaced.

      const paramIdent = '$$' + i;
      const isRest = n.type === 'RestElement';
      node.params[i] = AST.param(paramIdent, isRest);

      if (isRest) {
        if (n.argument.type === 'Identifier') {
          // ... rest with plain ident
          // `let name = $$1`
          return AST.variableDeclaration(n.argument.name, AST.param(paramIdent), 'let');
        } else {
          // ... rest with pattern
          // `const tmpName = $$1; let pattern = tmpName;`
          ASSERT(n.argument);
          const tmpName = createFreshVar('tmpParamBare', fdata);
          const pattern = AST.variableDeclaration(n.argument, tmpName, 'let');
          bodyLogic.push(pattern);
          return AST.variableDeclaration(tmpName, AST.param(paramIdent), 'const');
        }
      } else if (n.type === 'Identifier') {
        // plain ident
        // `let name = $$1`
        return AST.variableDeclaration(n.name, AST.param(paramIdent), 'let');
      } else if (n.type === 'AssignmentPattern') {
        // Cannot be rest
        const tmpName = createFreshVar('tmpParamBare', fdata);
        if (n.left.type === 'Identifier') {
          // ident param with default
          // `const tmpName = $$1; let name = tmpName === undefined ? defaultValue : tmpName;`
          ASSERT(n.left.name);

          const defaultHandler = AST.variableDeclaration(
            n.left.name,
            AST.conditionalExpression(AST.binaryExpression('===', tmpName, 'undefined'), n.right, tmpName),
          );
          bodyLogic.push(defaultHandler);
        } else {
          // pattern with default
          // `const tmpName = $$1; [pattern] = tmpName === undefined ? defaultValue : tmpName;`
          ASSERT(n.left);
          const defaultHandler = AST.variableDeclaration(
            n.left,
            AST.conditionalExpression(AST.binaryExpression('===', tmpName, 'undefined'), n.right, tmpName),
            'let',
          );
          bodyLogic.push(defaultHandler);
        }

        return AST.variableDeclaration(tmpName, AST.param(paramIdent), 'const');
      } else {
        ASSERT(n.type === 'ObjectPattern' || n.type === 'ArrayPattern', 'should be a pattern', n);
        // pattern without default
        // `const tmpName = $$1; [pattern] = tmpName;`
        const tmpName = createFreshVar('tmpParamBare', fdata);
        const patternHandler = AST.variableDeclaration(n, tmpName, 'let');
        bodyLogic.push(patternHandler);
        return AST.variableDeclaration(tmpName, AST.param(paramIdent), 'const');
      }
    })
    .filter((e) => !!e);

  return [headLogic, bodyLogic];
}

function simpleAbruptCheck(node) {
  // This is for a switch case pre-check
  if (node.type === 'BlockStatement') return node.$p.completesAbrupt;
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
