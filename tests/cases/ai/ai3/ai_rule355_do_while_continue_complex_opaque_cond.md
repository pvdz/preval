# Preval test case

# ai_rule355_do_while_continue_complex_opaque_cond.md

> Ai > Ai3 > Ai rule355 do while continue complex opaque cond
>
> Test: do...while with continue and a complex opaque condition.

## Input

`````js filename=intro
// Expected: (loop structure preserved with continue and opaque condition checks)
let i = 0;
do {
  i = $('increment', i) + 1;
  if ($('check_i_for_continue', i) === 2) {
    $('continuing_at', i);
    continue;
  }
  $('after_continue_in_loop', i);
  if (i > 5) break; // Safety break for test runner
} while ($('cond_part_A', i) < $('cond_part_B', 3) && $('cond_part_C', true));
$('loop_done', i);
`````


## Settled


`````js filename=intro
let i /*:primitive*/ = 0;
loopStop: {
  const tmpBinLhs /*:unknown*/ = $(`increment`, 0);
  i = tmpBinLhs + 1;
  const tmpBinLhs$1 /*:unknown*/ = $(`check_i_for_continue`, i);
  const tmpIfTest /*:boolean*/ = tmpBinLhs$1 === 2;
  if (tmpIfTest) {
    $(`continuing_at`, i);
  } else {
    $(`after_continue_in_loop`, i);
    const tmpIfTest$1 /*:boolean*/ = i > 5;
    if (tmpIfTest$1) {
      break loopStop;
    } else {
    }
  }
  const tmpBinBothLhs /*:unknown*/ = $(`cond_part_A`, i);
  const tmpBinBothRhs /*:unknown*/ = $(`cond_part_B`, 3);
  const tmpIfTest$3 /*:boolean*/ = tmpBinBothLhs < tmpBinBothRhs;
  if (tmpIfTest$3) {
    const tmpClusterSSA_tmpIfTest$3 /*:unknown*/ = $(`cond_part_C`, true);
    if (tmpClusterSSA_tmpIfTest$3) {
      while ($LOOP_UNROLL_10) {
        const tmpBinLhs$2 /*:unknown*/ = $(`increment`, i);
        i = tmpBinLhs$2 + 1;
        const tmpBinLhs$4 /*:unknown*/ = $(`check_i_for_continue`, i);
        const tmpIfTest$2 /*:boolean*/ = tmpBinLhs$4 === 2;
        if (tmpIfTest$2) {
          $(`continuing_at`, i);
        } else {
          $(`after_continue_in_loop`, i);
          const tmpIfTest$6 /*:boolean*/ = i > 5;
          if (tmpIfTest$6) {
            break;
          } else {
          }
        }
        const tmpBinBothLhs$1 /*:unknown*/ = $(`cond_part_A`, i);
        const tmpBinBothRhs$1 /*:unknown*/ = $(`cond_part_B`, 3);
        const tmpIfTest$4 /*:boolean*/ = tmpBinBothLhs$1 < tmpBinBothRhs$1;
        if (tmpIfTest$4) {
          const tmpClusterSSA_tmpIfTest$1 /*:unknown*/ = $(`cond_part_C`, true);
          if (tmpClusterSSA_tmpIfTest$1) {
          } else {
            break;
          }
        } else {
          break;
        }
      }
    } else {
    }
  } else {
  }
}
$(`loop_done`, i);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let i = 0;
loopStop: {
  i = $(`increment`, 0) + 1;
  if ($(`check_i_for_continue`, i) === 2) {
    $(`continuing_at`, i);
  } else {
    $(`after_continue_in_loop`, i);
    if (i > 5) {
      break loopStop;
    }
  }
  if ($(`cond_part_A`, i) < $(`cond_part_B`, 3)) {
    if ($(`cond_part_C`, true)) {
      while (true) {
        i = $(`increment`, i) + 1;
        if ($(`check_i_for_continue`, i) === 2) {
          $(`continuing_at`, i);
        } else {
          $(`after_continue_in_loop`, i);
          if (i > 5) {
            break;
          }
        }
        if ($(`cond_part_A`, i) < $(`cond_part_B`, 3)) {
          if (!$(`cond_part_C`, true)) {
            break;
          }
        } else {
          break;
        }
      }
    }
  }
}
$(`loop_done`, i);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
loopStop: {
  const b = $( "increment", 0 );
  a = b + 1;
  const c = $( "check_i_for_continue", a );
  const d = c === 2;
  if (d) {
    $( "continuing_at", a );
  }
  else {
    $( "after_continue_in_loop", a );
    const e = a > 5;
    if (e) {
      break loopStop;
    }
  }
  const f = $( "cond_part_A", a );
  const g = $( "cond_part_B", 3 );
  const h = f < g;
  if (h) {
    const i = $( "cond_part_C", true );
    if (i) {
      while ($LOOP_UNROLL_10) {
        const j = $( "increment", a );
        a = j + 1;
        const k = $( "check_i_for_continue", a );
        const l = k === 2;
        if (l) {
          $( "continuing_at", a );
        }
        else {
          $( "after_continue_in_loop", a );
          const m = a > 5;
          if (m) {
            break;
          }
        }
        const n = $( "cond_part_A", a );
        const o = $( "cond_part_B", 3 );
        const p = n < o;
        if (p) {
          const q = $( "cond_part_C", true );
          if (q) {

          }
          else {
            break;
          }
        }
        else {
          break;
        }
      }
    }
  }
}
$( "loop_done", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
while (true) {
  $continue: {
    const tmpBinLhs = $(`increment`, i);
    i = tmpBinLhs + 1;
    const tmpBinLhs$1 = $(`check_i_for_continue`, i);
    const tmpIfTest = tmpBinLhs$1 === 2;
    if (tmpIfTest) {
      $(`continuing_at`, i);
      break $continue;
    } else {
      $(`after_continue_in_loop`, i);
      const tmpIfTest$1 = i > 5;
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
  }
  const tmpBinBothLhs = $(`cond_part_A`, i);
  const tmpBinBothRhs = $(`cond_part_B`, 3);
  let tmpIfTest$3 = tmpBinBothLhs < tmpBinBothRhs;
  if (tmpIfTest$3) {
    tmpIfTest$3 = $(`cond_part_C`, true);
    if (tmpIfTest$3) {
    } else {
      break;
    }
  } else {
    break;
  }
}
$(`loop_done`, i);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'increment', 0
 - 2: 'check_i_for_continue', 'increment1'
 - 3: 'after_continue_in_loop', 'increment1'
 - 4: 'cond_part_A', 'increment1'
 - 5: 'cond_part_B', 3
 - 6: 'cond_part_C', true
 - 7: 'increment', 'increment1'
 - 8: 'check_i_for_continue', 'increment1'
 - 9: 'after_continue_in_loop', 'increment1'
 - 10: 'cond_part_A', 'increment1'
 - 11: 'cond_part_B', 3
 - 12: 'cond_part_C', true
 - 13: 'increment', 'increment1'
 - 14: 'check_i_for_continue', 'increment1'
 - 15: 'after_continue_in_loop', 'increment1'
 - 16: 'cond_part_A', 'increment1'
 - 17: 'cond_part_B', 3
 - 18: 'cond_part_C', true
 - 19: 'increment', 'increment1'
 - 20: 'check_i_for_continue', 'increment1'
 - 21: 'after_continue_in_loop', 'increment1'
 - 22: 'cond_part_A', 'increment1'
 - 23: 'cond_part_B', 3
 - 24: 'cond_part_C', true
 - 25: 'increment', 'increment1'
 - 26: 'check_i_for_continue', 'increment1'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
