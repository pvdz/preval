// This attempts to clean up the output and generate regular JS again, eliminating some obvious artifacts from Preval
// Given code should be normalized and the settled result of running Preval

import walk from '../../lib/walk.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before, after, assertNoDupeNodes, rule, example } from '../utils.mjs';
import { VERBOSE_TRACING } from '../constants.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_LOOP_UNROLL, SYMBOL_MAX_LOOP_UNROLL } from '../symbols_preval.mjs';

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
    const wat = nodeType + (beforeWalk ? ':before' : ':after');
    switch (wat) {
      case 'FunctionExpression:before': {
        // Undo function header
        const start = node.body.body.length;
        do {
          // A function header exists as long as the initial var decls have a Param as rhs

          const next = node.body.body[0];
          if (!next) break;

          if (next.type === 'DebuggerStatement') {
            // Only emit for the header boundary case...

            rule('Drop custom function headers');
            example('function f($$0, $$1) { const x = $$0; const y = $$1; Debugger; }', 'function f(x, y) {}');
            before(node);

            node.body.body.shift();

            after(node);
            break;
          }

          if (next.type !== 'VariableDeclaration') break;

          const init = next.declarations[0].init;
          if (init.type === 'Param') {
            node.params[init.index] = next.declarations[0].id;
            node.body.body.shift();
          } else if (init.type === 'ThisExpression') {
            // Keep but skip (`const alias = this`).
          } else if (init.type === 'Identifier' && init.name === 'arguments') {
            // Keep but skip (`const alias = arguments`).
          } else if (init.type === 'MemberExpression' && !init.computed && init.object.type === 'Identifier' && init.object.name === 'arguments' && init.object.property.name === 'length') {
            // Keep but skip (`const alias = arguments.length`)
          } else {
            // We must have found the end of the header, or what's left of it.
            break;
          }
        } while (true);

        if (node.body.body.length !== start) {
          // We have (partially) deleted the function header so revisit. Not sure if this is necessary but for the sake of consistency...
          return;
        }

        const last = node.body.body[node.body.body.length - 1];
        if (last?.type === 'ReturnStatement' && last.argument.type === 'Identifier' && last.argument.name === 'undefined') {
          rule('Drop `return undefined` as last statement of functions');
          example('function f() { return undefined; }', 'function f() {}');
          before(node);

          node.body.body.pop();

          after(node);
          return;
        }
        break;
      }
      case 'IfStatement:before': {
        if (node.consequent.body.length === 0) {
          rule('if-else empty consequent is inverted if');
          example('if (x) {} else { $(x); }', 'if (!x) { $(y) }');
          before(node);

          node.test = AST.unaryExpression('!', node.test);
          node.consequent = node.alternate;
          node.alternate = null;

          after(node);
          return;
        }
        if (node.alternate.body.length === 0) {
          rule('if-else empty alternate should drop alternate');
          example('if (x) { $(x); } else {}', 'if (x) { $(y) }');
          before(node);

          node.alternate = null;

          after(node);
          return;
        }
        break;
      }
      case 'WhileStatement:before': {
        if (node.test.type === 'Identifier' && (node.test.name === SYMBOL_MAX_LOOP_UNROLL || node.test.name.startsWith(SYMBOL_LOOP_UNROLL))) {
          rule('While loops should have boolean true condition');
          example('while (SYMBOL_MAX_LOOP_UNROLL) {}', 'while (true) {}');
          before(node);

          node.test = AST.primitive(true);

          after(node);
          return;
        }

        break;
      }
    }
  }

  console.log('\n\nAST should be denormed a bit...\n\n\n\n\n');
}

