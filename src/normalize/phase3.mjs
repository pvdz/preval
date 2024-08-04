// Heavy stuff goes in here. The --log/logto options will dump a state before this phase.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before, assertNoDupeNodes } from '../utils.mjs';
import {VERBOSE_TRACING} from '../constants.mjs';
import { unrollLoopWithTrue } from '../reduce_static/unroll_loop_with_true.mjs';

export function phase3(program, fdata, resolve, req, options) {
  const ast = fdata.tenkoOutput.ast;
  group('\n\n\n##################################\n## phase3  ::  ' + fdata.fname + '\n##################################\n\n\n');
  if (VERBOSE_TRACING) vlog('\nCurrent state (before phase3)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
  vlog('\n\n\n##################################\n## phase3  ::  ' + fdata.fname + '\n##################################\n\n\n');

  assertNoDupeNodes(ast, 'body');

  vlog('Phase 3 options:', options);
  const r = _phase3(program, fdata, resolve, req, options);
  groupEnd();

  // For phase1 it should have unique nodes/pids
  if (r === 'phase1') assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');
  return r; // phase1 (phase1/2/3 cycle), truthy (full cycle), or falsy (repeat)
}

function _phase3(program, fdata, resolve, req, options = {}) {

  return (
    // This one should probably be lowest priority as it might blow up code...
    // And we must run a normalization step if _anything_ changed since in phase2, even if it was non-blocking
    unrollLoopWithTrue(fdata, options.unrollTrueLimit)


  );
}
