import walk from '../../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat } from '../utils.mjs';
import { getIdentUsageKind, createReadRef, createWriteRef } from '../bindings.mjs';
import globals from '../globals.mjs';
import * as Tenko from '../../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { $p } from '../$p.mjs';
import * as AST from '../ast.mjs';

let VERBOSE_TRACING = true;

const ALIAS_PREFIX = 'tmpPrevalAlias';
const THIS_ALIAS_BASE_NAME = ALIAS_PREFIX + 'This';
const ARGUMENTS_ALIAS_PREFIX = ALIAS_PREFIX + 'Arguments';
const ARGUMENTS_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Any';
const ARGLENGTH_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Len'; // `arguments.length`, which is easier than just `arguments`

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req, verbose) {
  if (fdata.len > 10 * 1024) VERBOSE_TRACING = false; // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.

  const ast = fdata.tenkoOutput.ast;

  const funcStack = [];
  const thisStack = []; // Only contains func exprs. Func decls are eliminated. Arrows do not have this/arguments.
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

    if (VERBOSE_TRACING) group(BLUE + nodeType + ':' + (before ? 'before' : 'after'), RESET);

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
        if (VERBOSE_TRACING) log('This block has depth', blockStack.length, 'and pid', node.$p.pid);
        break;
      }
      case 'BlockStatement:after': {
        blockStack.pop();
        blockIds.pop();
        break;
      }

      case 'FunctionDeclaration:before': // export default func only
      case 'FunctionExpression:before':
      case 'ArrowFunctionExpression:before': {
        funcStack.push(node);
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          thisStack.push(node);
        }
        break;
      }

      case 'FunctionDeclaration:after': // export default func only
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

        const body = node.body.body;
        if (body.length === 1) {
          if (body[0].type === 'ReturnStatement') {
            // All usages can be inlined with the arg, provided the arg is reachable from the call sites (relevant for closures)
            if (AST.isPrimitive(body[0].argument)) {
              node.$p.inlineMe = 'single return with primitive';
            }
          }
        } else if (body.length === 2) {
          if (body[1].type === 'ReturnStatement' && body[0].type === 'VariableDeclaration') {
            const decl = body[0];
            const decr = decl.declarations[0];
            const ret = body[1];
            if (ret.argument?.type === 'Identifier' && decr.id.name === ret.argument.name) {
              // This is a function whose body is a variable declaration that is then returned.
              // `var x = unkonwn; return x`, where unknown is any normalized expression

              ASSERT(decr.init, 'normalized var decls have an init, right');
              if (AST.isPrimitive(decr.init)) {
                // I think this shouldn't be the case as I expect these to be normalized away
                node.$p.inlineMe = 'double with primitive';
              } else if (decr.init.type === 'ArrayExpression') {
                // `function f() { const x = [...]; return x; }`
                // Let's start with arrays that only contain primitives
                if (decr.init.elements.every((enode) => AST.isPrimitive(enode))) {
                  node.$p.inlineMe = 'double with array with primitives';
                }
              }
            }
          }
        }

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
        if (VERBOSE_TRACING) log('Ident:', name);
        const kind = getIdentUsageKind(parentNode, parentProp);
        if (VERBOSE_TRACING) log('- Ident kind:', kind);

        if (VERBOSE_TRACING) {
          log(
            '- Parent: `' + parentNode.type + '.' + parentProp + '`',
            parentNode.type === 'MemberExpression' && node.computed ? 'computed' : 'regular',
          );
        }
        if (name === 'arguments') {
          ASSERT(kind !== 'write', 'arguments cannot be written to in strict mode, right?');
          if (kind === 'read') {
            // Make a distinction between arguments.length, arguments[], and maybe the slice paradigm?
            // For now we only care whether the function might detect the call arg count. Without arguemnts, it cannot.
            // TODO: check for `arguments.length` explicitly, since in that case the excessive args can be replaced with a simple primitive
            if (thisStack.length) {
              if (
                parentNode.type === 'MemberExpression' &&
                parentProp === 'object' &&
                !parentNode.computed &&
                parentNode.property.name === 'length'
              ) {
                // This is an `arguments.length` access. Easier to work around than plain unbound `arguments` access.
                thisStack[thisStack.length - 1].$p.readsArgumentsLen = true;
              } else {
                // This disables a few tricks because of observable side effects
                thisStack[thisStack.length - 1].$p.readsArgumentsAny = true;
              }
            } else {
              // TODO: do we want to act on this?
              if (VERBOSE_TRACING) log('Attempting to access `arguments` in global space? Probably crashes at runtime.');
            }
          }
        } else if (kind !== 'none' && kind !== 'label') {
          ASSERT(kind !== 'readwrite', 'I think readwrite is compound assignment and we eliminated those? prove me wrong', node);
          ASSERT(kind === 'read' || kind === 'write', 'consider what to do if this check fails', kind, node);
          if (VERBOSE_TRACING) log('- Binding referenced in $p.pid:', currentScope.$p.pid);
          let meta = globallyUniqueNamingRegistry.get(name);
          if (!meta) {
            if (VERBOSE_TRACING) log('- Creating meta for `' + name + '`');
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
            const grandNode = path.nodes[path.nodes.length - 3];
            const grandProp = path.props[path.props.length - 2];
            const grandIndex = path.indexes[path.indexes.length - 2];

            meta.reads.push(
              createReadRef({
                parentNode,
                parentProp,
                parentIndex,
                grandNode,
                grandProp,
                grandIndex,
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
              if (VERBOSE_TRACING) log('- Adding decl write');

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

              const grandParentNode = path.nodes[path.nodes.length - 3];
              ASSERT(grandParentNode.type === 'VariableDeclaration');
              if (VERBOSE_TRACING) log('- Binding kind is', grandParentNode.kind);

              if (grandParentNode.kind === 'const') {
                if (VERBOSE_TRACING) log('- Setting constValueRef to a', parentNode.init.type);
                meta.constValueRef = {
                  node: parentNode.init,
                  containerNode: declParent,
                  containerProp: declProp,
                  containerIndex: declIndex,
                };
              }
            } else if (parentNode.type === 'AssignmentExpression') {
              ASSERT(parentProp === 'left', 'the read check above should cover the prop=right case');
              ASSERT(path.nodes[path.nodes.length - 3].type === 'ExpressionStatement', 'assignments must be normalized to statements');
              const assignParent = path.nodes[path.nodes.length - 4];
              const assignProp = path.props[path.props.length - 3];
              const assignIndex = path.indexes[path.indexes.length - 3];
              if (VERBOSE_TRACING) log('Adding assign write');
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
            } else if (parentNode.type === 'FunctionDeclaration') {
              ASSERT(false, 'all function declarations should have been eliminated during hoisting');
            } else if (
              parentProp === 'params' &&
              (parentNode.type === 'FunctionExpression' || parentNode.type === 'ArrowFunctionExpression')
            ) {
              const paramParent = path.nodes[path.nodes.length - 3];
              const paramProp = path.props[path.props.length - 2];
              const paramIndex = path.indexes[path.indexes.length - 2];
              if (VERBOSE_TRACING) log('Adding param write');
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
              if (VERBOSE_TRACING) log('Adding "other" write');
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
            if (VERBOSE_TRACING) log('Marking `' + name + '` as being an export');
            meta.isExport = true;
          }
        } else {
          if (VERBOSE_TRACING) log(RED + '- skipping; not a binding' + RESET);
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
        if (VERBOSE_TRACING) log('Importing symbols from "' + source + '"');
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
          if (VERBOSE_TRACING) log('Marking func as having `this` access');
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

    if (VERBOSE_TRACING) groupEnd();
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

    log('\nCurrent state\n--------------\n' + (verbose ? fmat(tmat(fdata.tenkoOutput.ast)) : '') + '\n--------------\n');
  }

  log('End of phase 1');
  groupEnd();
}
