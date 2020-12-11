import walk from '../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RESET } from './utils.mjs';
import globals from './globals.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/

// This phase is fairly mechanical. Setup scope tracking, imports/exports tracking, return value analysis. That sort of thing.
export function phase1(fdata, resolve, req) {
  const ast = fdata.tenkoOutput.ast;
  const tokenTable = fdata.tokenTable;

  const funcStack = [];
  const lexScopeStack = [];
  const funcScopeStack = [];
  const thisStack = [];
  const globallyUniqueNamingRegistery = new Map();
  const imports = fdata.imports;
  const exports = fdata.exports;

  group('\n\n\n##################################\n## phase1  ::  ' + fdata.fname + '\n##################################\n\n\n');

  let uid = 0;

  walk(_walker, ast, 'ast');
  function _walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    if (before) {
      let tid = String(++uid);

      let needleNode = node;
      if (needleNode.type === 'TemplateElement') needleNode = path.nodes[path.nodes.length - 2];
      const key = needleNode.loc.start.line + ':' + needleNode.loc.start.column;
      const token = tokenTable.get(key);
      ASSERT(token, 'each node start should correspond to a token at that position', key, tokenTable, needleNode, path);

      node.$p = {
        tid, // Incremental unique id (may have gaps between consecutive nodes but will be unique)
        explicitReturns: '', // Set if the node is a branching type where it matters
        tokenIndex: token.n, // Number. Token index on linear list of tokens. First token forward from this node
        // Add properties here in a comment but not actually (you would do this for perf) because it makes debugging more noisy
        //scope: undefined, // Only functions get this (not arrows, not global)
        //nameMapping: undefined, // Map. Scope tracking for nodes that have a scope
        //scopeBinding: undefined, // Reference to nearest func/global map. Global/func nodes get a fresh Map.
        //reachableNames: undefined, // Map. Maps a binding name to its globally unique name. Funcs/arrows only.
        //thisAccess: undefined, // boolean. For functions (not arrows), whether it access `this` anywhere in its own scope. Includes whether nested arrows access this in its scope. But not nested functions
      };
    }

    group(BLUE + nodeType + ':' + (before ? 'before' : 'after'), RESET);

    const key = nodeType + ':' + (before ? 'before' : 'after');

    if (before && node.$scope) {
      lexScopeStack.push(node);
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.push(node);
      }
    }

    // Assign unique names to bindings to work around lex scope shadowing `let x = 1; { let x = 'x'; }`
    // This allows us to connect identifier binding references that belong together, indeed together, and distinct a
    // binding from its shadow by the same name. Otherwise in the previous example, we'd never know "which" x is x.
    if (before && node.$scope) {
      // lex binding can look up its unique global name through this (nearest) mapping
      node.$p.nameMapping = new Map(
        node.type === 'Program'
          ? [...globals.keys(), 'module'].map((k) => [k, k])
          : [
              ['this', 'this'],
              ['arguments', 'arguments'],
            ],
      );

      const funcNode = funcScopeStack[funcScopeStack.length - 1];
      if (funcNode === node) funcNode.$p.scopeBindings = new Map();
      const scopeBindings = funcNode.$p.scopeBindings;
      ASSERT(scopeBindings);

      let s = node.$scope;
      ASSERT(
        ['FunctionExpression', 'FunctionDeclaration'].includes(node.type) ? s.type === Tenko.SCOPE_LAYER_FUNC_BODY : true,
        'scope type is body, which we ignore (perhaps not for arrows?)',
        node.$scope,
      );

      do {
        group('Checking scope...');
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

            // Create a globally unique name. Then use that name for the local scope.
            let n = 0;
            if (globallyUniqueNamingRegistery.has(name)) {
              while (globallyUniqueNamingRegistery.has(name + '_' + ++n));
            }

            log('Adding `' + name + '` to:');
            log('- globallyUniqueNamingRegistery -->', n ? name + '_' + n : name);
            globallyUniqueNamingRegistery.set(name + (n ? '_' + n : ''), ++uid);
            log('- the scope binding for node at linecol:', funcNode.loc.start.line + ':' + funcNode.loc.start.column);
            scopeBindings.set(name + (n ? '_' + n : ''), uid);
            log('- the mapping for node at linecol:', node.loc.start.line + ':' + node.loc.start.column);
            node.$p.nameMapping.set(name, name + (n ? '_' + n : ''));
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
        'node.$p.nameMapping:',
        new Map(
          [...node.$p.nameMapping.entries()].filter(([tid]) =>
            node.type === 'Program' ? !globals.has(tid) : !['this', 'arguments'].includes(tid),
          ),
        ),
      );
      log('nearest func scope bindings:', [...scopeBindings.entries()].map(([key, value]) => key + ': ' + value).join(', '));
      log('node loc;', node.loc.start.line + ':' + node.loc.start.column);
    }

    switch (key) {
      case 'Program:before': {
        funcStack.push(node);
        break;
      }
      case 'Program:after': {
        funcStack.pop();
        log('-->', node.$p.scopeBindings);
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
        const map = new Map();
        lexes.forEach((node) => {
          node.$p.nameMapping.forEach((newName, bindingName) => {
            if (bindingName === 'this' || bindingName === 'arguments') return;
            // Binding name may exist. We only care about the inner-most shadow.
            map.set(bindingName, newName);
          });
        });
        node.$p.reachableNames = map;

        log('-->', node.$p.scopeBindings);
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

      case 'Identifier:after': {
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
        } else {
          store.linter.check('GLOBAL_THIS', { filename: fdata.fname, line: node.loc.start.line, column: node.loc.start.column });
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

    if (!before && node.$p.scope) {
      lexScopeStack.pop();
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.pop();
        //} else {
        //  const funcScope = funcScopeStack[funcScopeStack.length - 1];
      }
    }

    groupEnd();
  }

  log('globallyUniqueNamingRegistery:', globallyUniqueNamingRegistery);

  log('End of phase 1');
  groupEnd();
}
