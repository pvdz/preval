import { printer } from '../lib/printer.mjs';
import { ASSERT, DIM, BOLD, RESET, BLUE, dir, group, groupEnd, log, fmat, printNode } from './utils.mjs';
import { $p } from './$p.mjs';
import * as AST from './ast.mjs';

// This phase is intended for things that require a full parse first. Like figuring out how often a variable is assigned to.
// It's always guaranteed to run at least once any time preval is used.
// This phase should not update collections or whatever
// TODO: should we only call it when nothing changed in phase2? Something to be said about that either way.

export function phase4(program, fdata, resolve, req) {
  let changed = false; // Was the AST updated? We assume that updates can not be circular and repeat until nothing changes.
  let somethingChanged = false; // Did phase2 change anything at all?

  const superCallStack = []; // `super()` is validated by the parser so we don't have to worry about scoping rules

  const funcStack = [];

  // Crumb path for walking through the AST. This way you can reach out to parent nodes and manipulate them or whatever. Shoot your own foot.
  const crumbsNodes = [];
  const crumbsProps = [];
  const crumbsIndexes = [];

  function crumbGet(delta) {
    ASSERT(delta > 0, 'must go at least one step back');
    ASSERT(delta < crumbsNodes.length, 'can not go past root');

    const index = crumbsIndexes[crumbsIndexes.length - delta];
    if (index >= 0) return crumbsNodes[crumbsNodes.length - delta][crumbsProps[crumbsProps.length - delta]][index];
    else return crumbsNodes[crumbsNodes.length - delta][crumbsProps[crumbsProps.length - delta]];
  }
  function crumbSet(delta, node) {
    ASSERT(delta > 0, 'must go at least one step back');
    ASSERT(delta < crumbsNodes.length, 'can not go past root');
    ASSERT(node?.type, 'every node must at least have a type');

    const parent = crumbsNodes[crumbsNodes.length - delta];
    const prop = crumbsProps[crumbsProps.length - delta];
    const index = crumbsIndexes[crumbsIndexes.length - delta];

    log('Replacing the call at `' + parent.type + '.' + prop + (index >= 0 ? '[' + index + ']' : '') + '` with', node.type);

    if (index >= 0) return (parent[prop][index] = node);
    else return (parent[prop] = node);
  }

  group(
    '\n\n\n##################################\n## phase4  ::  ' +
      fdata.fname +
      '  ::  cycle ' +
      fdata.cycle +
      '\n##################################\n\n\n',
  );

  do {
    changed = false;
    stmt(null, 'ast', -1, fdata.tenkoOutput.ast);
    if (changed) somethingChanged = true;

    log('\nCurrent state\n--------------\n' + fmat(printer(fdata.tenkoOutput.ast)) + '\n--------------\n');
  } while (changed);

  log('End of phase4');
  groupEnd();

  return somethingChanged;

  function crumb(parent, prop, index) {
    crumbsNodes.push(parent);
    crumbsProps.push(prop);
    crumbsIndexes.push(index);
  }
  function uncrumb(parent, prop, index) {
    const a = crumbsNodes.pop();
    const b = crumbsProps.pop();
    const c = crumbsIndexes.pop();
    ASSERT(b === true || (a === parent, b === prop, c === index), 'ought to pop the same as we pushed. just a sanity check.');
  }

  function flattenBlocks(node) {
    // Note: make sure the node is not being walked currently or things end bad.

    // Flatten nested blocks
    // This would be dangerous in regular JS because of lexical scopes, but we normalized
    // all bindings to be unique and I'm not aware of other reasons :shrug:
    // Note: this needs to be re-applied in other transforming phases as well because
    //       replacing a single statement with multiple statements needs to be wrapped
    //       in a block because the parent block is (most likely) still being iterated.
    let i = 0;
    while (i < node.body.length) {
      ASSERT(node.body[i], 'block does not have empty elements?', node);
      if (node.body[i].type === 'BlockStatement') {
        log('Flattening an object');
        node.body.splice(i, 1, ...node.body[i].body);
        changed = true;
      } else {
        ++i;
      }
    }
  }

  function stmt(parent, prop, index, node, isExport) {
    ASSERT(
      parent === null ||
        index === 'body' ||
        (Array.isArray(parent[prop]) ? parent[prop][index] === node : parent[prop] === node && index === -1),
      'caller should pass on proper parent[prop][index] data',
      parent,
      prop,
      index,
      node,
      isExport,
    );

    if (node.type === 'FunctionDeclaration' || node.type === 'Program') {
      funcStack.push(node);
    }

    crumb(parent, prop, index);
    _stmt(node, isExport);
    uncrumb(parent, prop, index);

    if (node.type === 'FunctionDeclaration' || node.type === 'Program') {
      funcStack.pop();
    }
  }
  function _stmt(node, isExport = false) {
    group(DIM + 'stmt(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);

    switch (node.type) {
      case 'BlockStatement': {
        node.body.forEach((cnode, i) => stmt(node, 'body', i, cnode));
        flattenBlocks(node);
        break;
      }

      case 'BreakStatement': {
        break;
      }

      case 'ClassDeclaration': {
        processClass(node, false, isExport);
        break;
      }

      case 'ContinueStatement': {
        break;
      }

      case 'DebuggerStatement': {
        break;
      }

      case 'DoWhileStatement': {
        stmt(node, 'body', -1, node.body);
        expr(node, 'test', -1, node.test);
        break;
      }

      case 'ExportAllDeclaration': {
        break;
      }

      case 'ExportDefaultDeclaration': {
        // export default expr
        // export default function(){}
        // export default class(){}

        if (node.declaration.type === 'FunctionDeclaration' || node.declaration.type === 'ClassDeclaration') {
          stmt(node, 'declaration', -1, node.declaration, 'default');
        } else {
          expr(node, 'declaration', -1, node.declaration);
        }
        break;
      }

      case 'ExportNamedDeclaration': {
        // These have a declaration and no specifiers:
        // - export function f (){}
        // - export class g {}
        // - export let a
        // - export const b = 1
        // - export var c = 2

        // These have specifiers and no declaration. One specifier per exported symbols.
        // Type of export may affect type of specifier node
        // - var d,e; export {d,e}
        // - export {x}
        // - export {x as y}
        // - export x from 'foo'
        // - export {x} from 'foo'
        // - export * as y from 'foo'     (not same as only *)
        // - export {x as z} from 'foo'

        if (node.source) {
        } else if (node.declaration) {
          stmt(node, 'declaration', -1, node.declaration, true);
        }
        break;
      }

      case 'ExpressionStatement': {
        expr(node, 'expression', -1, node.expression);

        if (node.expression.type === 'Literal') {
          // I don't think there's any literal that has an observable side effect on its own. Ditch it.
          crumbSet(1, { type: 'EmptyStatement', $p: $p() });
          changed = true;
        } else if (node.expression.type === 'Identifier') {
          // Not sure but I don't think an identifier itslef should have an observable side effect.
          // There are edge cases like setting a getter on window or whatever. Don't think I care for such hacks.
          crumbSet(1, { type: 'EmptyStatement', $p: $p() });
          changed = true;
        }

        break;
      }

      case 'EmptyStatement': {
        break;
      }

      case 'ForStatement': {
        if (node.init) {
          if (node.init.type === 'VariableDeclaration') {
            stmt(node, 'init', -1, node.init);
          } else {
            expr(node, 'init', -1, node.init);
          }
        }
        if (node.test) {
          expr(node, 'test', -1, node.test);
        }
        if (node.update) {
          expr(node, 'update', -1, node.update);
        }
        stmt(node, 'body', -1, node.body);
        break;
      }

      case 'ForInStatement': {
        expr(node, 'right', -1, node.right);
        if (node.left.type === 'VariableDeclaration') {
        } else {
          expr(node, 'left', -1, node.left);
        }
        stmt(node, 'body', -1, node.body);
        break;
      }

      case 'ForOfStatement': {
        // TODO: This needs proper support for iterable stuff for true support. We could start with superficial support.
        if (node.await) {
          TODO;
        }

        // Get the kind of the type of the rhs. Initially, that means string for strings and kind for arrays.
        expr(node, 'right', -1, node.right);

        if (node.left.type === 'VariableDeclaration') {
        } else {
          expr(node, 'left', -1, node.left);
        }

        stmt(node, 'body', -1, node.body);
        break;
      }

      case 'FunctionDeclaration': {
        log('Name:', node.id ? node.id.name : '<anon>');
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);
        stmt(node, 'body', -1, node.body);

        if (node.id) {
          const meta = fdata.globallyUniqueNamingRegistery.get(node.id.name);

          // Function ids to not register themselves as usage so we need zero usages before eliminating a function decl
          if (!meta.isExport && meta.usages.length === 0) {
            // There was only one usage and that was this function declaration
            ASSERT(!isExport, 'todo: exports may not be safe to eliminate');
            log('Function is is not actually used so since this is a declaration, it should be safe to eliminate now.');
            crumbSet(1, { type: 'EmptyStatement', $p: $p() });
            changed = true;
          }
        }

        break;
      }

      case 'IfStatement': {
        expr(node, 'test', -1, node.test);
        stmt(node, 'consequent', -1, node.consequent);
        if (node.alternate) stmt(node, 'alternate', -1, node.alternate);

        // TODO: do we care about function statements? what about labelled function statements? is that relevant at all here?

        const NEITHER = 0;
        const KEEP_IF = 1;
        const KEEP_ELSE = 2;
        let action = NEITHER;

        log('test type:', node.test.type);

        if (node.test.type === 'Literal') {
          if (node.test.value === 0) {
            log('if(0) means the consequent is dead code. Eliminating if-else and using the alternate, if available', !!node.alternate);
            action = KEEP_ELSE;
          } else if (typeof node.test.value === 'number') {
            log('if(n) with n!=0 means the alternate is dead code. Eliminating if-else and using the consequent');
            action = KEEP_IF;
          } else if (node.test.value === '') {
            log('if("") means the consequent is dead code. Eliminating if-else and using the alternate, if available', !!node.alternate);
            action = KEEP_ELSE;
          } else if (typeof node.test.value === 'string') {
            log('if(s) with non-empty-string means the alternate is dead code. Eliminating if-else and using the consequent');
            action = KEEP_IF;
          } else if (node.test.value === true) {
            log('if(true) means the consequent is dead code. Eliminating if-else and using the alternate, if available', !!node.alternate);
            action = KEEP_IF;
          } else if ([false, null].includes(node.test.value)) {
            log('if(falsy) means the alternate is dead code. Eliminating if-else and using the consequent');
            action = KEEP_ELSE;
          }
        } else if (node.test.type === 'Identifier') {
          if (['undefined', 'NaN'].includes(node.test.name)) {
            log('if(falsy) means the consequent is dead code. Eliminating if-else and using the alternate');
            action = KEEP_ELSE;
          } else if (['Infinity'].includes(node.test.name)) {
            log('if(truthy) means the alternate is dead code. Eliminating if-else and using the consequent');
            action = KEEP_IF;
          }
        } else if (
          ['ObjectExpression', 'ArrayExpression', 'FunctionExpression', 'ArrowFunctionExpression', 'ClassExpression'].includes(
            node.test.type,
          )
        ) {
          log('if(obj) means the consequent is dead code. Eliminating if-else and using the alternate, if available', !!node.alternate);
          action = KEEP_IF;
        } else if (node.test.type === 'UnaryExpression') {
          log('operator:', node.test.operator);
          switch (node.test.operator) {
            case 'void': {
              log('if(void ..) is always falsy so rewrite it');
              // Note: `if (void $(1)) $(2) else $(3)` -> `{ $(1); $(3) }`
              // In general, if the void has a non-observable side-effect then that's an expression statement that
              // will automatically get eliminated in a later step, so don't worry about it too much.
              // (This case is very unlikely to appear in the real world, even after other reductions)
              // Note: the parent is guaranteed to be a block, but we can't mutate the children count since it's being
              // iterated so we replace the whole node with a single block and rely on final transform to flatten blocks.
              crumbSet(
                1,
                node.alternate
                  ? {
                      type: 'BlockStatement',
                      body: [{ type: 'ExpressionStatement', expression: node.test.argument, $p: $p() }, node.alternate],
                      $p: $p(),
                    }
                  : { type: 'ExpressionStatement', expression: node.test.argument, $p: $p() },
              );
              changed = true;
              break;
            }
            case '!': {
              log('`if(! ..) A` is `if(..); else A` and `if(!..)A; else B` is `if(..)B; else A`. Normalizing it.');
              // Note: if there was no `else` this is likely to regress the size. But a final step can always undo
              //       this transform if the consequent turns out to be a noop.
              // TODO: are there any coercion cases where `if(x)` is different from `if(!!x)`?
              // TODO: are there any dangerous if-else pair matching cases to consider here?
              const A = node.consequent;
              const B = node.alternate;
              node.test = node.test.argument;
              node.consequent = B || { type: 'EmptyStatement', $p: $p() }; // Should this be a block instead?
              node.alternate = A;
              changed = true;
              break;
            }
            case 'typeof': {
              log('`if(typeof ..) is guaranteed to be dead code. Replacing the `if` with the consequent.');
              // TODO: I think this is observable through proxies? Do I care?
              action = KEEP_IF;
              break;
            }
            // ~, +, and - can result in zero or non-zero and are not something we can determine statically
            // delete can result in true or false and is not something we can determine statically
            // --, ++, and new are not unary ops
          }
        } else if (node.test.type === 'NewExpression') {
          log('`if(new ..)` is always truthy so replacing the `if` with the test and the consequent.');
          // `if (new ($(1)) $(2); else $(3)` -> `{new ($(1)); $(2)}`
          crumbSet(1, {
            type: 'BlockStatement',
            body: [{ type: 'ExpressionStatement', expression: node.test, $p: $p() }, node.consequent],
            $p: $p(),
          });
          changed = true;
        }

        if (action === KEEP_IF) {
          // The node.alternate is dead code
          crumbSet(1, node.consequent);
          changed = true;
        } else if (action === KEEP_ELSE) {
          // The node.consequent is dead code
          crumbSet(1, node.alternate || { type: 'EmptyStatement', $p: $p() });
          changed = true;
        }

        break;
      }

      case 'ImportDeclaration': {
        break;
      }

      case 'Program': {
        node.body.forEach((cnode, i) => stmt(node, 'body', i, cnode));
        flattenBlocks(node);
        break;
      }

      case 'ReturnStatement': {
        if (node.argument) {
          expr(node, 'argument', -1, node.argument);
        }
        break;
      }

      case 'TryStatement': {
        stmt(node, 'block', -1, node.block);
        if (node.handler) {
          crumb(node, 'handler', -1);
          stmt(node.handler, 'body', -1, node.handler.body);
          uncrumb(node, 'handler', -1);
        }
        if (node.finalizer) {
          stmt(node, 'finalizer', -1, node.finalizer);
        }
        break;
      }

      case 'SwitchStatement': {
        expr(node, 'discriminant', -1, node.discriminant);
        node.cases.forEach((cnode, i) => {
          // Defaults have no test
          if (cnode.test) {
            // All cases must have test for same type as discriminant (switch value)
            expr2(node, 'cases', i, cnode, 'test', -1, cnode.test);
            //$(cnode.test, '@merge'); // pop the test and the discriminant, merge them, result will be pushed to be the new discriminant. it is dropped later.
          }
          cnode.consequent.forEach((dnode, i) => stmt(cnode, 'consequent', i, dnode));
        });
        break;
      }

      case 'ThrowStatement': {
        expr(node, 'argument', -1, node.argument);
        break;
      }

      case 'VariableDeclaration': {
        const kind = node.kind;
        let removed = false;
        node.declarations.forEach((dnode, i) => {
          if (dnode.init) {
            expr2(node, 'declarations', i, dnode, 'init', -1, dnode.init);
          }

          if (dnode.id.type === 'Identifier') {
            const meta = fdata.globallyUniqueNamingRegistery.get(dnode.id.name);
            const updates = meta.updates;
            const usages = meta.usages;
            ASSERT(updates, 'should find meta data for each name and should have an updates array', dnode.id.name, meta);
            log(
              'The binding for `' + dnode.id.name + '`, unique name `' + dnode.id.name + '`, has',
              updates.length,
              'updates and',
              usages.length,
              'usages',
            );

            // A toplevel var decl (that is not an export) will only have one crumb element
            if (meta.usages.length === 1) {
              if (crumbsNodes.length > 2 && crumbGet(2).type === 'ExportNamedDeclaration') {
                log('Binding is not used but exported so not eliminated here (yet)');
              } else {
                log('Binding is no longer referenced so we can replace its declarator with its init');
                ASSERT(
                  meta.usages[0].parent === dnode,
                  'the last usage should be its own declaration',
                  meta.usages[0].parent,
                  '==?',
                  dnode,
                );
                // Drop the declaration. It's no longer useful.
                // TODO: for-headers, where this will fail, and there's no easy generic way out
                ASSERT(node.declarations.length === 1, 'should only have this binding as the declarator');
                if (dnode.init) crumbSet(1, AST.expressionStatement(dnode.init));
                else crumbSet(1, AST.emptyStatement());

                removed = true;
                changed = true;
              }
            }
          } else {
            ASSERT(
              dnode.id.type === 'RestElement',
              'The paramNode ought to be an Identifier or RestElement. The patterns and defaults ought to be normalized out.',
            );
          }
        });

        if (removed) {
          node.declarations = node.declarations.filter(Boolean); // such cheesy
          if (node.declarations.length === 0) {
            log('Declaration has no more declarations so we can drop that one too');
            crumbSet(1, { type: 'EmptyStatement', $p: $p() });
          }
        }

        break;
      }

      case 'WhileStatement': {
        expr(node, 'test', -1, node.test);
        stmt(node, 'body', -1, node.body);
        break;
      }

      default: {
        log('unknown statement node:', node);
        log('Missing support for stmt ' + node.type);
        throw new Error('Missing support for stmt ' + node.type);
      }
    }

    groupEnd();
  }
  function expr2(parent2, prop2, index2, parent, prop, index, node) {
    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      funcStack.push(node);
      node.$p.pure = true; // Output depends on input, nothing else, no observable side effects
      node.$p.returns = []; // all return nodes, and `undefined` if there's an implicit return too
    }

    crumb(parent2, prop2, index2);
    expr(parent, prop, index, node);
    uncrumb(parent2, prop2, index2);

    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      funcStack.pop();
    }
  }
  function expr(parent, prop, index, node) {
    ASSERT(
      !Array.isArray(parent[prop]) || index >= 0,
      'if parent.prop is an array then the index should be >= 0',
      parent,
      prop,
      index,
      node,
    );
    ASSERT(
      Array.isArray(parent[prop]) ? parent[prop][index] === node : parent[prop] === node,
      'parent[prop] (/[index]) should be node',
      parent,
      prop,
      index,
      node,
    );

    crumb(parent, prop, index);
    _expr(node);
    uncrumb(parent, prop, index);
  }
  function _expr(node) {
    group(DIM + 'expr(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);

    switch (node.type) {
      case 'ArrayExpression': {
        for (let i = 0; i < node.elements.length; ++i) {
          const elNode = node.elements[i];
          // Elided elements are `null` here
          if (elNode) {
            if (elNode.type === 'SpreadElement') {
              // Special case spread because its behavior differs per parent case
              expr2(node, 'elements', i, elNode, 'argument', -1, elNode.argument);
            } else {
              expr(node, 'elements', i, elNode);
            }
          }
        }
        break;
      }

      case 'AssignmentExpression': {
        expr(node, 'right', -1, node.right);
        expr(node, 'left', -1, node.left);
        break;
      }

      case 'ArrowFunctionExpression': {
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        if (node.expression) {
          expr(node, 'body', -1, node.body);
        } else {
          stmt(node, 'body', -1, node.body);
        }

        break;
      }

      case 'BinaryExpression': {
        log('Operator:', node.operator);

        expr(node, 'left', -1, node.left);
        expr(node, 'right', -1, node.right);

        //switch (node.operator) {
        //  case '+': {
        //    break;
        //  }
        //  case '-': {
        //    break;
        //  }
        //  case '==':
        //  case '!=':
        //    break;
        //  case '===':
        //  case '!==':
        //    break;
        //  case '<':
        //  case '<=':
        //  case '>':
        //  case '>=':
        //    break;
        //
        //  case 'instanceof': {
        //    break;
        //  }
        //
        //  case 'in': {
        //    break;
        //  }
        //
        //  default:
        //    break;
        //}

        break;
      }

      case 'CallExpression': {
        node.arguments.forEach((anode, i) => {
          if (anode.type === 'SpreadElement') {
            expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
          } else {
            expr(node, 'arguments', i, anode);
          }
        });

        // `super` itself is not an actual value
        if (node.callee.type !== 'Super') {
          // Find the callee.
          // If it's an ident, figure out if we can determine that it's a function.
          // If it's a function, determine whether
          // - it is pure; consider to inline it somehow
          // - it has a static return value; replace the call with its value and move the call up in hopes of eliminating it
          // - a pure function with a fixed outcome can be replaced entirely. but how many of those will we find here.

          if (node.callee.type === 'Identifier') {
            const meta = fdata.globallyUniqueNamingRegistery.get(node.callee.name);

            if (meta.updates.length === 0) {
              log('Called `' + node.callee.name + '` but it has no updates (implicit global?);');
            } else if (meta.updates.length === 1) {
              log('Called `' + node.callee.name + '` and it has one update: parent =', [meta.updates[0].parent?.type]);

              const update = meta.updates[0];
              const updateTo = update.index >= 0 ? update.parent[update.prop][update.index] : update.parent[update.prop];

              const metaParent = meta.updates[0].parent;
              if (
                updateTo.type === 'FunctionDeclaration' ||
                updateTo.type === 'FunctionExpression' ||
                updateTo.type === 'ArrowFunctionExpression'
              ) {
                if (updateTo.$p.pure) {
                  log('The call is pure so it should be possible to inline it');
                  if (updateTo.$p.oneReturnValue) {
                    log('The function is pure and has one return value. Replace the entire call with that value.');
                    // `function f(){ return 1; } $(f())` -> `$(1)`
                    // Replace `node` with the value
                    // TODO: we also need to outline the arguments; `f(a = 10)`
                    const newNode = updateTo.$p.oneReturnValue;
                    crumbSet(1, newNode);
                    changed = true;
                  } else {
                    log('The function does not return a single value.');
                    // `function f(){ return x; } $(f())` -> `$(x)` ?? (I mean in this particular case easy but generically, not so much)
                  }
                } else if (updateTo.$p.oneReturnValue) {
                  log(
                    'The function is not pure but does have a single return value. Replace the call with that value and move the call up.',
                  );
                  // `function f(){ console.log(1); return 2; } $(f())` -> `f(); $(1)` -> `console.log(2); $(1)`
                  //TODO;
                }
              }
            }
          }

          expr(node, 'callee', -1, node.callee);
        }

        break;
      }

      case 'ClassExpression': {
        processClass(node, true, false);
        break;
      }

      case 'ConditionalExpression': {
        expr(node, 'test', -1, node.test);
        expr(node, 'consequent', -1, node.consequent);
        expr(node, 'alternate', -1, node.alternate);
        break;
      }

      case 'FunctionExpression': {
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        stmt(node, 'body', -1, node.body);

        break;
      }

      case 'Identifier': {
        log('Name: `' + node.name + '`, unique name: `' + node.name + '`');
        const meta = fdata.globallyUniqueNamingRegistery.get(node.name);
        log('This ident has', meta?.updates.length, 'updates and', meta?.usages.length, 'usages');
        if (meta.updates.length === 1) {
          const update = meta.updates.pop();
          const updateTo = update.index >= 0 ? update.parent[update.prop][update.index] : update.parent[update.prop];
          log('Updates to', updateTo.type);
          if (update.type === 'Literal' || (update.type === 'Identifier' && ['undefined', 'NaN', 'Infinity'].includes(update.name))) {
            log('Update was a literal. Replacing occurrence with this literal'); // TODO: what about long strings?
            crumbSet(1, update);
          }
        }

        break;
      }

      case 'Literal': {
        log('Value:', [node.value]);
        //if (typeof node.value === 'string') {
        //} else if (typeof node.value === 'number') {
        //} else if (typeof node.value === 'boolean') {
        //} else if (node.regex !== undefined) {
        //} else if (node.value === null) {
        //} else {
        //}
        break;
      }

      case 'LogicalExpression': {
        expr(node, 'left', -1, node.left);
        expr(node, 'right', -1, node.right);
        break;
      }

      case 'MemberExpression': {
        if (node.computed && node.property.type === 'Literal' && typeof node.property.value === 'string') {
          // If the key name is a legit key then why not. Let's just test it.
          let simpleIdent = true;
          try {
            Function('foo["' + node.property.value + '"]');
          } catch {
            simpleIdent = false;
          }
          if (simpleIdent) {
            // `foo["bar"]` -> `foo.bar`
            log('Converting dynamic property access with string literal that is a valid ident, to regular property access');
            node.computed = false;
            node.property = {
              type: 'Identifier',
              name: node.property.value,
              $p: $p(),
            };
            changed = true;
          }
        }

        // Walk the property structure in such a way that it visits the root object first, then back up to the leaf property
        // Any dynamic expressions get visited before the next property access
        // It's kind a messy, useful for the other project, maybe not here, and maybe I'll rewrite it.
        function r(node) {
          if (node.type === 'MemberExpression') {
            // Visit the object first, then on the way up potentially walk the computed prop expresison if it one
            crumb(node, 'object', -1, node.object);
            r(node.object);
            uncrumb(node, 'object', -1);
            if (node.computed) {
              expr(node, 'property', -1, node.property);
            }
          } else if (node.type === 'Super') {
          } else {
            _expr(node); // Root object
          }
        }
        r(node);
        break;
      }

      case 'NewExpression': {
        node.arguments.forEach((anode, i) => {
          if (anode.type === 'SpreadElement') {
            expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
          } else {
            expr(node, 'arguments', i, anode);
          }
        });

        expr(node, 'callee', -1, node.callee);

        break;
      }

      case 'ObjectExpression': {
        node.properties.forEach((pnode, i) => {
          if (pnode.type === 'SpreadElement') {
            expr2(node, 'properties', i, pnode, 'argument', -1, pnode.argument);
          } else {
            if (pnode.computed) {
              // Visit the key before the value
              expr(pnode, 'key', -1, pnode.key);
            }
            expr2(node, 'properties', i, pnode, 'value', -1, pnode.value);
          }
        });

        break;
      }

      case 'OptionalMemberExpression': {

        break;
      }

      case 'OptionalCallExpression': {

        break;
      }

      case 'RegExpLiteral': {
        break;
      }

      case 'SequenceExpression': {
        node.expressions.forEach((enode, i) => {
          expr(node, 'expressions', i, enode);
        });
        break;
      }

      case 'Super': {
        // Two cases:
        // - call
        // - prop
        break;
      }

      case 'TaggedTemplateExpression': {
        ASSERT(false, 'should be normalized out');
        break;
      }

      case 'TemplateLiteral': {
        node.expressions.forEach((enode, i) => {
          expr(node, 'expressions', i, enode);
        });
        break;
      }

      case 'ThisExpression': {
        break;
      }

      case 'UnaryExpression': {
        expr(node, 'argument', -1, node.argument);

        //switch (node.operator) {
        //  case 'delete': {
        //    break;
        //  }
        //
        //  case '+':
        //  case '-':
        //  case '~': {
        //    break;
        //  }
        //
        //  case '!': {
        //    break;
        //  }
        //
        //  case 'typeof': {
        //    break;
        //  }
        //
        //  case 'void': {
        //    break;
        //  }
        //
        //  default: {
        //  }
        //}

        break;
      }

      case 'UpdateExpression': {
        expr(node, 'argument', -1, node.argument);
        break;
      }

      default: {
        throw new Error('Missing support for expr ' + node.type);
      }
    }

    groupEnd();
  }

  function processClass(node, isExpr, isExport) {
    superCallStack.push(node);

    if (node.superClass) expr(node, 'superClass', -1, node.superClass);

    if (node.body.body.length > 0) {
      node.body.body.forEach((cnode, i) => {
        if (!cnode) return; // possible
        ASSERT(cnode.type === 'MethodDefinition', 'expand once class syntax is not just method definitions');
        if (cnode.computed) {
          // I think the computed key of a method should be visited first...?
          crumb(node, 'body', -1);
          expr2(node.body, 'body', i, cnode, 'key', cnode.key);
          uncrumb(node, 'body', -1);
        }

        crumb(node, 'body', -1);
        expr2(node.body, 'body', i, cnode, 'value', -1, cnode.value);
        uncrumb(node, 'body', -1);
      });
    }

    //if (isExpr) {
    //  if (node.id){}
    //} else {
    //  if (node.id) {}
    //}

    superCallStack.pop();
  }

  function processFuncArgs(node) {
    // All patterns and defaults ought to be normalized out so it should only be Identifiers and RestElements

    let minParamRequired = 0; // Ends up as the last non-rest param without default, +1
    let hasRest = false;
    let paramBindingNames = [];

    node.params.forEach((pnode, i) => {
      if (pnode.type === 'RestElement') {
        hasRest = true;
        paramBindingNames.push(pnode.argument.name);
      } else if (pnode.type === 'Identifier') {
        minParamRequired = i + 1;
        paramBindingNames.push(pnode.name);
      } else {
        ASSERT(false, 'Patterns and defaults ougth to be normalized out', node);
      }
    });

    return { minParamRequired, hasRest, paramBindingNames };
  }
}
