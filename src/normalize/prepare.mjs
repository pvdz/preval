import walk from '../../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat } from '../utils.mjs';
import {
  getIdentUsageKind,
  registerGlobalIdent,
  createUniqueGlobalLabel,
  registerGlobalLabel,
  findUniqueNameForBindingIdent,
  preprocessScopeNode,
} from '../bindings.mjs';
import globals from '../globals.mjs';
import { $p } from '../$p.mjs';

let VERBOSE_TRACING = true;

// This phase is fairly mechanical and should only do discovery, no AST changes (though labels are renamed).
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function prepareNormalization(fdata, resolve, req, verbose) {
  if (fdata.len > 10 * 1024) VERBOSE_TRACING = false; // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.

  const ast = fdata.tenkoOutput.ast;
  const fname = fdata.fname;

  const funcStack = [];
  const lexScopeStack = [];
  const labelStack = []; // No need to validate this or track func boundaries. That's what the parser should have done already.
  let lexScopeCounter = 0;
  const funcScopeStack = [];
  const thisStack = [];

  fdata.globalNameCounter = 0;
  const globallyUniqueNamingRegistry = new Map();
  fdata.globallyUniqueNamingRegistry = globallyUniqueNamingRegistry;
  globals.forEach((_, name) => registerGlobalIdent(fdata, name, name, { isImplicitGlobal: false, knownBuiltin: true }));

  const globallyUniqueLabelRegistry = new Map();
  fdata.globallyUniqueLabelRegistry = globallyUniqueLabelRegistry;

  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  fdata.imports = imports;
  const exports = new Map();
  fdata.exports = exports;

  group(
    '\n\n\n##################################\n## prepare normalization  ::  ' + fdata.fname + '\n##################################\n\n\n',
  );

  walk(_walker, ast, 'ast');
  function _walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    if (before) {
      node.$p = $p();
    }

    if (VERBOSE_TRACING) {
      group(
        BLUE + nodeType + ':' + (before ? 'before' : 'after'),
        RESET,
        // To debug lexical scopes:
        //' '.repeat(50), lexScopeStack.map(node => node.type+'<'+node.$uid+'>').join(',')
      );
    }

    const key = nodeType + ':' + (before ? 'before' : 'after');

    if (before && node.$scope) {
      lexScopeStack.push(node);
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.push(node);
      }
      preprocessScopeNode(node, path.nodes[path.nodes.length - 2], fdata, funcScopeStack[funcScopeStack.length - 1], ++lexScopeCounter);
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
        if (VERBOSE_TRACING) log('Name:', node.id?.name ?? '<anon>');
        funcStack.push(node);
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          thisStack.push(node);
        }
        break;
      }
      case 'FunctionDeclaration:after':
      case 'FunctionExpression:after':
      case 'ArrowFunctionExpression:after': {
        if (VERBOSE_TRACING) log('Name:', node.id?.name ?? '<anon>');
        funcStack.pop();
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          thisStack.pop();
        }

        if (node.type === 'FunctionDeclaration') {
          log('It _is_ a function decl. How should it be hoisted?');
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];
          const grandparent = path.nodes[path.nodes.length - 3];

          // Note: special case for Switch body will be picked up explicitly by the switch transform
          if (parentNode.type === 'Program') {
            if (VERBOSE_TRACING) {
              log('- Hoisting toplevel global function');
              log('- Scheduling func decl `' + node?.id.name + '` to be hoisted in global');
            }
            ASSERT(parentIndex >= 0, 'node should be in a body');
            ASSERT(parentProp === 'body', 'children of Program are in body', parentProp);
            ASSERT(parentNode.body[parentIndex] === node, 'path should be correct');
            parentNode.$p.hoistedVars.push(['program', node, parentNode, parentProp, parentIndex]);
          } else if (parentNode.type === 'ExportNamedDeclaration' || (parentNode.type === 'ExportDefaultDeclaration' && node.id)) {
            if (VERBOSE_TRACING) {
              log('- Hoisting entire export');
              log('- Scheduling func decl `' + node.id.name + '` to be hoisted in global');
            }
            ASSERT(parentProp === 'declaration');
            ASSERT(parentIndex === -1, 'parent is not an array');
            ASSERT(parentNode.declaration === node, 'path should be correct');
            ASSERT(grandparent.type === 'Program', 'exports are only children of the root');
            const exportIndex = path.indexes[path.indexes.length - 2]; // index of parentNode in body (=ast.body)
            ASSERT(exportIndex >= 0);
            grandparent.$p.hoistedVars.push(['export', node, parentNode, parentProp, parentIndex, exportIndex]);
          } else if (['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(grandparent.type)) {
            // Func decl nested in the toplevel of another function
            if (VERBOSE_TRACING) {
              log('- Hoisting function nested directly in another function');
              log('- Scheduling func decl `' + node?.id.name + '` to be hoisted in parent function');
            }
            ASSERT(parentProp === 'body', 'Func param defaults would not yield func declarations', parentProp);
            ASSERT(parentIndex >= 0);
            ASSERT(parentNode.body[parentIndex] === node, 'path should be correct', parentProp);
            // Track it so the normalization can drain this arr and immediately fix the hoisting, once.
            grandparent.$p.hoistedVars.push(['func', node, parentNode, parentProp, parentIndex]);
          } else if (parentNode.type === 'BlockStatement') {
            if (VERBOSE_TRACING) {
              log('This is a function decl nested in a non-func-body block');
              log('- Scheduling func decl `' + node.id.name + '` to be hoisted in block');
            }
            // TODO: this does slightly change the semantics because either we need to drop the name so it doesn't
            //       shadow the binding but still make it mutable, or we keep the name but then the binding is
            //       not mutable from within the function. Maybe the best course is to rename the function and its
            //       refs and then restore the function name... But we maul the function names anyways for the sake
            //       of using unique names, so maybe this is not a big deal for us.
            node.$p.isBlockFuncDecl = true;
            parentNode.$p.hasFuncDecl = true; // Prevents elimination of this block
          }
        }

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
        if (VERBOSE_TRACING) log('Ident:', node.name);
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const kind = getIdentUsageKind(parentNode, parentProp);
        if (VERBOSE_TRACING) log('- Ident kind:', kind);

        if (VERBOSE_TRACING) log('- Parent node: `' + parentNode.type + '`, prop: `' + parentProp + '`');
        if (kind !== 'none' && kind !== 'label' && node.name !== 'arguments') {
          ASSERT(!node.$p.uniqueName, 'dont do this twice');
          const uniqueName = findUniqueNameForBindingIdent(
            node,
            parentNode.type === 'FunctionDeclaration' && parentProp === 'id',
            fdata,
            lexScopeStack,
          );
          if (VERBOSE_TRACING) log('- initial name:', node.name, ', unique name:', uniqueName);
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
            if (VERBOSE_TRACING) log('Marking `' + uniqueName + '` as being an export');
            meta.isExport = true;
          }
        } else {
          if (VERBOSE_TRACING) log(RED + '- skipping; not a binding' + RESET);
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
            // `export var x`, which we transform into `var x; export {x}`
            ASSERT(parentNode[parentProp] === node);
            ASSERT(func.type === 'Program', 'exports can only appear in one place');
            const exportIndex = path.indexes[path.indexes.length - 2];
            ASSERT(func.body[exportIndex] === parentNode, 'exports are children of global body');
            ASSERT(parentIndex === -1);
            ASSERT(exportIndex >= 0);
            ASSERT(node && exportIndex >= 0 && parentNode && parentProp);
            func.$p.hoistedVars.push(['export', node, parentNode, parentProp, parentIndex, exportIndex]);
          } else if (parentNode.type === 'ForStatement' || parentNode.type === 'ForInStatement' || parentNode.type === 'ForOfStatement') {
            // for (var x;;);
            // for (var x in y);
            // for (var x of y);
            ASSERT(parentNode[parentProp] === node);
            //const exportIndex = path.indexes[path.indexes.length - 2];
            ASSERT(parentIndex === -1);
            //ASSERT(exportIndex >= 0);
            //ASSERT(node && exportIndex >= 0 && parentNode && parentProp);
            func.$p.hoistedVars.push(['for', node, parentNode, parentProp, parentIndex]);
          } else if (parentNode.type === 'BlockStatement') {
            log('- is a block-var');
            // { var x; }
            ASSERT(parentNode[parentProp][parentIndex] === node);
            ASSERT(node && parentIndex >= 0);
            func.$p.hoistedVars.push(['block', node, parentNode, parentProp, parentIndex]);
          } else {
            // var x;
            ASSERT(node);
            ASSERT((parentIndex >= 0 ? parentNode[parentProp][parentIndex] : parentNode[parentProp]) === node, 'should find parent', node);
            func.$p.hoistedVars.push(['other', node, parentNode, parentProp, parentIndex]);
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
        const resolvedSource = resolve(source, fname);

        ASSERT(node.specifiers, 'fixme if different', node);

        // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
        // top of the queue if not finished processing yet. It will resolve before this file.
        imports.set('default', resolvedSource);

        break;
      }

      case 'ThisExpression:after': {
        if (thisStack.length) {
          if (VERBOSE_TRACING) log('Marking func as having `this` access');
          thisStack[thisStack.length - 1].$p.thisAccess = true;
        }
        break;
      }

      case 'BreakStatement:before':
      case 'ContinueStatement:before': {
        // Find labeled break or continue statements and make sure that they keep pointing to the "same" label
        // Find the first label ancestor where the original name matches the label of this node
        if (node.label) {
          const name = node.label.name;
          if (VERBOSE_TRACING) log('Label:', name, ', now searching for definition... Label stack depth:', labelStack.length);
          let i = labelStack.length;
          while (--i >= 0) {
            if (VERBOSE_TRACING) log('->', labelStack[i].$p.originalLabelName);
            if (labelStack[i].$p.originalLabelName === name) {
              const newName = labelStack[i].label.name;
              if (newName !== name) {
                if (VERBOSE_TRACING) log('- Label was renamed to', newName);
                node.label.name = newName;
                break;
              } else {
                if (VERBOSE_TRACING) log('- Label not renamed');
              }
            }
          }
        } else {
          if (VERBOSE_TRACING) log('No label');
        }
        break;
      }

      case 'LabeledStatement:before': {
        labelStack.push(node);
        if (VERBOSE_TRACING) log('Label:', node.label.name);
        node.$p.originalLabelName = node.label.name;
        const uniqueName = createUniqueGlobalLabel(node.label.name, globallyUniqueLabelRegistry);
        registerGlobalLabel(fdata, uniqueName, node.label.name, node);
        if (node.label.name !== uniqueName) {
          if (VERBOSE_TRACING) log('- Unique label name:', uniqueName);
          node.label.name = uniqueName;
        } else {
          if (VERBOSE_TRACING) log('- Label is now registered and unique');
        }
        break;
      }
      case 'LabeledStatement:after': {
        labelStack.pop();
        break;
      }
    }

    if (!before && node.$scope) {
      lexScopeStack.pop();
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.pop();
      }
    }

    if (VERBOSE_TRACING) {
      groupEnd();
    }
  }

  if (VERBOSE_TRACING) {
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
  }
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
