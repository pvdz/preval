// This attempts to clean up the output and generate regular JS again, eliminating some obvious artifacts from Preval
// Given code should be normalized and the settled result of running Preval

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before, after, assertNoDupeNodes, rule, example } from '../utils.mjs';
import { VERBOSE_TRACING } from '../constants.mjs';
import * as AST from '../ast.mjs';

export function denorm(fdata, resolve, req, options) {
  const ast = fdata.tenkoOutput.ast;
  group('\n\n\n##################################\n## denorm  ::  ' + fdata.fname + '\n##################################\n\n\n');
  if (VERBOSE_TRACING) vlog('\nCurrent state (before denorm)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
  vlog('\n\n\n##################################\n## denorm  ::  ' + fdata.fname + '\n##################################\n');
  vlog('Converting normalized code back to somewhat regular JS code...\n\n\n\n');

  {
    const {...rest} = options;
    const keys = Object.keys(rest);
    ASSERT(keys.length === 0, 'denorm should not receive these options or this should be updated', keys);
  }

  walk(_walker, ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    switch (nodeType + (beforeWalk ? ':before' : ':after')) {
      case 'IfStatement:before': {
        if (node.consequent.body.length === 0) {
          rule('if-else empty consequent is inverted if');
          example('if (x) {} else { $(x); }', 'if (!x) { $(y) }');
          before(node);

          node.test = AST.unaryExpression('!', node.test);
          node.consequent = node.alternate;
          node.alternate = null;

          after(node);
          return true;
        }
        break;
      }
    }
  }

  console.log('\n\nAST should be denormed a bit...\n\n\n\n\n');
}

