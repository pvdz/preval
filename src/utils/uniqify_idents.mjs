// Note: this require an AST from Tenko. ast.mjs does NOT generate the necessary $scope data!

import walk from '../../lib/walk.mjs';

import { RED, BLUE, RESET } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd } from '../utils.mjs';
import { $p } from '../$p.mjs';
import {
  getIdentUsageKind,
  createUniqueGlobalLabel,
  registerGlobalLabel,
  findUniqueNameForBindingIdent,
  preprocessScopeNode,
} from '../bindings.mjs';

export function uniqify_idents(funcAst, fdata) {
  const lexScopeStack = [];
  const labelStack = []; // No need to validate this or track func boundaries. That's what the parser should have done already.
  let lexScopeCounter = 0;
  const funcScopeStack = [];

  let walked = 0;
  log('    - before walk')
  walk(_walker, funcAst, 'ast');
  log('    - after walk, visitor called', walked, 'times');
  function _walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);
    ++walked;

    if (before) {
      node.$p = $p();
    }

    vgroup(BLUE + nodeType + ':' + (before ? 'before' : 'after'), RESET);

    const key = nodeType + ':' + (before ? 'before' : 'after');

    if (before && node.$scope) {
      vlog('Has scope');
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
        false,
      );
    }

    switch (key) {
      case 'Identifier:before': {
        vlog('Ident:', node.name);
        const parentNode = path.nodes[path.nodes.length - 2];
        const parentProp = path.props[path.props.length - 1];
        const kind = getIdentUsageKind(parentNode, parentProp);
        vlog('- Ident kind:', kind);

        vlog('- Parent node: `' + parentNode.type + '`, prop: `' + parentProp + '`');
        if (/^\$\$\d+$/.test(node.name)) {
          vlog('- Skipping param name `' + node.name + '`');
        } else if (kind !== 'none' && kind !== 'label' && node.name !== 'arguments') {
          ASSERT(!node.$p.uniqueName, 'dont do this twice');
          const uniqueName = findUniqueNameForBindingIdent(
            node,
            parentNode.type === 'FunctionDeclaration' && parentProp === 'id',
            fdata,
            lexScopeStack,
            true,
          );
          vlog('- initial name:', node.name, ', unique name:', uniqueName);
          node.$p.uniqueName = uniqueName;
          node.$p.debug_originalName = node.name;
          node.$p.debug_uniqueName = uniqueName; // Cant use this reliably due to new nodes being injected
          node.name = uniqueName;

          //const meta = globallyUniqueNamingRegistry.get(uniqueName);
          //ASSERT(meta, 'the meta should exist this this name at this point');
          //if (kind === 'read' || kind === 'readwrite') meta.reads.push(node);
          //if (kind === 'write' || kind === 'readwrite') meta.writes.push(node);
        } else {
          vlog(RED + '- skipping; not a binding' + RESET);
        }

        break;
      }

      case 'BreakStatement:before':
      case 'ContinueStatement:before': {
        // Find labeled break or continue statements and make sure that they keep pointing to the "same" label
        // Find the first label ancestor where the original name matches the label of this node
        if (node.label) {
          const name = node.label.name;
          vlog('Label:', name, ', now searching for definition... Label stack depth:', labelStack.length);
          let i = labelStack.length;
          while (--i >= 0) {
            vlog('->', labelStack[i].$p.originalLabelName);
            if (labelStack[i].$p.originalLabelName === name) {
              const newName = labelStack[i].label.name;
              if (newName !== name) {
                vlog('- Label was renamed to', newName);
                node.label.name = newName;
                break;
              } else {
                vlog('- Label not renamed');
              }
            }
          }
        } else {
          vlog('No label');
        }
        break;
      }

      case 'LabeledStatement:before': {
        labelStack.push(node);
        vlog('Label:', node.label.name);
        node.$p.originalLabelName = node.label.name;
        const uniqueName = createUniqueGlobalLabel(node.label.name, fdata);
        registerGlobalLabel(fdata, uniqueName, node.label.name, node);
        if (node.label.name !== uniqueName) {
          vlog('- Unique label name:', uniqueName);
          node.label.name = uniqueName;
        } else {
          vlog('- Label is now registered and unique');
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

    vgroupEnd();
  }
}
