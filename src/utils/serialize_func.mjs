import { printer } from '../../lib/printer.mjs';

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  tmat,
  fmat,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { phase0 } from '../reduce_static/phase0.mjs';
import { uniqify_idents } from './uniqify_idents.mjs';

// - Receive a function declaration AST node
// - Serialize it to a string
// - Parse it
// - Make sure all duplicated binding names are made unique
// - Return AST node of the new function

export function cloneFunctionNode(funcNode, clonedName = 'noname', staticArgs, fdata) {
  group(
    '\n\n\n##################################\n## cloning function slowly  ::  ' +
      funcNode.id?.name +
      '\n##################################\n\n',
  );
  vlog('Input node:');
  source(funcNode);

  ASSERT(
    funcNode.type === 'FunctionExpression' || funcNode.type === 'ArrowFunctionExpression',
    'This function is supposed to clone a func expr',
    funcNode,
  );
  ASSERT(
    funcNode.body.body.some((n) => n.type === 'DebuggerStatement'),
    'the function should be normalized so it should contain the function header and a debugger statement',
  );

  const bodyOffset = findBodyOffset(funcNode);
  const funcBody = funcNode.body.body;
  const bodyBak = funcBody.slice(0);

  staticArgs.forEach(({ index: paramIndex, type, value: paramValue }) => {
    if (paramIndex >= funcNode.params.length) return; // Argument without param, we ignore.
    log('- Replacing param `' + funcNode.params[paramIndex].name + '` with', paramValue);

    ASSERT(funcNode.params[paramIndex], 'there should be a param at this index?');
    ASSERT(funcNode.params[paramIndex].$p.ref, 'the param should not be unused, right? so it should have the ref to its usage');
    ASSERT(funcNode.params[paramIndex].$p.ref.parentNode.type === 'VariableDeclarator');

    // We have to make a choice here. Either we track the grand parent of the var decl such that we can directly manipulate
    // it here, or we search for the correct parameter manually and prune it. I think the latter is just more cost effective.

    const targetParamName = '$$' + paramIndex;
    let found = false;
    for (let i = 0, l = bodyOffset - 1; i < l; ++i) {
      const n = funcBody[i];
      ASSERT(
        n.type === 'VariableDeclaration' || n.type === 'EmptyStatement',
        'rn the header only contains var decls. not very relevant, just assuming this when doing checks. if this changes, update the logic here accordingly',
        n,
      );
      if (n.type === 'VariableDeclaration' && n.declarations[0].init.type === 'Param' && n.declarations[0].init.name === targetParamName) {
        funcBody[i] = AST.emptyStatement();
        found = true;
        break;
      }
    }
    ASSERT(!!found === !!funcNode.params[paramIndex].$p.ref, 'iif found then the param should have a ref to it');
    if (found) {
      funcBody.splice(
        bodyOffset,
        0,
        AST.variableDeclaration(
          funcNode.params[paramIndex].$p.ref.name,
          type === 'I' ? AST.identifier(paramValue) : type === 'N' ? AST.nul() : AST.literal(paramValue),
          'const',
        ),
      );
    } else {
      vlog('It appears that the param is unused. As such we can not find the original param name for this index. Nothing to do here.');
    }
  });
  const str = printer(funcNode);
  log('Serialized size of function:', str.length);
  funcNode.body.body = bodyBak; // Restore the original body
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
  log('## End of function cloning', funcNode.id?.name, '\n\n');

  return ast.body[0];
}

// TODO: fix labels
