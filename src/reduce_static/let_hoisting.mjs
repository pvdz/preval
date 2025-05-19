// Find let declarations with static values (primitives, obj/arr with static values, etc) and move
// them up as high as possible in an attempt to put the decl before any read/write of closures.

// The ideal position for a let is to be above all other refs and to be as low as possible in its scope
// This way earlier side effects can be completely ignored for its analysis

// There are three tricks applied in this file
// - 1: move let statements above closure references, attempting to make it the first ref
// - 2: multi-scope write-only SSA, where each scope starts with a write ref that can be reached from all other reads in that scope
// - 3: move lets inward if they are only used inside a particular scope
// (TODO: split up)

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
  findBodyOffset, todo,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { createFreshVar, mayBindingMutateBetweenRefs } from '../bindings.mjs';
import {RESET, GREEN, VERBOSE_TRACING} from '../constants.mjs';
import { SYMBOL_FRFR } from '../symbols_preval.mjs';

export function letHoisting(fdata) {
  group('\n\n\n[letHoisting] Checking for let decls to move up');
  //currentState(fdata, 'letHoisting', true, fdata);
  const r = _letHoisting(fdata);
  groupEnd();
  return r;
}
function _letHoisting(fdata) {
  const ast = fdata.tenkoOutput.ast;

  let updated = processAttempt1MoveVarDeclAboveClosure(fdata);

  if (!updated) {
    updated = processAttempt3OnlyUsedInOtherScope(fdata);
  }

  //if (!updated) {
  //  // TODO: this breaks tests/cases/self_assign_closure/self_assign_closure1.md
  //  //       but it is required for something like tests/cases/ssa/back2back_x_x_plus_1_assign3.md to get around the `x=y; if($) x` case
  //  //updated = processAttempt2multiScopeWriteReadOnly(fdata);
  //}

  log('');
  if (updated) {
    log('Var decls moved up:', updated, '. Restarting from phase1 to fix up read/write registry');
    return {what: 'letHoisting', changes: updated, next: 'phase1'};
  }
  log('Var decls moved up: 0.');
}

