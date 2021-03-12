import {
  log,
  group,
  groupEnd,
  ASSERT,
  BLUE,
  RED,
  RESET,
  tmat,
  fmat,
  TRIBE,
  PURPLE,
  DIM,
  YELLOW,
  rule,
  example,
  before,
  source,
  after,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { VERBOSE_TRACING } from '../constants.mjs';

export function inlineSimpleFuncCalls(fdata) {
  group('\n\n\nChecking for func calls that can be inlined');
  let inlinedFuncCount = 0;
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isConstant && meta.constValueRef) {
      ASSERT(meta.writes.length === 1);
      const funcNode = meta.constValueRef.node;
      if ((funcNode.type === 'FunctionExpression' || funcNode.type === 'ArrowFunctionExpression') && funcNode.$p.inlineMe) {
        meta.reads.forEach((read) => {
          if (read.parentNode.type === 'CallExpression' && read.parentProp === 'callee') {
            // This read was a call to the function
            if (funcNode.$p.inlineMe === 'single return with primitive') {
              rule('Function that only returns primitive must be inlined');
              example('function f() { return 5; } f();', '5;');
              before(read.node, read.parentNode);

              if (read.grandIndex >= 0) {
                read.grandNode[read.grandProp][read.grandIndex] = AST.cloneSimple(funcNode.body.body[0].argument);
              } else {
                read.grandNode[read.grandProp] = AST.cloneSimple(funcNode.body.body[0].argument);
              }
              ++inlinedFuncCount;

              after(read.parentNode);
            } else if (funcNode.$p.inlineMe === 'double with primitive') {
              rule('Function that returns local primitive should be inlined');
              example('function f() { const x = undefined; return x; } f();', 'undefined;');
              before(read.node, read.parentNode);

              if (read.grandIndex >= 0) {
                read.grandNode[read.grandProp][read.grandIndex] = funcNode.body.body[0].declarations[0].init;
              } else {
                read.grandNode[read.grandProp] = funcNode.body.body[0].declarations[0].init;
              }
              ++inlinedFuncCount;

              after(read.parentNode);
            } else if (funcNode.$p.inlineMe === 'double with array with primitives') {
              rule('Function that returns array literal with only primitives should be inlined');
              example('function f() { const arr = [1, 2]; return arr; } f();', '[1, 2];');
              before(read.node, read.parentNode);

              if (read.grandIndex >= 0) {
                read.grandNode[read.grandProp][read.grandIndex] = funcNode.body.body[0].declarations[0].init;
              } else {
                read.grandNode[read.grandProp] = funcNode.body.body[0].declarations[0].init;
              }
              ++inlinedFuncCount;

              after(read.parentNode);
            }
          }
        });
      }
    }
  });
  groupEnd();
  log('Inlined', inlinedFuncCount, 'function calls.');
  if (inlinedFuncCount > 0) {
    log('Restarting from phase1 to fix up read/write registry\n\n\n\n\n\n');
    groupEnd();
    return 'phase1';
  }
}
