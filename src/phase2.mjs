import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { printer } from '../lib/printer.mjs';
import { $p } from './$p.mjs';
import { ASSERT, DIM, BOLD, RESET, BLUE, dir, group, groupEnd, log, fmat, printNode } from './utils.mjs';
import * as AST from './ast.mjs';
import globals from './globals.mjs';

// Ideas todo
// - `x = void y` -> `y; x = undefined`
// - `x = !y` -> can we find some cases where we can guarantee that outcome of this even if we don't actually know y?
// - eliminate noop parts from sequences (literals, idents)
// - does it make sense to decompose nested assignments? `a = b = c` -> `b = c, a = b`?, or should normalization be enough?
// - artificial cases like `[...'']`
// - toplevel objects/arrays should break down into side-effect pieces (property values and computed keys?)

// Functions have been hoisted, scopes have been resolved, time to merge AST nodes and leave as few nodes as possible
// without actually interpreting code.
// For example, return statement return value tid get merged with the return keyword and the whole statement node.

const E = eval; // indirect eval. Because it's safe that way.                                                                        lol.

export function phase2(program, fdata, resolve, req) {
  let changed = false; // Was the AST updated? We assume that updates can not be circular and repeat until nothing changes.
  let somethingChanged = false; // Did phase2 change anything at all?

  const superCallStack = []; // `super()` is validated by the parser so we don't have to worry about scoping rules

  const funcStack = [];

  // Crumb path for walking through the AST. This way you can reach out to parent nodes and manipulate them or whatever. Shoot your own foot.
  const crumbsNode = [];
  const crumbsProp = [];
  const crumbsIndex = [];

  function crumbGet(delta) {
    ASSERT(delta > 0, 'must go at least one step back');
    ASSERT(delta < crumbsNode.length, 'can not go past root');

    const index = crumbsIndex[crumbsIndex.length - delta];
    if (index >= 0) return crumbsNode[crumbsNode.length - delta][crumbsProp[crumbsProp.length - delta]][index];
    else return crumbsNode[crumbsNode.length - delta][crumbsProp[crumbsProp.length - delta]];
  }
  function crumbSet(delta, node) {
    ASSERT(delta > 0, 'must go at least one step back');
    ASSERT(delta < crumbsNode.length, 'can not go past root');
    ASSERT(node?.type, 'every node must at least have a type');

    const parent = crumbsNode[crumbsNode.length - delta];
    const prop = crumbsProp[crumbsProp.length - delta];
    const index = crumbsIndex[crumbsIndex.length - delta];

    log('Replacing the call at `' + parent.type + '.' + prop + (index >= 0 ? '[' + index + ']' : '') + '` with', node.type);

    if (index >= 0) return (parent[prop][index] = node);
    else return (parent[prop] = node);
  }

  group(
    '\n\n\n##################################\n## phase2  ::  ' +
      fdata.fname +
      '  ::  cycle ' +
      fdata.cycle +
      '\n##################################\n\n\n',
  );

  do {
    // Clear usage and update data befor each pass (mutations may invalidate the data so we wipe before every pass)
    fdata.globallyUniqueNamingRegistery.forEach((meta) => {
      meta.updates = [];
      meta.usages = [];
    });

    changed = false;
    stmt(null, 'ast', -1, fdata.tenkoOutput.ast);
    if (changed) somethingChanged = true;

    log('\nCurrent state\n--------------\n' + fmat(printer(fdata.tenkoOutput.ast)) + '\n--------------\n');
  } while (changed);

  log(
    'Usage / update stats for non-builtins:\n' +
      [...fdata.globallyUniqueNamingRegistery.values()]
        .filter((meta) => !globals.has(meta.uniqueName))
        .map((meta) => ' - `' + meta.uniqueName + '`: ' + meta.updates.length + ' updates and ' + meta.usages.length + ' usages')
        .join('\n'),
    '\n',
  );

  log('End of phase2');
  groupEnd();

  return somethingChanged;

  function crumb(parent, prop, index) {
    crumbsNode.push(parent);
    crumbsProp.push(prop);
    crumbsIndex.push(index);
  }
  function uncrumb(parent, prop, index) {
    const a = crumbsNode.pop();
    const b = crumbsProp.pop();
    const c = crumbsIndex.pop();
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
        log('Flattening a block');
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
      node.$p.pure = true; // Output depends on input, nothing else, no observable side effects
      node.$p.returns = []; // all return nodes, and `undefined` if there's an implicit return too
      if (node.$p.explicitReturns === 'no') {
        log('Function has at least one implicit return point so adding that to the returns');
        // at least one branch returns implicitly so add undefined
        node.$p.returns.push(undefined);
      } else {
        log('Function returns explicitly in all branches (', node.$p.explicitReturns, ')');
      }
    }

    crumb(parent, prop, index);
    _stmt(node, isExport);
    uncrumb(parent, prop, index);

    if (node.type === 'FunctionDeclaration') {
      const x = funcStack.pop();
      ASSERT(x === node, 'amirite');
      log('Function was', node.$p.pure ? 'pure' : 'not pure', 'and has', node.$p.returns.length, 'return points to consider');

      ASSERT(
        node.$p.returns.length,
        'returns should contain at least one element, even if it has no return statements the implicit return would add an undefined to the list',
      );

      let multi = false; // more than one different return value?
      let value = undefined;
      //console.log('-->', node.$p);
      node.$p.returns.some((rnode, i) => {
        // !rnode for the implicit return, or return without argument
        if (!rnode || (rnode.type === 'Identifier' && rnode.name === 'undefined')) {
          if (i && value.name !== 'undefined') multi = true;
          log('- returns `undefined`, implicitly');
          value = { type: 'Identifier', name: 'undefined', $p: $p() };
        } else if (rnode.type === 'Literal') {
          if (i && value.value !== rnode.value) multi = true;
          log('- returns `' + rnode.value + '`');
          value = { type: 'Literal', value: rnode.value, raw: rnode.raw, $p: $p() };
        } else if (rnode.type === 'Identifier' && ['null', 'NaN', 'Infinity'].includes(rnode.name)) {
          if (i && value.name !== rnode.name) multi = true;
          log('- returns `' + rnode.name + '` (', rnode.name, ')');
          value = { type: 'Identifier', name: rnode.name, $p: $p() };
        } else {
          // This kind of value is currently unsupported
          // TODO: collect these cases and figure out if we can do something to support them anyways
          log('- returns', rnode, '(unsupported)');
          multi = true;
        }

        return multi;
      });

      if (!multi) {
        // All return statements of this function returned the same value
        // If the function returned implicitly anywhere then all explicit returns also returned `undefined`
        log('Function is always returning', [value], 'so any call to it can be decomposed to the call itself and then this value');
        node.$p.oneReturnValue = value;
      } else {
        node.$p.oneReturnValue = undefined;
      }
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
        // TODO: labels. Can we simplify this? Should we?
        break;
      }

      case 'ClassDeclaration': {
        processClass(node, false, isExport);
        break;
      }

      case 'ContinueStatement': {
        // TODO: labels. Can we simplify this? Should we?
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
        // export * as foo from 'foo'
        // TODO: replace the star with the actual symbols being exported...?
        const source = node.source.value;
        ASSERT(typeof source === 'string');
        break;
      }

      case 'ExportDefaultDeclaration': {
        // export default expr
        // export default function(){}
        // export default class(){}

        // Note: imports/exports are not properly tracked. Only do the effort to cover executed code for now.

        if (node.declaration.type === 'FunctionDeclaration' || node.declaration.type === 'ClassDeclaration') {
          log('Export defaulting a function or class. Treating it a regular declaration that exports as `default`.');
          // It's kind of relevant to parse them as statements because of how their id gets bound
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
          // export ... from
        } else if (node.declaration) {
          ASSERT(
            node.declaration.type === 'FunctionDeclaration' ||
              node.declaration.type === 'VariableDeclaration' ||
              node.declaration.type === 'ClassDeclaration',
            'fixme',
            node,
          );
          stmt(node, 'declaration', -1, node.declaration, true);
        } else {
          node.specifiers.forEach((snode) => {
            ASSERT(snode.local.type === 'Identifier', 'fixme if different', snode);
            ASSERT(snode.exported.type === 'Identifier', 'fixme if different', snode);
          });
        }
        break;
      }

      case 'ExpressionStatement': {
        expr(node, 'expression', -1, node.expression);
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
          ASSERT(node.left.declarations.length === 1, 'I think this is syntactically enforced?');
          ASSERT(node.left.declarations[0].type === 'VariableDeclarator');
          const id = node.left.declarations[0].id;
          ASSERT(id && id.type === 'Identifier');
          ASSERT(!node.left.declarations[0].init, 'for-in lhs should not be allowed to have an init');

          log('For-in lhs:', id.name);
        } else {
          if (node.left.type === 'Identifier') {
            const meta = fdata.globallyUniqueNamingRegistery.get(node.left.name);
            ASSERT(meta, 'meta data should exist for this name', node.left.name, meta);
            log('Marking `' + node.name + '` as being used and assigned to');
            meta.updates.push({ parent: node, prop: 'left', index: -1 });
          }
          expr(node, 'left', -1, node.left);
        }
        stmt(node, 'body', -1, node.body);
        break;
      }

      case 'ForOfStatement': {
        ASSERT(!node.await, 'TODO: This needs proper support for iterable stuff for true support. We could start with superficial support.');

        // Get the kind of the type of the rhs. Initially, that means string for strings and kind for arrays.
        expr(node, 'right', -1, node.right);

        if (node.left.type === 'VariableDeclaration') {
          ASSERT(node.left.declarations.length === 1, 'I think this is syntactically enforced?');
          ASSERT(node.left.declarations[0].type === 'VariableDeclarator');
          const id = node.left.declarations[0].id;
          ASSERT(id && id.type === 'Identifier');
          ASSERT(!node.left.declarations[0].init, 'for-in lhs should not be allowed to have an init');

          log('For-of lhs:', id.name);
        } else {
          if (node.left.type === 'Identifier') {
            const meta = fdata.globallyUniqueNamingRegistery.get(node.left.name);
            ASSERT(meta, 'meta data should exist for this name', node.left.name, meta);
            log('Marking `' + node.name + '` as being used and assigned to');
            meta.updates.push({ parent: node, prop: 'left', index: -1 });
          }
          expr(node, 'left', -1, node.left);
        }

        stmt(node, 'body', -1, node.body);
        break;
      }

      case 'FunctionDeclaration': {
        log('Name:', node.id ? node.id.name : '<anon>');

        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        stmt(node, 'body', -1, node.body);

        log('The explicitReturns value for its body is:', [node.body.$p.explicitReturns]);

        if (node.id) {
          group('Function decl id:', node.id.name);
          const meta = fdata.globallyUniqueNamingRegistery.get(node.id.name);
          meta.updates.push({
            // parent of this function decl
            parent: crumbsNode[crumbsNode.length - 1],
            prop: crumbsProp[crumbsProp.length - 1],
            index: crumbsIndex[crumbsIndex.length - 1],
          });
          groupEnd();
        }

        if (isExport) {
          ASSERT(node.id, 'exported functions (not by default) must have an id as per syntax');
        }

        if (node.body.length === 0) {
          ASSERT(node.$p.pure, 'empty func should be pure');

          // Empty function. Eliminate.
          node.$p.replaceWith = { type: 'Identifier', name: 'undefined', $p: $p() };
        } else if (node.body.length === 1 && node.body[0].type === 'ReturnStatement') {
          // TODO: function f(a = sideEffects()) { return 'x' }

          if (node.body[0].argument) {
            // function f(){ return 'x'; }f() -> 'x'
            // TODO: function f(a) { return a }
            // TODO: let n = 1; function f() { return n }

            if (
              node.body[0].argument.type === 'Literal' ||
              (node.body[0].argument.type === 'Identifier' && ['undefined', 'NaN', 'Infinity'].includes(node.body[0].argument.name))
            ) {
              // So this is a function with only a return statement and it returns a literal or primitive.
              // TODO: side effects are possible in the param defaults. But barring that...
              // There are no other side effects so this function can essentially be replaced with the literal for any call of it
              // If this function now gets resolved as being called then the call will be replaced with this literal. Baby steps.
              log('Should replace calls to this function with', node.body[0].argument.type);
              node.$p.replaceWith = node.body[0].argument;
            }
          } else {
            // Eh ok. Good test, I guess.
            node.$p.replaceWith = 'undefined';
          }
        }

        break;
      }

      case 'IfStatement': {
        expr(node, 'test', -1, node.test);
        //$(node, '@condition');

        stmt(node, 'consequent', -1, node.consequent);
        if (node.alternate) stmt(node, 'alternate', -1, node.alternate);

        break;
      }

      case 'ImportDeclaration': {
        const source = node.source;
        ASSERT(typeof source.value === 'string', 'source should be a string', node);
        ASSERT(typeof resolve === 'function' || resolve === undefined, 'resolve should be a func or unset', resolve);
        const from = resolve(source.value, fdata.fname);

        node.specifiers.forEach((snode) => {
          const local = snode.local;
          ASSERT(local && local.type === 'Identifier', 'local should be an ident', snode);

          switch (snode.type) {
            case 'ImportDefaultSpecifier': {
              // import x from 'y'
              log('Importing the default export from `0' + from + '` as `' + local.name + '` (-> `' + local.name + '`)');
              //$(snode, '@import_binding', uniqueName, 'default', from);
              break;
            }
            case 'ImportSpecifier': {
              // import {x} from 'y'       // local === imported
              // import {x,y,z} from 'y'   // will be three individual specifier nodes
              // import {x as y} from 'y'

              const imported = snode.imported;
              ASSERT(imported && imported.type === 'Identifier', 'each specifier should have exactly one imported symbol', snode);
              log(
                'Importing the exported symbol `' +
                  imported.name +
                  '` from `' +
                  from +
                  '` as `' +
                  local.name +
                  '` (-> `' +
                  local.name +
                  '`)',
              );
              //$(snode, '@import_binding', uniqueName, imported.name, from);
              break;
            }
            case 'ImportNamespaceSpecifier': {
              // import * as x from 'y'
              log('Importing all exports from module `' + from + '` as an object in `' + local.name + '` (-> `' + local.name + '`)');
              //$(snode, '@import_star', uniqueName, from);
              break;
            }
            default: {
              ASSERT(false, 'fixme');
            }
          }
        });

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

        log('Adding return statement to $p.returns');
        funcStack[funcStack.length - 1].$p.returns.push(node.argument);
        break;
      }

      case 'TryStatement': {
        stmt(node, 'block', -1, node.block);
        if (node.handler) {
          if (node.handler.param) {
            log('Processing catch clause');
            // Catch clause is present. Register the binding.
            ASSERT(node.handler.param.type === 'Identifier', 'todo catch clauses that are not idents', node.handler.param);
            log('Catch var:', node.handler.param.name);
          }
          // TODO: footgun; setting node as parent but skipping on handler or body in the crumb path? Sorry future me.
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
        node.declarations.forEach((dnode, i) => {
          ASSERT(dnode.id?.type === 'Identifier', 'todo: implement other kinds of variable declarations');

          // For ident case;
          const meta = fdata.globallyUniqueNamingRegistery.get(dnode.id.name);
          log('Marking `' + dnode.id.name + '` as being updated to', dnode.init?.type);
          meta.updates.push({ parent: dnode, prop: 'init', index: -1 });
          meta.usages.push({ parent: dnode, prop: 'id', index: -1 });

          if (dnode.init) {
            expr2(node, 'declarations', i, dnode, 'init', -1, dnode.init);
          } else {
            // Ignore? Phase1 should have marked this var as potentially undefined. If it has no actual assignments then it's just `undefined`
            //const pid = createPlaceholder(store, 'HB', 'binding `' + dnode.id ? dnode.id.name : '<destruct>' + '` without init');
            //log('Created placeholder', tstr(pid), 'for the binding');
          }

          // The id can be either an Identifier or a pattern of sorts
          if (dnode.id.type === 'Identifier') {
            //if (isExport) {
            //  $(dnode, '@dup', '<exported binding decl>');
            //  $(dnode, '@export_as', isExport === true ? uniqueName : 'default');
            //}
          } else {
            ASSERT(false, 'Patterns should be normalized out and there isnt anything else here?', node);
          }
        });
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
  function expr2(parent2, prop2, index2, parent, prop, index, node, isMethod, isCallee, methodName) {
    // Skip one property
    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      funcStack.push(node);
      node.$p.pure = true; // Output depends on input, nothing else, no observable side effects
      node.$p.returns = []; // all return nodes, and `undefined` if there's an implicit return too

      if (node.$p.explicitReturns === 'no') {
        log('Function has at least one implicit return point so adding that to the returns');
        // at least one branch returns implicitly so add undefined
        node.$p.returns.push(undefined);
      } else {
        log('Function returns explicitly in all branches (', node.$p.explicitReturns, ')');
      }
    }
    crumb(parent2, prop2, index2);
    expr(parent, prop, index, node, isMethod, isCallee, methodName);
    uncrumb(parent2, prop2, index2);
    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      funcStack.pop();

      ASSERT(
        node.$p.returns.length,
        'returns should contain at least one element, even if it has no return statements the implicit return would add an undefined to the list',
      );

      let multi = false; // more than one different return value?
      let value = undefined;

      if (node.type === 'ArrowFunctionExpression' && node.expression) {
        // The whole body is the return expression
        // Right now let's take an extra step to only allow primitives here. But later we might just inline the whole thing because why not.
        if (node.body.type === 'Literal') {
          value = { type: 'Literal', value: node.value, raw: node.raw, $p: $p() };
        } else if (node.body.type === 'Identifier' && ['undefined', 'NaN', 'Infinity'].includes(node.body.name)) {
          value = { type: 'Identifier', name: node.name, $p: $p() };
        } else {
          multi = true;
        }
      } else {
        node.$p.returns.some((rnode, i) => {
          // !rnode for the implicit return, or return without argument
          if (!rnode || (rnode.type === 'Identifier' && rnode.name === 'undefined')) {
            if (i && value.name !== 'undefined') multi = true;
            log('- returns `undefined`, implicitly');
            value = { type: 'Identifier', name: 'undefined', $p: $p() };
          } else if (rnode.type === 'Literal') {
            if (i && value.value !== rnode.value) multi = true;
            log('- returns `' + rnode.value + '`');
            value = { type: 'Literal', value: rnode.value, raw: rnode.raw, $p: $p() };
          } else if (rnode.type === 'Identifier' && ['undefined', 'NaN', 'Infinity'].includes(rnode.name)) {
            if (i && value.name !== rnode.name) multi = true;
            log('- returns `' + rnode.name + '` (', rnode.name, ')');
            value = { type: 'Identifier', name: rnode.name, $p: $p() };
          } else {
            // This kind of value is currently unsupported
            // TODO: collect these cases and figure out if we can do something to support them anyways
            log('- returns', rnode, '(unsupported)');
            multi = true;
          }

          return multi;
        });
      }

      if (!multi) {
        // All return statements of this function returned the same value
        // If the function returned implicitly anywhere then all explicit returns also returned `undefined`
        log('Function is always returning', [value], 'so any call to it can be decomposed to the call itself and then this value');
        node.$p.oneReturnValue = value;
      } else {
        node.$p.oneReturnValue = undefined;
      }
    }
  }
  function expr(parent, prop, index, node, isMethod, isCallee, methodName) {
    ASSERT(
      parent === null ||
        index === 'body' ||
        (Array.isArray(parent[prop]) ? parent[prop][index] === node : parent[prop] === node && index === -1),
      'caller should pass on proper parent[prop][index] data',
      parent,
      prop,
      index,
      node,
      isMethod,
      isCallee,
      methodName,
    );

    crumb(parent, prop, index);
    _expr(node, isMethod, isCallee, methodName);
    uncrumb(parent, prop, index);
  }
  function _expr(node, isMethod = false, isCallee = false, methodName = '') {
    group(DIM + 'expr(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);

    switch (node.type) {
      case 'ArrayExpression': {
        if (node.elements.length === 0) {
          //log('Empty array, pushing a placeholder to the stack');
          //const pid = 'HEAK' + String(++store.uid); // placeholder id (holder, empty, array, kind)
          //store.set(pid, {_class: 'placeholder', tid: pid, type: 'H', props: new Map, seen: new Map, placeholder: true, alias: null});
          //log('Created a placeholder tee for kind:', tstr(pid));
        } else {
          for (let i = 0; i < node.elements.length; ++i) {
            const elNode = node.elements[i];
            // Elided elements are `null` here
            if (elNode) {
              if (elNode.type === 'SpreadElement') {
                // Special case spread because its behavior differs per parent case
                expr2(node, 'elements', i, elNode, 'argument', -1, elNode.argument);
                // Stack should now have an array and the owner array should have its kind merged like all other elements
                //$(node, '@kind', '<empty array literal>'); // Ignore if the array is empty... (in that case dup the stack)
              } else {
                expr(node, 'elements', i, elNode);
              }
            }
          }
        }
        //$(node, '@arr', Math.max(1, node.elements.length));
        break;
      }

      case 'AssignmentExpression': {
        // Get the starting tokens;
        // - left (either the property name or the binding ident)
        // - operator (the first non-space token left of node.right
        // - right (first token of the value being assigned)

        expr(node, 'right', -1, node.right);
        expr(node, 'left', -1, node.left);

        if (node.left.type === 'Identifier') {
          log('Assignment to:', node.left.name);
          const meta = fdata.globallyUniqueNamingRegistery.get(node.left.name);
          meta.updates.push({
            // parent of this function decl
            parent: node,
            prop: 'right',
            index: -1,
          });
        }

        funcStack[funcStack.length - 1].$p.pure = false; // TODO: confirm whether the assignment is to a closure or not because we can eliminate it for local assignments.

        break;
      }

      case 'ArrowFunctionExpression': {
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        ASSERT(
          !node.expression,
          'normalization should make sure all arrows with expression body are transformed to arrows with block',
          node,
        );

        stmt(node, 'body', -1, node.body);

        break;
      }

      case 'BinaryExpression': {
        log('Operator:', node.operator);

        expr(node, 'left', -1, node.left);
        expr(node, 'right', -1, node.right);

        switch (node.operator) {
          case '+': {
            // Note: this is unsafe due to potential rounding errors and/or representation errors

            if (node.left.type === 'Literal' && node.right.type === 'Literal') {
              // TODO: this hack won't work for something like bigint and a few others. I guess.
              log('Replacing BinaryExpression with a Literal');
              const val = E(node.left.raw + ' + ' + node.right.raw);
              const str = JSON.stringify(val); // eew
              node.left.value = val;
              node.left.raw = str;

              crumbSet(1, node.left);
              changed = true;
            }

            break;
          }
          case '-': {
            // Note: this is unsafe due to potential rounding errors and/or representation errors

            break;
          }
          case '==':
          case '!=':
          case '===':
          case '!==':
          case '<':
          case '<=':
          case '>':
          case '>=': {
            // Note: regexes aren't necessarily safe to compare and eliminate just yet here TODO
            let nleft = node.left;
            let lneg = false;
            if (nleft.type === 'UnaryExpression' && nleft.operator === '-') {
              nleft = nleft.argument;
              lneg = true;
            }
            if (
              (nleft.type === 'Literal' && !nleft.regex) ||
              (nleft.type === 'Identifier' && ['undefined', 'NaN', 'Infinity'].includes(nleft.name))
            ) {
              let nright = node.right;
              let rneg = false;
              if (nright.type === 'UnaryExpression' && nright.operator === '-') {
                nright = nright.argument;
                rneg = true;
              }
              if (
                (nright.type === 'Literal' && !nright.regex) ||
                (nright.type === 'Identifier' && ['undefined', 'NaN', 'Infinity'].includes(nright.name))
              ) {
                let left =
                  nleft.type === 'Literal' ? nleft.value : nleft.name === 'undefined' ? undefined : nleft.name === 'NaN' ? NaN : Infinity;
                if (lneg) left = -left;
                let right =
                  nright.type === 'Literal'
                    ? nright.value
                    : nright.name === 'undefined'
                    ? undefined
                    : nright.name === 'NaN'
                    ? NaN
                    : Infinity;
                if (rneg) right = -right;
                const result =
                  node.operator === '!='
                    ? left != right
                    : node.operator === '=='
                    ? left == right
                    : node.operator === '!=='
                    ? left !== right
                    : node.operator === '!=='
                    ? left === right
                    : node.operator === '<'
                    ? left < right
                    : node.operator === '<='
                    ? left <= right
                    : node.operator === '>'
                    ? left > right
                    : left >= right;

                log('Replacing', node.operator, 'node with', left, node.operator, right, '==>', result);
                crumbSet(1, {
                  type: 'Literal',
                  value: result,
                  raw: String(result),
                  $p: $p(),
                });
                changed = true;
              }
            }
            break;
          }

          case 'instanceof': {
            break;
          }

          case 'in': {
            break;
          }

          default:
            // Merge left and right with number and return a number
            //$(node, '@push', 'number');
            //$(node, '@merge'); // Should return a number
            //$(node, '@merge'); // Should return a number
            break;
        }

        break;
      }

      case 'CallExpression': {
        log(DIM + 'Setting up call args' + RESET);
        let spreadAt = -1; // If this call contained a spread, we have to verify it starts on-or-after the rest param, at runtime.
        node.arguments.forEach((anode, i) => {
          if (anode.type === 'SpreadElement') {
            log(
              'Spread in a call. Complicated because we can not know the array size in our model. Hence we can only support a handful of cases, mostly concerning this at the end of the arg list',
            );
            // TODO: we can do checks around the spread and see if they are the same type
            // TODO: can ignore empty arrays (although is that really worth it in the real world?)
            if (i !== 0) {
              // note: reversed order, so we expect rest to be index 0
            } else {
              spreadAt = node.arguments.length - 1 - i; // Note: list is reversed!
            }
            // Either way, get the kind, push it onto the stack for good measure...
            expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
            //$(node, '@kind', '<call spread arg>');
          } else {
            expr(node, 'arguments', i, anode);
          }
        });

        log(DIM + 'Setting up callee to call' + RESET);
        if (node.callee.type === 'Super') {
          // Note: the extends of the class to which this constructor belongs is syntactically bound to this super()
          log('This is a `super()` call');
          const ownerFunction = superCallStack[superCallStack.length - 1];
          ASSERT(
            ownerFunction && ownerFunction.superClass,
            'parser should validate that a `super()` call is contained in an es6 constructor which must mean the owner class is extending a value',
            ownerFunction,
          );
          expr(ownerFunction, 'superClass', -1, ownerFunction.superClass); // put it on the stack
          //$(node, '@super_call', node.arguments.length, spreadAt);
        } else {
          log(DIM + 'Setting up call context' + RESET);
          expr(node, 'callee', -1, node.callee, false, true);
        }

        funcStack[funcStack.length - 1].$p.pure = false; // TODO: if this calls a pure function then this call is okay in a pure function

        break;
      }

      case 'ClassExpression': {
        processClass(node, true, false);
        break;
      }

      case 'ConditionalExpression': {
        expr(node, 'test', -1, node.test);
        //$(node, '@push', 'boolean');
        //$(node, '@merge'); // Merge condition with bool
        //$(node, '@drop'); // pop the bool
        expr(node, 'consequent', -1, node.consequent);
        expr(node, 'alternate', -1, node.alternate);
        //$(node, '@merge'); // Merge consequent with alternate (not with bool) and return it
        break;
      }

      case 'FunctionExpression': {
        log('isMethod:', isMethod);

        //let abak = actions;
        //actions = [];

        //$(node, '@log', 'start of func expr ' + (node.id ? node.id.name : '{anon}'));

        if (node.id) {
          // Oh fun, function expression id scoping
          let has = false;
          let scope = node.$scope;
          ASSERT(scope.type === Tenko.SCOPE_LAYER_FUNC_BODY, 'please no 1', scope);
          let names = scope.names;
          if (names !== Tenko.HAS_NO_BINDINGS && names.has('shadowedFunction')) has = true;
          scope = scope.parent;
          ASSERT(scope.type === Tenko.SCOPE_LAYER_FUNC_PARAMS, 'please no 2', scope);
          names = scope.names;
          if (names !== Tenko.HAS_NO_BINDINGS && names.has('shadowedFunction')) has = true;
          scope = scope.parent;
          ASSERT(scope.type === Tenko.SCOPE_LAYER_FUNC_ROOT, 'please no 3', scope);
          names = scope.names;
          if (names !== Tenko.HAS_NO_BINDINGS && names.has('shadowedFunction')) has = true;
          scope = scope.parent;
          ASSERT(scope.type === Tenko.SCOPE_LAYER_GLOBAL, 'please no 4', scope);

          if (has) {
            log('The func expr name was shadowed by a param name or local var, ignoring it');
          } else {
            // Ok, the func expr had a name the name was not shadowed, record it
            log('Making sure the func name gets bound properly');
            // Specific hack because we won't have access to the 'current" func instance otherwise
            log('Function param id:');
            const meta = fdata.globallyUniqueNamingRegistery.get(node.id.name);
            meta.updates.push({
              parent: crumbsNode[crumbsNode.length - 1],
              prop: crumbsProp[crumbsProp.length - 1],
              index: crumbsIndex[crumbsIndex.length - 1],
            });
          }
        } else if (isMethod) {
          log('Function expression is a method with key: `' + methodName + '`');
          ASSERT(methodName, 'all methods have a key', methodName); // TODO: What about computed keys?
        } else {
          log('Function expression has no name');
        }

        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        stmt(node, 'body', -1, node.body);

        break;
      }

      case 'Identifier': {
        const meta = fdata.globallyUniqueNamingRegistery.get(node.name);
        ASSERT(meta, 'meta data should exist for this name', node.name, meta);
        log('Marking `' + node.name + '` as being used');
        meta.usages.push({
          parent: crumbsNode[crumbsNode.length - 1],
          prop: crumbsProp[crumbsProp.length - 1],
          index: crumbsIndex[crumbsIndex.length - 1],
        });

        //funcStack[funcStack.length - 1].$p.pure = false; // TODO: what edge cases break this? closures probably? especially if the value is returned

        break;
      }

      case 'Literal': {
        if (typeof node.value === 'string') {
          //$(node, '@push', 'string');
        } else if (typeof node.value === 'number') {
          //$(node, '@push', 'number');
        } else if (typeof node.value === 'boolean') {
          //$(node, '@push', 'boolean');
        } else if (node.regex !== undefined) {
          //$(node, '@push', 'RegExp.prototype');
          //$(node, '@obj', ['__proto__']);
        } else if (node.value === null) {
          //$(node, '@push', 'null');
        } else {
          log('Missing support for literal', node);
        }
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
        const nameStack = [];
        const dynaStack = [];
        function r(node) {
          if (node.type === 'MemberExpression') {
            // Visit the object first, then on the way up potentially walk the computed prop expresison if it one
            crumb(node, 'object', -1, node.object);
            r(node.object);
            uncrumb(node, 'object', -1);

            if (node.computed) {
              log('Dynamic property access.');
              expr(node, 'property', -1, node.property);
              dynaStack.push(true);
            } else {
              dynaStack.push(false);
            }
            nameStack.push(node.property);
          } else if (node.type === 'Super') {
            log('This is a `super.prop` property');
            // The instance that owns the method containing this super prop can be found at the top of store.get('#superStack')
            //$(node, '@super_prop'); // Root object
          } else {
            _expr(node); // Root object
          }
        }
        r(node);

        funcStack[funcStack.length - 1].$p.pure = false; // TODO: getters and setters are problematic. if we can guarantee that the read is just a read, and on a local value, then maybe.

        //while (nameStack.length > 0) {
        //  const wasDynamic = dynaStack.pop();
        //  const nameNode = nameStack.pop();
        //
        //  if (nameStack.length === 0 && isCallee) {
        //    // The top address is now the callee. We want to get a method from it (consumes top)
        //    // AND use it as context for the call (also consumes top), so dupe it here
        //    //$(node, '@dup', '<top is called and serves as context>');
        //  }
        //
        //  if (wasDynamic) {
        //    // Dynamic property access; trying to get the kind of the array as the "get", or kind of object-as-map
        //    expr(nameNode);
        //    //$(nameNode, '@dyn_get', nameStack.length);
        //  } else {
        //    ASSERT(nameNode && nameNode.type === 'Identifier', 'the stack should contain ident nodes or zeroes', nameNode);
        //    //$(nameNode, '@get', nameNode.name);
        //  }
        //}
        break;
      }

      case 'NewExpression': {
        let spreadAt = -1; // see CallExpression
        log(DIM + 'Setting up `new` args' + RESET);

        node.arguments.forEach((anode, i) => {
          if (anode.type === 'SpreadElement') {
            log('Spread in a `new`');
            spreadAt = i;
            expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
            //$(node, '@kind', '<spread arg>');
          } else {
            expr(node, 'arguments', i, anode);
          }
        });

        expr(node, 'callee', -1, node.callee);
        //$(node, '@new', node.arguments.length, spreadAt);

        funcStack[funcStack.length - 1].$p.pure = false; // TODO: fine for pure functions or constructors. good luck.

        break;
      }

      case 'ObjectExpression': {
        node.properties.forEach((pnode, i) => {
          if (pnode.type === 'SpreadElement') {
            expr2(node, 'properties', i, pnode, 'argument', -1, pnode.argument);
          } else {
            ASSERT(pnode.type === 'Property', 'fixmeifnot', pnode);

            if (pnode.computed) {
              // Visit the key before the value
              expr(pnode, 'key', -1, pnode.key);
            } else {
              ASSERT(pnode.key.type === 'Identifier' || pnode.key.type === 'Literal', 'prop key should be ident or num/str', pnode);
            }

            ASSERT(pnode.value);
            expr2(
              node,
              'properties',
              i,
              pnode,
              'value',
              -1,
              pnode.value,
              pnode.method ? 'method' : '',
              false,
              pnode.method ? (pnode.key.type === 'Identifier' ? pnode.key.name : String(pnode.key.value)) : undefined,
            );
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
        //$(node, '@regex');
        break;
      }

      case 'SequenceExpression': {
        node.expressions.forEach((enode, i) => {
          group('Sequence part', i + 1, '/', node.expressions.length);
          expr(node, 'expressions', i, enode);
          if (i < node.expressions.length - 1) {
            log('This is not the last value in the sequence so dropping it');
          } else {
            log('This is the last value in the sequence so that is what it returns');
          }
          groupEnd();
        });
        break;
      }

      case 'Super': {
        // Two cases:
        // - call
        // - prop
        // The call is syntactically restricted to es6 constructors of classes that extend _something_. That something
        // is only checked at runtime, and so `super` is only resolved at runtime as well.
        // The prop can occur in any class method or object method. This usage is syntactically restircted to the
        // method shorthand syntax and its reference is bound to the initial object of its __proto__. That bond cannot
        // be broken or changed in JS (unlike call, which is an indirect lookup).

        funcStack[funcStack.length - 1].$p.pure = false; // TODO: super what tho. super call is okay for pure constructors. super prop is probably too complicated to verify?

        // This handler is a noop because the MemberExpression and CallExpression handlers should handle super
        break;
      }

      case 'TaggedTemplateExpression': {
        ASSERT(false, 'should be normalized out');
        break;
      }

      case 'TemplateLiteral': {
        node.expressions.forEach((enode, i) => {
          expr(node, 'expressions', i, enode);
          //$(node, '@lint-inv', 'string', 'TEMPLATE_EXPR_STRING');
          //$(node, '@drop'); // TODO: if not string, resolve the .toString/.valueOf as JS would, etc.
        });

        //$(node, '@push', 'string');
        break;
      }

      case 'ThisExpression': {
        // It's a hack but since you can't declare a local binding named `this`, we can get away with it.
        log('Queueing lookup explicitly for `this`');
        //$(node, '@ident', 'this');
        break;
      }

      case 'UnaryExpression': {
        log('Operator:', node.operator);

        expr(node, 'argument', -1, node.argument);

        switch (node.operator) {
          case 'delete': {
            break;
          }

          case '+': {
            if (node.argument.type === 'Literal') {
              if (typeof node.argument.value === 'number') {
                // Drop the unary. It adds no value.
                log('Dropping the + unary');
                crumbSet(1, node.argument);
                changed = true;
              } else if (typeof node.argument.value === 'string') {
                // Shrug.
              } else if (node.argument.value === true) {
                log('Dropping the + unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: 1,
                  raw: '1',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.value === false) {
                log('Dropping the + unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: 0,
                  raw: '0',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.regex) {
                log('Dropping the + unary, +regex becomes NaN');
                crumbSet(1, {
                  type: 'Identifier',
                  name: 'NaN',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.value === null) {
                log('Dropping the + unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: 0,
                  raw: '0',
                  $p: $p(),
                });
                changed = true;
              } else {
                ASSERT(false, 'what kind of literal?', node.argument);
              }
            } else if (node.argument.type === 'Identifier') {
              if (node.argument.name === 'undefined') {
                log('Dropping the + unary, +undefined becomes NaN');
                crumbSet(1, {
                  type: 'Identifier',
                  name: 'NaN',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.name === 'NaN') {
                log('Dropping the + unary');
                crumbSet(1, node.argument);
                changed = true;
              } else if (node.argument.name === 'Infinity') {
                log('Dropping the + unary');
                crumbSet(1, node.argument);
                changed = true;
              }
            } else if (node.argument.type === 'UnaryExpression') {
              if (node.argument.operator === '-') {
                log('Replace a negative number with itself since the unary `+` will not change it');
                crumbSet(1, node.argument);
                changed = true;
              }
            }
            break;
          }
          case '-': {
            if (node.argument.type === 'Literal') {
              if (typeof node.argument.value === 'number') {
                // Leave it
              } else if (typeof node.argument.value === 'string') {
                // Shrug.
              } else if (node.argument.value === true) {
                // -true = -1
                log('Dropping the - unary, -true becomes -1');
                node.argument = {
                  type: 'Literal',
                  value: 1,
                  raw: '1',
                  $p: $p(),
                };
                changed = true;
              } else if (node.argument.value === false) {
                // -false is -0 (the sign _is_ detectable)
                log('Dropping the - unary, -false becomes -0');
                node.argument = {
                  type: 'Literal',
                  value: 0,
                  raw: '0',
                  $p: $p(),
                };
                changed = true;
              } else if (node.argument.regex) {
                // -/1/ is NaN (no sign)
                log('Dropping the - unary, -regex becomes NaN');
                crumbSet(1, {
                  type: 'Identifier',
                  name: 'NaN',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.value === null) {
                // -null is -0
                log('Dropping the - unary, -null becomes -0');
                node.argument = {
                  type: 'Literal',
                  value: 0,
                  raw: '0',
                  $p: $p(),
                };
                changed = true;
              } else {
                ASSERT(false, 'what kind of literal?', node.argument);
              }
            } else if (node.argument.type === 'Identifier') {
              if (node.argument.name === 'undefined') {
                // -undefined is NaN (no sign)
                log('Dropping the - unary, -undefined becomes NaN');
                crumbSet(1, {
                  type: 'Identifier',
                  name: 'NaN',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.name === 'NaN') {
                // -NaN and NaN are indistinguishable
                log('Dropping the - unary from a NaN');
                crumbSet(1, node.argument);
                changed = true;
              } else if (node.argument.name === 'Infinity') {
                // no change
              }
            } else if (node.argument.type === 'UnaryExpression') {
              if (node.argument.operator === '-') {
                log('Replace a double negative number with the arg, but make sure to coerce it');
                // I think the easiest/safest way is to have it do the same as `+`
                crumbSet(1, {
                  type: 'UnaryExpression',
                  operator: '+',
                  argument: node.argument.argument, // The actual value
                  $p: $p(),
                });
                changed = true;
              }
            }
            break;
          }
          case '~': {
            let negative = false;
            let target = node.argument;
            if (target.type === 'UnaryExpression' && target.operator === '-') {
              target = target.argument;
              negative = true; // invert the value to be tilded
            }

            if (target.type === 'Literal') {
              if (target.regex) {
                // A -regex will normalize to a number at some point so don't bother here
                if (!negative) {
                  // Regular expressions are just objects
                  log('Resolving the `typeof` operator');
                  // ~regex === -1
                  crumbSet(1, {
                    type: 'UnaryExpression',
                    operator: '~',
                    argument: {
                      type: 'Literal',
                      value: 1,
                      raw: '1',
                      $p: $p(),
                    },
                    $p: $p(),
                  });
                  changed = true;
                }
              } else {
                // All other literals should have a value and we can just ~ it here
                log('Dropping the ! unary');
                // A negative value has a different AST node
                const value = ~(negative ? -target.value : target.value);
                crumbSet(
                  1,
                  value < 0 || Object.is(-0, value)
                    ? {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                          type: 'Literal',
                          value: -value, // Make sure it's positive!
                          raw: String(-value),
                          $p: $p(),
                        },
                        $p: $p(),
                      }
                    : {
                        type: 'Literal',
                        value: value,
                        raw: String(value),
                        $p: $p(),
                      },
                );
                changed = true;
              }
            } else if (target.type === 'Identifier') {
              if (target.name === 'undefined' || target.name === 'NaN' || target.name === 'Infinity') {
                const value = ~(negative ? -target.value : target.value);
                log('Dropping the ! unary');
                // In all cases, the `~` result is -1. Including ~(-Infinity).
                crumbSet(
                  1,
                  negative
                    ? {
                        type: 'Literal',
                        value: value,
                        raw: String(value),
                        $p: $p(),
                      }
                    : {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                          type: 'Literal',
                          value: 1, // Make sure it's positive!
                          raw: '1',
                          $p: $p(),
                        },
                        $p: $p(),
                      },
                );
                changed = true;
              }
            }
            break;
          }

          case '!': {
            if (node.argument.type === 'Literal') {
              if (node.argument.value === 0 || node.argument.value === '') {
                // Zero and the empty string are falsy and become true
                log('Dropping the ! unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: true,
                  raw: 'true',
                  $p: $p(),
                });
                changed = true;
              } else if (typeof node.argument.value === 'number' || typeof node.argument.value === 'string') {
                // All non-zero numbers and non-empty strings are truthy and become false
                log('Dropping the ! unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: false,
                  raw: 'false',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.value === true) {
                log('Dropping the ! unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: false,
                  raw: 'false',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.value === false) {
                log('Dropping the ! unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: true,
                  raw: 'true',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.regex) {
                // All regexes are objects and therefore truthy so they invert to false
                log('Dropping the ! unary, +regex becomes NaN');
                crumbSet(1, {
                  type: 'Literal',
                  value: false,
                  raw: 'false',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.value === null) {
                log('Dropping the ! unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: true,
                  raw: 'true',
                  $p: $p(),
                });
                changed = true;
              } else {
                ASSERT(false, 'what kind of literal?', node.argument);
              }
            } else if (node.argument.type === 'Identifier') {
              if (node.argument.name === 'undefined') {
                log('Dropping the ! unary, +undefined becomes NaN');
                crumbSet(1, {
                  type: 'Literal',
                  value: true,
                  raw: 'true',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.name === 'NaN') {
                log('Dropping the ! unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: true,
                  raw: 'true',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.name === 'Infinity') {
                log('Dropping the ! unary');
                crumbSet(1, {
                  type: 'Literal',
                  value: false,
                  raw: 'false',
                  $p: $p(),
                });
                changed = true;
              }
            } else if (node.argument.type === 'UnaryExpression' && node.argument.operator === '-') {
              if (node.argument.argument.type === 'Literal' && typeof node.argument.argument.value === 'number') {
                // !-n. Ignore the sign. If n is zero, replace with true. OTherwise replace with false.
                // Other kinds of values will normalize to a number eventually so ignore them.
                if (node.argument.argument.value === 0) {
                  // sign is irrelevant
                  log('Replacing `!-0` with `true`');
                  crumbSet(1, {
                    type: 'Literal',
                    value: true,
                    raw: 'true',
                    $p: $p(),
                  });
                  changed = true;
                } else {
                  log('Replacing `!-n` with `false` because n!=0');
                  crumbSet(1, {
                    type: 'Literal',
                    value: false,
                    raw: 'false',
                    $p: $p(),
                  });
                  changed = true;
                }
              }
            }
            break;
          }

          case 'typeof': {
            if (node.argument.type === 'Literal') {
              if (node.argument.regex) {
                // Regular expressions are just objects
                log('Resolving the `typeof` operator');
                crumbSet(1, {
                  type: 'Literal',
                  value: 'object',
                  raw: '"object"',
                  $p: $p(),
                });
                changed = true;
              } else {
                // All other literals should have a value
                log('Resolving the `typeof` operator');
                crumbSet(1, {
                  type: 'Literal',
                  value: typeof node.argument.value,
                  raw: '"' + typeof node.argument.value + '"',
                  $p: $p(),
                });
                changed = true;
              }
            } else if (node.argument.type === 'Identifier') {
              if (node.argument.name === 'undefined') {
                log('Resolving the `typeof` operator');
                crumbSet(1, {
                  type: 'Literal',
                  value: 'undefined',
                  raw: '"undefined"',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.name === 'NaN') {
                log('Resolving the `typeof` operator');
                crumbSet(1, {
                  type: 'Literal',
                  value: 'number',
                  raw: '"number"',
                  $p: $p(),
                });
                changed = true;
              } else if (node.argument.name === 'Infinity') {
                log('Resolving the `typeof` operator');
                crumbSet(1, {
                  type: 'Literal',
                  value: 'number',
                  raw: '"number"',
                  $p: $p(),
                });
                changed = true;
              }
            } else if (node.argument.type === 'UnaryExpression') {
              log('Resolving the `typeof` operator which is another operator', node.argument.operator);
              crumbSet(
                1,
                node.argument.operator === '-' || node.argument.operator === '+' || node.argument.operator === '~'
                  ? {
                      type: 'Literal',
                      value: 'number',
                      raw: '"number"',
                      $p: $p(),
                    }
                  : node.argument.operator === 'typeof'
                  ? {
                      type: 'Literal',
                      value: 'string',
                      raw: '"string"',
                      $p: $p(),
                    }
                  : node.argument.operator === 'void'
                  ? {
                      type: 'Literal',
                      value: 'undefined',
                      raw: '"undefined"',
                      $p: $p(),
                    }
                  : node.argument.operator === '!'
                  ? {
                      type: 'Literal',
                      value: 'boolean',
                      raw: '"boolean"',
                      $p: $p(),
                    }
                  : ASSERT(false, 'what operator'),
              );
              changed = true;
            }
            break;
          }

          case 'void': {
            // Is it easier to have `void x` or `(x, undefined)` and eliminate void altogether?
            // It's not shorter, but we can always try to mend that in the end. tbd
            break;
          }

          default: {
            TOFIX;
          }
        }

        break;
      }

      case 'UpdateExpression': {
        // TODO: there is a subtle difference between prefix and postfix
        expr(node, 'argument', -1, node.argument);
        //$(node, '@push', 'number');
        //$(node, '@merge');

        funcStack[funcStack.length - 1].$p.pure = false; // TODO: confirm whether or not the update is to a local or non-local binding
        break;
      }

      default: {
        log('unknown expression node:', node);
        throw new Error('Missing support for expr ' + node.type);
      }
    }

    groupEnd();
  }

  function processClass(node, isExpr, isExport) {
    superCallStack.push(node);

    // Put the `extends` expression on the stack, or an actual `null` to signify there wasn't any
    if (node.superClass) expr(node, 'superClass', -1, node.superClass);
    //else $(node, '@push', NO_SUPER_VALUE);

    // Track the total number of methods, static or proto, because they will be put on the stack mixed
    let methodTypes = [];
    let methodNames = [];

    if (node.body.body.length > 0) {
      //$(node, '@super_stack_push'); // Put the proto object reference onto a proto stack while we parse out the methods

      log('Processing', node.body.body.length, 'potential methods');
      node.body.body.forEach((cnode, i) => {
        if (!cnode) return; // possible
        ASSERT(cnode.type === 'MethodDefinition', 'expand once class syntax is not just method definitions');
        const methodName = cnode.key ? cnode.key.name : '<??>';
        log('- ' + (methodTypes.length + 1) + ': a ' + (cnode.static ? 'static' : 'proto') + ' method: `' + methodName + '`');

        if (cnode.computed) {
          // I think the computed key of a method should be visited first...?
          crumb(node, 'body', -1);
          expr2(node.body, 'body', i, cnode, 'key', cnode.key);
          uncrumb(node, 'body', -1);
        }

        ASSERT(
          cnode.key && cnode.key.type === 'Identifier',
          'if the method is not dynamic, the key must exist and must be an ident',
          cnode,
        );
        ASSERT(cnode.value.type === 'FunctionExpression', 'for now, method values are func expr nodes');

        // TODO: constructor path
        // TODO: tag as methods, perhaps the class can patch that up for us... we also need to know which methods are static
        crumb(node, 'body', -1);
        expr2(node.body, 'body', i, cnode, 'value', cnode.value, 'method', false, methodName);
        uncrumb(node, 'body', -1);

        methodNames.push(cnode.key.name);
        methodTypes.push(cnode.static ? 'static' : 'proto');
      });

      //$(node, '@super_stack_pop'); // Bring the proto object back to the stack to serve as a stack arg to @class
    }

    // Put the future prototype object on the stack.
    //$(node, '@obj', []);

    if (isExport) {
      ASSERT(node.id, 'exported classes (not by default) must have an id as per syntax');
      //$(node, '@dup');
      //$(node, '@export_as', isExport === true ? node.id.name : 'default');
    }

    if (isExpr) {
      // TODO: how do we best model the class expression id being accessible inside the class? fake an arrow?
      if (node.id) TOFIX;
    } else {
      if (node.id) {
        log('Class id:', node.id.name);
      } else {
        TOFIX;
      }
    }

    superCallStack.pop();
  }

  function processFuncArgs(node) {
    // Note: params must be idents, rest, or assignments.
    // Note: Patterns and param defaults ought to be normalized out so we can ignore them.

    let minParamRequired = 0; // Ends up as the last non-rest param without default, +1
    let hasRest = false;
    let paramBindingNames = [];

    group('Compiling params');
    node.params.forEach((pnode, i) => {
      // Note: Param defaults should not exist because they were eliminated in the normalization step

      if (pnode.type === 'RestElement') {
        log('- param', i, 'is a rest');
        ASSERT(i === node.params.length - 1, 'rest must be last element');
        // - Rest cannot have a default, but must be an array
        // - Do not increment min req count for the rest.
        // - The top of the stack should be the _kind_ (not the actual array) of the rest array. It may be null,
        //   in that case there were not enough args to also cover the rest param. (Or, somehow the kind of an
        //   empty array leaked into it ...)
        //$(pnode, '@arr', 1);
        ASSERT(pnode.argument.type === 'Identifier', 'fixme for non-ident rest params', pnode);
        hasRest = true;

        paramBindingNames.push(pnode.argument.name);

        const meta = fdata.globallyUniqueNamingRegistery.get(pnode.argument.name);
        //meta.updates.push({ parent: dnode, prop: 'init', index: -1 }); // TODO: ehhh this is an update, but how do you represent the update?
        meta.usages.push({ parent: pnode, prop: 'argument', index: -1 });
      } else if (pnode.type === 'Identifier') {
        // The name may not match, for example a func expr with the same name as one of its args
        paramBindingNames.push(pnode.name);

        const meta = fdata.globallyUniqueNamingRegistery.get(pnode.name);
        //meta.updates.push({ parent: dnode, prop: 'init', index: -1 }); // TODO: ehhh this is an update, but how do you represent the update?
        meta.usages.push({ parent: pnode, prop: 'argument', index: -1 });
      } else {
        ASSERT(false, 'Patterns and param defaults should be normalized out and there isnt anything else here?', node);
      }
    });
    log('Min args now at:', minParamRequired);
    groupEnd();

    //$(node, '@log', '### </function param setup> ###');

    return { minParamRequired, hasRest, paramBindingNames };
  }
}
