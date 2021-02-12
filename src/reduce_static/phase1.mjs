import walk from '../../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat, getIdentUsageKind } from '../utils.mjs';
import globals from '../globals.mjs';
import * as Tenko from '../../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import { $p } from '../$p.mjs';

// This phase is fairly mechanical and should only do discovery, no AST changes.
// It sets up scope tracking, imports/exports tracking, return value analysis. That sort of thing.
// It runs twice; once for actual input code and once on normalized code.

export function phase1(fdata, resolve, req, verbose) {
  const ast = fdata.tenkoOutput.ast;

  const funcStack = [];
  const labelStack = []; // No need to validate this or track func boundaries. That's what the parser should have done already.
  const thisStack = [];

  const globallyUniqueNamingRegistry = new Map();
  const globallyUniqueLabelRegistry = new Map();
  fdata.globallyUniqueNamingRegistry = globallyUniqueNamingRegistry;
  fdata.globallyUniqueLabelRegistry = globallyUniqueLabelRegistry;

  globals.forEach((_, name) =>
    globallyUniqueNamingRegistry.set(name, {
      name,
      global: true,
      implicit: false,
      isExport: false, // Set below
      reads: [],
      writes: [],
    }),
  );

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
      originalName,
      uniqueName: name,
      labelNode, // All referenced labels must exist (syntax error), labels must appear before their usage when traversing
      usages: [], // {parent, prop, index} of the break/continue statement referring to the label
    });
  }

  const imports = new Map(); // Discovered filenames to import from. We don't care about the imported symbols here just yet.
  const exports = new Map();
  fdata.imports = imports;
  fdata.exports = exports;

  group('\n\n\n##################################\n## phase1  ::  ' + fdata.fname + '\n##################################\n\n\n');

  walk(_walker, ast, 'ast');
  function _walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    if (before) {
      node.$p = $p();
    }

    group(BLUE + nodeType + ':' + (before ? 'before' : 'after'), RESET);

    const key = nodeType + ':' + (before ? 'before' : 'after');

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

        break;
      }

      case 'CatchClause:before': {
        // Note: the catch scope is set on node.handler of the try (parent node of the catch clause)
        break;
      }

      case 'Identifier:before': {
        const name = node.name;
        log('Ident:', name);
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const kind = getIdentUsageKind(parentNode, parentProp);
        log('- Ident kind:', kind);

        log('- Parent: `' + parentNode.type + '.' + parentProp + '`');
        if (kind !== 'none' && kind !== 'label' && name !== 'arguments') {
          let meta = globallyUniqueNamingRegistry.get(name);
          if (!meta) {
            meta = {
              name,
              global: false,
              implicit: 'unknown', // true until its not...
              isExport: false, // Set below
              reads: [],
              writes: [],
            };
            globallyUniqueNamingRegistry.set(name, meta);
          }
          if (kind === 'read' || kind === 'readwrite') meta.reads.push(node);
          if (kind === 'write' || kind === 'readwrite') meta.writes.push(node);

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
        break;
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
}
