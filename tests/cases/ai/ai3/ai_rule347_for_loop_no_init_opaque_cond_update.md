# Preval test case

# ai_rule347_for_loop_no_init_opaque_cond_update.md

> Ai > Ai3 > Ai rule347 for loop no init opaque cond update
>
> Test: for loop with no initializer, opaque condition, and opaque update.

## Input

`````js filename=intro
// Expected: let x=0; for (; $('cond', x++) < 1; $('update')) { $('body'); }
let x = 0;
let limit = $('limit', 1);
for (/* no init */; $('cond_check', x) < limit; x = $('update_x', x + 1)) {
  $('loop_body', x);
  // To prevent infinite loop if test runner has issues with opaque condition termination
  if (x > 5) break; 
}
$('done', x);
`````


## Settled


`````js filename=intro
const limit /*:unknown*/ = $(`limit`, 1);
const tmpBinLhs /*:unknown*/ = $(`cond_check`, 0);
const tmpIfTest /*:boolean*/ = tmpBinLhs < limit;
if (tmpIfTest) {
  $(`loop_body`, 0);
  let tmpClusterSSA_x /*:unknown*/ = $(`update_x`, 1);
  while ($LOOP_UNROLL_10) {
    const tmpBinLhs$1 /*:unknown*/ = $(`cond_check`, tmpClusterSSA_x);
    const tmpIfTest$2 /*:boolean*/ = tmpBinLhs$1 < limit;
    if (tmpIfTest$2) {
      $(`loop_body`, tmpClusterSSA_x);
      const tmpIfTest$4 /*:boolean*/ = tmpClusterSSA_x > 5;
      if (tmpIfTest$4) {
        break;
      } else {
        const tmpCalleeParam$1 /*:primitive*/ = tmpClusterSSA_x + 1;
        tmpClusterSSA_x = $(`update_x`, tmpCalleeParam$1);
      }
    } else {
      break;
    }
  }
  $(`done`, tmpClusterSSA_x);
} else {
  $(`done`, 0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const limit = $(`limit`, 1);
if ($(`cond_check`, 0) < limit) {
  $(`loop_body`, 0);
  let tmpClusterSSA_x = $(`update_x`, 1);
  while (true) {
    if ($(`cond_check`, tmpClusterSSA_x) < limit) {
      $(`loop_body`, tmpClusterSSA_x);
      if (tmpClusterSSA_x > 5) {
        break;
      } else {
        tmpClusterSSA_x = $(`update_x`, tmpClusterSSA_x + 1);
      }
    } else {
      break;
    }
  }
  $(`done`, tmpClusterSSA_x);
} else {
  $(`done`, 0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "limit", 1 );
const b = $( "cond_check", 0 );
const c = b < a;
if (c) {
  $( "loop_body", 0 );
  let d = $( "update_x", 1 );
  while ($LOOP_UNROLL_10) {
    const e = $( "cond_check", d );
    const f = e < a;
    if (f) {
      $( "loop_body", d );
      const g = d > 5;
      if (g) {
        break;
      }
      else {
        const h = d + 1;
        d = $( "update_x", h );
      }
    }
    else {
      break;
    }
  }
  $( "done", d );
}
else {
  $( "done", 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
let limit = $(`limit`, 1);
while (true) {
  const tmpBinLhs = $(`cond_check`, x);
  const tmpIfTest = tmpBinLhs < limit;
  if (tmpIfTest) {
    $(`loop_body`, x);
    const tmpIfTest$1 = x > 5;
    if (tmpIfTest$1) {
      break;
    } else {
      let tmpCalleeParam = x + 1;
      x = $(`update_x`, tmpCalleeParam);
    }
  } else {
    break;
  }
}
$(`done`, x);
`````


## Todos triggered


- (todo) - at least one of the call args to


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'limit', 1
 - 2: 'cond_check', 0
 - 3: 'loop_body', 0
 - 4: 'update_x', 1
 - 5: 'cond_check', 'update_x'
 - 6: 'loop_body', 'update_x'
 - 7: 'update_x', 'update_x1'
 - 8: 'cond_check', 'update_x'
 - 9: 'loop_body', 'update_x'
 - 10: 'update_x', 'update_x1'
 - 11: 'cond_check', 'update_x'
 - 12: 'loop_body', 'update_x'
 - 13: 'update_x', 'update_x1'
 - 14: 'cond_check', 'update_x'
 - 15: 'loop_body', 'update_x'
 - 16: 'update_x', 'update_x1'
 - 17: 'cond_check', 'update_x'
 - 18: 'loop_body', 'update_x'
 - 19: 'update_x', 'update_x1'
 - 20: 'cond_check', 'update_x'
 - 21: 'loop_body', 'update_x'
 - 22: 'update_x', 'update_x1'
 - 23: 'cond_check', 'update_x'
 - 24: 'loop_body', 'update_x'
 - 25: 'update_x', 'update_x1'
 - 26: 'cond_check', 'update_x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
