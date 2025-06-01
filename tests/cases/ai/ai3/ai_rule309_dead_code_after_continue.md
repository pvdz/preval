# Preval test case

# ai_rule309_dead_code_after_continue.md

> Ai > Ai3 > Ai rule309 dead code after continue
>
> Test: Dead code elimination after a continue statement in a for loop.

## Input

`````js filename=intro
// Expected: for (let i = 0; i < $('max', 2); i++) { $('loop_start', i); $('before_continue', i); continue; } $('loop_done');
for (let i = 0; i < $('max', 2); i++) {
  $('loop_start', i);
  $('before_continue', i);
  continue;
  $('after_continue', i); // This should be removed
}
$('loop_done');
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(`max`, 2);
const tmpIfTest /*:boolean*/ = 0 < tmpBinBothRhs;
if (tmpIfTest) {
  $(`loop_start`, 0);
  $(`before_continue`, 0);
  let tmpClusterSSA_i /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpBinBothRhs$1 /*:unknown*/ = $(`max`, 2);
    const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_i < tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(`loop_start`, tmpClusterSSA_i);
      $(`before_continue`, tmpClusterSSA_i);
      tmpClusterSSA_i = tmpClusterSSA_i + 1;
    } else {
      break;
    }
  }
  $(`loop_done`);
} else {
  $(`loop_done`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(`max`, 2);
if (0 < tmpBinBothRhs) {
  $(`loop_start`, 0);
  $(`before_continue`, 0);
  let tmpClusterSSA_i = 1;
  while (true) {
    if (tmpClusterSSA_i < $(`max`, 2)) {
      $(`loop_start`, tmpClusterSSA_i);
      $(`before_continue`, tmpClusterSSA_i);
      tmpClusterSSA_i = tmpClusterSSA_i + 1;
    } else {
      break;
    }
  }
  $(`loop_done`);
} else {
  $(`loop_done`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "max", 2 );
const b = 0 < a;
if (b) {
  $( "loop_start", 0 );
  $( "before_continue", 0 );
  let c = 1;
  while ($LOOP_UNROLL_10) {
    const d = $( "max", 2 );
    const e = c < d;
    if (e) {
      $( "loop_start", c );
      $( "before_continue", c );
      c = c + 1;
    }
    else {
      break;
    }
  }
  $( "loop_done" );
}
else {
  $( "loop_done" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let i = 0;
while (true) {
  const tmpBinBothLhs = i;
  const tmpBinBothRhs = $(`max`, 2);
  const tmpIfTest = tmpBinBothLhs < tmpBinBothRhs;
  if (tmpIfTest) {
    $(`loop_start`, i);
    $(`before_continue`, i);
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
$(`loop_done`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'max', 2
 - 2: 'loop_done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
