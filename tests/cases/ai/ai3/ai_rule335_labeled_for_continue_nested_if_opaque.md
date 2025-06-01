# Preval test case

# ai_rule335_labeled_for_continue_nested_if_opaque.md

> Ai > Ai3 > Ai rule335 labeled for continue nested if opaque
>
> Test: Labeled for loop with continue from nested opaque if.

## Input

`````js filename=intro
// Expected: outer: for (let i=0; i<1; ++i) { if($('cond')) continue outer; $('after_continue'); } $('done');
outer: for (let i = 0; $('loop_cond_i', i) < 1; $('loop_update_i', ++i)) {
  $('before_if', i);
  if ($('if_cond', i)) {
    $('before_continue', i);
    continue outer;
  }
  $('after_if_and_continue_target', i);
}
$('done');
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(`loop_cond_i`, 0);
const tmpIfTest /*:boolean*/ = tmpBinLhs < 1;
if (tmpIfTest) {
  $(`before_if`, 0);
  const tmpIfTest$1 /*:unknown*/ = $(`if_cond`, 0);
  if (tmpIfTest$1) {
    $(`before_continue`, 0);
  } else {
    $(`after_if_and_continue_target`, 0);
  }
  let tmpClusterSSA_i /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    $(`loop_update_i`, tmpClusterSSA_i);
    const tmpBinLhs$1 /*:unknown*/ = $(`loop_cond_i`, tmpClusterSSA_i);
    const tmpIfTest$2 /*:boolean*/ = tmpBinLhs$1 < 1;
    if (tmpIfTest$2) {
      $(`before_if`, tmpClusterSSA_i);
      const tmpIfTest$4 /*:unknown*/ = $(`if_cond`, tmpClusterSSA_i);
      if (tmpIfTest$4) {
        $(`before_continue`, tmpClusterSSA_i);
      } else {
        $(`after_if_and_continue_target`, tmpClusterSSA_i);
      }
      tmpClusterSSA_i = tmpClusterSSA_i + 1;
    } else {
      break;
    }
  }
  $(`done`);
} else {
  $(`done`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`loop_cond_i`, 0) < 1) {
  $(`before_if`, 0);
  if ($(`if_cond`, 0)) {
    $(`before_continue`, 0);
  } else {
    $(`after_if_and_continue_target`, 0);
  }
  let tmpClusterSSA_i = 1;
  while (true) {
    $(`loop_update_i`, tmpClusterSSA_i);
    if ($(`loop_cond_i`, tmpClusterSSA_i) < 1) {
      $(`before_if`, tmpClusterSSA_i);
      if ($(`if_cond`, tmpClusterSSA_i)) {
        $(`before_continue`, tmpClusterSSA_i);
      } else {
        $(`after_if_and_continue_target`, tmpClusterSSA_i);
      }
      tmpClusterSSA_i = tmpClusterSSA_i + 1;
    } else {
      break;
    }
  }
  $(`done`);
} else {
  $(`done`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "loop_cond_i", 0 );
const b = a < 1;
if (b) {
  $( "before_if", 0 );
  const c = $( "if_cond", 0 );
  if (c) {
    $( "before_continue", 0 );
  }
  else {
    $( "after_if_and_continue_target", 0 );
  }
  let d = 1;
  while ($LOOP_UNROLL_10) {
    $( "loop_update_i", d );
    const e = $( "loop_cond_i", d );
    const f = e < 1;
    if (f) {
      $( "before_if", d );
      const g = $( "if_cond", d );
      if (g) {
        $( "before_continue", d );
      }
      else {
        $( "after_if_and_continue_target", d );
      }
      d = d + 1;
    }
    else {
      break;
    }
  }
  $( "done" );
}
else {
  $( "done" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
while (true) {
  const tmpBinLhs = $(`loop_cond_i`, i);
  const tmpIfTest = tmpBinLhs < 1;
  if (tmpIfTest) {
    $continue: {
      $(`before_if`, i);
      const tmpIfTest$1 = $(`if_cond`, i);
      if (tmpIfTest$1) {
        $(`before_continue`, i);
        break $continue;
      } else {
        $(`after_if_and_continue_target`, i);
      }
    }
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
    let tmpCalleeParam = i;
    $(`loop_update_i`, i);
  } else {
    break;
  }
}
$(`done`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'loop_cond_i', 0
 - 2: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
