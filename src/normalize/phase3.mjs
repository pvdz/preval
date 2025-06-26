// Heavy stuff goes in here. The --log/logto options will dump a state before this phase.

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, before, assertNoDupeNodes, currentState, } from '../utils.mjs';
import { unrollLoopWithTrue } from '../reduce_static/unroll_loop_with_true.mjs';
import { DIM, RESET } from '../constants.mjs';


export const BASE_PHASE3_RULES_LIST = [
  ['unrollLoopWithTrue', unrollLoopWithTrue],
];
export const BASE_PHASE3_REDUCER_NAMES = new Set(new Map(BASE_PHASE3_RULES_LIST).keys()); // lay-zey

export function getFreshPhase3RulesState() {
  // Phase3 will rotate the rules as they get used so we need to create a fresh list
  // for every file (for the sake of consistency and reproducibility, relevant for
  // debugging and tests).
  // The main running basically passes on this list by reference every time phase2 runs.
  return BASE_PHASE3_RULES_LIST.slice(0);
}

export function phase3(program, fdata, rulesListState3, resolve, req, prng, options) {
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
  const r = _phase3(program, fdata, rulesListState3, resolve, req, prng, options);
  groupEnd();

  // For phase1 it should have unique nodes/pids
  if (r?.next === 'phase1') assertNoDupeNodes(fdata.tenkoOutput.ast, 'body');
  return r;
}

function _phase3(program, fdata, rulesListState3, resolve, req, prng, options = {}) {

  const GLO_TIMES = new Map(rulesListState3.map(([key]) => [key, {calls: 0, hits: 0, time: 0, last: 0}]))

  // Apply the next eligible rule until one applies a change or the last one is called
  let action;
  let ti = 0;
  let max = rulesListState3.length;
  for (; ti<max;) {
    const [tname, tfunc] = rulesListState3[0];
    const mnow = options.time && performance.now();
    action = tfunc(fdata, prng, options);
    const mtime = options.time && performance.now();
    const mlen = mtime-mnow;
    if (options.time) {
      let obj = GLO_TIMES.get(tname);
      if (!obj) GLO_TIMES.set(tname, obj = {calls: 0, hits: 0, time: 0, last: 0});
      obj.last = mlen;
      obj.time += mlen;
      obj.calls += 1;
    }
    rulesListState3.push(rulesListState3.shift()); // rotate
    if (action) {
      action.actionOrderIndex = ti;
      action.actionOwnTime = options.time ? under(mlen) : '--';
      break;
    }
    ti += 1;
  }


  vlog('\n\nEnd of phase3. Rules processed:', ti + 1, ', max:', max,', result:', action);
  if (options.time) {
    const obj = {};
    rulesListState3.slice(-(ti+1)).forEach(([key]) => obj[key] = under(GLO_TIMES.get(key)?.last * 1000));
    console.log(DIM + 'Phase3   timing:',
      JSON.stringify(obj)
        .replace(/"/g, '')
        .replace(/([:,])/g, '$1 ')
        .replace(/([a-z]{3})\w+/ig, '$1'),
      RESET
    );
  }

  ASSERT(action === undefined || (action && typeof action === 'object'), 'plugins must return an object or undefined', action);
  if (action === false) console.log('rule', [rulesListState3[rulesListState3.length-1][0]], 'returned false...');
  if (!action) {
    vlog('Phase 3 applied no rules, no changes');
    return;
  }

  ASSERT(typeof action.what === 'string');
  ASSERT(typeof action.changes === 'number' && action.changes > 0);
  ASSERT(action.next === 'phase1' || action.next === 'normal', 'next should be phase1 or normal', action.next);

  return action;
}

function under(num) {
  const str = String(Math.round(num));
  let result = str.slice(0, str.length % 3 || 3);
  for (let i=result.length; i<str.length; i += 3) {
    result += '_' + str.slice(i, i+3);
  }
  return result;
}
