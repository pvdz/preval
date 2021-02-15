import walk from '../../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat, getIdentUsageKind } from '../utils.mjs';
import globals from '../globals.mjs';
import * as Tenko from '../../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { $p } from '../$p.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes (though labels are renamed).
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function prepareNormalization(fdata, resolve, req, verbose) {
  const ast = fdata.tenkoOutput.ast;

  const funcStack = [];
  const lexScopeStack = [];
  const labelStack = []; // No need to validate this or track func boundaries. That's what the parser should have done already.
  let lexScopeCounter = 0;
  const funcScopeStack = [];
  const thisStack = [];

  fdata.globalNameCounter = 0;
  const globallyUniqueNamingRegistry = new Map();
  function createUniqueGlobalName(name) {
    // Create a (module) globally unique name. Then use that name for the local scope.
    let n = 0;
    if (globallyUniqueNamingRegistry.has(name)) {
      while (globallyUniqueNamingRegistry.has(name + '_' + ++n));
    }
    return n ? name + '_' + n : name;
  }
  function registerGlobalIdent(name, originalName, { isExport = false, isImplicitGlobal = false, knownBuiltin = false } = {}) {
    ASSERT(!globallyUniqueNamingRegistry.has(name), 'should prevent trying to register it multiple times...');
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
    globallyUniqueNamingRegistry.set(name, meta);
    return meta;
  }
  globals.forEach((_, name) => registerGlobalIdent(name, name, { isImplicitGlobal: true, knownBuiltin: true }));

  const globallyUniqueLabelRegistry = new Map();
  function createUniqueGlobalLabel(name) {
    // Create a (module) globally unique label name.
    let n = 0;
    if (globallyUniqueLabelRegistry.has(name)) {
      while (globallyUniqueLabelRegistry.has(name + '_' + ++n));
    }
    return n ? name + '_' + n : name;
  }
  function registerGlobalLabel(name, originalName, labelNode) {
    ASSERT(!globallyUniqueLabelRegistry.has(name), 'this func should be called with the unique label name');

    globallyUniqueLabelRegistry.set(name, {
      // ident meta data
      uid: ++fdata.globalNameCounter,
      originalName,
      uniqueName: name,
      labelNode, // All referenced labels must exist (syntax error), labels must appear before their usage when traversing
      usages: [], // {parent, prop, index} of the break/continue statement referring to the label
    });
  }

  fdata.globallyUniqueNamingRegistry = globallyUniqueNamingRegistry;
  fdata.globallyUniqueLabelRegistry = globallyUniqueLabelRegistry;
  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  fdata.imports = imports;
  const exports = new Map();
  fdata.exports = exports;

  group('\n\n\n##################################\n## prepare normalization  ::  ' + fdata.fname + '\n##################################\n\n\n');

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
      log('- Meta:', {
        ...meta,
        reads: meta.reads.length <= 10 ? meta.reads : '<snip>',
        writes: meta.writes.length <= 10 ? meta.writes : '<snip>',
      });
      lexScopeStack[0].$p.nameMapping.set(node.name, uniqueName);
      return uniqueName;
    }

    const uniqueName = lexScopeStack[index].$p.nameMapping.get(node.name);
    ASSERT(uniqueName !== undefined, 'should exist');
    log('Should be bound in scope index', index, 'mapping to `' + uniqueName + '`');
    const meta = globallyUniqueNamingRegistry.get(uniqueName);
    log('- Meta:', {
      ...meta,
      reads: meta.reads.length <= 10 ? meta.reads : '<snip>',
      writes: meta.writes.length <= 10 ? meta.writes : '<snip>',
    });
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
        // The idea for hoistedVars is that we need to be able to remove/replace the initial var/func decl node
        // For the export, we need to know the index where it is located so we can remove it.
        // For the other cases that won't be necessary.
        node.$p.hoistedVars /*: Array<[
          node, // the var/func decl
          parentNode, // the node that holds the var decl (global/func/block/for/export node)
          prop, // parentNode[prop] --> node, if index<0
          index, // parentNode[prop][index] --> node, if index>=0
          exportIndex, // if node is an export, global.body[exportIndex] == parentNode
        ]> */ = [];
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
        log('- type:', s.type, ', bindings?', s.names === Tenko.HAS_NO_BINDINGS ? 'no' : ('yes, ' + s.names.size));
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
            log('Adding', name, 'to globallyUniqueNamingRegistry -->', uniqueName);
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

        const parentNode = path.nodes[path.nodes.length - 2];

        // Do not attempt to hoist anonymous default function exports
        // Function declarations inside blocks are not hoisted
        if (node.type === 'FunctionDeclaration' && node.id && parentNode.type !== 'BlockStatement') {
          const func = funcStack[funcStack.length - 1];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];

          if (parentNode.type.includes('Export')) {
            ASSERT(parentNode.type === 'ExportNamedDeclaration' || parentNode.type === 'ExportDefaultDeclaration');
            ASSERT(parentIndex === -1, 'parent is not an array');
            ASSERT(parentNode[parentProp] === node, 'check parent prop');
            const exportIndex = path.indexes[path.indexes.length - 2]; // index of parentNode in body
            ASSERT(node && exportIndex >= 0 && parentNode && parentProp, 'exist', exportIndex, parentProp);
            func.$p.hoistedVars.push([node, parentNode, parentProp, parentIndex, exportIndex]);
          } else {
            ASSERT(parentIndex >= 0);
            ASSERT(parentNode[parentProp][parentIndex] === node, 'check parent prop', parentProp);
            ASSERT(node && parentIndex >= 0);
            // Track it so the normalization can drain this arr and immediately fix the hoisting, once.
            func.$p.hoistedVars.push([node, parentNode, parentProp, parentIndex]);
          }
        }

        let lexes = lexScopeStack.slice(1);
        while (lexes[0] && ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(lexes[0].type)) lexes.shift(); // Drop global block scopes etc

        const body = node.body.body;
        let explicit = false;
        if (node.expression) {
          log('Arrow has expression so it always returns explicitly');
          explicit = true;
        } else {
          //log('checking', body.length, 'statements to get explicitReturns state');
          //for (let i = 0; i < body.length; ++i) {
          //  if (body[i].$p.explicitReturns === 'yes' && body[i].type !== 'FunctionDeclaration') {
          //    explicit = true;
          //    // All branches of this statement returns, so the remainder must be dead code. Eliminate it now.
          //    // Ignore if it is the last statement of the function
          //    // TODO: hoisting. `function f(){ return g; function g(){} }`
          //    if (i < body.length - 1) {
          //      log(
          //        '- Returning early. Slicing',
          //        body.length - (i + 1),
          //        'statements from this function that appeared after a return statement',
          //      );
          //
          //      // It's trickier than it seems.
          //      // DCE'd var decls must be inlined as `undefined` as their init is never visited.
          //      // Func decls should only appear at toplevel so I think those are fine? But who knows at this point.
          //
          //      node.body.body.forEach((cnode, j) => {
          //        if (!cnode) return;
          //        if (j <= i) return;
          //        if (cnode.type === 'FunctionDeclaration') return; // Do not remove function declarations
          //        if (cnode.type === 'VariableDeclaration' && cnode.kind === 'var') return; // keep var decls, but not let/const (they're tdz'd)
          //        node.body.body[j] = { type: 'EmptyStatement', $p: $p() };
          //      });
          //    }
          //    break;
          //  }
          //}
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
          const meta = globallyUniqueNamingRegistry.get(uniqueName);
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
            // TODO: unused by normalization. Remove it.
            log('Marking `' + uniqueName + '` as being an export');
            meta.isExport = true;
          }
        } else {
          log(RED + '- skipping; not a binding' + RESET);
        }

        break;
      }

      case 'VariableDeclaration:after': {
        if (node.kind === 'var') {
          const func = funcStack[funcStack.length - 1];
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];

          log('parent =', parentNode.type, 'prop=', parentProp, 'index=', parentIndex);

          if (parentNode.type === 'ExportNamedDeclaration') {
            log('- is an export-child');
            // export var x
            ASSERT(parentNode[parentProp] === node);
            ASSERT(func.type === 'Program', 'exports can only appear in one place');
            const exportIndex = path.indexes[path.indexes.length - 2];
            ASSERT(func.body[exportIndex] === parentNode, 'exports are children of global body');
            ASSERT(parentIndex === -1);
            ASSERT(exportIndex >= 0);
            ASSERT(node && exportIndex >= 0 && parentNode && parentProp);
            func.$p.hoistedVars.push([node, parentNode, parentProp, parentIndex, exportIndex]);
          } else if (parentNode.type === 'ForStatement' || parentNode.type === 'ForInStatement' || parentNode.type === 'ForOfStatement') {
            log('- is a for-child');
            // for (var x;;);
            // for (var x in y);
            // for (var x of y);
            ASSERT(parentNode[parentProp] === node);
            //const exportIndex = path.indexes[path.indexes.length - 2];
            ASSERT(parentIndex === -1);
            //ASSERT(exportIndex >= 0);
            //ASSERT(node && exportIndex >= 0 && parentNode && parentProp);
            func.$p.hoistedVars.push([node, parentNode, parentProp, parentIndex]);
          } else if (parentNode.type === 'BlockStatement') {
            log('- is a block-var');
            // { var x; }
            ASSERT(parentNode[parentProp][parentIndex] === node);
            ASSERT(node && parentIndex >= 0);
            func.$p.hoistedVars.push([node, parentNode, parentProp, parentIndex]);
          } else {
            // var x;
            ASSERT(node);
            ASSERT((parentIndex >= 0 ? parentNode[parentProp][parentIndex] : parentNode[parentProp]) === node, 'should find parent', node);
            func.$p.hoistedVars.push([node, parentNode, parentProp, parentIndex]);
          }
        }
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
  log(
    [...imports.values()]
      .sort()
      .map((s) => '- "' + s + '"')
      .join('\n'),
  );
  log(
    '\ngloballyUniqueNamingRegistry (sans builtins):\n',
    globallyUniqueNamingRegistry.size > 50
      ? '<too many>'
      : globallyUniqueNamingRegistry.size === globals.size
      ? '<none>'
      : [...globallyUniqueNamingRegistry.keys()].filter((name) => !globals.has(name)).join(', '),
  );
  log(
    '\ngloballyUniqueLabelRegistry:\n',
    globallyUniqueLabelRegistry.size > 50
      ? '<too many>'
      : globallyUniqueLabelRegistry.size === 0
      ? '<none>'
      : [...globallyUniqueLabelRegistry.keys()].join(', '),
  );

  log('\nCurrent state\n--------------\n' + (verbose ? fmat(tmat(fdata.tenkoOutput.ast)) : '') + '\n--------------\n');

  log('End of phase 1');
  groupEnd();

  // Guarantee that exports are not renamed by the deduping normalization algo
  globallyUniqueNamingRegistry.forEach((obj, name) => {
    ASSERT(
      !obj.isExport || name === obj.originalName,
      'all exports should keep their name because they are recorded in global scope, must be lex and so unique, and any other binding that shadows them will be aliased instead',
      name,
      obj,
    );
  });
}
