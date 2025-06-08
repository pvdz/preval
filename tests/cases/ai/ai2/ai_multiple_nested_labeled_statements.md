# Preval test case

# ai_multiple_nested_labeled_statements.md

> Ai > Ai2 > Ai multiple nested labeled statements
>
> Test: Multiple nested labeled statements with opaque conditional breaks.

## Input

`````js filename=intro
// Expected: Control flow to correct labels is preserved.
let log = [];
L1: for (let i = 0; $('L1_cond', i<1); i++) {
  log.push('L1_start');
  L2: for (let j = 0; $('L2_cond', j<1); j++) {
    log.push('L2_start');
    L3: for (let k = 0; $('L3_cond', k<1); k++) {
      log.push('L3_start');
      if ($('break_L2', i,j,k)) break L2;
      if ($('continue_L1', i,j,k)) continue L1;
      log.push('L3_end');
    }
    log.push('L2_after_L3'); // Renamed from L2_end to differentiate from loop exit
  }
  log.push('L1_after_L2'); // Renamed from L1_end
}
$('nested_labels_log', log.join(','));
`````


## Settled


`````js filename=intro
let i /*:number*/ = 0;
const log /*:array*/ /*truthy*/ = [];
while (true) {
  const tmpCalleeParam /*:boolean*/ = i < 1;
  const tmpIfTest /*:unknown*/ = $(`L1_cond`, tmpCalleeParam);
  if (tmpIfTest) {
    $continue: {
      L2: {
        $dotCall($array_push, log, `push`, `L1_start`);
        let j /*:number*/ = 0;
        while (true) {
          const tmpCalleeParam$1 /*:boolean*/ = j < 1;
          const tmpIfTest$1 /*:unknown*/ = $(`L2_cond`, tmpCalleeParam$1);
          if (tmpIfTest$1) {
            $dotCall($array_push, log, `push`, `L2_start`);
            let k /*:number*/ = 0;
            while (true) {
              const tmpCalleeParam$3 /*:boolean*/ = k < 1;
              const tmpIfTest$3 /*:unknown*/ = $(`L3_cond`, tmpCalleeParam$3);
              if (tmpIfTest$3) {
                $dotCall($array_push, log, `push`, `L3_start`);
                const tmpIfTest$5 /*:unknown*/ = $(`break_L2`, i, j, k);
                if (tmpIfTest$5) {
                  break L2;
                } else {
                  const tmpIfTest$7 /*:unknown*/ = $(`continue_L1`, i, j, k);
                  if (tmpIfTest$7) {
                    break $continue;
                  } else {
                    $dotCall($array_push, log, `push`, `L3_end`);
                    k = k + 1;
                  }
                }
              } else {
                break;
              }
            }
            $dotCall($array_push, log, `push`, `L2_after_L3`);
            j = j + 1;
          } else {
            break;
          }
        }
      }
      $dotCall($array_push, log, `push`, `L1_after_L2`);
    }
    i = i + 1;
  } else {
    break;
  }
}
const tmpCalleeParam$5 /*:string*/ = $dotCall($array_join, log, `join`, `,`);
$(`nested_labels_log`, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let i = 0;
const log = [];
while (true) {
  if ($(`L1_cond`, i < 1)) {
    $continue: {
      L2: {
        $dotCall($array_push, log, `push`, `L1_start`);
        let j = 0;
        while (true) {
          if ($(`L2_cond`, j < 1)) {
            $dotCall($array_push, log, `push`, `L2_start`);
            let k = 0;
            while (true) {
              if ($(`L3_cond`, k < 1)) {
                $dotCall($array_push, log, `push`, `L3_start`);
                if ($(`break_L2`, i, j, k)) {
                  break L2;
                } else {
                  if ($(`continue_L1`, i, j, k)) {
                    break $continue;
                  } else {
                    $dotCall($array_push, log, `push`, `L3_end`);
                    k = k + 1;
                  }
                }
              } else {
                break;
              }
            }
            $dotCall($array_push, log, `push`, `L2_after_L3`);
            j = j + 1;
          } else {
            break;
          }
        }
      }
      $dotCall($array_push, log, `push`, `L1_after_L2`);
    }
    i = i + 1;
  } else {
    break;
  }
}
$(`nested_labels_log`, $dotCall($array_join, log, `join`, `,`));
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = [];
while (true) {
  const c = a < 1;
  const d = $( "L1_cond", c );
  if (d) {
    $continue: {
      L2: {
        $dotCall( $array_push, b, "push", "L1_start" );
        let e = 0;
        while (true) {
          const f = e < 1;
          const g = $( "L2_cond", f );
          if (g) {
            $dotCall( $array_push, b, "push", "L2_start" );
            let h = 0;
            while (true) {
              const i = h < 1;
              const j = $( "L3_cond", i );
              if (j) {
                $dotCall( $array_push, b, "push", "L3_start" );
                const k = $( "break_L2", a, e, h );
                if (k) {
                  break L2;
                }
                else {
                  const l = $( "continue_L1", a, e, h );
                  if (l) {
                    break $continue;
                  }
                  else {
                    $dotCall( $array_push, b, "push", "L3_end" );
                    h = h + 1;
                  }
                }
              }
              else {
                break;
              }
            }
            $dotCall( $array_push, b, "push", "L2_after_L3" );
            e = e + 1;
          }
          else {
            break;
          }
        }
      }
      $dotCall( $array_push, b, "push", "L1_after_L2" );
    }
    a = a + 1;
  }
  else {
    break;
  }
}
const m = $dotCall( $array_join, b, "join", "," );
$( "nested_labels_log", m );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let log = [];
let i = 0;
while (true) {
  let tmpCalleeParam = i < 1;
  const tmpIfTest = $(`L1_cond`, tmpCalleeParam);
  if (tmpIfTest) {
    $continue: {
      const tmpMCF = log.push;
      L2: {
        $dotCall(tmpMCF, log, `push`, `L1_start`);
        let j = 0;
        while (true) {
          let tmpCalleeParam$1 = j < 1;
          const tmpIfTest$1 = $(`L2_cond`, tmpCalleeParam$1);
          if (tmpIfTest$1) {
            const tmpMCF$1 = log.push;
            $dotCall(tmpMCF$1, log, `push`, `L2_start`);
            let k = 0;
            while (true) {
              let tmpCalleeParam$3 = k < 1;
              const tmpIfTest$3 = $(`L3_cond`, tmpCalleeParam$3);
              if (tmpIfTest$3) {
                const tmpMCF$3 = log.push;
                $dotCall(tmpMCF$3, log, `push`, `L3_start`);
                const tmpIfTest$5 = $(`break_L2`, i, j, k);
                if (tmpIfTest$5) {
                  break L2;
                } else {
                  const tmpIfTest$7 = $(`continue_L1`, i, j, k);
                  if (tmpIfTest$7) {
                    break $continue;
                  } else {
                    const tmpMCF$5 = log.push;
                    $dotCall(tmpMCF$5, log, `push`, `L3_end`);
                    const tmpPostUpdArgIdent = $coerce(k, `number`);
                    k = tmpPostUpdArgIdent + 1;
                  }
                }
              } else {
                break;
              }
            }
            const tmpMCF$7 = log.push;
            $dotCall(tmpMCF$7, log, `push`, `L2_after_L3`);
            const tmpPostUpdArgIdent$1 = $coerce(j, `number`);
            j = tmpPostUpdArgIdent$1 + 1;
          } else {
            break;
          }
        }
      }
      const tmpMCF$9 = log.push;
      $dotCall(tmpMCF$9, log, `push`, `L1_after_L2`);
    }
    const tmpPostUpdArgIdent$3 = $coerce(i, `number`);
    i = tmpPostUpdArgIdent$3 + 1;
  } else {
    break;
  }
}
const tmpMCF$11 = log.join;
let tmpCalleeParam$5 = $dotCall(tmpMCF$11, log, `join`, `,`);
$(`nested_labels_log`, tmpCalleeParam$5);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) access object property that also exists on prototype? $array_join
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'L1_cond', true
 - 2: 'L2_cond', true
 - 3: 'L3_cond', true
 - 4: 'break_L2', 0, 0, 0
 - 5: 'L1_cond', false
 - 6: 'L2_cond', true
 - 7: 'L3_cond', true
 - 8: 'break_L2', 1, 0, 0
 - 9: 'L1_cond', false
 - 10: 'L2_cond', true
 - 11: 'L3_cond', true
 - 12: 'break_L2', 2, 0, 0
 - 13: 'L1_cond', false
 - 14: 'L2_cond', true
 - 15: 'L3_cond', true
 - 16: 'break_L2', 3, 0, 0
 - 17: 'L1_cond', false
 - 18: 'L2_cond', true
 - 19: 'L3_cond', true
 - 20: 'break_L2', 4, 0, 0
 - 21: 'L1_cond', false
 - 22: 'L2_cond', true
 - 23: 'L3_cond', true
 - 24: 'break_L2', 5, 0, 0
 - 25: 'L1_cond', false
 - 26: 'L2_cond', true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
