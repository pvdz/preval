import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
import {
  VERBOSE_TRACING,
  THIS_ALIAS_BASE_NAME,
  ARGUMENTS_ALIAS_BASE_NAME,
  ARGLENGTH_ALIAS_BASE_NAME,
  IMPLICIT_GLOBAL_PREFIX,
  RED,
  BLUE,
  RESET,
  DIM,
} from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, after } from '../utils.mjs';
import { $p } from '../$p.mjs';
import globals from '../globals.mjs';
import {
  createFreshLabel,
  getIdentUsageKind,
  registerGlobalIdent,
  findUniqueNameForBindingIdent,
  preprocessScopeNode,
  createFreshVar,
} from '../bindings.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes (though labels are renamed).
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function prepareNormalization(fdata, resolve, req, oncePass, options = {}) {
  const ast = fdata.tenkoOutput.ast;
  const fname = fdata.fname;

  const funcStack = [];
  const lexScopeStack = [];
  const labelStack = []; // No need to validate this or track func boundaries. That's what the parser should have done already.
  let lexScopeCounter = 0;
  const funcScopeStack = [];
  const thisStack = [];
  const fenceStack = []; // switch, loops. To determine where unqualified break/continue jumps to.
  const breakableStack = []; // for, while, do, and also switch. Not labels, no function-nulls.

  fdata.globalNameCounter = 0;
  const globallyUniqueNamingRegistry = new Map();
  fdata.globallyUniqueNamingRegistry = globallyUniqueNamingRegistry;
  const identNameSuffixOffset = new Map(); // <name, int>
  fdata.identNameSuffixOffset = identNameSuffixOffset;
  globals.forEach((_, name) => {
    ASSERT(name);
    registerGlobalIdent(fdata, name, name, { isExport: false, isImplicitGlobal: false, isBuiltin: true });
  });

  const globallyUniqueLabelRegistry = new Map();
  fdata.globallyUniqueLabelRegistry = globallyUniqueLabelRegistry;
  const labelNameSuffixOffset = new Map(); // <name, int>
  fdata.labelNameSuffixOffset = labelNameSuffixOffset;

  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  fdata.imports = imports;
  const exports = new Map();
  fdata.exports = exports;

  group(
    '\n\n\n##################################\n## prepare normalization  ::  ' + fdata.fname + '\n##################################\n\n\n',
  );

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    if (beforeWalk) {
      node.$p = $p();
    }

    vgroup(
      BLUE + nodeType + ':' + (beforeWalk ? 'before' : 'after'),
      DIM + node.$p.pid + RESET,
      // To debug lexical scopes:
      //' '.repeat(50), lexScopeStack.map(node => node.type+'<'+node.$uid+'>').join(',')
    );

    const key = nodeType + ':' + (beforeWalk ? 'before' : 'after');

    if (beforeWalk && node.$scope) {
      lexScopeStack.push(node);
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.push(node);
      }
      preprocessScopeNode(
        node,
        path.nodes[path.nodes.length - 2],
        fdata,
        funcScopeStack[funcScopeStack.length - 1],
        ++lexScopeCounter,
        oncePass,
        options.unrollTrueLimit
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
        const parentNode = path.nodes[path.nodes.length - 2];
        if (['FunctionExpression', 'ArrowFunctionExpression'].includes(node.type) && parentNode.type === 'ExpressionStatement') {
          vlog('Do not traverse. I dont care whats inside.');
          vgroupEnd();
          return true;
        }
        // Don't use Param nodes in the first pass because there may still be patterns and defaults
        if (!oncePass) {
          vlog('Converting', node.params.length, 'param identifier/rest nodes to custom Param nodes');
          node.params.forEach((pnode, pi) => {
            ASSERT(
              pnode.type === 'Identifier' || (pnode.type === 'RestElement' && pnode.argument.type === 'Identifier'),
              'params should be normalized now',
            );
            ASSERT(typeof (pnode.type === 'RestElement' ? pnode.argument.name : pnode.name) === 'string', 'name please?', pnode);
            node.params[pi] = AST.param('$$' + pi, pnode.type === 'RestElement');
          });
        }
        vlog('Name:', node.id?.name ?? '<anon>');
        funcStack.push(node);
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          node.$p.thisAccess = false;
          node.$p.readsArgumentsLen = false;
          node.$p.readsArgumentsAny = false;
          thisStack.push(node);
        }

        break;
      }
      case 'FunctionDeclaration:after':
      case 'FunctionExpression:after':
      case 'ArrowFunctionExpression:after': {
        vlog('Name:', node.id?.name ?? '<anon>');
        funcStack.pop();
        if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
          // Check for this/arguments aliases. The order in which they may appear is fixed but optional
          let aliasIndex = 0; // 0=this,1=arguments,2=arguments.length
          const body = node.body.body;
          if (
            body.length > 0 &&
            body[aliasIndex].type === 'VariableDeclaration' &&
            body[aliasIndex].declarations.length === 1 &&
            body[aliasIndex].declarations[0].id.type === 'Identifier' &&
            body[aliasIndex].declarations[0].init
          ) {
            const decr = body[aliasIndex].declarations[0];
            // We are looking for an alias of one of three things; `this`, `arguments`, and `arguments.length`

            if (decr.init.type === 'ThisExpression' && decr.id.name.startsWith(THIS_ALIAS_BASE_NAME)) {
              // This is the `this` alias
              vlog('The `this` access is already aliased to `' + decr.id.name + '`');
              node.$p.thisAlias = decr.id.name;
              body[aliasIndex].$p.isForAlias = 1;
              ++aliasIndex;
              decr.init.$p.isForAlias = true;
            }
          }
          if (
            body.length > aliasIndex &&
            body[aliasIndex].type === 'VariableDeclaration' &&
            body[aliasIndex].declarations.length === 1 &&
            body[aliasIndex].declarations[0].id.type === 'Identifier' &&
            body[aliasIndex].declarations[0].init
          ) {
            const decr = body[aliasIndex].declarations[0];
            // We are looking for an alias of one of three things; `this`, `arguments`, and `arguments.length`

            if (decr.init.type === 'Identifier' && decr.init.name === 'arguments' && decr.id.name.startsWith(ARGUMENTS_ALIAS_BASE_NAME)) {
              vlog('The `arguments` access is already aliased to `' + decr.id.name + '`');
              node.$p.argsAnyAlias = decr.id.name;
              body[aliasIndex].$p.isForAlias = 2;
              ++aliasIndex;
              decr.init.$p.isForAlias = true;
            }
          }
          if (
            body.length > aliasIndex &&
            body[aliasIndex].type === 'VariableDeclaration' &&
            body[aliasIndex].declarations.length === 1 &&
            body[aliasIndex].declarations[0].id.type === 'Identifier' &&
            body[aliasIndex].declarations[0].init
          ) {
            const decr = body[aliasIndex].declarations[0];
            // We are looking for an alias of one of three things; `this`, `arguments`, and `arguments.length`
            if (
              decr.init.type === 'MemberExpression' &&
              decr.init.object.type === 'Identifier' &&
              decr.init.object.name === 'arguments' &&
              decr.init.property.type === 'Identifier' &&
              decr.init.property.name === 'length' &&
              !decr.init.computed &&
              decr.id.name.startsWith(ARGLENGTH_ALIAS_BASE_NAME)
            ) {
              vlog('The `arguments.length` access is already aliased to `' + decr.id.name + '`');
              node.$p.argsLenAlias = decr.id.name;
              body[aliasIndex].$p.isForAlias = 3;
              ++aliasIndex;
              decr.init.object.$p.isForAlias = true;
            }
          }

          thisStack.pop();
        }

        if (node.type === 'FunctionDeclaration' && node.id) {
          const parentIndex = path.indexes[path.indexes.length - 1];
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const grandparent = path.nodes[path.nodes.length - 3];

          // If, in the normalization phase, all elements of the hoistedVars are "already hoisted" then do nothing there.
          const hoistRoot =
            parentNode.type === 'Program'
              ? parentNode
              : parentNode.type === 'ExportNamedDeclaration' ||
                (parentNode.type === 'ExportDefaultDeclaration' && node.id) ||
                ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(grandparent.type)
              ? grandparent
              : parentNode;
          vlog('The hoist root is a:', hoistRoot.type, hoistRoot.id?.name);
          const hoistedVars = hoistRoot.$p.hoistedVars;

          vlog('It _is_ a function decl. How should it be hoisted?');

          // Note: special case for Switch body will be picked up explicitly by the switch transform
          if (parentNode.type === 'Program') {
            vlog('- Hoisting toplevel global function');
            vlog('- Scheduling func decl `' + node?.id.name + '` to be hoisted in global');
            ASSERT(parentIndex >= 0, 'node should be in a body');
            ASSERT(parentProp === 'body', 'children of Program are in body', parentProp);
            ASSERT(parentNode.body[parentIndex] === node, 'path should be correct');
            hoistedVars.push(['program', node, parentNode, parentProp, parentIndex]);
          } else if (parentNode.type === 'ExportNamedDeclaration' || (parentNode.type === 'ExportDefaultDeclaration' && node.id)) {
            vlog('- Hoisting entire export');
            vlog('- Scheduling func decl `' + node.id.name + '` to be hoisted in global');
            ASSERT(parentProp === 'declaration');
            ASSERT(parentIndex === -1, 'parent is not an array');
            ASSERT(parentNode.declaration === node, 'path should be correct');
            ASSERT(grandparent.type === 'Program', 'exports are only children of the root');
            const exportIndex = path.indexes[path.indexes.length - 2]; // index of parentNode in body (=ast.body)
            ASSERT(exportIndex >= 0);
            hoistedVars.push(['export', node, parentNode, parentProp, parentIndex, exportIndex]);
          } else if (['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(grandparent.type)) {
            // Func decl nested in the toplevel of another function
            vlog('- Hoisting function nested directly in another function');
            vlog('- Scheduling func decl `' + node?.id.name + '` to be hoisted in parent function');
            ASSERT(parentProp === 'body', 'Func param defaults would not yield func declarations', parentProp);
            ASSERT(parentIndex >= 0);
            ASSERT(parentNode.body[parentIndex] === node, 'path should be correct', parentProp);
            // Track it so the normalization can drain this arr and immediately fix the hoisting, once.
            hoistedVars.push(['func', node, parentNode, parentProp, parentIndex]);
          } else if (parentNode.type === 'BlockStatement') {
            vlog('This is a function decl nested in a non-func-body block');
            vlog('- Scheduling func decl `' + node.id.name + '` to be hoisted in block');
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

      case 'Property:before': {
        // Must eliminate property shorthands because unique naming may need to change one while keeping the other
        if (node.shorthand) {
          // That's all :) The node already has a distinct key and value property with the same identifier.

          rule('Property shorthand must be regular property');
          example('{x}', '{x : x}');
          before(node);

          node.shorthand = false; // Inline should be fine, right? Even if this node ends up being duplicated...?

          after(node);
          // I don't think we need to mark this as changed, at least not for the sake of re-walking it.
        }
        break;
      }

      case 'Identifier:before': {
        vlog('Ident:', node.name);
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const parentIndex = path.indexes[path.indexes.length - 1];
        const kind = getIdentUsageKind(parentNode, parentProp);
        vlog('- Ident kind:', kind);

        vlog('- Parent node: `' + parentNode.type + '`, prop: `' + parentProp + '`');
        if (kind === 'read' && node.name === 'arguments') {
          // Note: this could be a property write, but it's not a binding mutation.
          // Ignore occurrences in global space (or in global nested arrows)
          if (thisStack.length && !node.$p.isForAlias) {
            const thisFunc = thisStack[thisStack.length - 1];
            // Do not count cases like where the arguments have no observable side effect or our own alias
            // This makes sure the `arguments` reference does not stick around unnecessarily as an artifact
            if (
              parentNode.type === 'MemberExpression' &&
              parentNode.object === node &&
              parentNode.property.type === 'Identifier' &&
              parentNode.property.name === 'length' &&
              !parentNode.computed
            ) {
              // This is an `arguments.length` access. Easier to work around than plain unbound `arguments` access.
              vlog('- Marking function as accessing `arguments.length`');
              thisFunc.$p.readsArgumentsLen = true;
            } else {
              if (parentNode.type === 'ExpressionStatement') {
                vlog('Ignoring `arguments` as an expression statement');
              } else {
                // This disables a few tricks because of observable side effects
                vlog('- Marking function as accessing `arguments` in "any" way');
                thisFunc.$p.readsArgumentsAny = true;
              }
            }
          }
        } else if (!oncePass && kind === 'read' && node.name.startsWith('$$')) {
          // Note: this could be a property write, but it's not a binding mutation.
          // Ignore: Preval special parameter name
          vlog('This is a special param "keyword" by Preval. Ignoring.');
        } else if (kind !== 'none' && kind !== 'label') {
          ASSERT(!node.$p.uniqueName, 'dont do this twice');
          const uniqueName = findUniqueNameForBindingIdent(
            node,
            parentNode.type === 'FunctionDeclaration' && parentProp === 'id',
            fdata,
            lexScopeStack,
          );
          vlog('- initial name:', node.name, ', unique name:', uniqueName);
          node.$p.uniqueName = uniqueName;
          node.name = uniqueName;

          // TODO: is this relevant for normalization? it does not use these read/write refs
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
            vlog('Marking `' + uniqueName + '` as being an export');
            meta.isExport = true;
          }
        } else {
          vlog(RED + '- skipping; not a binding' + RESET);
        }

        break;
      }

      case 'VariableDeclaration:after': {
        if (node.kind === 'var') {
          const func = funcStack[funcStack.length - 1];
          const parentNode = path.nodes[path.nodes.length - 2];
          const parentProp = path.props[path.props.length - 1];
          const parentIndex = path.indexes[path.indexes.length - 1];

          vlog('parent =', parentNode.type, 'prop=', parentProp, 'index=', parentIndex);

          if (parentNode.type === 'ExportNamedDeclaration') {
            vlog('- is an export-child');
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
            vlog('- is a for-child');
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
            vlog('- is a block-var');
            // { var x; }
            ASSERT(parentNode[parentProp][parentIndex] === node);
            ASSERT(node && parentIndex >= 0);
            func.$p.hoistedVars.push(['block', node, parentNode, parentProp, parentIndex]);
          } else {
            // var x;
            vlog('- Regular hoistable var');
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
          const parentNode = path.nodes[path.nodes.length - 2];
          if (parentNode.type !== 'ExpressionStatement') {
            const thisFunc = thisStack[thisStack.length - 1];
            vlog('Marking func ( pid =', thisFunc.$p.pid, ') as having `this` access');
            thisFunc.$p.thisAccess = true;
          }
        }
        break;
      }

      case 'BreakStatement:before':
      case 'ContinueStatement:before': {
        // Find labeled break or continue statements and make sure that they keep pointing to the "same" label
        // Find the first label ancestor where the original name matches the label of this node
        // Note: continue/break state is verified by the parser so we should be able to assume this continue/break has a valid target

        // A label is redundant when;
        // - continue: it targets the inner-most loop
        // - break: it targets the inner-most loop or switch

        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];

        parentNode.$p.completesAbrupt = true;
        if (parentNode.type === 'IfStatement') {
          if (parentProp === 'consequent') parentNode.$p.completesAbruptConsequent = true;
          else if (parentProp === 'alternate') parentNode.$p.completesAbruptAlternate = true;
          else ASSERT(false);
        }

        if (node.type === 'BreakStatement' && !node.label && breakableStack.length) {
          const parentIndex = path.indexes[path.indexes.length - 1];
          breakableStack[breakableStack.length - 1].$p.regularBreaks.push({ parentNode, parentProp, parentIndex });
        }

        if (node.label) {
          const name = node.label.name;
          vlog('Label:', name, ', now searching for definition... Label stack depth:', labelStack.length);
          let i = labelStack.length;
          while (--i >= 0) {
            const labelNode = labelStack[i];
            vlog('->', labelNode.$p.originalLabelName);
            if (labelNode.$p.originalLabelName === name) {
              const newName = labelNode.label.name;
              if (newName !== name) {
                vlog('- Found it. Label was renamed to', newName);
                node.label.name = newName;
              } else {
                vlog('- Found it. Label not renamed');
              }

              // Note: since parse enforces validity of breaks and continues and since those can't cross functions, we don't need to worry about the null case here
              let n = breakableStack.length - 1;
              let innerMostBranchNode = breakableStack[n];
              if (node.type === 'ContinueStatement') {
                while (innerMostBranchNode?.type === 'SwitchStatement') {
                  innerMostBranchNode = breakableStack[n];
                  --n;
                }
              }
              ASSERT(
                node.type === 'BreakStatement' || innerMostBranchNode.type !== 'SwitchStatement',
                'continue cannot have switch as target here',
              );

              if (node.type === 'BreakStatement' && !innerMostBranchNode) {
                vlog('The label is necessary because it does not break a loop or switch', innerMostBranchNode?.type, breakableStack.length);
              } else if (labelNode.body === innerMostBranchNode) {
                vlog('The label was redundant because', labelNode.body.type, 'is', innerMostBranchNode.type);
                node.$p.redundantLabel = true;
              } else {
                vlog('The label was useful because', labelNode.body.type, 'is not', innerMostBranchNode.type);
                node.$p.redundantLabel = false;
              }
              break;
            }
          }

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
        } else {
          vlog('No label');
          let index = fenceStack.length - 1;
          let fenceNode = fenceStack[index];
          if (node.type === 'ContinueStatement') {
            while (fenceNode.type === 'SwitchStatement') {
              --index;
              fenceNode = fenceStack[index];
            }
          }
          fenceNode.$p.unqualifiedLabelUsages.push(node);
          node.$p.redundantLabel = false;
        }

        for (let i = breakableStack.length - 1; i >= 0; --i) {
          const breakableNode = breakableStack[i];
          if (key === 'ContinueStatement:before') {
            if (breakableNode.type === 'SwitchStatement') continue;
            breakableNode.$p.doesContinue = true;
            vlog('Setting doesContinue', breakableNode.$p.pid);
          } else {
            breakableNode.$p.doesBreak = true;
            vlog('Setting doesBreak on', breakableNode.$p.pid);
          }
          break;
        }
        break;
      }

      case 'LabeledStatement:before': {
        vlog('Label:', node.label.name);
        labelStack.push(node);
        node.$p.originalLabelName = node.label.name;
        const newLabel = createFreshLabel(node.label.name, fdata);
        if (node.label.name !== newLabel.name) {
          vlog('- Unique label name:', newLabel.name);
          node.label = newLabel;
        } else {
          vlog('- Label is now registered and unique');
        }
        break;
      }
      case 'LabeledStatement:after': {
        labelStack.pop();
        break;
      }

      case 'ForStatement:before':
      case 'ForInStatement:before':
      case 'ForOfStatement:before':
      case 'WhileStatement:before':
      case 'DoWhileStatement:before':
      case 'SwitchStatement:before': {
        node.$p.unqualifiedLabelUsages = [];
        node.$p.regularBreaks = [];
        if (node.type === 'SwitchStatement') node.$p.hasMiddleDefaultCase = false;
        fenceStack.push(node);
        breakableStack.push(node);
        break;
      }
      case 'ForStatement:after':
      case 'ForInStatement:after':
      case 'ForOfStatement:after':
      case 'WhileStatement:after':
      case 'DoWhileStatement:after':
      case 'SwitchStatement:after': {
        fenceStack.pop();
        breakableStack.pop();
        break;
      }

      case 'SwitchCase:before': {
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentIndex = path.indexes[path.indexes.length - 1];

        if (node.test === null && parentIndex !== parentNode.cases.length - 1) {
          parentNode.$p.hasMiddleDefaultCase = true;
        }

        break;
      }

      case 'ReturnStatement':
      case 'ThrowStatement': {
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];

        parentNode.$p.completesAbrupt = true;
        if (parentNode.type === 'IfStatement') {
          if (parentProp === 'consequent') parentNode.$p.completesAbruptConsequent = true;
          else if (parentProp === 'alternate') parentNode.$p.completesAbruptAlternate = true;
          else ASSERT(false);
        }

        break;
      }
    }

    if (!beforeWalk && node.$scope) {
      lexScopeStack.pop();
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.pop();
      }
    }

    vgroupEnd();
  }

  // If the next global sweep changes anything, consider all caches busted and re-run this prepare from scratch.
  // That should be a one time cost at the start as afterwards all names must be unique.
  // Future me: Sorry. This is a bit of a hack but we assume normalize_once does not use any of this stuff and so
  //            leaving it in a dirty state was a heckuvalot easier than the alternative. Does the foot hurt much?
  let globalsShuffled = 0;
  vlog(
    '\n\nAfter walking, find all aliased implicit globals and give them back their original name, renaming any explicits with the same name',
  );
  new Map(globallyUniqueNamingRegistry).forEach((meta, name) => {
    if (!meta.isImplicitGlobal) return;
    if (!name.startsWith(IMPLICIT_GLOBAL_PREFIX)) return;
    vlog('- Reclaiming `' + name + '`, to `' + meta.originalName + '`');

    if (globallyUniqueNamingRegistry.has(meta.originalName)) {
      const meta2 = globallyUniqueNamingRegistry.get(meta.originalName);
      if (meta2.isImplicitGlobal) {
        // This happens for multiple globals. The non-first one will go into this branch. Just rename them back.
        vlog('  Original name was already recorded as implicit global. Renaming the ident with pid', meta.reads?.[0]?.node?.$p.pid);
        meta.reads.forEach((node) => (node.name = meta.originalName));
      } else if (meta2) {
        const newName = createFreshVar(meta.originalName, fdata);
        vlog('  This name was also bound explicitly. Renaming existing occurrences to `' + newName + '`');
        meta2.reads.forEach((node) => (node.name = newName));
        meta2.writes.forEach((node) => (node.name = newName));
        vlog('  Renaming the global to its original name `' + meta.originalName + '`');
        meta.reads.forEach((node) => (node.name = meta.originalName));
        meta.writes.forEach((node) => (node.name = meta.originalName));
        ++globalsShuffled;
        meta2.isImplicitGlobal = true; // Make sure other globals just get renamed (in previous branch)
        // Poison these refs to prevent a footgun situation
        meta.reads = null;
        meta.writes = null;
        meta2.reads = null;
        meta2.writes = null;
      } else {
        ASSERT(
          false,
          'I dont think this should happen. Either the global existed as an explicit too and got a temporary prefix, or it didnt exist yet and it would get registered immediately',
        );
      }
    } else {
      // A little annoying but hopefully an artificial edge case; the input code contained an implicit global that started with
      // our custom prefix that globals temporarily get assigned when their name is also explicitly bound.
      vlog('  Original name was not known to the registry. Was this the prefix exception?');
      ASSERT(meta.originalName.startsWith(IMPLICIT_GLOBAL_PREFIX), 'was this a binding that started with our custom prefix?', meta);
      const newName = createFreshVar(meta.originalName, fdata);
      ASSERT(newName === meta.originalName, 'should be available');
      meta.reads.forEach((node) => (node.name = newName));
      meta.writes.forEach((node) => (node.name = newName));
      vlog('  Swapping meta in the registry');
      globallyUniqueNamingRegistry.set(newName, meta);
      globallyUniqueNamingRegistry.delete(name);
      meta.uniqueName = meta.originalName;
    }
  });

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
      '\ngloballyUniqueNamingRegistry (sans builtins):\n' +
      (
        (globallyUniqueNamingRegistry.size - globals.size) > 50
        ? '<too many>'
        : globallyUniqueNamingRegistry.size === globals.size
        ? '<none>'
        : [...globallyUniqueNamingRegistry.keys()].filter((name) => !globals.has(name)).join(', ')
      ),
    );
    vlog(
      '\ngloballyUniqueLabelRegistry:\n',
      globallyUniqueLabelRegistry.size > 50
        ? '<too many>'
        : globallyUniqueLabelRegistry.size === 0
        ? '<none>'
        : [...globallyUniqueLabelRegistry.keys()].join(', '),
    );

    vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
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
