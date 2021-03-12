// Alias `this` and `arguments` at the top of each function that actually uses it
// Requires info gathered by the prepare phase

import {
  log,
  group,
  groupEnd,
  ASSERT,
  DIM,
  BLUE,
  RED,
  RESET,
  tmat,
  fmat,
  PURPLE,
  YELLOW,
  rule,
  example,
  before,
  source,
  after,
} from '../utils.mjs';
import {
  setVerboseTracing,
  VERBOSE_TRACING,
  ASSUME_BUILTINS,
  DCE_ERROR_MSG,
  ALIAS_PREFIX,
  THIS_ALIAS_BASE_NAME,
  ARGUMENTS_ALIAS_PREFIX,
  ARGUMENTS_ALIAS_BASE_NAME,
  ARGLENGTH_ALIAS_BASE_NAME,
  BUILTIN_REST_HANDLER_NAME,
  FRESH,
  OLD,
  MARK_NONE,
  MARK_TEMP,
  MARK_PERM,
} from '../constants.mjs';
import { createFreshVar } from '../bindings.mjs';
import * as AST from '../ast.mjs';

export function aliasThisAndArguments(fdata, resolve, req) {
  group('\n\n\n##################################\n## phase Aliasing  ::  ' + fdata.fname + '\n##################################\n\n\n');
  if (VERBOSE_TRACING) log('Aliasing all occurrences of `this`, `arguments`, and `arguments.length');

  let added = 0;

  if (VERBOSE_TRACING) group('Adding aliases to', fdata.thisArgFuncs.size, 'affected functions');
  fdata.thisArgFuncs.forEach((node) => {
    // Inject aliases for this/arguments/arguments.length and make sure to maintain their proper order (prevents infi loops)
    if (node.$p.thisAccess && !node.$p.thisAlias) {
      if (VERBOSE_TRACING) log('Adding `this` alias to', node.$p.pid);
      node.$p.thisAlias = createFreshVar(THIS_ALIAS_BASE_NAME, fdata); // Name is relevant as we'll check it later.
      const thisNode = AST.thisExpression();
      thisNode.$p.isForAlias = true;
      const varNode = AST.variableDeclaration(node.$p.thisAlias, thisNode, 'const');
      varNode.$p.isForAlias = 1;
      node.body.body.unshift(varNode);
      rule('If the function references `this` then we must create an alias for it');
      after(varNode);
      if (VERBOSE_TRACING) log('Created local alias for `this`;', node.$p.thisAlias);
      ++added;
    }
    if (node.$p.readsArgumentsAny && !node.$p.argsAnyAlias) {
      if (VERBOSE_TRACING) log('Adding `arguments` alias to', node.$p.pid);
      node.$p.argsAnyAlias = createFreshVar(ARGUMENTS_ALIAS_BASE_NAME, fdata); // Name is relevant as we'll check it later.
      const argNode = AST.identifier('arguments');
      argNode.$p.isForAlias = true;
      const varNode = AST.variableDeclaration(node.$p.argsAnyAlias, argNode, 'const');
      varNode.$p.isForAlias = 2;
      let at = 0;
      if (node.body.body[0]?.$p.isForAlias === 1) {
        ++at;
        ASSERT(node.body.body[1]?.$p.isForAlias !== 1, 'should not have two `this` aliases');
      }
      node.body.body.splice(at, 0, varNode);
      rule('If the function references `arguments` then we must create an alias for it');
      after(varNode);
      if (VERBOSE_TRACING) log('Created local alias for `arguments`;', node.$p.argsAnyAlias);
      ++added;
    }
    if (node.$p.readsArgumentsLen && !node.$p.argsLenAlias) {
      if (VERBOSE_TRACING) log('Adding `arguments.length` alias to', node.$p.pid);
      node.$p.argsLenAlias = createFreshVar(ARGLENGTH_ALIAS_BASE_NAME, fdata); // Name is relevant as we'll check it later.
      const argNode = AST.identifier('arguments');
      argNode.$p.isForAlias = true;
      const varNode = AST.variableDeclaration(node.$p.argsLenAlias, AST.memberExpression(argNode, 'length'), 'const');
      varNode.$p.isForAlias = 3;
      let at = 0;
      if (node.body.body[0]?.$p.isForAlias === 1) {
        ++at;
        ASSERT(node.body.body[1]?.$p.isForAlias !== 1, 'should not have two `this` aliases');
        if (node.body.body[1]?.$p.isForAlias === 2) {
          ++at;
          ASSERT(node.body.body[2]?.$p.isForAlias !== 2, 'should not have two `arguments` aliases');
        }
      }
      node.body.body.unshift(varNode);
      rule('If the function references `arguments.length` then we must create an alias for it');
      after(varNode);
      if (VERBOSE_TRACING) log('Created local alias for `arguments.length`;', node.$p.argsLenAlias);
      ++added;
    }
  });
  if (VERBOSE_TRACING) groupEnd();
  if (VERBOSE_TRACING) log('Actually added', added, 'new aliases');

  const thisRefs = fdata.thisRefs.filter(({ node }) => !node.$p.isForAlias);
  if (VERBOSE_TRACING) group('Replacing all ' + thisRefs.length + ' occurrences of `this`');
  thisRefs.forEach(({ parent, prop, index, func }) => {
    const alias = func.$p.thisAlias;
    if (index >= 0) parent[prop][index] = AST.identifier(alias);
    else parent[prop] = AST.identifier(alias);
    ++added;
  });
  if (VERBOSE_TRACING) groupEnd();
  const argsAnyRefs = fdata.argsAnyRefs.filter(({ node }) => !node.$p.isForAlias);
  if (VERBOSE_TRACING) group('Replacing all ' + argsAnyRefs.length + ' occurrences of `arguments`');
  argsAnyRefs.forEach(({ parent, prop, index, func }) => {
    const alias = func.$p.argsAnyAlias;
    if (index >= 0) parent[prop][index] = AST.identifier(alias);
    else parent[prop] = AST.identifier(alias);
    ++added;
  });
  if (VERBOSE_TRACING) groupEnd();
  const argsLenRefs = fdata.argsLenRefs.filter(({ node }) => !node.$p.isForAlias);
  if (VERBOSE_TRACING) group('Replacing all ' + argsLenRefs.length + ' occurrences of `arguments.length`');
  argsLenRefs.forEach(({ parent, prop, index, func }) => {
    const alias = func.$p.argsLenAlias;
    if (index >= 0) parent[prop][index] = AST.identifier(alias);
    else parent[prop] = AST.identifier(alias);
    ++added;
  });
  if (VERBOSE_TRACING) groupEnd();
  fdata.thisRefs = [];
  fdata.argsAnyRefs = [];
  fdata.argsLenRefs = [];
  fdata.thisArgFuncs = new Set();

  groupEnd();

  const ast = fdata.tenkoOutput.ast;
  log('\n\nEnd of aliasing', added ? 'Replaced ' + added + ' refs so restarting from prepare phase' : '');
  if (VERBOSE_TRACING) log('\n\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
}
