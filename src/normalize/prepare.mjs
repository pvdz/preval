import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
import {
  VERBOSE_TRACING,
  RED,
  BLUE,
  RESET,
  DIM,
  setVerboseTracing,
} from '../constants.mjs';
import {
  THIS_ALIAS_BASE_NAME,
  ARGUMENTS_ALIAS_BASE_NAME,
  ARGLENGTH_ALIAS_BASE_NAME,
  IMPLICIT_GLOBAL_PREFIX, SYMBOL_THROW_TDZ_ERROR,
} from '../symbols_preval.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, after, source, assertNoDupeNodes } from '../utils.mjs';
import {$p, resetUid} from '../$p.mjs';
import globals from '../globals.mjs';
import {
  getIdentUsageKind,
  registerGlobalIdent,
  findUniqueNameForBindingIdent,
  preprocessScopeNode,
  createFreshVar,
} from '../bindings.mjs';
import { addLabelReference, createUniqueGlobalLabel, registerGlobalLabel } from '../labels.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes (though labels are renamed).
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function prepareNormalization(fdata, resolve, req, oncePass, options) {
  ASSERT(arguments.length > prepareNormalization.length - 1, 'invalid prepareNormalization arg count');
  const ast = fdata.tenkoOutput.ast;
  const fname = fdata.fname;

  {
    const {skipUidReset, unrollLimit, ...rest} = options;
    ASSERT(Object.keys(rest).length === 0, 'not expecting these options', rest);
  }

  const funcStack = [];
  const lexScopeStack = [];
  const labelStack = []; // No need to validate this or track func boundaries. That's what the parser should have done already.
  const loopStack = []; // while, for-loop, for-in, for-of, do-while
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

  if (!options.skipUidReset) {
    resetUid();
  }


  const tracingValueBefore = VERBOSE_TRACING;
  if (!oncePass) {
    vlog('(Disabling verbose tracing for prepare after the first pass)');
    setVerboseTracing(false);
  }


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
        options.unrollLimit
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
        } else if (node.name === '$free') {
          vlog('This is the special case id of a function expression');
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

          const meta = globallyUniqueNamingRegistry.get(uniqueName);
          ASSERT(meta, 'the meta should exist this this name at this point');
          // These are used by the unique naming logic (bottom of this file)
          if (kind === 'read' || kind === 'readwrite') meta.renamingReads.push(node);
          if (kind === 'write' || kind === 'readwrite') meta.renamingWrites.push(node);

          // Resolve whether this was an export. If so, mark the name as such.
          // Since we process and "record" bindings in lexical scope order, the global scope goes first
          // As a side effect, the exported symbols, which can only be top-level "statements", will always
          // keep their original name. So we don't really have to worry about changing exported names.
          const grandNode = path.nodes[path.nodes.length - 3];
          const grandProp = path.props[path.props.length - 2];
          const grandIndex = path.indexes[path.indexes.length - 2];
          if (
            ((parentNode.type === 'FunctionDeclaration' || parentNode.type === 'ClassDeclaration') &&
              parentProp === 'id' &&
              grandNode.type === 'ExportNamedDeclaration') ||
            (parentNode.type === 'VariableDeclarator' &&
              parentProp === 'id' &&
              grandNode.type === 'VariableDeclaration' &&
              path.nodes[path.nodes.length - 4].type === 'ExportNamedDeclaration')
          ) {
            // TODO: unused by normalization. Remove it.
            vlog('Marking `' + uniqueName + '` as being an export');
            meta.isExport = true;
          }

          // Record a reference so we can eliminate TDZ (bottom of this file).
          // Keep in mind, this is unnormalized code. Bindings can be introduced in many ways and forms but we only care about let/const.
          // TODO: const/let assignment patterns
          const isDecl =
            (parentNode.type === 'ClassDeclaration' && parentProp === 'id') ||
            (parentNode.type === 'VariableDeclarator' && parentProp === 'id' && grandNode.type === 'VariableDeclaration' && (grandNode.kind === 'let' || grandNode.kind === 'const'));
          const pfunc = funcScopeStack[funcScopeStack.length - 1].$p.pid;
          meta.preNormalizeTdzCheckList.push({node, parentNode, parentProp, parentIndex, grandNode, grandProp, grandIndex, pfunc, kind});
          if (isDecl) {
            meta.preNormalizeTdzCheckDecl = node;
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
      case 'ContinueStatement:before': { // note: must still cover `continue` for the normal_once case
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
          vlog('Label:', name, ', now searching for definition to check for renames... Label stack depth:', labelStack.length);
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
          addLabelReference(fdata, node.label, parentNode.body, parentIndex, true);
        }
        else {
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
        const uniqueName = createUniqueGlobalLabel(node.label.name, fdata);
        if (node.label.name !== uniqueName) {
          vlog('- Renaming to new unique label:', uniqueName);
          registerGlobalLabel(fdata, uniqueName, node.label.name, node);
          node.label = AST.identifier(uniqueName);
          // The break handler in this walker will find the original name of ancestor label nodes and rename the break label to match
        } else {
          registerGlobalLabel(fdata, uniqueName, uniqueName, node);
          vlog('- Label is now registered, was already unique');
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
        loopStack.push(node);
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
        loopStack.pop();
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

  setVerboseTracing(tracingValueBefore);

  // Do a quick pass through all bindings to discover TDZ
  // - Cannot be a closure
  // - First read/write appears before the declaration (pid check)
  vgroup('\nStarting TDZ elimination scan:');
  let shown = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (!meta.preNormalizeTdzCheckDecl) return;
    if (shown === 10) vlog(`Omitting further output...`);
    if (++shown < 10) vlog('Testing', [name], 'now...');

    let pfunc = meta.preNormalizeTdzCheckList[0]?.pfunc;
    for (let i=1; i<meta.preNormalizeTdzCheckList.length; ++i) {
      if (meta.preNormalizeTdzCheckList[i].pfunc !== pfunc) {
        if (shown <= 10) vlog(`Closure, ignoring. Saw parent pid ${pfunc} and now ${meta.preNormalizeTdzCheckList[i].pfunc}`);
        // This binding escapes because at least one parent pid was different from another ref. Bail.
        return;
      }
    }

    const declPid = +meta.preNormalizeTdzCheckDecl.$p.pid;
    if (shown <= 10) vlog(`Checking for tdz cases...`);
    for (let i=0; i<meta.preNormalizeTdzCheckList.length; ++i) {
      const ref = meta.preNormalizeTdzCheckList[i];
      if (shown <= 10) vlog(`pid: ${ref.node.$p.pid}, decl pid: ${declPid}`);
      if (+ref.node.$p.pid >= declPid) continue;

      vlog(`It seems \`${name}\` is in the TDZ and not a closure. Eliminating it now. Parents: ${ref.grandNode.type}.${ref.grandProp} ${ref.grandIndex} ${ref.parentNode.type}.${ref.parentProp} ${ref.parentIndex}`);

      if (ref.kind === 'read' || ref.kind === 'readwrite') {
        rule('Reference to TDZ binding should be replaced with a TDZ throw');
        example('if (y) foo = x; let x = 1;', 'if (y) foo = $throwTDZError("`x` is TDZ"); let x = 1;');
        before(ref.parentNode, ref.grandNode);

        const stringArg = tmat(ref.parentNode, true).replace(/\n.*/g, ' ').trim();
        const stringArgTrunced = stringArg.slice(0, 50) + (stringArg.length > 50 ? ' ...' : '');
        const newNode = AST.callExpression(SYMBOL_THROW_TDZ_ERROR, [AST.primitive(`Preval: TDZ triggered for this read: ${stringArgTrunced}`)]);
        if (ref.parentIndex === -1) ref.parentNode[ref.parentProp] = newNode;
        else ref.parentNode[ref.parentProp][ref.parentIndex] = newNode;

        after(ref.grandNode);
      } else {
        switch (ref.parentNode.type) {
          case 'AssignmentExpression': {
            if (ref.parentNode.left === ref.node) {
              rule('Assignment to TDZ binding should be replaced with a TDZ throw');
              example('if (y) x = $(); let x = 1;', 'if (y) ($(), $throwTDZError("x = $()")); let x = 1;');
              before(ref.parentNode, ref.grandNode);

              const stringArg = tmat(ref.parentNode, true).replace(/\n/g, ' ')
              const newNode = AST.sequenceExpression(
                ref.parentNode.right,
                AST.callExpression(SYMBOL_THROW_TDZ_ERROR, [AST.primitive(`Preval: TDZ triggered for this assignment: ${stringArg}`)])
              );
              if (ref.grandIndex === -1) ref.grandNode[ref.grandProp] = newNode;
              else ref.grandNode[ref.grandProp][ref.grandIndex] = newNode;

              after(ref.grandNode);
            } else {
              console.log(ref.parentNode, ref.node);
              ASSERT(false, 'Add support for assignment TDZ case');
            }

            break;
          }
          default: {
            ASSERT(false, 'Add support for this TDZ case');
          }
        }
      }
    }
  });
  assertNoDupeNodes(ast, 'ast');
  vgroupEnd();

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
        vlog('  Original name was already recorded as implicit global. Renaming the ident with pid', meta.renamingReads?.[0]?.node?.$p.pid);
        meta.renamingReads.forEach((node) => (node.name = meta.originalName));
      } else if (meta2) {
        const newName = createFreshVar(meta.originalName, fdata);
        vlog('  This name was also bound explicitly. Renaming existing occurrences to `' + newName + '`');
        meta2.renamingReads.forEach((node) => (node.name = newName));
        meta2.renamingWrites.forEach((node) => (node.name = newName));
        vlog('  Renaming the global to its original name `' + meta.originalName + '`');
        meta.renamingReads.forEach((node) => (node.name = meta.originalName));
        meta.renamingWrites.forEach((node) => (node.name = meta.originalName));
        ++globalsShuffled;
        meta2.isImplicitGlobal = true; // Make sure other globals just get renamed (in previous branch)
        // Poison these refs to prevent a footgun situation
        meta.renamingReads = null;
        meta.renamingWrites = null;
        meta2.renamingReads = null;
        meta2.renamingWrites = null;
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
      meta.renamingReads.forEach((node) => (node.name = newName));
      meta.renamingWrites.forEach((node) => (node.name = newName));
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
        .join('\n') || '(none)',
    );
    vlog('\ngloballyUniqueNamingRegistry (name[r/w] , omits all builtins):');
    vlog(
      (globallyUniqueNamingRegistry.size - globals.size) > 50
      ? '<too many>'
      : globallyUniqueNamingRegistry.size === globals.size
      ? '<none>'
          : Array.from(fdata.globallyUniqueNamingRegistry.keys())
            .filter((name) => !globals.has(name))
            .map(name => {
              const meta = fdata.globallyUniqueNamingRegistry.get(name);
              ASSERT(meta);
              // Note: renamingReads and renamingWrites are set to null after being renamed
              const reads = meta.renamingReads?.length ?? '?';
              const writes = meta.renamingWrites?.length ?? '?';
              return `${name}[${reads}/${writes}]`;
            })
            .join(', ')
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
