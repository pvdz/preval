import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
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
  source,
  REF_TRACK_TRACING,
  assertNoDupeNodes, rule, example, before, after,
} from '../utils.mjs';
import { pcanCompile, pcompile, pcodeSupportedBuiltinFuncs, runPcode, SO_MESSAGE } from '../pcode.mjs';

// This phase walks the AST to verify and compile eligible functions into pcode
// Since this is a bit of a chicken-egg problem ("a function may be pcode-able
// but only if another function is pcode-able too") we'll first collect all the
// funcs and then bucket them based on whether or not they call none or only
// functions that are already validated to compile.
// We can't guarantee that a function actually completes ("halting problem")
// so this will have to happen at runtime through a counter of sorts.

export function freeFuncs(fdata, prng, usePrng) {
  group('\n\n\nChecking for free function calls to simulate and resolve\n');
  //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');
  const r = _freeFuncs(fdata, prng, usePrng);
  groupEnd();
  return r;
}

export function _freeFuncs(fdata, prng, usePrng) {
  const ast = fdata.tenkoOutput.ast;

  let changed = 0;
  const start = Date.now();

  // Find function expression nodes.
  // For each such function, apply a loose pcode-test, which should collect all
  // called idents, if it compiles at all.
  // Then for each such function, create a set of names and repeatedly loop through
  // the set to move any function from unknown to compilable where all idents are
  // also in compilable. What remains is dropped.
  // (We can try to cover indirect recursion cases when we need to)

  // This is normalized code so all func exprs should be a statement (not very likely), var decl, or assignment
  // We only care about the cases where they are an assignment or var decl, so we should have a name.

  /** @var {Map<string, {func: FunctionExpressionNode, calls: Set<string>}>} */
  const candidates = new Map;
  /** @var {Map<string, FunctionExpressionNode|true>} we need the func node because a let binding can have multiple funcs assigned to it. true means its a built-in we support */
  const validated = new Map(Array.from(pcodeSupportedBuiltinFuncs).map(name => [name, true]));
  /** @var {Set<string>} */
  const validatedUserFuncNames = new Set;

  function _funcWalker(node, before, nodeType, path) {
    if (before) return;
    if (nodeType !== 'FunctionExpression') return;

    const pathNodes = path.nodes;
    const pathProps = path.props;
    const pathIndexes = path.indexes;

    const parentNode = pathNodes[pathNodes.length - 2];
    const parentProp = pathProps[pathProps.length - 1];
    const parentIndex = pathIndexes[pathIndexes.length - 1];

    if (parentNode.type === 'Property') {
      // Object method. Skip.
      return;
    }

    if (parentNode.type === 'ExpressionStatement') {
      // While normalized code should not contain func statements, it's possible that
      // phase2 bounced back to phase1 without going through normalization and that
      // it left func statements.
      return;
    }
    if (parentNode.type === 'MethodDefinition') {
      // Objlit (and class) methods
      return;
    }
    ASSERT(parentNode.type === 'VariableDeclarator' || (parentNode.type === 'AssignmentExpression' && parentProp === 'right'), 'I dont think a function statement should reach here. It should be normalized away.', parentNode.type);

    const funcName = parentNode.type === 'VariableDeclarator' ? parentNode.id.name : parentNode.left.name;
    vgroup('- Can @', +node.$p.pid, '("', funcName, '") be compiled to pcode?');
    const conditionalNames = pcanCompile(node, fdata, funcName);
    vlog('~~>', conditionalNames ? 'Yes, provided the funcs it calls can too;' : 'nope', conditionalNames || '');
    vgroupEnd();
    if (conditionalNames) {
      if (conditionalNames.size === 0 || (conditionalNames.size === 1 && conditionalNames.has(funcName))) {
        validated.set(funcName, node);
        validatedUserFuncNames.add(funcName);
      } else {
        candidates.set(funcName, {func: node, calls: conditionalNames});
      }
    }
  }

  const now = Date.now();
  group('Walking AST to scan funcs for pcode validation...');
  walk(_funcWalker, ast, 'ast');
  groupEnd();
  log('Walked AST to scan funcs for pcode validation', Date.now() - now, 'ms, found', validatedUserFuncNames.size, 'validated funcs and', candidates.size, 'candidate funcs that were pcode compatible');

  // Try to validate or reject the candidates
  // Each cycle, see if all called names (or itself) are in validated. If so, move to validated as well.
  // Keep doing so until there are no more changes. The rest is thereby invalidated.

  let changes = true;
  while (changes) {
    changes = false;
    for (const [funcName, {func, calls}] of candidates.entries()) {
      // Either a direct recursive call, or all functions being called are also (going to be) compiled to pcode
      let all = true;
      calls.forEach(callee => {
        if (callee === funcName || validated.has(callee)) return;
        all = false;
      })
      if (all) {
        candidates.delete(funcName);
        validated.set(funcName, func);
        validatedUserFuncNames.add(funcName);
        changes = true;
      }
    }
  }

  vlog('Funcs validated to compile to pcode:', validatedUserFuncNames);
  vlog('Candidates that were rejected for calling non-validated funcs:', candidates.keys());

  /** @var {Map<pid | name, {name: string, pcode: Pcode}>} */
  fdata.pcodeOutput = new Map;
  if (validatedUserFuncNames.size > 0) {
    vlog('Now compiling validated funcs'); // We should lazily compile them, actually. Init to undefined and compile them when used...

    validated.forEach((funcNode, funcName) => {
      if (!pcodeSupportedBuiltinFuncs.has(funcName) ) {
        vgroup('-', funcName);
        const pcode = pcompile(funcNode, fdata);
        fdata.pcodeOutput.set(+funcNode.$p.pid, { pcode, funcNode, name: funcName });
        fdata.pcodeOutput.set(funcName, { pcode, funcNode, name: funcName });

        const meta = fdata.globallyUniqueNamingRegistry.get(funcName);
        // Only process constant functions for now
        if (meta.isConstant) {
          meta.reads.forEach((read) => {
            if (
              read.parentNode.type === 'CallExpression' &&
              read.parentProp === 'callee' &&
              read.parentNode.arguments.every(anode => AST.isPrimitive(anode))
            ) {
              // This is a call with only primitives that we should be able to resolve...
              rule('Pcode compiled functions with primitive args can be resolved');
              example('f(1,2)', '3');
              before(read.blockBody[read.blockIndex]);

              const args = read.parentNode.arguments.map(anode => AST.getPrimitiveValue(anode));
              vlog('Simulating a call to "', funcName, '" with args', args);
              const out = runPcode(funcName, args, fdata.pcodeOutput, fdata, prng, usePrng);
              vlog('pcode result:', out);

              if (out === SO_MESSAGE) {
                // This returned the stack overflow error message. Assuming that's what it was.
                vlog('Compiling a stack overflow error');
                read.blockBody[read.blockIndex] = AST.throwStatement(AST.primitive(
                  SO_MESSAGE + '; calling `' + tmat(read.blockBody[read.blockIndex], true) + '`'
                ));
              } else {
                if (read.grandIndex < 0) read.grandNode[read.grandProp] = AST.primitive(out);
                else read.grandNode[read.grandProp][read.grandIndex] = AST.primitive(out);
              }

              after(read.blockBody[read.blockIndex]);
              changed += 1;
            }
          });
        }
        vgroupEnd();
      }
    });

    vlog('Compilation finished'); // We should lazily compile them, actually. Init to undefined and compile them when used...
  }

  assertNoDupeNodes(ast, 'body');

  log('\n\nEnd of phase 1.2, walker took', Date.now() - start, 'ms');

  groupEnd();

  if (changed) {
    log('Free func calls dropped:', changed, '. Restarting from phase1');
    return {what: 'bitSetTests', changes: changed, next: 'phase1'};
  }

  log('Free func calls dropped: 0.');
}
