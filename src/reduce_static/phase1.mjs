import walk from '../../lib/walk.mjs';

import { VERBOSE_TRACING, RED, BLUE, RESET } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat } from '../utils.mjs';
import { $p } from '../$p.mjs';
import * as AST from '../ast.mjs';
import { getIdentUsageKind, createReadRef, createWriteRef, registerGlobalIdent, registerGlobalLabel } from '../bindings.mjs';
import globals from '../globals.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req, firstAfterParse) {
  const ast = fdata.tenkoOutput.ast;

  vlog('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  const funcStack = [];
  const thisStack = []; // Only contains func exprs. Func decls are eliminated. Arrows do not have this/arguments.
  const blockIds = []; // Stack of block pids. Negative if the parent was a loop of sorts.
  let readWriteCounter = 0;

  const globallyUniqueNamingRegistry = new Map();
  fdata.globallyUniqueNamingRegistry = globallyUniqueNamingRegistry;
  const identNameSuffixOffset = new Map(); // <name, int>
  fdata.identNameSuffixOffset = identNameSuffixOffset;

  const globallyUniqueLabelRegistry = new Map();
  fdata.globallyUniqueLabelRegistry = globallyUniqueLabelRegistry;
  const labelNameSuffixOffset = new Map(); // <name, int>
  fdata.labelNameSuffixOffset = labelNameSuffixOffset;

  globals.forEach((_, name) => {
    ASSERT(name);
    registerGlobalIdent(fdata, name, name, { isExport: false, isImplicitGlobal: false, isBuiltin: true });
  });

  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  const exports = new Map();
  fdata.imports = imports;
  fdata.exports = exports;

  group(
    '\n\n\n##################################\n## phase1 (first=' +
      firstAfterParse +
      ') ::  ' +
      fdata.fname +
      '\n##################################\n\n\n',
  );

  walk(_walker, ast, 'ast');
  function _walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];

    if (before) {
      node.$p = $p();
      node.$p.funcDepth = funcStack.length;
    }

    vgroup(BLUE + nodeType + ':' + (before ? 'before' : 'after'), RESET);

    const key = nodeType + ':' + (before ? 'before' : 'after');

    switch (key) {
      case 'Program:before': {
        funcStack.push(node);
        blockIds.push(node.$p.pid);
        break;
      }
      case 'Program:after': {
        funcStack.pop();
        blockIds.pop();
        break;
      }

      case 'BlockStatement:before': {
        blockIds.push(['WhileStatement', 'ForInStatement', 'ForOfStatement'].includes(parentNode.type) ? -node.$p.pid : node.$p.pid);
        vlog('This block has depth', blockIds.length, 'and pid', node.$p.pid);
        break;
      }
      case 'BlockStatement:after': {
        blockIds.pop();
        break;
      }

      case 'BreakStatement:before':
      case 'ContinueStatement:before': {
        // Note: continue/break state is verified by the parser so we should be able to assume this continue/break has a valid target
        if (node.label) {
          const name = node.label.name;
          vlog('Label:', name);

          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];
          ASSERT(
            fdata.globallyUniqueLabelRegistry.has(node.label.name),
            'the label should be registered',
            node,
            fdata.globallyUniqueLabelRegistry,
          );
          fdata.globallyUniqueLabelRegistry.get(node.label.name).usages.push({
            node,
            parentNode,
            parentProp,
            parentIndex,
          });
        }
        break;
      }

      //case 'CatchClause:before': {
      //  // Note: the catch scope is set on node.handler of the try (parent node of the catch clause)
      //  break;
      //}

      case 'DebuggerStatement:before': {
        // Must be the only one and must be our header/body divider
        ASSERT(parentIndex >= 0);
        funcStack[funcStack.length - 1].$p.bodyOffset = parentIndex + 1;
        break;
      }

      case 'ForInStatement:before': {
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        break;
      }

      case 'ForOfStatement:before': {
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        break;
      }

      case 'FunctionExpression:before': {
        if (firstAfterParse) {
          vlog('Converting parameter nodes to special Param nodes');
          node.params.forEach((pnode, i) => {
            node.params[i] = AST.param(pnode.type === 'RestElement' ? pnode.argument.name : pnode.name, pnode.type === 'RestElement');
          });
        }

        if (parentNode.type === 'ExpressionStatement') {
          vlog('Do not traverse. I dont care whats inside.');
          vgroupEnd();
          return true;
        }
        ASSERT(
          ['VariableDeclarator', 'AssignmentExpression', 'Property', 'MethodDefinition'].includes(parentNode.type),
          'normalized code should not other cases, right?',
          parentNode,
        );
        funcStack.push(node);
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          thisStack.push(node);
        }
        break;
      }
      case 'FunctionExpression:after': {
        funcStack.pop();

        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          thisStack.pop();
        }

        if (funcStack.length > 1) {
          // This is relevant for determining whether this function can be cloned when it is called with a primitive
          // This prevents the cloning. This way we don't accidentally clone cloned functions and in general it serves
          // as an artificial way to reduce the cloning surface a little bit.
          funcStack[funcStack.length - 1].$p.containsFunctions = true;
        }

        if (node.id) {
          const meta = globallyUniqueNamingRegistry.get(node.id.name);
          ASSERT(meta, 'there should be a meta for this name', node.id.name);
          meta.isImplicitGlobal = false;
        }

        const bodyOffset = node.$p.bodyOffset;
        ASSERT(bodyOffset >= 0, 'normalized functions must have a debugger statement to signify the end of the header');
        const body = node.body.body;
        if (body.length - bodyOffset === 1) {
          vlog('This function has one statement. Trying to see if we can inline calls to it.');
          const stmt = body[bodyOffset];
          if (stmt.type === 'ReturnStatement') {
            // All usages can be inlined with the arg, provided the arg is reachable from the call sites (relevant for closures)
            if (AST.isPrimitive(body[bodyOffset].argument)) {
              node.$p.inlineMe = 'single return with primitive';
            }
          } else if (stmt.type === 'ExpressionStatement') {
            // Considering this must be a normalized expression statement it should
            // be no problem to inline it into any call site. Like, it should not lead
            // to more complex situations? Maybe bindings now get referenced multiple times...?
            node.$p.inlineMe = 'single expression statement';
          }
        } else if (body.length - bodyOffset === 2) {
          vlog('This function has two statements. Trying to see if we can inline calls to it.');
          const one = body[bodyOffset];
          const two = body[bodyOffset + 1];
          if (one.type === 'VariableDeclaration' && two.type === 'ReturnStatement') {
            vlog('Has var and return. Checking if it just returns the fresh var.');
            const decl = one;
            const decr = decl.declarations[0];
            const ret = two;
            if (ret.argument?.type === 'Identifier' && decr.id.name === ret.argument.name) {
              // This is a function whose body is a variable declaration that is then returned and the func is only called.
              // `var x = unkonwn; return x`, where unknown is any normalized expression (idc)

              ASSERT(decr.init, 'normalized var decls have an init, right');
              if (AST.isPrimitive(decr.init)) {
                vlog('- Yes. Basically returning a primitive');
                // I think this shouldn't be the case as I expect these to be normalized away
                node.$p.inlineMe = 'double with primitive';
              } else if (decr.init.type === 'ArrayExpression') {
                vlog('- Yes. Basically returning an array literal');
                // `function f() { const x = [...]; return x; }`
                // Let's start with arrays that only contain primitives
                if (decr.init.elements.every((enode) => AST.isPrimitive(enode))) {
                  vlog('And it does contain only primitives');
                  node.$p.inlineMe = 'double with array with primitives';
                } else {
                  vlog('No, it contained other things');
                }
              } else if (decr.init.type === 'Identifier' && decr.init.name !== 'arguments') {
                // (Cannot easily mimic arguments). The `this` is not an identifier.
                node.$p.inlineMe = 'double with identifier';
              } else {
                vlog('No, skipping this one.');
              }
            }
          }
        }

        break;
      }

      case 'Identifier:before': {
        const currentScope = funcStack[funcStack.length - 1];
        const name = node.name;
        vlog('Ident:', name);
        ASSERT(name, 'idents must have valid non-empty names...', node);
        const kind = getIdentUsageKind(parentNode, parentProp);
        vlog('- Ident kind:', kind);

        ASSERT(kind !== 'readwrite', 'I think readwrite is compound assignment and we eliminated those? prove me wrong', node);

        vlog(
          '- Parent: `' + parentNode.type + '.' + parentProp + '`',
          parentNode.type === 'MemberExpression' && node.computed ? 'computed' : 'regular',
        );
        if (kind === 'read' && name === 'arguments') {
          // Make a distinction between arguments.length, arguments[], and maybe the slice paradigm?
          // For now we only care whether the function might detect the call arg count. Without arguemnts, it cannot.
          if (thisStack.length) {
            // Do not count cases like where the arguments have no observable side effect or our own alias
            // This makes sure the `arguments` reference does not stick around unnecessarily as an artifact
            if (
              parentNode.type === 'MemberExpression' &&
              parentProp === 'object' &&
              !parentNode.computed &&
              parentNode.property.name === 'length'
            ) {
              // This is an `arguments.length` access. Easier to work around than plain unbound `arguments` access.
              vlog('Marking function as accessing `arguments.length`');
              thisStack[thisStack.length - 1].$p.readsArgumentsLen = true;
            } else {
              if (parentNode.type === 'ExpressionStatement') {
                vlog('Ignoring `arguments` as an expression statement');
                //} else if (
                //  parentNode.type === 'VariableDeclaration' &&
                //  parentNode.declarations[0].id.name.startsWith(ARGUMENTS_ALIAS_PREFIX)
                //) {
                //  vlog('Ignoring our own arguments alias');
              } else {
                // This disables a few tricks because of observable side effects
                vlog('Marking function as accessing `arguments` in "any" way');
                thisStack[thisStack.length - 1].$p.readsArgumentsAny = true;
              }
            }
          } else {
            // TODO: do we want to act on this?
            vlog('Attempting to access `arguments` in global space? Probably crashes at runtime.');
          }
        } else if ((kind === 'read' || kind === 'write') && /^\$\$\d+$/.test(name)) {
          const paramNode = AST.param(name, false);
          vlog('This is a special param "keyword" by Preval. Replacing ident with param node;', paramNode);
          if (parentIndex < 0) parentNode[parentProp] = paramNode;
          else parentNode[parentProp][parentIndex] = paramNode;
        } else if (kind !== 'none' && kind !== 'label') {
          ASSERT(kind === 'read' || kind === 'write', 'consider what to do if this check fails', kind, node);
          vlog('- Binding referenced in $p.pid:', currentScope.$p.pid);
          let meta = registerGlobalIdent(fdata, name, name, { isExport: false, isImplicitGlobal: 'unknown', isBuiltin: false });
          ASSERT(kind !== 'readwrite', 'compound assignments and update expressions should be eliminated by normalization', node);

          // This is normalized code so there must be a block parent for any read ref
          let blockNode;
          let blockIndex;
          if (kind === 'read' || kind === 'write') {
            // Start with the parent, not grandParent (!)
            let pathIndex = path.nodes.length - 1;
            do {
              blockNode = path.nodes[pathIndex];
              vlog('  - block step;', blockNode.type, blockNode.$p.pid);
              if (blockNode.type === 'BlockStatement' || blockNode.type === 'Program') {
                blockIndex = path.indexes[pathIndex + 1];
                ASSERT(
                  blockIndex >= 0,
                  'block index should be set right',
                  path.nodes.map((n) => n.type),
                  path.indexes,
                );
                break;
              }
              --pathIndex;
            } while (true);
          }

          if (kind === 'read') {
            const grandNode = path.nodes[path.nodes.length - 3];
            const grandProp = path.props[path.props.length - 2];
            const grandIndex = path.indexes[path.indexes.length - 2];

            const blockBody = blockNode.body;
            meta.reads.push(
              createReadRef({
                parentNode,
                parentProp,
                parentIndex,
                grandNode,
                grandProp,
                grandIndex,
                blockBody,
                blockIndex,
                pfuncNode: funcStack[funcStack.length - 1],
                node,
                rwCounter: ++readWriteCounter,
                scope: currentScope.$p.pid,
                blockChain: blockIds.join(','),
                innerLoop: blockIds.filter((n) => n < 0).pop() ?? 0,
              }),
            );
          }
          if (kind === 'write') {
            const blockBody = blockNode.body;
            vlog('- Parent block:', blockNode.type, blockNode.$p.pid);

            if (parentNode.type === 'VariableDeclarator') {
              ASSERT(parentProp === 'id', 'the read check above should cover the prop=init case');
              const declParent = path.nodes[path.nodes.length - 4];
              const declProp = path.props[path.props.length - 3];
              const declIndex = path.indexes[path.indexes.length - 3];
              vlog('- Adding decl write');

              meta.writes.unshift(
                createWriteRef({
                  parentNode,
                  parentProp,
                  parentIndex,
                  blockBody,
                  blockIndex,
                  pfuncNode: funcStack[funcStack.length - 1],
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
              vlog('- Binding kind is', grandParentNode.kind);

              if (grandParentNode.kind === 'const') {
                vlog('- Setting constValueRef to a', parentNode.init.type);
                meta.constValueRef = {
                  node: parentNode.init,
                  containerNode: declParent,
                  containerProp: declProp,
                  containerIndex: declIndex,
                };
              }
            } else if (parentNode.type === 'AssignmentExpression') {
              ASSERT(parentProp === 'left', 'the read check above should cover the prop=right case');
              ASSERT(
                path.nodes[path.nodes.length - 3].type === 'ExpressionStatement',
                'assignments must be normalized to statements',
                path.nodes[path.nodes.length - 3],
              );
              const assignParent = path.nodes[path.nodes.length - 4];
              const assignProp = path.props[path.props.length - 3];
              const assignIndex = path.indexes[path.indexes.length - 3];
              vlog('Adding assign write');
              meta.writes.push(
                createWriteRef({
                  parentNode,
                  parentProp,
                  parentIndex,
                  blockBody,
                  blockIndex,
                  pfuncNode: funcStack[funcStack.length - 1],
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
            } else if (parentProp === 'params' && parentNode.type === 'FunctionExpression') {
              ASSERT(false, 'actual params are special nodes now and original params are local bindings so this should not trigger');
            } else {
              // for-x lhs, param, etc
              vlog('Adding "other" write');
              meta.writes.push(
                createWriteRef({
                  parentNode,
                  parentProp,
                  parentIndex,
                  blockBody,
                  blockIndex,
                  pfuncNode: funcStack[funcStack.length - 1],
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
            vlog('Marking `' + name + '` as being an export');
            meta.isExport = true;
          }
        } else {
          vlog(RED + '- skipping; not a binding' + RESET);
        }

        break;
      }

      case 'IfStatement:before': {
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        break;
      }

      case 'ImportDeclaration:before': {
        // Note: after normalization there should only be two kinds of imports;
        // - named imports, one imported symbol per decl, possibly with alias
        // - anonymous default import
        // TODO: and star import but we haven't bothered with that one yet...

        ASSERT(node.source && typeof node.source.value === 'string', 'fixme if else', node);
        const source = node.source.value;
        vlog('Importing symbols from "' + source + '"');
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
        const resolvedSource = resolve(source, fdata.fname);

        ASSERT(node.specifiers, 'fixme if different', node);

        // This will trigger the file to be processed. It'll be added to the list if new, it will be bumped to the
        // top of the queue if not finished processing yet. It will resolve before this file.
        imports.set('default', resolvedSource);

        break;
      }

      case 'LabeledStatement:before': {
        vlog('Label:', node.label.name);
        registerGlobalLabel(fdata, node.label.name, node.label.name, node);
        break;
      }

      case 'Param:before': {
        ASSERT(
          parentProp === 'params' || parentProp === 'init',
          'this node should only be used as a placeholder for params or when binding the placeholder to the actual name',
        );
        ASSERT(!node.$p.ref, 'each param should be referenced at most once');
        if (parentProp === 'init') {
          vlog('Maps to `' + parentNode.id.name + '`');
          const funcNode = funcStack[funcStack.length - 1];
          const declParam = funcNode.params[node.index];
          ASSERT(declParam.name === node.name, 'the usage of a Param should map back to the decl', node, declParam);
          declParam.$p.ref = { parentNode, parentProp, parentIndex, node, name: parentNode.id.name };
        } else {
          vlog('This is the decl');
        }
        break;
      }

      case 'ReturnStatement:before': {
        const funcNode = funcStack[funcStack.length - 1];
        ASSERT(funcNode?.body?.body, 'eh, func node?', funcStack.length, funcNode);
        vlog('Parent func:', funcNode.type, ', last node same?', funcNode.body.body[funcNode.body.body.length - 1] === node);
        if (funcNode.type === 'FunctionExpression') {
          const lastNode = funcNode.body.body[funcNode.body.body.length - 1];
          if (lastNode === node) {
            vlog('Found explicit return but it was the last statement of the function');
          } else if (lastNode?.type === 'IfStatement') {
            if (
              lastNode.consequent.body[lastNode.consequent.body.length - 1] === node ||
              lastNode.alternate?.body[lastNode.alternate.body.length - 1] === node
            ) {
              vlog('Return node is last element of if or else branch that is at the end of a function. Not an early return.');
            } else {
              vlog('Last element is ifelse and but neither branch ended with this node, this function is returning early');
              funcNode.$p.earlyReturn = true;
            }
          } else {
            vlog('Last node was not an ifelse and not this return so marking this function as returning early');
            funcNode.$p.earlyReturn = true;
          }
        }

        break;
      }

      case 'ThisExpression:after': {
        if (thisStack.length) {
          vlog('Marking func as having `this` access');
          thisStack[thisStack.length - 1].$p.thisAccess = true;
        }
        break;
      }

      case 'VariableDeclaration:before': {
        vlog(node.kind, node.declarations[0]?.id?.name, '=', node.declarations[0]?.init?.type);
        break;
      }
      case 'VariableDeclaration:after': {
        vlog('- Id: `' + node.declarations[0].id.name + '`');
        ASSERT(node.declarations.length === 1, 'all decls should be normalized to one binding');
        ASSERT(node.declarations[0].id.type === 'Identifier', 'all patterns should be normalized away');
        const meta = globallyUniqueNamingRegistry.get(node.declarations[0].id.name);
        meta.isImplicitGlobal = false;
        if (node.kind === 'const') {
          vlog('- marking', meta.uniqueName, 'as constant, ref set to', node.declarations[0].init.type);
          ASSERT(meta);
          meta.isConstant = true;
          meta.constValueRef = {
            node: node.declarations[0].init,
            containerNode: node,
            containerProp: 'declarations',
            containerIndex: 0,
          };
        }
        break;
      }

      case 'WhileStatement:before': {
        funcStack[funcStack.length - 1].$p.hasBranch = true;
        break;
      }
    }

    vgroupEnd();
  }

  if (VERBOSE_TRACING) {
    vlog();
    vlog('Imports from:');
    vlog(
      [...imports.values()]
        .sort()
        .map((s) => '- "' + s + '"')
        .join('\n'),
    );
    vlog(
      '\ngloballyUniqueNamingRegistry (sans builtins):\n',
      globallyUniqueNamingRegistry.size > 50
        ? '<too many>'
        : globallyUniqueNamingRegistry.size === globals.size
        ? '<none>'
        : [...globallyUniqueNamingRegistry.keys()].filter((name) => !globals.has(name)).join(', '),
    );

    vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  }

  log('End of phase 1');
  groupEnd();
}
