import { printer } from '../../lib/printer.mjs';

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { phase0 } from '../reduce_static/phase0.mjs';
import { uniqify_idents } from './uniqify_idents.mjs';

// - Receive a function declaration AST node
// - Serialize it to a string
// - Parse it
// - Make sure all duplicated binding names are made unique
// - Return AST node of the new function

export function cloneFunctionNode(node, clonedName = 'noname', staticArgs, fdata) {
  group(
    '\n\n\n##################################\n## cloning function slowly  ::  ' +
      node.id?.name +
      '\n##################################\n\n\n',
  );
  source(node);

  ASSERT(
    node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression',
    'This function is supposed to clone a func expr',
    node,
  );

  staticArgs.forEach(({ index: paramIndex, type, value: paramValue }) => {
    if (paramIndex >= node.params.length) return; // Argument without param, we ignore.
    log('- Replacing param `' + node.params[paramIndex].name + '` with', paramValue);
    node.body.body.unshift(
      AST.expressionStatement(
        AST.assignmentExpression(
          node.params[paramIndex].name,
          type === 'I' ? AST.identifier(paramValue) : type === 'N' ? AST.literal(null, true) : AST.literal(paramValue),
        ),
      ),
    );
  });
  const str = printer(node);
  log('Serialized size of function:', str.length);
  staticArgs.forEach(() => {
    node.body.body.shift();
  });
  const newFdata = phase0('(' + str + ')', '<function duplicator>', true);

  vlog('\n\nNow processing\n\n');

  // Note: This AST should contain one element in Program: the function declaration
  //       which means we can ignore certain edge cases for scope tracking like imports/exports
  const ast = newFdata.tenkoOutput.ast;
  const clonedFunc = ast.body[0]?.expression;
  ASSERT(
    ast.body.length === 1 && (clonedFunc.type === 'FunctionExpression' || clonedFunc.type === 'ArrowFunctionExpression'),
    'expecting to be cloning a func expr or arrow',
    clonedFunc.type,
  );

  clonedFunc.id = null;

  uniqify_idents(clonedFunc, fdata);

  if (clonedName) clonedFunc.id = AST.identifier(clonedName);

  vlog('\nCloned function:\n--------------\n' + fmat(tmat(clonedFunc)) + '\n--------------\n');

  if (clonedName) clonedFunc.id = null;

  groupEnd();
  log('## End of function cloning', node.id?.name, '\n\n');

  if (node.id?.name === 'tmpUnusedPrimeFuncNameC$1436') {
    log('the function:');

    source(ast.body[0], true);
  }

  return ast.body[0];
}

// TODO: fix labels
