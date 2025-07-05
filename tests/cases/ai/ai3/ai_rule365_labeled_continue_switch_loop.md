# Preval test case

# ai_rule365_labeled_continue_switch_loop.md

> Ai > Ai3 > Ai rule365 labeled continue switch loop
>
> Rule 365: Labeled continue from switch in loop

## Input

`````js filename=intro
(function() {
  let count = 0;
  outerLoop:
  for (let i = 0; i < $('limit_i', 3); i++) {
    $('loop_i', i);
    switch ($('switch_val', i)) {
      case 0:
        $('case_0', i);
        count++;
        continue outerLoop;
      case 1:
        $('case_1', i);
        count++;
        break;
      default:
        $('case_default', i);
        count++;
    }
    $('after_switch', i);
  }
  $('final_count', count);
})();
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(`limit_i`, 3);
const tmpIfTest /*:boolean*/ = 0 < tmpBinBothRhs;
if (tmpIfTest) {
  let count /*:number*/ = 1;
  $(`loop_i`, 0);
  const tmpSwitchDisc /*:unknown*/ = $(`switch_val`, 0);
  const tmpIfTest$1 /*:boolean*/ = tmpSwitchDisc === 0;
  if (tmpIfTest$1) {
    $(`case_0`, 0);
  } else {
    const tmpIfTest$3 /*:boolean*/ = tmpSwitchDisc === 1;
    if (tmpIfTest$3) {
      $(`case_1`, 0);
      $(`after_switch`, 0);
    } else {
      $(`case_default`, 0);
      $(`after_switch`, 0);
    }
  }
  let tmpClusterSSA_i /*:number*/ = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpBinBothRhs$1 /*:unknown*/ = $(`limit_i`, 3);
    const tmpIfTest$2 /*:boolean*/ = tmpClusterSSA_i < tmpBinBothRhs$1;
    if (tmpIfTest$2) {
      $(`loop_i`, tmpClusterSSA_i);
      const tmpSwitchDisc$1 /*:unknown*/ = $(`switch_val`, tmpClusterSSA_i);
      const tmpIfTest$4 /*:boolean*/ = tmpSwitchDisc$1 === 0;
      if (tmpIfTest$4) {
        $(`case_0`, tmpClusterSSA_i);
        count = count + 1;
      } else {
        const tmpIfTest$6 /*:boolean*/ = tmpSwitchDisc$1 === 1;
        if (tmpIfTest$6) {
          $(`case_1`, tmpClusterSSA_i);
          count = count + 1;
          $(`after_switch`, tmpClusterSSA_i);
        } else {
          $(`case_default`, tmpClusterSSA_i);
          count = count + 1;
          $(`after_switch`, tmpClusterSSA_i);
        }
      }
      tmpClusterSSA_i = tmpClusterSSA_i + 1;
    } else {
      break;
    }
  }
  $(`final_count`, count);
} else {
  $(`final_count`, 0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(`limit_i`, 3);
if (0 < tmpBinBothRhs) {
  let count = 1;
  $(`loop_i`, 0);
  const tmpSwitchDisc = $(`switch_val`, 0);
  if (tmpSwitchDisc === 0) {
    $(`case_0`, 0);
  } else {
    if (tmpSwitchDisc === 1) {
      $(`case_1`, 0);
      $(`after_switch`, 0);
    } else {
      $(`case_default`, 0);
      $(`after_switch`, 0);
    }
  }
  let tmpClusterSSA_i = 1;
  while (true) {
    if (tmpClusterSSA_i < $(`limit_i`, 3)) {
      $(`loop_i`, tmpClusterSSA_i);
      const tmpSwitchDisc$1 = $(`switch_val`, tmpClusterSSA_i);
      if (tmpSwitchDisc$1 === 0) {
        $(`case_0`, tmpClusterSSA_i);
        count = count + 1;
      } else {
        if (tmpSwitchDisc$1 === 1) {
          $(`case_1`, tmpClusterSSA_i);
          count = count + 1;
          $(`after_switch`, tmpClusterSSA_i);
        } else {
          $(`case_default`, tmpClusterSSA_i);
          count = count + 1;
          $(`after_switch`, tmpClusterSSA_i);
        }
      }
      tmpClusterSSA_i = tmpClusterSSA_i + 1;
    } else {
      break;
    }
  }
  $(`final_count`, count);
} else {
  $(`final_count`, 0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "limit_i", 3 );
const b = 0 < a;
if (b) {
  let c = 1;
  $( "loop_i", 0 );
  const d = $( "switch_val", 0 );
  const e = d === 0;
  if (e) {
    $( "case_0", 0 );
  }
  else {
    const f = d === 1;
    if (f) {
      $( "case_1", 0 );
      $( "after_switch", 0 );
    }
    else {
      $( "case_default", 0 );
      $( "after_switch", 0 );
    }
  }
  let g = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const h = $( "limit_i", 3 );
    const i = g < h;
    if (i) {
      $( "loop_i", g );
      const j = $( "switch_val", g );
      const k = j === 0;
      if (k) {
        $( "case_0", g );
        c = c + 1;
      }
      else {
        const l = j === 1;
        if (l) {
          $( "case_1", g );
          c = c + 1;
          $( "after_switch", g );
        }
        else {
          $( "case_default", g );
          c = c + 1;
          $( "after_switch", g );
        }
      }
      g = g + 1;
    }
    else {
      break;
    }
  }
  $( "final_count", c );
}
else {
  $( "final_count", 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let count = 0;
  let i = 0;
  while (true) {
    const tmpBinBothLhs = i;
    const tmpBinBothRhs = $(`limit_i`, 3);
    const tmpIfTest = tmpBinBothLhs < tmpBinBothRhs;
    if (tmpIfTest) {
      $continue: {
        tmpSwitchBreak: {
          $(`loop_i`, i);
          const tmpSwitchDisc = $(`switch_val`, i);
          const tmpIfTest$1 = tmpSwitchDisc === 0;
          if (tmpIfTest$1) {
            $(`case_0`, i);
            const tmpPostUpdArgIdent = $coerce(count, `number`);
            count = tmpPostUpdArgIdent + 1;
            break $continue;
          } else {
            const tmpIfTest$3 = tmpSwitchDisc === 1;
            if (tmpIfTest$3) {
              $(`case_1`, i);
              const tmpPostUpdArgIdent$1 = $coerce(count, `number`);
              count = tmpPostUpdArgIdent$1 + 1;
              break tmpSwitchBreak;
            } else {
              $(`case_default`, i);
              const tmpPostUpdArgIdent$3 = $coerce(count, `number`);
              count = tmpPostUpdArgIdent$3 + 1;
            }
          }
        }
        $(`after_switch`, i);
      }
      const tmpPostUpdArgIdent$5 = $coerce(i, `number`);
      i = tmpPostUpdArgIdent$5 + 1;
    } else {
      break;
    }
  }
  $(`final_count`, count);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'limit_i', 3
 - 2: 'final_count', 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
