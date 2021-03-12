import { log, group, groupEnd, ASSERT, BLUE, RED, RESET, tmat, fmat, TRIBE, PURPLE, DIM, YELLOW } from '../utils.mjs';
import { getIdentUsageKind, createFreshVar, createReadRef, createWriteRef } from '../bindings.mjs';
import * as AST from '../ast.mjs';
import { pruneEmptyFunctions } from './phase2emptyfunc.mjs';
import { pruneTrampolineFunctions } from './phase2trampoline.mjs';
import { pruneExcessiveParams } from './phase2exparam.mjs';
import { inlineConstants } from './phase2inlineconstants.mjs';
import { promoteVars } from './phase2promotevars.mjs';

let VERBOSE_TRACING = true;

const ALIAS_PREFIX = 'tmpPrevalAlias';
const THIS_ALIAS_BASE_NAME = ALIAS_PREFIX + 'This';
const ARGUMENTS_ALIAS_PREFIX = ALIAS_PREFIX + 'Arguments';
const ARGUMENTS_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Any';
const ARGLENGTH_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Len'; // `arguments.length`, which is easier than just `arguments`

// Things to do
// - Inline local constants, numbers, literal idents
// - Inline imported constants
// - Unroll a function when called with a primitive
// - Branch out
// - Const binding folding (const a = $(); const b = a; -> redundant)
// - Unary negative/positive should look at argument

function rule(desc, ...rest) {
  log(TRIBE + 'Rule:' + RESET + ' "' + desc + '"', ...rest);
}
function example(from, to, condition) {
  if (!VERBOSE_TRACING) return;
  if (!condition || condition()) {
    log(PURPLE + '--' + RESET + ' `' + from + '` ' + PURPLE + '-->' + RESET + ' `' + to + '`');
  }
}

function before(node, parent) {
  if (!VERBOSE_TRACING) return;
  if (Array.isArray(node)) node.forEach((n) => before(n, parent));
  else {
    const parentCode = parent && (typeof node === 'string' ? node : tmat(parent).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
    if (parent && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
    log(YELLOW + 'Before:' + RESET, nodeCode);
  }
}

function source(node) {
  if (VERBOSE_TRACING) {
    if (Array.isArray(node)) node.forEach((n) => source(n));
    else {
      let code = tmat(node);
      try {
        code = fmat(code); // May fail.
      } catch {}
      if (code.includes('\n')) {
        log(YELLOW + 'Source:' + RESET);
        group();
        log(code);
        groupEnd();
      } else {
        log(YELLOW + 'Source:' + RESET, code);
      }
    }
  }
}

function after(node, parentNode) {
  if (!VERBOSE_TRACING) return;
  if (Array.isArray(node)) node.forEach((n) => after(n, parentNode));
  else {
    const parentCode = parentNode && (typeof node === 'string' ? node : tmat(parentNode).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
    log(YELLOW + 'After :' + RESET, nodeCode);
    if (parentNode && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
  }
}

export function phase2(program, fdata, resolve, req, verbose = VERBOSE_TRACING) {
  VERBOSE_TRACING = verbose;
  if (fdata.len > 10 * 1024) VERBOSE_TRACING = false; // Only care about this for tests or debugging. Limit serialization for larger payloads for the sake of speed.

  group('\n\n\n##################################\n## phase2  ::  ' + fdata.fname + '\n##################################\n\n\n');

  // Initially we only care about bindings whose writes have one var decl and only assignments otherwise
  // Due to normalization, the assignments will be a statement. The var decl can not contain an assignment as init.
  // Elimination of var decls or assignments will be deferred. This way we can preserve parent/node
  // relationships which might otherwise break. This means a binding may have been removed from the books
  // even though it's technically still part of the AST. But since we take the books as leading in this step
  // that should not be a problem.

  const ast = fdata.tenkoOutput.ast;

  const emptyFuncs = pruneEmptyFunctions(fdata);
  if (emptyFuncs) return emptyFuncs;

  const trampFuncs = pruneTrampolineFunctions(fdata);
  if (trampFuncs) return trampFuncs;

  const prunedParams = pruneExcessiveParams(fdata);
  if (prunedParams) return prunedParams;

  const inlinedConstants = inlineConstants(fdata);
  if (inlinedConstants) return inlinedConstants;

  const promoted = promoteVars(fdata);
  if (promoted) return promoted;

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

  // The read/write data should still be in tact

  if (VERBOSE_TRACING) log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  groupEnd();
}