function processAttempt1MoveVarDeclAboveClosure(fdata) {
  vlog('\nLet hoisting, attempt 1: try to move var decls above closure references');

  let updated = 0;
  let blockQueue = new Set(); // Map<block, Array<{from, to}>>
  let varNodeSet = new Set(); // Set of all var nodes we wish to move. We can ignore any other node.

  fdata.globallyUniqueNamingRegistry.forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (meta.isConstant) return;
    //if (!meta.varDeclRef) return; // catch

    vgroup('- `' + meta.uniqueName + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    const rwOrder = meta.rwOrder;
    vlog('rwOrder:', [rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.node.$p.pid + ':' + o.blockIndex).join(', ')]);

    let declWrite = undefined;
    let declIndex = -1;
    meta.writes.some((write, i) => {
      if (write.kind === 'var') {
        declWrite = write;
        declIndex = i;
        return true;
      }
    });

    if (!declWrite) {
      // Catch? (Right now that's global but in the future maybe). I dunno.
      vlog('- Binding was not a var decl, bailing');
      //todo(`what kind of other bindings do we declare?`, meta);
      vgroupEnd();
      return;
    }

    if (declWrite === rwOrder[0]) {
      vlog('- Binding decl is already first ref');
      vgroupEnd();
      return;
    }

    const block = declWrite.blockBody;

    blockQueue.add(block);
    varNodeSet.add(declWrite.blockBody[declWrite.blockIndex]);

    vgroupEnd();
  });

  vlog('Queued', blockQueue.size, 'blocks for reordering, having', varNodeSet.size, 'var nodes to consider');
  vlog(
    'Var pids:',
    [...varNodeSet].map((n) => n.$p.pid),
  );

  // We now have a list of elements that want to move
  // Each block (program.body or block.body) that has at least one decl to move will have an entry in the map
  // Each block may have multiple decls that want to move. In that case a fixed ordering must be determined ahead of time
  // to prevent infinite loops where decls are flip-flopping between each other. This may lead to having to make an arbitrary
  // choice of leaving a decl in a sub-optimal place, like with flip-flop recursion.

  function shouldMoveUp(curr, prev) {
    vgroup('- shouldMoveUp(curr:', curr.type, ', prev:', prev.type, ')');
    const r = _shouldMoveUp(curr, prev);
    vlog('==>', r);
    vgroupEnd();
    return r ? -1 : 0;
  }
  function _shouldMoveUp(curr, prev) {
    // Should the current var decl node be moved one line up to be above its prev node, or not?
    // Note that we want stable sort, not lazy sort. So even if two nodes are considered equal
    // based on their init, they must still be sorted based on their name, which may lead to
    // otherwise unnecessary checks. The stability prevents infinite loops across cycles.

    if (curr.type !== 'VarStatement') {
      vlog('- curr is not a var. Do not move up.');
      return false;
    }

    if (prev.type !== 'VarStatement') {
      vlog('- prev is not a var. testing other cases');
      // We're now basically doing AST.nodeHasNoObservableSideEffectIncStatements checks or whatever it is
      if (prev.type === 'ExpressionStatement') {
        if (
          prev.expression.type === 'CallExpression' &&
          prev.expression.callee.type === 'MemberExpression' &&
          prev.expression.callee.object.type === 'Identifier' &&
          prev.expression.callee.object.name === 'console' &&
          !prev.expression.callee.computed &&
          ['log', 'warn', 'error', 'info', 'debug', 'group', 'groupEnd', 'trace'].includes(prev.expression.callee.property.name) &&
          prev.expression.arguments.every(e => !e || AST.isPrimitive(e))
        ) {
          // This is a statement level `console.log(a,b,c)` with only primitive values as args
          // It can't spy on the state of the code, other than the stack trace of course
          return true;
        }
        if (
          prev.expression.type === 'CallExpression' &&
          prev.expression.callee.type === 'Identifier' &&
          prev.expression.callee.name === SYMBOL_FRFR
        ) {
          // This is a statement level `frfr`. That's going to be eliminated.
          // It can't spy on the state of the code, other than the stack trace of course
          return true;
        }
      }

      return false;
    }

    const nameCurr = curr.id.name;
    const namePrev = prev.id.name;
    vlog('- `' + nameCurr + '`, and `' + namePrev + '`');

    const basedOnName = nameCurr < namePrev; // All other things equal, if we order by name, should it move up? A common default.

    if (AST.isPrimitive(prev) && !basedOnName) {
      // No need to check if curr is a primitive. We want this one on top regardless.
      vlog('- prev is primitive and name should go first so do not move up');
      return false;
    } else if (AST.isPrimitive(curr)) {
      vlog('- curr is primitive, move up');
      // Since prev was not primitive and curr is (or curr should be above prev if they are both primitives), we want curr on top
      return true;
    }

    const initCurr = curr.init;
    const initPrev = prev.init;

    if (!AST.expressionHasNoObservableSideEffect(initCurr)) {
      vlog('- Curr init had observable side effect so not moving up');
      return false;
    }
    if (!AST.expressionHasNoObservableSideEffect(initPrev)) {
      vlog('- Prev init had observable side effect so not moving up');
      return false;
    }

    // Expensive path. We must now cross check whether either init contains a reference to the other name being bound.
    // Unfortunate because this means TDZ is inevitable and it's very unlikely to ever occur in real world code.
    // Note: this check also returns true for unsupported nodes like IfStatement or Super
    const currMayContainPrev = AST.ssaCheckMightContainIdentName(initCurr, namePrev);
    const prevMayContainCurr = AST.ssaCheckMightContainIdentName(initPrev, nameCurr);

    if (currMayContainPrev !== false && prevMayContainCurr !== false) {
      ASSERT(false, 'make a test case, proof this can happen, both inits cross reference each other');
      return basedOnName;
    }
    // The prev may also be another kind of node, like WhileStatement. In that case it will return undefined.
    // In those cases we would definitely want to keep prev where it is.
    if (currMayContainPrev !== false) return false; // curr must come second
    if (prevMayContainCurr !== false) return true; // prev must come second

    // Both inits are non-primitives and do not refer to the other. If one is a func, prefer the other on top.
    if (prev.type === 'FunctionExpression') {
      if (curr.type !== 'FunctionExpression') {
        // prev is func, curr is not, so keep prev on top
        vlog('prev is func, curr is not, move curr up');
        return true;
      }
    } else if (curr.type === 'FunctionExpression') {
      // Prev is neither primitive nor function and curr is a function. Prefer prev above.
      vlog('curr is func, prev is not, do not move up');
      return false;
    }

    // Both var inits are complex but do not reference the other binding so order it by name
    vlog('- init is not special in this context, base order on name');
    return basedOnName;
  }

  blockQueue.forEach((block) => {
    vlog('Reordering next block...');
    source(block);
    const blockBefore = block.map((n) => n.$p.pid).join(',');

    block.forEach((node, i) => {
      vlog('  - node', i);
      if (varNodeSet.has(node)) {
        vlog('    - node to consider...');
        while (i && shouldMoveUp(node, block[i - 1])) {
          rule('When a block should be above another, move it');
          example('???', '!!!');
          before(block);

          block.splice(i, 1);
          block.splice(i - 1, 0, node);

          after(block);
        }
      }
    });

    const blockAfter = block.map((n) => n.$p.pid).join(',');
    //vlog('Block before:', blockBefore);
    //vlog('Block after :', blockAfter);
    if (blockBefore !== blockAfter) {
      ++updated;
    }
  });

  if (!updated) {
    vlog('Attempt 1 did not update anything');
  }
  return updated;
}
function processAttempt2multiScopeWriteReadOnly(fdata) {
  vlog('\nLet hoisting, attempt 2: trying cross scope write-read only SSA');

  let updated = 0;
  let toInject = new Map(); // Map<pid, [names]>

  new Map(fdata.globallyUniqueNamingRegistry).forEach(function (meta, name) {
    if (meta.isBuiltin) return;
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // The initial write may still be observed by an import so skip exports for now
    if (meta.isConstant) return;

    vgroup('- `' + meta.uniqueName + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    process2(meta, name);

    vgroupEnd();
  });

  function process2(meta, name) {
    const rwOrder = meta.rwOrder;
    vlog('rwOrder[func:pid:blockindex]:', [
      rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.pfuncNode.$p.pid + ':' + o.node.$p.pid + ':' + o.blockIndex).join(', '),
    ]);

    // We must show that every read was preceded by a write and had no observable side effects between them.
    // If that's the case then the initial binding value must be irrelevant and all writes can be SSA'd.
    // Must beware of loops.

    vgroup('First walk of refs');
    let failed = false;
    const prevMap = new Map(); // Map<func, Array<write>>. The writes, if multiple, should match the rwOrder order.
    const funcs = new Set();
    rwOrder.some((ref, ri) => {
      vgroup('-', ri, ':', ref.action, ref.kind, ', scope:', ref.pfuncNode.$p.pid, ', blockChain:', ref.blockChain);
      const r = processRef(ref, ri);
      vgroupEnd();
      return r;
    });
    function processRef(ref, ri) {
      const prevArr = prevMap.get(ref.pfuncNode);
      // Find the nearest write that the current ref can reach. This prevents write shadowing in a different branch.
      vlog('Prev write blockChains in this scope:', prevArr ? prevArr.map((write) => write.blockChain) : '(no prev)');
      let prev;
      if (prevArr) {
        for (let i = prevArr.length - 1; i >= 0; --i) {
          if (ref.blockChain.startsWith(prevArr[i].blockChain)) {
            prev = prevArr[i];
            break;
          }
        }
      }
      if (!prev) {
        vlog('No prev in this scope');
        if (ref.action === 'write') {
          if (!prevArr) prevMap.set(ref.pfuncNode, [ref]);
          else prevArr.push(ref);
          funcs.add(ref.pfuncNode);
        } else if (ref.action === 'read') {
          vlog('First read had no write before it');
          failed = true;
          return true;
        } else {
          ASSERT(false);
        }
        return;
      }

      if (ref.action === 'read') {
        if (ref.innerLoop !== prev.innerLoop) {
          vlog('This ref is inside a different loop as the write. It may be affected by different writes. Bailing.');
          failed = true;
          return;
        }

        if (!ref.blockChain.startsWith(prev.blockChain)) {
          vlog('At least one read could not reach a write in the same scope so we bail');
          failed = true;
          return true; // stop
        }

        const observable = mayBindingMutateBetweenRefs(meta, prev, ref);
        if (observable) {
          vlog('At least one statement between previous ref and this one had an observable side effect. Bailing.');
          failed = true;
          return true;
        }

        funcs.add(ref.pfuncNode);
        vlog('Found read preceded by a write in the same body. Adding', ref.pfuncNode.$p.pid, 'as funcs, now at', funcs.size);
      } else if (ref.action === 'write') {
        if (!prevArr) prevMap.set(ref.pfuncNode, [ref]);
        else prevArr.push(ref);
      } else {
        ASSERT(false);
      }
    }
    vlog('End of ref walk');
    vgroupEnd();

    if (failed) {
      vlog('At least one blocker, bailing');
      return;
    }

    if (funcs.size <= 1) {
      vlog('Since only one function contained this ref this version of SSA would not change anything. Bailing');
      return;
    }

    vlog('All reads had a write before it. Applying SSA for all of them somehow');
    vlog(
      'Found function scopes:',
      [...funcs].map((n) => n.$p.blockChain),
    );

    rule('If every read of a closure is preceded by a local write, the closure can be eliminated');
    example(
      'let x = 1; function f(){ x = 2; $(x); } function g() { x = 3; $(x); }',
      'let x = 1; function f() { let tmp = 2; $(tmp); } function g(){ let tmp2 = 3; $(tmp2); }',
    );
    before(rwOrder[0]?.blockBody[rwOrder[0]?.blockIndex]);

    rwOrder.forEach((ref) => before(ref.blockBody[ref.blockIndex]));

    vlog('The ref is used in', funcs.size, 'scopes. Will eliminate the original binding scope.');

    vgroup();
    funcs.forEach((n) => {
      if (n === meta.bfuncNode) return; // Dont add another binding to the scope that currently already had the binding...
      const tmpName = createFreshVar('tmpssa2_' + name, fdata);
      vlog('- Prepared to inject a fresh var: `' + tmpName + '` into scope pid ' + n.$p.pid, '(will be queued)');
      n.$p.ssaName = tmpName;
      // Need to inject it afterwards because otherwise indexes get shuffled around, breaking this file for sibling refs
      const arr = toInject.get(n);
      if (arr) {
        arr.push(tmpName);
      } else {
        toInject.set(n, [tmpName]);
      }
    });
    vgroupEnd();

    vgroup('Rename all refs');
    rwOrder.some((ref) => {
      if (ref.pfuncNode === meta.bfuncNode) return; // Keep the name in this scope
      // Every function gets a fresh var injected and every ref with matching blockChain gets renamed to it
      const newName = ref.pfuncNode.$p.ssaName;
      if (newName) {
        vlog('- Rename usage to `' + newName + '`');
        ref.node.name = newName;
      } else {
        vlog('- Skipping a ref (scope had the decl or no read?)');
      }
    });
    if (funcs.size) ++updated;
    vgroupEnd();

    rwOrder.forEach((ref) => after(ref.blockBody[ref.blockIndex]));

    const ast = fdata.tenkoOutput.ast;
  }

  if (toInject.size) {
    vlog('Now injecting the new tmp vars into', toInject.size, 'different funcs');
    toInject.forEach((arrNewNames, funcNode) => {
      arrNewNames.forEach((tmpName) => {
        funcNode.body.body.splice(funcNode.$p.bodyOffset, 0, AST.varStatement('let', tmpName, AST.undef()));
      });
    });
  }

  if (!updated) {
    vlog('Attempt 2 did not update anything');
  }
  return updated;
}
function processAttempt3OnlyUsedInOtherScope(fdata) {
  // This case seems a bit shallow since it only supports the let being used inside one other function, and the first ref
  // in there must be a write with the others being reads that reach that write. Pretty limited artifact.
  vlog('\nLet hoisting, attempt 3; if an outer var is only used inside another scope and that scope starts with a write then apply SSA');

  let updated = 0;

  new Map(fdata.globallyUniqueNamingRegistry).forEach(function (meta, name) {
    if (meta.isBuiltin) return; // We can probably do it for some of these cases? But let's do that in another step
    if (meta.isImplicitGlobal) return;
    if (meta.isExport) return; // The initial write may still be observed by an import so skip exports for now
    if (meta.isConstant) return;

    vgroup('- `' + meta.uniqueName + '`, writes:', meta.writes.length, ', reads:', meta.reads.length);

    // Since we regenerate the pid during every phase1, we should be able to rely on it for DFS ordering.
    const rwOrder = [...meta.reads, ...meta.writes].sort(({ node: { $p: { pid: a } } }, { node: { $p: { pid: b } } }) =>
      +a < +b ? -1 : +a > +b ? 1 : 0,
    );
    vlog('rwOrder[func:pid:blockindex]:', [
      rwOrder.map((o) => o.action + ':' + o.kind + ':' + o.pfuncNode.$p.pid + ':' + o.node.$p.pid + ':' + o.blockIndex).join(', '),
    ]);

    const funcs = new Set();
    const declFunc = meta.bfuncNode; // Func that contains actual declaration of this var
    let declWrite = undefined; // Write that declares this var. All reads in that scope must be guaranteed to read only this write.
    let otherFunc = undefined; // Func that contains the other write to this var, in another func from the decl func
    let otherWrite = undefined; // In the scope without the var decl, this is the first write. All other refs must be in/under same if/loop/try scope as this one.
    let failed = false;
    let canStillDeclRef = false; // true only after seeing the decl
    vgroup();
    rwOrder.some((ref) => {
      if (ref.action === 'write' && ref.kind === 'var') {
        vlog('- Found var decl');
        //ASSERT(varDeclFunc === ref.pfuncNode); // This broke for tests/cases/if_tail_extending/base_return_else.md but can't remember if super relevant...
        canStillDeclRef = true;
        declWrite = ref;
      } else if (declFunc === ref.pfuncNode) {
        vlog('- found ref in same scope as var decl');
        if (canStillDeclRef && declWrite.blockBody === ref.blockBody) {
          // Verify whether there were observable side effects between the decl and the read in this scope.
          // If that holds then we can ignore the read and still apply this trick. Same for all reads that follow it.
          // `let x = 1; $(x);` versus `let x = 1; f(); $(x);` when f closes over x.
          vlog('  - in same block and can still do decl-ref case, checking all statements between');
          let start = declWrite.blockIndex;
          let stop = ref.blockIndex;
          ASSERT(start <= stop);
          for (let n = start + 1; n <= stop; ++n) {
            const node = ref.blockBody[n];
            //console.log(
            //  'TODO   I think this needs to use the other expressionHasNoObservableSideEffect func and traverse cross block? to verify.',
            //);
            if (!AST.expressionHasNoObservableSideEffect(node)) {
              vlog('  - At least one statement between decl and this one had an observable side effect. Bailing.');
              source(node);
              failed = true;
              return true;
            }
          }
          vlog('  - found decl-ref without observable side effects between them. Accepting.');
          // ok
        } else {
          if (canStillDeclRef) {
            // `let x = 1; function f() { x = 2; }; if (y) $(x)`. We can support these kinds of cases, mind you.
            vlog('  - ref was in same scope as decl but not in same block so not the decl-ref case, bailing');
            //todo('we might support this let_hoisting case by being less lazy about it. this is just old stuff.');
          } else {
            // This could be triggered by a TDZ ref
            // `{ x = 2; } let x = 1;` (should/would not get here but point being; seeing a read before a write in different block)
            vlog('  - can not be decl-ref case, was this tdz?');
            todo('i think this let_hoisting case is unreachable');
          }
          canStillDeclRef = false;
          failed = true;
          return true;
        }
      } else {
        if (ref.action === 'write' && ref.kind !== 'assign') {
          vlog('- found non-assign write, bailing');
          failed = true;
          return true;
        } else if (otherFunc === ref.pfuncNode) {
          vlog('- found ref in same scope as previous assign, ok. checking if/loop/try scoping...');
          vlog('  - if:', ref.ifChain, '.startsWith', otherWrite.ifChain);
          vlog('  - loop:', ref.innerLoop, otherWrite.innerLoop);
          vlog('  - trap:', ref.innerTrap, otherWrite.innerTrap);
          if (!(ref.ifChain + ',').startsWith(otherWrite.ifChain + ',')) {
            vlog('- bail: Read is in at least one different if-branch of the write, and there it can observe the closure value if not written.');
            failed = true;
            return true;
          }
          if (ref.innerLoop !== otherWrite.innerLoop) {
            todo('i need loopChain for this to work properly');
            vlog('- bail: Read is in at least one different loop versus the write, and there it can observe the closure value if not it breaks early.');
            failed = true;
            return true;
          }
          if (ref.innerTrap !== otherWrite.innerTrap) {
            todo('i need trapChain for this to work properly');
            vlog('- bail: Read is in at least one different try-block versus the write, and there it can observe the closure value if code throws early.');
            failed = true;
            return true;
          }
          vlog('- ok, read is in same if/loop/trap scope so must still always read from the previous write in this func');
        } else if (otherFunc) {
          // TODO: we can still be okay if the scope is nested inside the other scope, as long as the write goes first
          vlog('- found ref in different scope as previous ref, bailing');
          failed = true;
          return true;
        } else if (ref.action === 'write') {
          // The write must be unconditional before reading it.
          // This means we must verify that the reads all happen in the same or a sub
          // if/while/try as the first write in order to be eligible for SSA. Else the
          // closure state is observable when the code branch doesn't hit.
          vlog('- found first non-decl write in different scope', ref.pfuncNode.$p.pid);
          vlog('- all reads in this scope must be ')
          otherFunc = ref.pfuncNode;
          otherWrite = ref;
        } else {
          vlog('- first read in different scope is not a write, bailing');
          failed = true;
          return true;
        }
      }
      funcs.add(ref.pfuncNode);
    });
    vgroupEnd();

    if (failed) {
      vlog('Failed; attempt 3 hoisting.');
    } else if (!otherFunc) {
      vlog('Binding only used in one scope. Nothing to do here.');
    } else if (!AST.isPrimitive(declWrite.parentNode.init)) {
      // TODO: can we support this?
      vlog('Init was not a primitive, bailing for now');
    } else {
      vlog(
        'All refs for a binding are in a different scope than the scope where it was defined, all of them in the same scope, and the first ref in that scope was an assignment. Good to go.',
      );
      rule('If an outer var is only used inside another scope and that scope unconditionally starts with a write, apply SSA');
      example('let x = 1; function f() { x = 2; $(x); }', 'let x = 1; function f() { let SSAx = 2; $(SSAx); }')
      before(declWrite.parentNode);

      const tmpName = createFreshVar('tmpssa3_' + name, fdata);
      vlog('SSA all other refs into `' + tmpName + '`');
      const value = AST.getPrimitiveValue(declWrite.parentNode.init);
      vlog('Injecting it at the top, using the original init (ought to be primitive) as init:', value);
      otherFunc.body.body.splice(otherFunc.$p.bodyOffset, 0, AST.varStatement('let', tmpName, AST.primitive(value)));
      after(otherFunc.body.body[otherFunc.$p.bodyOffset]);
      vlog('Renaming all refs of', [name], 'to', [tmpName]);
      rwOrder.forEach((ref) => {
        if (ref.pfuncNode === otherFunc) {
          before(ref.blockBody[ref.blockIndex]);
          ref.node.name = tmpName;
          after(ref.blockBody[ref.blockIndex]);
        }
      });
      vlog('Complete');
      ++updated;
    }

    vgroupEnd();
  });

  if (!updated) {
    vlog('Attempt 3 did not update anything');
  }
  return updated;
}
