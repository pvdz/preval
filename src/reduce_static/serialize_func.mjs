import { printer } from '../../lib/printer.mjs';
import { phase0 } from './phase0.mjs';
import walk from '../../lib/walk.mjs';
import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat } from '../utils.mjs';
import {
  getIdentUsageKind,
  createUniqueGlobalLabel,
  registerGlobalLabel,
  findUniqueNameForBindingIdent,
  preprocessScopeNode,
} from '../bindings.mjs';
import { $p } from '../$p.mjs';
import * as AST from '../ast.mjs';

// - Receive a function declaration AST node
// - Serialize it to a string
// - Parse it
// - Make sure all duplicated binding names are made unique
// - Return AST node of the new function

let VERBOSE_TRACING = true;

export function cloneFunctionDecl(node, clonedName,staticArgs, fdata, verbose = VERBOSE_TRACING) {
  VERBOSE_TRACING = verbose;
  group(
    '\n\n\n##################################\n## cloning function decl  ::  ' +
      node.id?.name +
      '\n##################################\n\n\n',
  );

  staticArgs.forEach(([paramIndex, paramValue]) => {
    if (paramIndex >= node.params.length) return; // Argument without param, we ignore.
    log('- Replacing param `' + node.params[paramIndex].name + '` with', paramValue);
    node.body.body.unshift(AST.expressionStatement(AST.assignmentExpression(node.params[paramIndex].name, AST.cloneSimple(paramValue))));
    //console.log(AST.expressionStatement(AST.assignmentExpression(node.params[paramIndex].name, AST.cloneSimple(paramValue))))
  })
  const str = printer(node);
  log('Serialized size of function:', str.length);
  staticArgs.forEach(([paramIndex, paramValue]) => {
    node.body.body.shift();
  });
  if (str > 10 * 1024) VERBOSE_TRACING = false; // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.
  const newFdata = phase0(str, '<function duplicator>');

  if (VERBOSE_TRACING) log('\n\nNow processing\n\n');

  // Note: This AST should contain one element in Program: the function declaration
  //       which means we can ignore certain edge cases for scope tracking like imports/exports
  const ast = newFdata.tenkoOutput.ast;
  const clonedFunc = ast.body[0];
  ASSERT(ast.body.length === 1 && clonedFunc.type === 'FunctionDeclaration');

  const lexScopeStack = [];
  const labelStack = []; // No need to validate this or track func boundaries. That's what the parser should have done already.
  let lexScopeCounter = 0;
  const funcScopeStack = [];

  clonedFunc.id = null;

  walk(_walker, clonedFunc, 'ast');
  function _walker(node, before, nodeType, path) {
    ASSERT(node, 'node should be truthy', node);
    ASSERT(nodeType === node.type);

    if (before) {
      node.$p = $p();
    }

    if (VERBOSE_TRACING) group(BLUE + nodeType + ':' + (before ? 'before' : 'after'), RESET);

    const key = nodeType + ':' + (before ? 'before' : 'after');

    if (before && node.$scope) {
      if (VERBOSE_TRACING) log('Has scope');
      lexScopeStack.push(node);
      if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
        funcScopeStack.push(node);
      }
      preprocessScopeNode(node, path.nodes[path.nodes.length - 2], fdata, funcScopeStack[funcScopeStack.length - 1], ++lexScopeCounter);
    }

    switch (key) {
      case 'FunctionDeclaration':
        break;
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
            true
          );
          if (VERBOSE_TRACING) log('- initial name:', node.name, ', unique name:', uniqueName);
          node.$p.uniqueName = uniqueName;
          node.$p.debug_originalName = node.name;
          node.$p.debug_uniqueName = uniqueName; // Cant use this reliably due to new nodes being injected
          node.name = uniqueName;

          //const meta = globallyUniqueNamingRegistry.get(uniqueName);
          //ASSERT(meta, 'the meta should exist this this name at this point');
          //if (kind === 'read' || kind === 'readwrite') meta.reads.push(node);
          //if (kind === 'write' || kind === 'readwrite') meta.writes.push(node);
        } else {
          if (VERBOSE_TRACING) log(RED + '- skipping; not a binding' + RESET);
        }

        break;
      }

      case 'BreakStatement:before':
      case 'ContinueStatement:before': {
        break;
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
        break
        labelStack.push(node);
        if (VERBOSE_TRACING) log('Label:', node.label.name);
        node.$p.originalLabelName = node.label.name;
        const uniqueName = createUniqueGlobalLabel(node.label.name, fdata.globallyUniqueLabelRegistry);
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
        break
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

    if (VERBOSE_TRACING) groupEnd();
  }

  clonedFunc.id = AST.identifier(clonedName);

  if (VERBOSE_TRACING) log('\nCloned function:\n--------------\n' + fmat(tmat(clonedFunc)) + '\n--------------\n');

  groupEnd();
  return ast.body[0];
}

// TODO: fix labels
