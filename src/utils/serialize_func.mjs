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
import { uniqify_idents } from './uniqify_idents.mjs';
import { parseCode } from '../normalize/parse.mjs';
import { prepareNormalization } from '../normalize/prepare.mjs';
import { phaseNormalOnce } from '../normalize/normal_once.mjs';
import {VERBOSE_TRACING} from "../constants.mjs"
import { phaseNormalize } from '../normalize/normalize.mjs';

// - Receive a function declaration AST node
// - Serialize it to a string
// - Parse it
// - Make sure all duplicated binding names are made unique
// - Return AST node of the new function

export function cloneFunctionNode(funcNode, clonedName = 'noname', staticArgs, fdata) {
  if (funcNode.async) {
    console.log('TODO: fix cloning async functions');
    TODO;
  }
  if (funcNode.generator) {
    console.log('TODO: fix cloning generator functions');
    TODO;
  }
  group(
    '\n\n\n##################################\n## cloning function slowly  ::  ' +
      funcNode.id?.name +
      '\n##################################\n\n',
  );
  vlog('Input node:');
  source(funcNode, true);

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

    // We have to make a choice here. Either we track the grand parent of the var decl such that we can directly manipulate
    // it here, or we search for the correct parameter manually and prune it. I think the latter is just more cost effective.

    const paramDecl = funcNode.params[paramIndex];

    const targetParamName = '$$' + paramIndex;
    let found = false;
    for (let i = 0, l = bodyOffset - 1; i < l; ++i) {
      const n = funcBody[i];
      ASSERT(
        n.type === 'VarStatement' || n.type === 'EmptyStatement',
        'rn the header only contains var decls. not very relevant, just assuming this when doing checks. if this changes, update the logic here accordingly',
        n,
      );

      if (n.type === 'VarStatement' && n.init.type === 'Param' && n.init.name === targetParamName) {
        funcBody[i] = AST.emptyStatement();

        funcBody.splice(
          bodyOffset,
          0,
          AST.varStatement(
            'let',
            paramDecl.$p.paramVarDeclRef?.name,
            type === 'I'
              ? AST.identifier(paramValue)
              : type === 'N'
              ? AST.nul()
              : type === 'S'
              ? AST.templateLiteral(paramValue)
              : AST.literal(paramValue),
          ),
        );

        found = true;
        break;
      }
    }
    ASSERT(!!found === !!paramDecl.$p.paramVarDeclRef, 'iif found then the param should have a ref to it', paramDecl);
    if (!found) {
      vlog('It appears that the param is unused. As such we can not find the original param name for this index. Nothing to do here.');
    }
  });

  //funcNode.params.push(AST.param('$$5', true)); // to test rest

  const str = printer(funcNode);
  log('Serialized size of function:', str.length);

  funcNode.body.body = bodyBak; // Restore the original body
  const newFdata = parseCode('(' + str + ')', '<function duplicator>', true);

  log('Now processing...');

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
  // The Param is a Preval custom node. Tenko won't be returning it. Convert them now.
  // TODO: what about nested funcs?
  clonedFunc.params = clonedFunc.params.map(p => AST.param((p.type === 'RestElement' || p.rest) ? p.argument.name : p.name, (p.rest || p.type === 'RestElement')));

  log('  - uniqify_idents');
  uniqify_idents(clonedFunc, fdata);

  if (clonedName) clonedFunc.id = AST.identifier(clonedName);

  log('  - printing?');
  if (VERBOSE_TRACING) vlog('\nCloned function:\n--------------\n' + fmat(tmat(clonedFunc)) + '\n--------------\n');

  if (clonedName) clonedFunc.id = null;

  groupEnd();
  log('## End of function cloning', funcNode.id?.name, '\n\n');

  return ast.body[0];
}

export function createNormalizedFunctionFromString(funcString, bodyString, clonedName = 'noname', fdata) {
  for (let i=0;i<10;++i)vgroup();
  log('createNormalizedFunctionFromString: Size of function string:', funcString.length);

  const preFdata = parseCode(funcString, '');

  // I want a phase1 because I want the scope tracking set up for normalizing bindings
  // Skip the uuid reset otherwise we get duplicate pids
  prepareNormalization(preFdata, /*resolve*/ undefined, /*req*/ undefined, true, {
    skipUidReset: true,
    overrideNameRegistry: fdata.globallyUniqueNamingRegistry,
    overrideLabelNameRegistry: fdata.globallyUniqueLabelRegistry,
  });
  source(preFdata.tenkoOutput.ast);
  vlog('Set ident/label registry to the outer code');
  // console.log(preFdata.globallyUniqueLabelRegistry, fdata.globallyUniqueLabelRegistry)

  phaseNormalOnce(preFdata);
  phaseNormalize(preFdata, '<createNormalizedFunctionFromString>', false, null, { allowEval: false });

  vlog('Now processing...');

  // Note: This AST should contain one element in Program: the function declaration
  //       which means we can ignore certain edge cases for scope tracking like imports/exports
  // TODO: still need to worry about new implicit globals
  const ast = preFdata.tenkoOutput.ast;
  source(ast);

  const clonedFunc = ast.body[0].init;
  ASSERT(
    clonedFunc.type === 'FunctionExpression' || clonedFunc.type === 'ArrowFunctionExpression',
    'expecting to be cloning a func expr or arrow',
    clonedFunc,
    clonedFunc.type,
  );

  clonedFunc.id = null;

  log('  - uniqify_idents');
  uniqify_idents(clonedFunc, fdata);

  if (clonedName) clonedFunc.id = AST.identifier(clonedName);

  log('  - printing?');
  vlog('\nCloned function:\n--------------\n' + fmat(tmat(clonedFunc)) + '\n--------------\n');

  if (clonedName) clonedFunc.id = null;

  groupEnd();
  log('## End of function cloning', clonedName, '\n\n');

  for (let i=0;i<10;++i)vgroupEnd();
  return ast.body[0].init;
}

// TODO: fix labels
