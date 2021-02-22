import walk from '../../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat } from '../utils.mjs';
import { getIdentUsageKind, createReadRef, createWriteRef } from '../bindings.mjs';
import globals from '../globals.mjs';
import * as Tenko from '../../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { $p } from '../$p.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req, verbose) {
  const ast = fdata.tenkoOutput.ast;

  const funcStack = [];
  const thisStack = [];
  const blockStack = []; // Since code is normalized, every statement body is a block (except labels maybe)
  const blockIds = []; // Same as blockStack except only contains its $p.pid's. Negative if the parent was a loop of sorts.
  let readWriteCounter = 0;

  const globallyUniqueNamingRegistry = new Map();
  fdata.globallyUniqueNamingRegistry = globallyUniqueNamingRegistry;

  globals.forEach((_, name) =>
    globallyUniqueNamingRegistry.set(name, {
      name,
      isBuiltin: true,
      isImplicitGlobal: false,
      isExport: false, // Set below
      reads: [],
      writes: [],
    }),
  );

  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  const exports = new Map();
  fdata.imports = imports;
  fdata.exports = exports;

  group('\n\n\n##################################\n## phase1  ::  ' + fdata.fname + '\n##################################\n\n\n');

  walk(_walker, ast, 'ast');
  function _walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    if (before) {
      node.$p = $p();
    }

    group(BLUE + nodeType + ':' + (before ? 'before' : 'after'), RESET);

    const key = nodeType + ':' + (before ? 'before' : 'after');

    switch (key) {
      case 'Program:before': {
        funcStack.push(node);
        blockStack.push(node);
        blockIds.push(node);
        break;
      }
      case 'Program:after': {
        funcStack.pop();
        blockStack.pop();
        blockIds.pop();
        break;
      }

      case 'BlockStatement:before': {
        blockStack.push(node);
        blockIds.push(
          parentNode.type === 'WhileStatement' || parentNode.type === 'ForInStatement' || parentNode.type === 'ForOfStatement'
            ? -node.$p.pid
            : node.$p.pid,
        );
        log('This block has depth', blockStack.length, 'and pid', node.$p.pid);
        break;
      }
      case 'BlockStatement:after': {
        blockStack.pop();
        blockIds.pop();
        break;
      }

      case 'FunctionDeclaration:before':
      case 'FunctionExpression:before':
      case 'ArrowFunctionExpression:before': {
        funcStack.push(node);
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
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

        if (node.id) {
          const meta = globallyUniqueNamingRegistry.get(node.id.name);
          ASSERT(meta, 'there should be a meta for this name', node.id.name);
          meta.isImplicitGlobal = false;
        }

        node.params.forEach((pnode) => {
          if (pnode.type === 'RestElement') {
            const meta = globallyUniqueNamingRegistry.get(pnode.argument.name);
            ASSERT(meta);
            meta.isImplicitGlobal = false;
          } else {
            ASSERT(pnode.type === 'Identifier', 'params are spread or idents at this point', pnode);
            const meta = globallyUniqueNamingRegistry.get(pnode.name);
            ASSERT(meta);
            meta.isImplicitGlobal = false;
          }
        });

        break;
      }

      case 'ClassDeclaration:after': {
        if (node.id) {
          const meta = globallyUniqueNamingRegistry.get(node.id.name);
          ASSERT(meta);
          meta.isImplicitGlobal = false;
        }
        break;
      }

      case 'CatchClause:before': {
        // Note: the catch scope is set on node.handler of the try (parent node of the catch clause)
        break;
      }

      case 'Identifier:before': {
        const currentScope = funcStack[funcStack.length - 1];
        const name = node.name;
        log('Ident:', name);
        const kind = getIdentUsageKind(parentNode, parentProp);
        log('- Ident kind:', kind);

        log(
          '- Parent: `' + parentNode.type + '.' + parentProp + '`',
          parentNode.type === 'MemberExpression' && node.computed ? 'computed' : 'regular',
        );
        if (kind !== 'none' && kind !== 'label' && name !== 'arguments') {
          ASSERT(kind !== 'readwrite', 'I think readwrite is compound assignment and we eliminated those? prove me wrong', node);
          ASSERT(kind === 'read' || kind === 'write', 'consider what to do if this check fails', kind, node);
          log('- Binding referenced in', currentScope.$p.pid);
          let meta = globallyUniqueNamingRegistry.get(name);
          if (!meta) {
            log('- Creating meta for `' + name + '`');
            meta = {
              name,
              isConstant: false, // Either declared as const or a builtin global that we can assume to be a constant
              isBuiltin: false,
              isImplicitGlobal: 'unknown', // true until its not...
              isExport: false, // Set below
              reads: [],
              writes: [],
            };
            globallyUniqueNamingRegistry.set(name, meta);
          }
          ASSERT(kind !== 'readwrite', 'compound assignments and update expressions should be eliminated by normalization', node);
          if (kind === 'read') {
            meta.reads.push(
              createReadRef({
                parentNode,
                parentProp,
                parentIndex,
                node,
                rwCounter: ++readWriteCounter,
                scope: currentScope.$p.pid,
                blockChain: blockIds.join(','),
                innerLoop: blockIds.filter((n) => n < 0).pop() ?? 0,
              }),
            );
          }
          if (kind === 'write') {
            if (parentNode.type === 'VariableDeclarator') {
              ASSERT(parentProp === 'id', 'the read check above should cover the prop=init case');
              const declParent = path.nodes[path.nodes.length - 4];
              const declProp = path.props[path.props.length - 3];
              const declIndex = path.indexes[path.indexes.length - 3];
              log('Adding decl write');
              meta.writes.push(
                createWriteRef({
                  parentNode,
                  parentProp,
                  parentIndex,
                  node,
                  rwCounter: ++readWriteCounter,
                  scope: currentScope.$p.pid,
                  blockChain: blockIds.join(','),
                  innerLoop: blockIds.filter((n) => n < 0).pop() ?? 0,
                  decl: { declParent, declProp, declIndex },
                }),
              );
            } else if (parentNode.type === 'AssignmentExpression') {
              ASSERT(parentProp === 'left', 'the read check above should cover the prop=right case');
              ASSERT(path.nodes[path.nodes.length - 3].type === 'ExpressionStatement', 'assignments must be normalized to statements');
              const assignParent = path.nodes[path.nodes.length - 4];
              const assignProp = path.props[path.props.length - 3];
              const assignIndex = path.indexes[path.indexes.length - 3];
              log('Adding assign write');
              meta.writes.push(
                createWriteRef({
                  parentNode,
                  parentProp,
                  parentIndex,
                  node,
                  rwCounter: ++readWriteCounter,
                  scope: currentScope.$p.pid,
                  blockChain: blockIds.join(','),
                  innerLoop: blockIds.filter((n) => n < 0).pop() ?? 0,
                  assign: { assignParent, assignProp, assignIndex },
                }),
              );
            } else if (parentNode.type === 'FunctionDeclaration' && parentProp === 'id') {
              // opposed to a param
              const funcParent = path.nodes[path.nodes.length - 3];
              const funcProp = path.props[path.props.length - 2];
              const funcIndex = path.indexes[path.indexes.length - 2];
              log('Adding funcdecl write');
              meta.writes.push(
                createWriteRef({
                  parentNode,
                  parentProp,
                  parentIndex,
                  node,
                  rwCounter: ++readWriteCounter,
                  scope: currentScope.$p.pid,
                  blockChain: blockIds.join(','),
                  innerLoop: blockIds.filter((n) => n < 0).pop() ?? 0,
                  funcDecl: { funcParent, funcProp, funcIndex },
                }),
              );
            } else if (parentProp === 'params' && (parentNode.type === 'FunctionDeclaration' || parentNode.type === 'FunctionExpression' || parentNode.type === 'ArrowFunctionExpression')) {
              const paramParent = path.nodes[path.nodes.length - 3];
              const paramProp = path.props[path.props.length - 2];
              const paramIndex = path.indexes[path.indexes.length - 2];
              log('Adding param write');
              meta.writes.push(
                createWriteRef({
                  parentNode,
                  parentProp,
                  parentIndex,
                  node,
                  rwCounter: ++readWriteCounter,
                  scope: currentScope.$p.pid,
                  blockChain: blockIds.join(','),
                  innerLoop: blockIds.filter((n) => n < 0).pop() ?? 0,
                  param: { paramParent, paramProp, paramIndex },
                }),
              );
            } else {
              // for-x lhs, param, etc
              log('Adding "other" write');
              meta.writes.push(
                createWriteRef({
                  parentNode,
                  parentProp,
                  parentIndex,
                  node,
                  rwCounter: ++readWriteCounter,
                  scope: currentScope.$p.pid,
                  innerLoop: blockIds.filter((n) => n < 0).pop() ?? 0,
                  blockChain: blockIds.join(','),
                }),
              );
            }
          }

          // Resolve whether this was an export. If so, mark the name as such.
          // After normalization there should only be named exports without declarations and
          // anonymous default exports. This ident won't be part of the latter :p
          // TODO: local vs exported. also: exports are neither read nor write. well, pseudo read maybe?
          const grandParent = path.nodes[path.nodes.length - 3];
          if (grandParent.type === 'ExportNamedDeclaration') {
            log('Marking `' + name + '` as being an export');
            meta.isExport = true;
          }
        } else {
          log(RED + '- skipping; not a binding' + RESET);
        }

        break;
      }

      case 'ImportDeclaration:before': {
        // Note: after normalization there should only be two kinds of imports;
        // - named imports, one imported symbol per decl, possibly with alias
        // - anonymous default import
        // TODO: and star import but we haven't bothered with that one yet...

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
        // This must be an anonymous function
        ASSERT(node.source && typeof node.source.value === 'string', 'fixme if else', node);
        const source = node.source.value;
        const resolvedSource = resolve(source, filename);

        ASSERT(node.specifiers, 'fixme if different', node);

        // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
        // top of the queue if not finished processing yet. It will resolve before this file.
        imports.set('default', resolvedSource);

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
        break;
      }

      case 'VariableDeclaration:after': {
        ASSERT(node.declarations.length === 1, 'all decls should be normalized to one binding');
        ASSERT(node.declarations[0].id.type === 'Identifier', 'all patterns should be normalized away');
        const meta = globallyUniqueNamingRegistry.get(node.declarations[0].id.name);
        meta.isImplicitGlobal = false;
        if (node.kind === 'const') {
          ASSERT(meta);
          meta.isConstant = true;
        }
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

  log('\nCurrent state\n--------------\n' + (verbose ? fmat(tmat(fdata.tenkoOutput.ast)) : '') + '\n--------------\n');

  log('End of phase 1');
  groupEnd();
}
