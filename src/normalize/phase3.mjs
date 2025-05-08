// Heavy stuff goes in here. The --log/logto options will dump a state before this phase.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before, assertNoDupeNodes, currentState, } from '../utils.mjs';
import { unrollLoopWithTrue } from '../reduce_static/unroll_loop_with_true.mjs';

export function phase3(program, fdata, resolve, req, options) {
  const ast = fdata.tenkoOutput.ast;
  group('\n\n\n##################################\n## phase3  ::  ' + fdata.fname + '\n##################################\n\n\n');
  currentState(fdata, 'before phase3', true, fdata);
  vlog('\n\n\n##################################\n## phase3  ::  ' + fdata.fname + '\n##################################\n\n\n');

  {
    const {unrollLimit, ...rest} = options;
    const keys = Object.keys(rest);
    ASSERT(keys.length === 0, 'phase 3 should not receive these options or this should be updated', keys);
  }

  assertNoDupeNodes(ast, 'body');

  vlog('Phase 3 options:', options);
  const r = _phase3(program, fdata, resolve, req, options);
  groupEnd();

  // For phase1 it should have unique nodes/pids
  if (r?.next === 'phase1') assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');
  return r;
}

function _phase3(program, fdata, resolve, req, options = {}) {

  const action = (
    // This one should probably be lowest priority as it might blow up code...
    // And we must run a normalization step if _anything_ changed since in phase2, even if it was non-blocking
    unrollLoopWithTrue(fdata, options.unrollLimit)
  );

  ASSERT(action === undefined || (action && typeof action === 'object'), 'plugins must return an object or undefined', action);
  if (!action) {
    vlog('Phase 3 applied no rules, no changes. Finish?');
    return;
  }

  ASSERT(typeof action.what === 'string');
  ASSERT(typeof action.changes === 'number' && action.changes > 0);
  ASSERT(action.next === 'phase1' || action.next === 'normal', 'next should be phase1 or normal', action.next);

  return action;
}
