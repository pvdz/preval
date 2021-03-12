// Alias `this` and `arguments` at the top of each function that actually uses it
// Requires info gathered by the prepare phase

import { THIS_ALIAS_BASE_NAME, ARGUMENTS_ALIAS_BASE_NAME, ARGLENGTH_ALIAS_BASE_NAME } from '../constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar } from '../bindings.mjs';

export function aliasThisAndArguments(fdata, resolve, req) {
  group('\n\n\n##################################\n## phase Aliasing  ::  ' + fdata.fname + '\n##################################\n\n\n');
  vlog('Aliasing all occurrences of `this`, `arguments`, and `arguments.length');

  let added = 0;

  vgroup('Adding aliases to', fdata.thisArgFuncs.size, 'affected functions');
  fdata.thisArgFuncs.forEach((node) => {
    // Inject aliases for this/arguments/arguments.length and make sure to maintain their proper order (prevents infi loops)
    if (node.$p.thisAccess && !node.$p.thisAlias) {
      vlog('Adding `this` alias to', node.$p.pid);
      node.$p.thisAlias = createFreshVar(THIS_ALIAS_BASE_NAME, fdata); // Name is relevant as we'll check it later.
      const thisNode = AST.thisExpression();
      thisNode.$p.isForAlias = true;
      const varNode = AST.variableDeclaration(node.$p.thisAlias, thisNode, 'const');
      varNode.$p.isForAlias = 1;
      node.body.body.unshift(varNode);
      rule('If the function references `this` then we must create an alias for it');
      after(varNode);
      vlog('Created local alias for `this`;', node.$p.thisAlias);
      ++added;
    }
    if (node.$p.readsArgumentsAny && !node.$p.argsAnyAlias) {
      vlog('Adding `arguments` alias to', node.$p.pid);
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
      vlog('Created local alias for `arguments`;', node.$p.argsAnyAlias);
      ++added;
    }
    if (node.$p.readsArgumentsLen && !node.$p.argsLenAlias) {
      vlog('Adding `arguments.length` alias to', node.$p.pid);
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
      vlog('Created local alias for `arguments.length`;', node.$p.argsLenAlias);
      ++added;
    }
  });
  vgroupEnd();
  vlog('Actually added', added, 'new aliases');

  const thisRefs = fdata.thisRefs.filter(({ node }) => !node.$p.isForAlias);
  vgroup('Replacing all ' + thisRefs.length + ' occurrences of `this`');
  thisRefs.forEach(({ parent, prop, index, func }) => {
    const alias = func.$p.thisAlias;
    if (index >= 0) parent[prop][index] = AST.identifier(alias);
    else parent[prop] = AST.identifier(alias);
    ++added;
  });
  vgroupEnd();
  const argsAnyRefs = fdata.argsAnyRefs.filter(({ node }) => !node.$p.isForAlias);
  vgroup('Replacing all ' + argsAnyRefs.length + ' occurrences of `arguments`');
  argsAnyRefs.forEach(({ parent, prop, index, func }) => {
    const alias = func.$p.argsAnyAlias;
    if (index >= 0) parent[prop][index] = AST.identifier(alias);
    else parent[prop] = AST.identifier(alias);
    ++added;
  });
  vgroupEnd();
  const argsLenRefs = fdata.argsLenRefs.filter(({ node }) => !node.$p.isForAlias);
  vgroup('Replacing all ' + argsLenRefs.length + ' occurrences of `arguments.length`');
  argsLenRefs.forEach(({ parent, prop, index, func }) => {
    const alias = func.$p.argsLenAlias;
    if (index >= 0) parent[prop][index] = AST.identifier(alias);
    else parent[prop] = AST.identifier(alias);
    ++added;
  });
  vgroupEnd();
  fdata.thisRefs = [];
  fdata.argsAnyRefs = [];
  fdata.argsLenRefs = [];
  fdata.thisArgFuncs = new Set();

  groupEnd();

  const ast = fdata.tenkoOutput.ast;
  log('\n\nEnd of aliasing', added ? 'Replaced ' + added + ' refs so restarting from prepare phase' : '');
  vlog('\n\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
}
