import { printer } from '../lib/printer.mjs';
import { ASSERT, DIM, BOLD, RESET, BLUE, dir, group, groupEnd, log, printNode } from './utils.mjs';
import { $p } from './$p.mjs';

// This phase is intended for things that require a full parse first. Like figuring out how often a variable is assigned to.
// It's always guaranteed to run at least once any time preval is used.
// This phase should not update collections or whatever
// TODO: should we only call it when nothing changed in phase2? Something to be said about that either way.

export function phase4(program, fdata, resolve, req) {
  let changed = false; // Was the AST updated? We assume that updates can not be circular and repeat until nothing changes.
  let somethingChanged = false; // Did phase2 change anything at all?

  const lexScopeStack = [];
  const rootScopeStack = [];
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

    log('\nCurrent state\n--------------\n' + printer(fdata.tenkoOutput.ast) + '\n--------------\n');
  } while (changed);

  log('End of phase4');
  groupEnd();

  return somethingChanged;

  function findUniqueNameForBindingIdent(node, startAtPArent = false) {
    ASSERT(node && node.type === 'Identifier', 'need ident node for this', node);
    //log('Finding unique name for `' + node.name + '`');
    let index = lexScopeStack.length;
    if (startAtPArent) --index; // For example: func decl id has to be looked up outside its own inner scope
    while (--index >= 0) {
      // log('- lex level', index,':', lexScopeStack[index].$p.nameMapping.has(node.name));
      if (lexScopeStack[index].$p.nameMapping.has(node.name)) {
        break;
      }
    }
    if (index < 0) {
      log('The ident `' + node.name + '` could not be resolved to a unique name. Was it an implicit global?');
      linter.check('IMPLICIT_GLOBAL', { filename: fdata.fname, line: node.loc.start.line, column: node.loc.start.column }, node.name);
      // Register one...
      //log('Creating global binding for `' + node.name + '` now');
      lexScopeStack[0].$p.nameMapping.set(node.name, node.name);
      index = 0;
    }
    const uniqueName = lexScopeStack[index].$p.nameMapping.get(node.name);
    ASSERT(uniqueName !== undefined, 'should exist');
    //log('Should be bound in scope index', index, 'mapping to `' + uniqueName + '`');
    return uniqueName;
  }

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
  }
  function _stmt(node, isExport = false) {
    group(DIM + 'stmt(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);

    if (node.$scope || (node.type === 'TryStatement' && node.handler)) {
      if (node.$scope) lexScopeStack.push(node);
      else lexScopeStack.push(node.handler);
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        rootScopeStack.push(node);
      }
    }

    switch (node.type) {
      case 'BlockStatement': {
        node.body.forEach((cnode, i) => stmt(node, 'body', i, cnode));
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
          linter.check('TOFIX', { filename: fdata.fname, line: node.loc.start.line, column: node.loc.start.column }, 'todo_for_await');
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
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);
        stmt(node, 'body', -1, node.body);

        if (node.id) {
          const uniqueName = findUniqueNameForBindingIdent(node.id, true);
          const meta = fdata.globallyUniqueNamingRegistery.get(uniqueName);

          // Function ids to not register themselves as usage so we need zero usages before eliminating a function decl
          if (meta.usages.length === 0) {
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
        //const source = node.source;
        //const from = resolve(source.value, fdata.fname);
        //node.specifiers.forEach((snode) => {
        //  const local = snode.local;
        //  const uniqueName = findUniqueNameForBindingIdent(local); // I dont think this is ever different, but w/e
        //  switch (snode.type) {
        //    case 'ImportDefaultSpecifier': {
        //      // import x from 'y'
        //      break;
        //    }
        //    case 'ImportSpecifier': {
        //      // import {x} from 'y'       // local === imported
        //      // import {x,y,z} from 'y'   // will be three individual specifier nodes
        //      // import {x as y} from 'y'
        //      break;
        //    }
        //    case 'ImportNamespaceSpecifier': {
        //      // import * as x from 'y'
        //      break;
        //    }
        //    default: {
        //      ASSERT(false, 'fixme');
        //    }
        //  }
        //});

        break;
      }

      case 'Program': {
        node.body.forEach((cnode, i) => stmt(node, 'body', i, cnode));
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
          stmt(node, 'handler', 'body', node.handler.body);
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

          // The paramNode can be either an Identifier or a pattern of sorts
          if (dnode.id.type === 'Identifier') {
            const uniqueName = findUniqueNameForBindingIdent(dnode.id);
            const meta = fdata.globallyUniqueNamingRegistery.get(uniqueName);
            const updates = meta.updates;
            const usages = meta.usages;
            ASSERT(updates, 'should find meta data for each name and should have an updates array', uniqueName, meta);
            log(
              'The binding for `' + dnode.id.name + '`, unique name `' + uniqueName + '`, has',
              updates.length,
              'updates and',
              usages.length,
              'usages',
            );
            //if (updates.length === 1) {
            //  const { parent, prop, index } = updates[0];
            //  const update = index >= 0 ? parent[prop][index] : parent[prop];
            //
            //  if (
            //    update.type === 'Literal' ||
            //    (update.type === 'Identifier' && ['undefined', 'null', 'true', 'false'].includes(update.name))
            //  ) {
            //    log('The binding `' + uniqueName + '` has one update and it is a primitive:', update);
            //    log('This means it can be inlined in all its usages:', meta.usages);
            //  }
            //} else {
            //  // TODO: cases where all updates are for the same thing
            //}

            if (meta.usages.length === 1) {
              log('Binding is no longer referenced so we can remove its declarator');
              ASSERT(meta.usages[0].parent === dnode, 'the last usage should be its own declaration', meta.usages[0].parent, '==?', dnode);
              // Drop the declaration. It's no longer useful.
              node.declarations[i] = null; // Filtered out after this loop
              removed = true;
            }
          } else if (dnode.id.type === 'ArrayPattern') {
            // Complex case. Walk through the destructuring pattern.
            dnode.id.elements.forEach((node) => destructBindingArrayElement(node, kind));
          } else {
            // Complex case. Walk through the destructuring pattern.
            dnode.id.properties.forEach((ppnode) => destructBindingObjectProp(ppnode, dnode.id, kind));
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

    if (node.$scope || (node.type === 'TryStatement' && node.handler)) {
      lexScopeStack.pop();
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        rootScopeStack.pop();
      }
    }

    groupEnd();
  }
  function expr2(parent2, prop2, index2, parent, prop, index, node) {
    // Skip one property
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

    if (node.$scope) {
      lexScopeStack.push(node);
      if (['FunctionExpression', 'ArrowFunctionExpression'].includes(node.type)) {
        rootScopeStack.push(node);
      }
    }

    switch (node.type) {
      case 'ArrayExpression': {
        for (let i = 0; i < node.elements.length; ++i) {
          const elNode = node.elements[i];
          if (elNode.type === 'SpreadElement') {
            // Special case spread because its behavior differs per parent case
            expr2(node, 'elements', i, elNode, 'argument', -1, elNode.argument);
          } else {
            expr(node, 'elements', i, elNode);
          }
        }
        break;
      }

      case 'AssignmentExpression': {
        expr(node, 'right', -1, node.right);

        if (node.left.type === 'MemberExpression') {
          if (node.left.computed) {
            // Visit the "property" first
            expr2(node, 'left', -1, node.left, 'property', -1, node.left.property);
            expr2(node, 'left', -1, node.left, 'object', -1, node.left.object);
          } else {
            expr2(node, 'left', -1, node.left, 'object', -1, node.left.object);
          }
        } else {
          // TODO: patterns
        }

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
            const uniqueName = findUniqueNameForBindingIdent(node.callee);
            const meta = fdata.globallyUniqueNamingRegistery.get(uniqueName);

            if (meta.updates.length === 0) {
              log('Called `' + uniqueName + '` but it has no updates (implicit global?);', meta);
            } else if (meta.updates.length === 1) {
              log('Called `' + uniqueName + '` and it has one update: parent =', [meta.updates[0].parent?.type]);

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
                    TODO;
                  }
                } else if (updateTo.$p.oneReturnValue) {
                  log(
                    'The function is not pure but does have a single return value. Replace the call with that value and move the call up.',
                  );
                  // `function f(){ console.log(1); return 2; } $(f())` -> `f(); $(1)` -> `console.log(2); $(1)`
                  TODO;
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
        expr(node, 'alternate', node.alternate);
        break;
      }

      case 'FunctionExpression': {
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        stmt(node, 'body', -1, node.body);

        break;
      }

      case 'Identifier': {
        const uniqueName = findUniqueNameForBindingIdent(node);
        log('Name: `' + node.name + '`, unique name: `' + uniqueName + '`');
        const meta = fdata.globallyUniqueNamingRegistery.get(uniqueName);
        log('This ident has', meta?.updates.length, 'updates and', meta?.usages.length, 'usages');
        if (meta.updates.length === 1) {
          const update = meta.updates.pop();
          const updateTo = update.index >= 0 ? update.parent[update.prop][update.index] : update.parent[update.prop];
          log('Updates to', updateTo.type);
          if (update.type === 'Literal' || (update.type === 'Identifier' && ['undefined', 'null', 'true', 'false'].includes(update.name))) {
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
              expr(node, 'computed', -1, node.computed);
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
            expr2(node, 'properties', i, pnode, 'value', -1, pnode.value);
          }
        });

        break;
      }

      case 'RegExpLiteral': {
        break;
      }

      case 'SequenceExpression': {
        node.expressions.forEach((enode, i) => {
          expr2(node, 'expressions', i, enode, 'expressions', i, enode);
        });
        break;
      }

      case 'Super': {
        // Two cases:
        // - call
        // - prop
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

    if (node.$scope) {
      lexScopeStack.pop();
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        rootScopeStack.pop();
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
    let minParamRequired = 0; // Ends up as the last non-rest param without default, +1
    let hasRest = false;
    let paramBindingNames = []; // Includes names inside pattern

    node.params.forEach((pnode, i) => {
      if (pnode.type === 'RestElement') {
        hasRest = true;
        const uniqueName = findUniqueNameForBindingIdent(pnode.argument);
        paramBindingNames.push(uniqueName);
      } else {
        // Now there's basically two states: a param with a default or without a default. The params with a default
        // have an node that is basically "boxed" into an AssignmentPattern. Put the right value on the stack and
        // continue to process the left value. Otherwise, put null on the stack and process the node itself.

        let paramNode = pnode;
        if (pnode.type === 'AssignmentPattern') {
          expr2(node, 'params', i, pnode, 'right', -1, pnode.right);
          paramNode = pnode.left;
        } else {
          minParamRequired = i + 1;
        }

        if (paramNode.type === 'Identifier') {
          const uniqueName = findUniqueNameForBindingIdent(paramNode);
          paramBindingNames.push(uniqueName);
        } else if (paramNode.type === 'ArrayPattern') {
          paramNode.elements.forEach((n) => processArrayPatternElement(n, paramBindingNames));
        } else {
          paramNode.properties.forEach((pnode) => processObjectPatternProp(pnode, paramNode, paramBindingNames));
        }
      }
    });

    return { minParamRequired, hasRest, paramBindingNames };
  }
  function processArrayPatternElement(node, paramBindingNames) {
    let enode = node;
    if (node.type === 'AssignmentPattern') {
      expr(node, 'right', -1, node.right);
      enode = node.left;
    }

    if (enode.type === 'ObjectPattern') {
      enode.properties.forEach((e) => processObjectPatternProp(e, enode, paramBindingNames));
    } else if (enode.type === 'ArrayPattern') {
      enode.elements.forEach((n) => processArrayPatternElement(n, paramBindingNames));
    } else if (enode.type === 'RestElement') {
      const uniqueName = findUniqueNameForBindingIdent(enode.argument);
      paramBindingNames.push(uniqueName);
    } else {
      const uniqueName = findUniqueNameForBindingIdent(enode);
      paramBindingNames.push(uniqueName);
    }
  }
  function processObjectPatternProp(node, objNode, paramBindingNames) {
    if (node.type === 'RestElement') {
      objNode.properties.forEach((pnode, i) => {
        if (pnode.type === 'Property') {
          if (pnode.computed) {
            expr2(objNode, 'properties', i, pnode, 'property', -1, pnode.property);
          }
        }
      });

      const uniqueName = findUniqueNameForBindingIdent(node.argument);
      paramBindingNames.push(uniqueName);
    } else {
      let vnode = node.value;
      let assign = vnode.type === 'AssignmentPattern';
      let lnode = vnode.left;
      crumb(node, 'value', -1);
      if (assign) {
        expr(vnode, 'right', -1, vnode.right);
        crumb(vnode, 'left', -1);
        vnode = lnode;
      }

      if (vnode.type === 'ObjectPattern') {
        vnode.properties.forEach((pnode, i) => {
          crumb(vnode, 'properties', i);
          processObjectPatternProp(pnode, vnode, paramBindingNames);
          uncrumb(vnode, 'properties', i);
        });
      } else if (vnode.type === 'ArrayPattern') {
        vnode.elements.forEach((n) => processArrayPatternElement(n, paramBindingNames));
      } else {
        ASSERT(vnode.type === 'Identifier', 'fixme if different value', vnode);
        const uniqueName = findUniqueNameForBindingIdent(vnode);
        paramBindingNames.push(uniqueName);
      }

      if (assign) {
        uncrumb(lnode, 'left', -1);
      }
      uncrumb(node, 'value', -1);
    }
  }

  function destructBindingObjectProp(pnode, objNode, kind) {
    if (pnode.type === 'Property') {
      if (pnode.computed) {
        expr(pnode, 'property', -1, pnode.property);
        return;
      }
      if (pnode.value.type === 'Identifier') {
      } else if (pnode.value.type === 'ObjectPattern') {
        pnode.value.properties.forEach((ppnode) => destructBindingObjectProp(ppnode, pnode.value, kind));
      } else if (pnode.value.type === 'ArrayPattern') {
        pnode.value.elements.forEach((node) => destructBindingArrayElement(node, kind));
      } else {
        let vnode = pnode.value.left;
        expr(pnode, 'value', -1, pnode.value, 'right', -1, pnode.value.right);
        if (vnode.type === 'Identifier') {
        } else if (vnode.value.type === 'ObjectPattern') {
          pnode.value.properties.forEach((ppnode) => destructBindingObjectProp(ppnode, pnode.value, kind));
        } else if (vnode.value.type === 'ArrayPattern') {
          pnode.value.elements.forEach((node) => destructBindingArrayElement(node, kind));
        } else {
          ASSERT(false, 'fixme for other nodes', vnode);
        }
      }
    } else if (pnode.type === 'RestElement') {
      objNode.properties.forEach((pnode) => {
        if (pnode.type === 'Property') {
          if (pnode.computed) {
            expr(pnode, 'property', -1, pnode.property);
            return null;
          }
        } else {
        }
      });
    } else {
      ASSERT(false, 'fixme', pnode);
    }
  }
  function destructBindingArrayElement(pnode, kind) {
    let enode = pnode;
    if (pnode.type === 'AssignmentPattern') {
      expr(pnode, 'right', -1, pnode.right);
      enode = pnode.left;
    }

    if (enode.type === 'Identifier') {
    } else if (enode.type === 'ObjectPattern') {
      enode.properties.forEach((ppnode) => destructBindingObjectProp(ppnode, enode, kind));
    } else if (enode.type === 'ArrayPattern') {
      enode.elements.forEach((node) => destructBindingArrayElement(node, kind));
    } else if (pnode.type === 'RestElement') {
    } else {
      ASSERT(false, 'fixme if else', enode);
    }
  }
}
