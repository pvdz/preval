import { printer } from '../lib/printer.mjs';
import walk from '../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RESET, fmat } from './utils.mjs';
import globals from './globals.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { $p } from './$p.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req) {
  const ast = fdata.tenkoOutput.ast;

  const funcStack = [];
  const lexScopeStack = [];
  let lexScopeCounter = 0;
  const funcScopeStack = [];
  const thisStack = [];

  fdata.globalNameCounter = 0;
  const globallyUniqueNamingRegistery = new Map();
  function createUniqueGlobalName(name) {
    // Create a (module) globally unique name. Then use that name for the local scope.
    let n = 0;
    if (globallyUniqueNamingRegistery.has(name)) {
      while (globallyUniqueNamingRegistery.has(name + '_' + ++n));
    }
    return n ? name + '_' + n : name;
  }
  function registerGlobalIdent(name, originalName, { isExport = false, isImplicitGlobal = false, knownBuiltin = false } = {}) {
    if (!globallyUniqueNamingRegistery.has(name)) {
      globallyUniqueNamingRegistery.set(name, {
        // ident meta data
        uid: ++fdata.globalNameCounter,
        originalName,
        uniqueName: name,
        isExport, // exports should not have their name changed. we ensure this as the last step of this phase.
        isImplicitGlobal, // There exists explicit declaration of this ident. These can be valid, like `process` or `window`
        knownBuiltin, // Make a distinction between known builtins and unknown builtins.
        // Track all cases where a binding value itself is initialized/mutated (not a property or internal state of its value)
        // Useful recent thread on binding mutations: https://twitter.com/youyuxi/status/1329221913579827200
        // var/let a;
        // var/const/let a = b;
        // const a = b;
        // import a, b as a, * as a, {a, b as a} from 'x';
        // export var/let a
        // export var/const/let a = b
        // function a(){};
        // export function a(){};
        // a = b;
        // a+= b;
        // var/const/let [a, b: a] = b;
        // [a, b: a] = b;
        // var/const/let {a, b: a} = b;
        // ({a, b: a} = b);
        // [b: a] = c;
        // ++a;
        // a++;
        // for (a in b);
        // for ([a] in b);
        // for ({a} in b);
        // In a nutshell there are six concrete areas to look for updates;
        // - [x] binding declarations
        //   - [x] regular
        //   - [ ] destructuring
        //   - [ ] exported
        //   - [x] could be inside `for` header
        // - [ ] param names
        //   - [ ] regular
        //   - [ ] patterns
        // - [ ] assigning
        //   - [ ] regular
        //   - [ ] compound
        //   - [ ] destructuring array
        //   - [ ] destructuring object
        // - [ ] imports of any kind
        // - [ ] function declarations
        // - [ ] update expressions, pre or postifx, inc or dec
        // - [ ] for-loop lhs
        updates: [], // {parent, prop, index} indirect reference ot the node being assigned
        usages: [], // {parent, prop, index} indirect reference to the node that refers to this binding
      });
    }
  }
  globals.forEach((_, name) => registerGlobalIdent(name, name, { isImplicitGlobal: true, knownBuiltin: true }));

  fdata.globallyUniqueNamingRegistery = globallyUniqueNamingRegistery;
  const imports = new Map();
  fdata.imports = imports;
  const exports = new Map();
  fdata.exports = exports;

  group('\n\n\n##################################\n## phase1  ::  ' + fdata.fname + '\n##################################\n\n\n');

  function findUniqueNameForBindingIdent(node, startAtParent = false) {
    ASSERT(node && node.type === 'Identifier', 'need ident node for this', node);
    log('Finding unique name for `' + node.name + '`');
    let index = lexScopeStack.length;
    if (startAtParent) --index; // For example: func decl id has to be looked up outside its own inner scope
    while (--index >= 0) {
      log(
        '- lex level',
        index,
        ' (' + lexScopeStack[index].type + '): lex id:',
        lexScopeStack[index].$p.lexScopeId,
        ':',
        lexScopeStack[index].$p.nameMapping.has(node.name),
      );
      if (lexScopeStack[index].$p.nameMapping.has(node.name)) {
        break;
      }
    }

    if (index < 0) {
      log('The ident `' + node.name + '` could not be resolved and is an implicit global');
      // Register one...
      log('Creating implicit global binding for `' + node.name + '` now');
      const uniqueName = createUniqueGlobalName(node.name);
      log('-->', uniqueName);
      registerGlobalIdent(uniqueName, node.name, { isImplicitGlobal: true });
      lexScopeStack[0].$p.nameMapping.set(node.name, uniqueName);
      return uniqueName;
    }

    const uniqueName = lexScopeStack[index].$p.nameMapping.get(node.name);
    ASSERT(uniqueName !== undefined, 'should exist');
    log('Should be bound in scope index', index, 'mapping to `' + uniqueName + '`');
    return uniqueName;
  }

  walk(_walker, ast, 'ast');
  function _walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    if (before) {
      node.$p = $p();
    }

    group(
      BLUE + nodeType + ':' + (before ? 'before' : 'after'),
      RESET,
      // To debug lexical scopes:
      //' '.repeat(50), lexScopeStack.map(node => node.type+'<'+node.$uid+'>').join(',')
    );

    const key = nodeType + ':' + (before ? 'before' : 'after');

    if (before && node.$scope) {
      lexScopeStack.push(node);
      node.$p.lexScopeId = ++lexScopeCounter;
      node.$scope.$sid = lexScopeCounter;
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.push(node);
      }
    }

    // Assign unique names to bindings to work around lex scope shadowing `let x = 1; { let x = 'x'; }`
    // This allows us to connect identifier binding references that belong together, indeed together, and distinct a
    // binding from its shadow by the same name. Otherwise in the previous example, we'd never know "which" x is x.
    if (before && node.$scope) {
      // lex binding can look up its unique global name through this (nearest) mapping
      if (node.type === 'Program') {
        // global scope
        node.$p.nameMapping = new Map([...globals.keys()].map((k) => [k, k]));
      } else {
        // non-global scope
        node.$p.nameMapping = new Map([
          ['this', 'this'],
          ['arguments', 'arguments'],
        ]);
      }

      const funcNode = funcScopeStack[funcScopeStack.length - 1];

      let s = node.$scope;
      ASSERT(
        ['FunctionExpression', 'FunctionDeclaration'].includes(node.type) ? s.type === Tenko.SCOPE_LAYER_FUNC_BODY : true,
        'scope type is body, which we ignore (perhaps not for arrows?)',
        node.$scope,
      );

      do {
        group('Checking scope... (sid=', s.$sid, ')');
        log('- type:', s.type, ', bindings?', s.names !== Tenko.HAS_NO_BINDINGS);
        if (node.type === 'BlockStatement' && s.type === Tenko.SCOPE_LAYER_FUNC_PARAMS) {
          log('Breaking for function header scopes in Block');
          groupEnd();
          break;
        }

        if (s.names === Tenko.HAS_NO_BINDINGS) {
          log('- no bindings in this scope, parent:', s.parent && s.parent.type);
        } else if (
          ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'].includes(node.type) &&
          s.type === Tenko.SCOPE_LAYER_FUNC_BODY
        ) {
          log('- ignoring scope body in function node');
        } else if (node.type === 'CatchClause' && s.type !== Tenko.SCOPE_LAYER_CATCH_HEAD && s.type !== Tenko.SCOPE_LAYER_CATCH_BODY) {
          log('- in catch clause we only care about the two catch scopes');
          break;
        } else if (node.type === 'BlockStatement' && s.type === Tenko.SCOPE_LAYER_GLOBAL) {
          log('- do not process global scope in block');
          break;
        } else if (
          node.type === 'BlockStatement' &&
          s.type === Tenko.SCOPE_LAYER_FUNC_BODY &&
          !['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'].includes(path.nodes[path.nodes.length - 2].type)
        ) {
          log('- do not process func scope in a block that is not child of a function');
          break;
        } else {
          s.names.forEach((v, name) => {
            log('-', name, ':', v);

            if (v === Tenko.BINDING_TYPE_VAR && funcNode !== node) {
              // only process `var` bindings in the scope root
              log('  - skipping var because not scope root');
              return;
            }

            if (v === Tenko.BINDING_TYPE_FUNC_VAR && s.type === Tenko.SCOPE_LAYER_FUNC_PARAMS) {
              log('  - skipping func var in param layer or global layer');
              return;
            }

            const uniqueName = createUniqueGlobalName(name);
            log('Adding', name, 'to globallyUniqueNamingRegistery -->', uniqueName);
            registerGlobalIdent(uniqueName, name);
            node.$p.nameMapping.set(name, uniqueName);
          });
        }

        // Only certain nodes have hidden scopes to process. For any other node do not process the parent.
        if (
          !['FunctionExpression', 'ArrowFunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration', 'CatchClause'].includes(
            node.type,
          )
        ) {
          groupEnd();
          break;
        }
        groupEnd();
      } while (s.type !== Tenko.SCOPE_LAYER_GLOBAL && (s = s.parent));

      // Each node should now be able to search through the lexScopeStack, and if any of them .has() the name, it will
      // be able to .get() the unique name, which can be used in either the root scope or by the compiler in phase2.
      log(
        'node<' + node.$uid + '>.$p.nameMapping:',
        new Map(
          [...node.$p.nameMapping.entries()].filter(([tid]) =>
            node.type === 'Program' ? !globals.has(tid) : !['this', 'arguments'].includes(tid),
          ),
        ),
      );
    }

    switch (key) {
      case 'Program:before': {
        funcStack.push(node);
        break;
      }
      case 'Program:after': {
        funcStack.pop();
        break;
      }

      case 'FunctionDeclaration:before':
      case 'FunctionExpression:before':
      case 'ArrowFunctionExpression:before': {
        funcStack.push(node);
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          node.$p.scope = { type: 'zscope', names: new Map() };
          thisStack.push(node);
        }
        break;
      }
      case 'FunctionDeclaration:after':
      case 'FunctionExpression:after':
      case 'ArrowFunctionExpression:after': {
        funcStack.pop();
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          thisStack.pop();
        }

        let lexes = lexScopeStack.slice(1);
        while (lexes[0] && ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(lexes[0].type)) lexes.shift(); // Drop global block scopes etc

        const body = node.body.body;
        let explicit = false;
        if (node.expression) {
          log('Arrow has expression so it always returns explicitly');
          explicit = true;
        } else {
          log('checking', body.length, 'statements to get explicitReturns state');
          for (let i = 0; i < body.length; ++i) {
            if (body[i].$p.explicitReturns === 'yes' && body[i].type !== 'FunctionDeclaration') {
              explicit = true;
              // All branches of this statement returns, so the remainder must be dead code. Eliminate it now.
              // Ignore if it is the last statement of the function
              // TODO: hoisting. `function f(){ return g; function g(){} }`
              if (i < body.length - 1) {
                log(
                  '- Returning early. Slicing',
                  body.length - (i + 1),
                  'statements from this function that appeared after a return statement',
                );

                // It's trickier than it seems.
                // DCE'd var decls must be inlined as `undefined` as their init is never visited.
                // Func decls should only appear at toplevel so I think those are fine? But who knows at this point.

                node.body.body.forEach((cnode, j) => {
                  if (!cnode) return;
                  if (j <= i) return;
                  if (cnode.type === 'FunctionDeclaration') return; // Do not remove function declarations
                  if (cnode.type === 'VariableDeclaration' && cnode.kind === 'var') return; // keep var decls, but not let/const (they're tdz'd)
                  node.body.body[j] = { type: 'EmptyStatement', $p: $p() };
                });
              }
              break;
            }
          }
        }
        node.$p.explicitReturns = explicit ? 'yes' : 'no';
        log('- explicitReturns =', node.$p.explicitReturns);

        //const map = new Map();
        //lexes.forEach((node) => {
        //  node.$p.nameMapping.forEach((newName, bindingName) => {
        //    if (bindingName === 'this' || bindingName === 'arguments') return;
        //    // Binding name may exist. We only care about the inner-most shadow.
        //    map.set(bindingName, newName);
        //  });
        //});
        //node.$p.reachableNames = map;
        node.$p.parentScope = funcStack[funcStack.length - 1];

        break;
      }

      case 'CatchClause:before': {
        // Note: the catch scope is set on node.handler of the try (parent node of the catch clause)
        break;
      }

      case 'ClassExpression:after':
      case 'ClassDeclaration:after': {
        break;
      }

      case 'Identifier:before': {
        log('Ident:', node.name);
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const parentIndex = path.indexes[path.indexes.length - 1];
        log('Parent node: `' + parentNode.type + '`, prop: `' + parentProp + '`');
        if (
          // We wouldn't want to process the property name of `foo.bar`, but we would want to process `foo`, or a dynamic property `foo[bar]`
          !(parentNode.type === 'MemberExpression' && parentProp === 'property' && !parentNode.computed) &&
          !(
            (parentNode.type === 'FunctionDeclaration' ||
              parentNode.type === 'FunctionExpression' ||
              parentNode.type === 'ArrowFunctionExpression') &&
            parentProp === 'params'
          )
        ) {
          ASSERT(!node.$p.uniqueName, 'dont do this twice');
          const uniqueName = findUniqueNameForBindingIdent(node, parentNode.type === 'FunctionDeclaration');
          log('- unique name:', uniqueName);
          node.$p.debug_uniqueName = uniqueName; // Cant use this reliably due to new nodes being injected

          // Resolve whether this was an export. If so, mark the name as such.
          const grandParent = path.nodes[path.nodes.length - 3];
          if (
            ((parentNode.type === 'FunctionDeclaration' || parentNode.type === 'ClassDeclaration') &&
              parentProp === 'id' &&
              grandParent.type === 'ExportNamedDeclaration') ||
            (parentNode.type === 'VariableDeclarator' &&
              parentProp === 'id' &&
              grandParent.type === 'VariableDeclaration' &&
              path.nodes[path.nodes.length - 4].type === 'ExportNamedDeclaration')
          ) {
            ASSERT(globallyUniqueNamingRegistery.has(uniqueName));
            log('Marking `' + uniqueName + '` as being an export');
            globallyUniqueNamingRegistery.get(uniqueName).isExport = true;
          }
        }

        break;
      }

      case 'VariableDeclarator:after': {
        // Find all bindings, resolve their unique name, copy their init (or undefined) to the updates
        // If we're going to store these then what happens when they're transformed/replaced?
        // `var a = 1; var b = a; var c = b;`. maybe store the parent node and key instead for an indirect lookup
        ASSERT(node.id?.type === 'Identifier', 'tofix: var declarations that are not just idents');
        break;
      }

      case 'ImportDeclaration:before': {
        ASSERT(node.source && typeof node.source.value === 'string', 'fixme if else', node);
        const source = node.source.value;
        ASSERT(typeof resolve === 'function', 'resolve must be a function here', resolve);
        const resolvedSource = resolve(source, fdata.fname);

        ASSERT(node.specifiers, 'fixme if different', node);
        node.specifiers.forEach((snode) => {
          const id = snode.local;
          ASSERT(id.type === 'Identifier', 'fixme if local is not an ident', snode);

          if (snode.type === 'ImportNamespaceSpecifier') {
            ASSERT(snode.type === 'ImportNamespaceSpecifier');
            // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
            // top of the queue if not finished processing yet. It will resolve before this file.
            imports.set(id.name, resolvedSource);
          } else if (snode.type === 'ImportDefaultSpecifier') {
            // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
            // top of the queue if not finished processing yet. It will resolve before this file.
            imports.set(id.name, resolvedSource);
          } else {
            ASSERT(snode.imported, 'fixme', snode.type, snode);
            // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
            // top of the queue if not finished processing yet. It will resolve before this file.
            imports.set(id.name, resolvedSource);
          }
        });

        break;
      }
      case 'ImportDefaultSpecifier: after': {
        ASSERT(node.source && typeof node.source.value === 'string', 'fixme if else', node);
        const source = node.source.value;
        const resolvedSource = resolve(source, filename);

        ASSERT(node.specifiers, 'fixme if different', node);

        // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
        // top of the queue if not finished processing yet. It will resolve before this file.
        imports.set('default', resolvedSource);

        break;
      }

      case 'MemberExpression:after': {
        break;
      }

      case 'Super:after': {
        break;
      }

      case 'ThisExpression:after': {
        if (thisStack.length) {
          log('Marking func as having `this` access');
          thisStack[thisStack.length - 1].$p.thisAccess = true;
        }
        break;
      }

      case 'ReturnStatement:before': {
        node.$p.explicitReturns = 'yes'; // Per definition :)
        break;
      }

      // block, if, else, try, catch, finally, switch, case, default, [with], label. Not the loops, can't guarantee them

      case 'BlockStatement:after': // node.body
        // If there is a node that has explicitReturns=yes and none of the nodes that precede it is break/continue/throw,
        // then the block returns. Otherwise the block does not return.
        for (let i = 0; i < node.body.length; ++i) {
          const snode = node.body[i];
          if (snode.$p.explicitReturns === 'yes') {
            node.$p.explicitReturns = 'yes';
            break;
          }
          if (node.type === 'BreakStatement' || node.type === 'ContinueStatement' || node.type === 'ThrowStatement') {
            break;
          }
        }
        if (node.$p.explicitReturns !== 'yes') node.$p.explicitReturns = 'no';
        log('- explicitReturns:', node.$p.explicitReturns);
        break;

      case 'IfStatement:after': // there is no ElseStatement (!), node.consequent and node.alternate
        // The problem here is that each branch is not visited explicitly so we can't queue up a return tid for
        // the `if` and the `else` separately. That's a little annoying. So we have to retroactively check the
        // last statement, instead.

        if (node.consequent.$p.explicitReturns !== 'yes') {
          // The `if` statement must exist. If it is not returning then this doesn't either
          node.$p.explicitReturns = 'no';
        } else if (!node.alternate || node.alternate.$p.explicitReturns !== 'yes') {
          // The `else` may not exist, in that case the whole thing doesn't return. Otherwise it only returns if the
          // sub-statement returns.
          node.$p.explicitReturns = 'no';
        } else {
          node.$p.explicitReturns = 'yes';
        }
        log('- explicitReturns:', node.$p.explicitReturns);
        break;

      // case 'TryStatement:before': {
      //   // This is the catch scope (!)
      //   node.handler.$p = {};
      //   node.handler.$p.scope = {type: 'zscope', names: new Map};
      //   break;
      // }
      case 'TryStatement:after': // node.block, node.handler, node.finalizer
        // Tricky case. The `try` node returns if;
        // - there is a finally block; the node returns when the finally returns, and does not when finally does not
        // - there is only a catch block and both the blocks return
        // Note that we ignore explicit `throw` statements, but we could later improve that situation.

        if (node.finalizer) {
          // If there is a finalizer block, I only care about the explicit return state of that block now.
          // This is because it is guaranteed to be visited, and its return value trumps that of the try/catch blocks.
          node.$p.explicitReturns = node.finalizer.$p.explicitReturns === 'yes' ? 'yes' : 'no';
        } else if (node.block.$p.explicitReturns !== 'yes') {
          // There is no finally, so the whole node cannot be explicitReturn if the `try` block is not
          node.$p.explicitReturns = 'no';
        } else if (node.handler.body.$p.explicitReturns !== 'yes') {
          // There is no finally, so the whole node cannot be explicitReturn if the `catch` block is not
          node.$p.explicitReturns = 'no';
        } else {
          // No finally and try and catch blocks return, so the whole node returns
          node.$p.explicitReturns = 'yes';
        }
        log('- explicitReturns:', node.$p.explicitReturns);
        break;

      case 'SwitchStatement:after': // node.cases
        // Only returns if all cases return AND one of the cases is a default
        // Tricky case is when the case falls through and returns a following case.
        // No real difference between case and default, except the default is mandatory for the switch to return expl.
        let hasDefault = false;

        // For each case check whether it returns explicitly (and before a break/continue) and if it doesn't, check
        // the next case as well. Mark a default case but don't treat it differently otherwise. When all case blocks
        // explicitly return then the whole switch node returns explicitly.
        // In other words, this fails if for any case a `break/continue` is seen before a `return`, or when no `return`
        // is seen at all since the start of the last `case`.
        // Note: a node that is marked explicitReturns is similar to a return statement because all its branches return.

        let seenReturnSinceLastCase = false;
        let brokeBeforeReturned = false;
        for (let i = 0; i < node.cases.length && !brokeBeforeReturned; ++i) {
          seenReturnSinceLastCase = false;
          const caseNode = node.cases[i];
          if (!caseNode.test) hasDefault = true;
          caseNode.consequent.some((node) => {
            if (node) {
              if (node.$p.explicitReturns || node.type === 'ReturnStatement') {
                // Either this is the return statement, or it's a statement where all branches must lead to a return.
                seenReturnSinceLastCase = true;
                return true;
              }
              if (node.type === 'BreakStatement' || node.type === 'ContinueStatement') {
                brokeBeforeReturned = true;
                return true;
              }
            }
          });
        }
        if (!seenReturnSinceLastCase || brokeBeforeReturned || !hasDefault) {
          // Either no return statement was seen since, at least, the last case start, or at least one case exists
          // that had a break/continue before the return statement. Either way, this switch is not an explicit return.
          node.$p.explicitReturns = 'no';
        } else {
          // For all cases there was at least one return statement before the end of the swtich that was not preceded
          // by a break or continue. This switch properly returns explicitly for all branches.
          node.$p.explicitReturns = 'yes';
        }
        log('- explicitReturns:', node.$p.explicitReturns);
        break;

      case 'WithStatement:after': // node.body
        ASSERT(false, 'with is not allowed in a "strict" context. The parser should have rejected this.');
        break;

      case 'LabeledStatement:after': // node.body
        TODO; // add tests
        node.$p.explicitReturns = node.body.$p.explicitReturns === 'yes' ? 'yes' : 'no';
        log('- explicitReturns:', node.$p.explicitReturns);
        break;
    }

    if (!before && node.$scope) {
      lexScopeStack.pop();
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.pop();
      }
    }

    groupEnd();
  }

  log(
    '\ngloballyUniqueNamingRegistery (sans builtins):\n',
    [...globallyUniqueNamingRegistery.keys()].filter((name) => !globals.has(name)).join(', '),
  );

  log('\nCurrent state\n--------------\n' + fmat(printer(fdata.tenkoOutput.ast)) + '\n--------------\n');

  log('End of phase 1');
  groupEnd();

  // Guarantee that exports are not renamed by the deduping normalization algo
  globallyUniqueNamingRegistery.forEach((obj, name) => {
    ASSERT(
      !obj.isExport || name === obj.originalName,
      'all exports should keep their name because they are recorded in global scope, must be lex and so unique, and any other binding that shadows them will be aliased instead',
      name,
      obj,
    );
  });
}
