import walk from '../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat } from './utils.mjs';
import globals from './globals.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { $p } from './$p.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req, verbose) {
  const ast = fdata.tenkoOutput.ast;

  const funcStack = [];
  const lexScopeStack = [];
  const labelStack = []; // No need to validate this or track func boundaries. That's what the parser should have done already.
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
    ASSERT(!globallyUniqueNamingRegistery.has(name), 'should prevent trying to register it multiple times...');
    log('- Registered `' + name + '` as a new unique global');
    const meta = {
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
      writes: [], // {parent, prop, index} indirect reference ot the node being assigned
      // - ident as expression statement (rare)
      // - ident object of member expression
      // - rhs of assignment
      // - ident on either side of compound assignment
      // - ident on either side of binary expression
      // - ident rhs inside for-in/for-of
      // - ident inside statement header of any kind
      // - ident as callee of call / new
      // - ident as arg of call / new
      // - ident as arg of ++/--
      // - ident as computed property
      // Maybe easier to list non-usages of idents
      // - lhs of regular assignment (not compound!)
      // - lhs of for-in/for-of
      // - id of variable declaration
      // - id of func/class
      // - param names
      // - binding names in patterns (not inits)
      // - imported names
      // Probably best to make explicit yes/no lists and to warn against unexpected forms
      reads: [], // {parent, prop, index} indirect reference to the node that refers to this binding
    };
    globallyUniqueNamingRegistery.set(name, meta);
    return meta;
  }
  globals.forEach((_, name) => registerGlobalIdent(name, name, { isImplicitGlobal: true, knownBuiltin: true }));

  const globallyUniqueLabelRegistery = new Map();
  function createUniqueGlobalLabel(name) {
    // Create a (module) globally unique label name.
    let n = 0;
    if (globallyUniqueLabelRegistery.has(name)) {
      while (globallyUniqueLabelRegistery.has(name + '_' + ++n));
    }
    return n ? name + '_' + n : name;
  }
  function registerGlobalLabel(name, originalName, labelNode) {
    ASSERT(!globallyUniqueLabelRegistery.has(name), 'this func should be called with the unique label name');

    globallyUniqueLabelRegistery.set(name, {
      // ident meta data
      uid: ++fdata.globalNameCounter,
      originalName,
      uniqueName: name,
      labelNode, // All referenced labels must exist (syntax error), labels must appear before their usage when traversing
      usages: [], // {parent, prop, index} of the break/continue statement referring to the label
    });
  }

  fdata.globallyUniqueNamingRegistery = globallyUniqueNamingRegistery;
  fdata.globallyUniqueLabelRegistery = globallyUniqueLabelRegistery;
  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  fdata.imports = imports;
  const exports = new Map();
  fdata.exports = exports;

  group('\n\n\n##################################\n## phase1  ::  ' + fdata.fname + '\n##################################\n\n\n');

  function findUniqueNameForBindingIdent(node, funcDeclId = false) {
    ASSERT(node && node.type === 'Identifier', 'need ident node for this', node);
    log('Finding unique name for `' + node.name + '`. Lex stack size:', lexScopeStack.length);
    let index = lexScopeStack.length;
    if (funcDeclId) {
      // For example: func decl id has to be looked up outside its own inner scope
      log('- Starting at parent because func decl id');
      --index;
    }
    while (--index >= 0) {
      log(
        '- Checking lex level',
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
      const meta = registerGlobalIdent(uniqueName, node.name, { isImplicitGlobal: true });
      log('- Meta:', meta);
      lexScopeStack[0].$p.nameMapping.set(node.name, uniqueName);
      return uniqueName;
    }

    const uniqueName = lexScopeStack[index].$p.nameMapping.get(node.name);
    ASSERT(uniqueName !== undefined, 'should exist');
    log('Should be bound in scope index', index, 'mapping to `' + uniqueName + '`');
    const meta = globallyUniqueNamingRegistery.get(uniqueName);
    log('- Meta:', meta);
    ASSERT(meta, 'the meta should exist for all declared variables at this point');
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
      ASSERT(
        [
          'Program',
          'FunctionExpression',
          'ArrowFunctionExpression',
          'FunctionDeclaration',
          'BlockStatement',
          'SwitchStatement',
          'ForStatement',
          'ForInStatement',
          'ForOfStatement',
          'CatchClause',
        ].includes(node.type),
        'what else has a $scope?',
        node.type,
      );

      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.push(node);
      }

      lexScopeStack.push(node);
      node.$p.lexScopeId = ++lexScopeCounter;
      node.$scope.$sid = lexScopeCounter;

      group(BLUE + 'Scope tracking' + RESET, 'scope id=', lexScopeCounter);

      // Assign unique names to bindings to work around lex scope shadowing `let x = 1; { let x = 'x'; }`
      // This allows us to connect identifier binding references that belong together, indeed together, and distinct a
      // binding from its shadow by the same name. Otherwise in the previous example, we'd never know "which" x is x.

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

      groupEnd();

      // Each node should now be able to search through the lexScopeStack, and if any of them .has() the name, it will
      // be able to .get() the unique name, which can be used in either the root scope or by the compiler in phase2.
      log('Scope', lexScopeCounter, '; ' + node.type + '.$p.nameMapping:');
      log(
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
        const kind = getIdentUsageKind(parentNode, parentProp);
        log('- Ident kind:', kind);

        log('- Parent node: `' + parentNode.type + '`, prop: `' + parentProp + '`');
        if (kind !== 'none' && kind !== 'label' && node.name !== 'arguments') {
          ASSERT(!node.$p.uniqueName, 'dont do this twice');
          const uniqueName = findUniqueNameForBindingIdent(node, parentNode.type === 'FunctionDeclaration' && parentProp === 'id');
          log('- initial name:', node.name, ', unique name:', uniqueName);
          node.$p.uniqueName = uniqueName;
          node.$p.debug_originalName = node.name;
          node.$p.debug_uniqueName = uniqueName; // Cant use this reliably due to new nodes being injected
          node.name = uniqueName;

          // TODO: is this relevant for phase1?
          const meta = globallyUniqueNamingRegistery.get(uniqueName);
          ASSERT(meta, 'the meta should exist this this name at this point');
          if (kind === 'read' || kind === 'readwrite') meta.reads.push(node);
          if (kind === 'write' || kind === 'readwrite') meta.writes.push(node);

          // Resolve whether this was an export. If so, mark the name as such.
          // Since we process and "record" bindings in lexical scope order, the global scope goes first
          // As a side effect, the exported symbols, which can only be top-level "statements", will always
          // keep their original name. So we don't really have to worry about changing exported names.
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
            log('Marking `' + uniqueName + '` as being an export');
            meta.isExport = true;
          }
        } else {
          log(RED + '- skipping; not a binding' + RESET);
        }

        break;
      }

      case 'VariableDeclarator:after': {
        // Find all bindings, resolve their unique name, copy their init (or undefined) to the updates
        // If we're going to store these then what happens when they're transformed/replaced?
        // `var a = 1; var b = a; var c = b;`. maybe store the parent node and key instead for an indirect lookup
        break;
      }

      case 'ImportDeclaration:before': {
        ASSERT(node.source && typeof node.source.value === 'string', 'fixme if else', node);
        const source = node.source.value;
        log('Importing symbols from "' + source + '"');
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

      case 'BreakStatement:before':
      case 'ContinueStatement:before': {
        // Find labeled break or continue statements and make sure that they keep pointing to the "same" label
        // Find the first label ancestor where the original name matches the label of this node
        if (node.label) {
          const name = node.label.name;
          log('Label:', name, ', now searching for definition... Label stack depth:', labelStack.length);
          let i = labelStack.length;
          while (--i >= 0) {
            log('->', labelStack[i].$p.originalLabelName);
            if (labelStack[i].$p.originalLabelName === name) {
              const newName = labelStack[i].label.name;
              if (newName !== name) {
                log('- Label was renamed to', newName);
                node.label.name = newName;
                break;
              } else {
                log('- Label not renamed');
              }
            }
          }
        } else {
          log('No label');
        }
        break;
      }

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

      case 'LabeledStatement:before': {
        labelStack.push(node);
        log('Label:', node.label.name);
        node.$p.originalLabelName = node.label.name;
        const uniqueName = createUniqueGlobalLabel(node.label.name);
        registerGlobalLabel(uniqueName, node.label.name, node);
        if (node.label.name !== uniqueName) {
          log('- Unique label name:', uniqueName);
          node.label.name = uniqueName;
        } else {
          log('- Label is now registered and unique');
        }
        break;
      }
      case 'LabeledStatement:after': {
        labelStack.pop();
        node.$p.explicitReturns = node.body.$p.explicitReturns === 'yes' ? 'yes' : 'no';
        log('- explicitReturns:', node.$p.explicitReturns);
        break;
      }
    }

    if (!before && node.$scope) {
      lexScopeStack.pop();
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.pop();
      }
    }

    groupEnd();
  }

  log();
  log('Imports from:');
  log([...imports.values()].sort().map(s => '- "' + s + '"').join('\n'));
  log(
    '\ngloballyUniqueNamingRegistery (sans builtins):\n',
    globallyUniqueNamingRegistery.size === globals.size
      ? '<none>'
      : [...globallyUniqueNamingRegistery.keys()].filter((name) => !globals.has(name)).join(', '),
  );
  log(
    '\ngloballyUniqueLabelRegistery:\n',
    globallyUniqueLabelRegistery.size === 0 ? '<none>' : [...globallyUniqueLabelRegistery.keys()].join(', '),
  );

  log('\nCurrent state\n--------------\n' + (verbose ? fmat(tmat(fdata.tenkoOutput.ast)) : '') + '\n--------------\n');

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

