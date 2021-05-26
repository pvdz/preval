// Find functions for which a certain param is always called with a specific primitive

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  fmat,
  tmat,
  findBodyOffset,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { mayBindingMutateBetweenRefs } from '../bindings.mjs';
import { getPrimitiveValue } from '../ast.mjs';

export function inlineIdenticalParam(fdata) {
  group('\n\n\nChecking for params which are always a certain primitive');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _inlineIdenticalParam(fdata);
  groupEnd();
  return r;
}
function _inlineIdenticalParam(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let updated = processAttempt(fdata);

  log('');
  if (updated) {
    log('Params replaced:', updated, '. Restarting from phase1 to fix up read/write registry');
    return 'phase1';
  }
  log('Params replaced: 0.');
}

function processAttempt(fdata) {
  // Find arrays which are constants and do not escape and where all member expressions are reads

  let changed = 0;

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (!meta.isConstant) return;
    if (meta.constValueRef.node.type !== 'FunctionExpression') return;
    if (meta.constValueRef.node.$p.readsArgumentsAny) return;
    if (meta.constValueRef.node.$p.readsArgumentsLen) return;

    vgroup('- `' + name + '` is a constant function');
    if (process(meta, name)) ++changed;
    vgroupEnd();
  });

  return changed;
}

function process(meta, name) {
  const funcNode = meta.constValueRef.node;

  if (!meta.reads.length) {
    vlog('There were no reads to this function. Bailing');
    return false;
  }

  const params = funcNode.params;
  if (params.some(pnode => pnode.rest)) {
    vlog('The function has a rest param. Bailing');
    return false;
  }

  let knownArgs = undefined;
  let knownValues = params.map(() => undefined);
  if (
    meta.reads.some((read, ri) => {
      const callNode = read.parentNode;

      if (callNode.type !== 'CallExpression') {
        vlog('At least one read was not a call expression. Bailing');
        return true;
      }
      if (read.parentProp !== 'callee') {
        vlog('The value is "lost", passed on as func arg. Bailing');
        return true;
      }

      const args = callNode['arguments'];

      if (args.some((anode) => anode.type === 'SpreadElement')) {
        vlog('At least one call contained a spread. Bailing');
        return true;
      }

      vlog(
        'Call',
        ri,
        ':',
        args.map((anode) => (AST.isPrimitive(anode) ? AST.getPrimitiveValue(anode) : '<not prim>')),
      );

      if (knownArgs) {
        params.forEach((_, pi) => {
          const anode = args[pi];

          if (anode) {
            // If arg wasn't already invalidated for this rule
            if (knownArgs[pi] !== false) {
              if (!AST.isPrimitive(anode)) {
                vlog('Param', pi, 'received at least one non-primitive value. No longer considering this param');
                knownArgs[pi] = false;
              } else {
                const p = getPrimitiveValue(anode);
                if (p !== knownValues[pi]) {
                  vlog(
                    'Param',
                    pi,
                    'received at least two distinct primitive values(',
                    p,
                    'and',
                    knownValues[pi],
                    '. No longer considering this param',
                  );
                  knownArgs[pi] = false;
                }
              }
            }
          } else {
            const knownArg = knownArgs[pi];
            if (knownArg !== false) {
              if (knownValues[pi] !== undefined) {
                vlog('Param', pi, 'Received two different primitive values (or none at all). No longer considering this param');
                knownArgs[pi] = false;
              }
            }
          }
        });
      } else {
        // First call. Initialize the known args accordingly. There must be at least one call.

        knownArgs = params.map((_, pi) => {
          const anode = args[pi];
          if (!anode) {
            knownValues[pi] = undefined;
            return true;
          } else if (AST.isPrimitive(anode)) {
            knownValues[pi] = AST.getPrimitiveValue(anode);
            return true;
          } else {
            return false;
          }
        });

        vlog('Known initialized to', knownArgs, knownValues);
      }

      if (knownArgs.every((a) => a === false)) return true;
    })
  ) {
    return false;
  }

  vlog('Looks like there was at least one param that was always called with the same primitive value. Lets inline it!');
  vlog('::', knownArgs, knownValues);

  const varWrite = meta.writes.find((write) => write.kind === 'var');
  ASSERT(varWrite);

  rule('A function using `arguments.length` that is always called with the same arg count can replace the reference');
  example('function f() { f(arguments.length); } f(1, 2); f(3, 4);', 'function f() { f(2); } f(1, 2); f(3, 4);');
  before(funcNode, varWrite.blockBody);

  vlog('Dropping args from calls now...');
  // For every position that is not false, from right to left, remove argument n from all calls to this function
  for (let i = knownArgs.length - 1; i >= 0; --i) {
    vlog('- Arg', i, knownArgs[i], knownValues[i]);
    if (knownArgs[i]) {
      const paramNode = params[i];
      ASSERT(paramNode?.type === 'Param');

      if (paramNode.$p.paramVarDeclRef) {
        const varDecl = paramNode.$p.paramVarDeclRef.blockBody[paramNode.$p.paramVarDeclRef.blockIndex];
        ASSERT(varDecl?.type === 'VariableDeclaration', 'var decl ye?', paramNode.$p.paramVarDeclRef.blockIndex, varDecl, i, paramNode);

        params.splice(i, 1);
        paramNode.$p.paramVarDeclRef.blockBody[paramNode.$p.paramVarDeclRef.blockIndex] = AST.emptyStatement();
        const freshVarNode = AST.variableDeclaration(varDecl.declarations[0].id.name, AST.primitive(knownValues[i]), varDecl.kind)
        funcNode.body.body.splice(
          funcNode.$p.bodyOffset,
          0,
          freshVarNode,
        );
        //vlog('Added', varDecl.declarations[0].id.name, freshVarNode, knownValues[i], '->', AST.primitive(knownValues[i]))
      }

      meta.reads.forEach((read) => {
        // Drop this arg from the read call
        read.parentNode['arguments'].splice(i, 1);
      });
    }
  }
  vlog('Renaming Param nodes to eliminate holes we may have left')
  params.forEach((paramNode, pi) => {
    // Make sure the params are incremental in order. We can't leave any holes.
    if (paramNode.index !== pi) {
      // Dont need to set index but :shrug:
      paramNode.index = pi;
      paramNode.$p.paramVarDeclRef.node.index = pi;
      paramNode.name = '$$' + pi;
      paramNode.$p.paramVarDeclRef.node.name = '$$' + pi;
    }
  });

  after(funcNode, varWrite.blockBody);

  return true;
}