function getIdentUsageKind(parentNode, parentProp) {
  // Returns 'read', 'write', 'readwrite', 'none', or 'label'
  // Note: for each parent, answer the question "what does the appearance of an ident in each position of a node mean?"

  // Examples of binding reads. All cases refer to an ident
  // - as expression statement (rare)
  // - object of member expression
  // - rhs of assignment
  // - either side of compound assignment
  // - either side of binary expression
  // - rhs inside for-in/for-of
  // - inside statement header of any kind
  // - callee of call / new
  // - arg of call / new
  // - arg of ++/--
  // - computed property
  // - probably many more?
  // Maybe easier to list write-only cases of bindings
  // - lhs of regular assignment (not compound!)
  // - lhs of for-in/for-of
  // - id of variable declaration
  // - id of func/class
  // - param names
  // - binding names in patterns (not inits)
  // - imported names
  // Probably best to make explicit yes/no lists and to warn against unexpected forms

  switch (parentNode.type) {
    case 'ArrayExpression':
      // In all cases it's an element of an array
      ASSERT(parentProp === 'elements');
      return 'read';
    case 'ArrayPattern':
      // In all cases it's a write. If it had a default then it would become an AssignmentPattern.
      // Properties, in the case of destructuring assignment, become member expressions
      ASSERT(parentProp === 'elements');
      return 'write';
    case 'ArrowFunctionExpression':
      // Can only appear as parameter which is always a write
      ASSERT(parentProp === 'params');
      return 'write';
    case 'AssignmentExpression':
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      if (parentProp === 'right') return 'read';
      if (parentNode.operator === '=') return 'write';
      return 'readwrite';
    case 'AssignmentPattern':
      // If it appears as a child then it must be left or right
      ASSERT(parentProp === 'left' || parentProp === 'right');
      return parentProp === 'left' ? 'write' : 'read';
    case 'AwaitExpression':
      // Must always be an arg, which is always a read
      ASSERT(parentProp === 'argument');
      return 'read';
    case 'BinaryExpression':
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'BlockStatement':
      throw ASSERT(false, 'blocks dont have expression children');
    case 'BreakStatement':
      ASSERT(parentProp === 'label', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'label';
    case 'CallExpression':
      ASSERT(
        parentProp === 'callee' || parentProp === 'arguments',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      return 'read';
    case 'CatchClause':
      ASSERT(parentProp === 'param', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'ChainExpression':
      throw ASSERT(false, 'chain elements have member and call expressions as children');
    case 'ClassBody':
      throw ASSERT(false, 'class bodies have methods as children', parentNode.type, '.', parentProp);
    case 'ClassDeclaration':
      ASSERT(parentProp === 'id' || parentProp === 'superClass', 'ident can only be a child of class when it is the id', parentNode.type, '.', parentProp);
      return 'write';
    case 'ClassExpression':
      ASSERT(parentProp === 'id' || parentProp === 'superClass', 'ident can only be a child of class when it is the id', parentNode.type, '.', parentProp);
      return 'write';
    case 'ConditionalExpression':
      ASSERT(parentProp === 'test' || parentProp === 'consequent' || parentProp === 'alternate', parentNode.type, '.', parentProp);
      return 'read';
    case 'ContinueStatement':
      ASSERT(parentProp === 'label', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'label';
    case 'DebuggerStatement':
      throw ASSERT(false);
    case 'Directive':
      throw ASSERT(false);
    case 'DoWhileStatement':
      ASSERT(parentProp === 'body' || parentProp === 'test', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'EmptyStatement':
      throw ASSERT(false);
    case 'ExportAllDeclaration':
      ASSERT(parentProp === 'exported', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'none';
    case 'ExportDefaultDeclaration':
      ASSERT(parentProp === 'declaration', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'ExportNamedDeclaration':
      throw ASSERT(false, 'I dont think ident can be a direct child here');
    case 'ExportSpecifier':
      ASSERT(
        parentProp === 'local' || parentProp === 'exported',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'local') return 'read';
      return 'none';
    case 'ExpressionStatement':
      ASSERT(parentProp === 'expression', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'ForInStatement':
      ASSERT(
        parentProp === 'left' || parentProp === 'right' || parentProp === 'body',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'left') return 'write';
      return 'read';
    case 'ForOfStatement':
      ASSERT(
        parentProp === 'left' || parentProp === 'right' || parentProp === 'body',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'left') return 'write';
      return 'read';
    case 'ForStatement':
      ASSERT(
        parentProp === 'init' || parentProp === 'test' || parentProp === 'update' || parentProp === 'body',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      return 'read';
    case 'FunctionDeclaration':
      ASSERT(parentProp === 'id' || parentProp === 'params', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'FunctionExpression':
      ASSERT(parentProp === 'id' || parentProp === 'params', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'Identifier':
      throw ASSERT(false);
    case 'IfStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'ImportDeclaration':
      throw ASSERT(false);
    case 'ImportDefaultSpecifier':
      ASSERT(parentProp === 'local', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'ImportNamespaceSpecifier':
      ASSERT(parentProp === 'local', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'ImportSpecifier':
      ASSERT(
        parentProp === 'local' || parentProp === 'imported',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'local') return 'write';
      return 'none';
    case 'LabeledStatement':
      ASSERT(parentProp === 'label' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      if (parentProp === 'label') return 'label';
      return 'read';
    case 'Literal':
      throw ASSERT(false, 'literals do not have ident children');
    case 'LogicalExpression':
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'MemberExpression':
      ASSERT(
        parentProp === 'object' || parentProp === 'property',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      // Even in assignments to properties it will read the object first
      if (parentProp === 'object' || parentNode.computed) return 'read';
      return 'write';
    case 'MetaProperty':
      ASSERT(parentProp === 'meta' || parentProp === 'property', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'none';
    case 'MethodDefinition':
      ASSERT(parentProp === 'key', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      // I don't think this can be value, at least not until the spec changes
      return 'none';
    case 'NewExpression':
      ASSERT(
        parentProp === 'callee' || parentProp === 'arguments',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      return 'read';
    case 'ObjectExpression':
      throw ASSERT(false, 'idents here are always wrapped in a Property or SpreadElement');
    case 'ObjectPattern':
      throw ASSERT(false, 'idents here are always wrapped in a Property or SpreadElement');
    case 'Program':
      throw ASSERT(false);
    case 'Property':
      ASSERT(parentProp === 'key' || parentProp === 'value', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      if (parentProp === 'key') return 'none';
      return 'read';
    case 'RestElement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'ReturnStatement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'SequenceExpression':
      ASSERT(parentProp === 'expressions', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'SpreadElement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'Super':
      throw ASSERT(false);
    case 'SwitchCase':
      ASSERT(
        parentProp === 'test',
        'if the ident is a child of the consequent then it will be a statement',
        parentNode.type,
        '.',
        parentProp,
      );
      return 'read';
    case 'SwitchStatement':
      ASSERT(parentProp === 'discriminant', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'TaggedTemplateExpression':
      ASSERT(parentProp === 'tag', 'the expressions are wrapped in a TemplateElement', parentNode.type, '.', parentProp);
      return 'read';
    case 'TemplateElement':
      throw ASSERT(false);
    case 'TemplateLiteral':
      ASSERT(parentProp === 'expressions', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'ThisExpression':
      throw ASSERT(false);
    case 'ThrowStatement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'TryStatement':
      throw ASSERT(false);
    case 'UnaryExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      // Note: none of the unary operators currently mutate. (++/-- are update expressions)
      return 'read';
    case 'UpdateExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'readwrite';
    case 'VariableDeclaration':
      throw ASSERT(false);
    case 'VariableDeclarator':
      ASSERT(parentProp === 'id' || parentProp === 'init', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      if (parentProp === 'id') return 'write';
      return 'read';
    case 'WhileStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'WithStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'YieldExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
  }
  throw ASSERT(false, 'Support this new node', node);
}
