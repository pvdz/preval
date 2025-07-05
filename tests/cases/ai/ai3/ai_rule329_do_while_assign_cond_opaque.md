# Preval test case

# ai_rule329_do_while_assign_cond_opaque.md

> Ai > Ai3 > Ai rule329 do while assign cond opaque
>
> Test: do...while loop with assignment in condition using opaque value.

## Input

`````js filename=intro
// Expected: let x = $('initial_x', 0); do { $('loop_body', x); } while ((x = $('update_x', x + 1)) < $('limit', 2)); $('final_x', x);
let x = $('initial_x', 0);
let limit = $('limit', 2);
do {
  $('loop_body', x);
} while ((x = $('update_x', x + 1)) < limit);
$('final_x', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`initial_x`, 0);
const limit /*:unknown*/ = $(`limit`, 2);
$(`loop_body`, x);
const tmpCalleeParam /*:primitive*/ = x + 1;
let tmpClusterSSA_x /*:unknown*/ = $(`update_x`, tmpCalleeParam);
const tmpIfTest /*:boolean*/ = tmpClusterSSA_x < limit;
if (tmpIfTest) {
  while ($LOOP_UNROLLS_LEFT_10) {
    $(`loop_body`, tmpClusterSSA_x);
    const tmpCalleeParam$1 /*:primitive*/ = tmpClusterSSA_x + 1;
    tmpClusterSSA_x = $(`update_x`, tmpCalleeParam$1);
    const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_x < limit;
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(`final_x`, tmpClusterSSA_x);
} else {
  $(`final_x`, tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`initial_x`, 0);
const limit = $(`limit`, 2);
$(`loop_body`, x);
let tmpClusterSSA_x = $(`update_x`, x + 1);
if (tmpClusterSSA_x < limit) {
  while (true) {
    $(`loop_body`, tmpClusterSSA_x);
    tmpClusterSSA_x = $(`update_x`, tmpClusterSSA_x + 1);
    if (!(tmpClusterSSA_x < limit)) {
      break;
    }
  }
  $(`final_x`, tmpClusterSSA_x);
} else {
  $(`final_x`, tmpClusterSSA_x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "initial_x", 0 );
const b = $( "limit", 2 );
$( "loop_body", a );
const c = a + 1;
let d = $( "update_x", c );
const e = d < b;
if (e) {
  while ($LOOP_UNROLLS_LEFT_10) {
    $( "loop_body", d );
    const f = d + 1;
    d = $( "update_x", f );
    const g = d < b;
    if (g) {

    }
    else {
      break;
    }
  }
  $( "final_x", d );
}
else {
  $( "final_x", d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`initial_x`, 0);
let limit = $(`limit`, 2);
while (true) {
  $(`loop_body`, x);
  let tmpCalleeParam = x + 1;
  x = $(`update_x`, tmpCalleeParam);
  const tmpBinLhs = x;
  const tmpIfTest = tmpBinLhs < limit;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(`final_x`, x);
`````


## Todos triggered


- (todo) - at least one of the call args to


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial_x', 0
 - 2: 'limit', 2
 - 3: 'loop_body', 'initial_x'
 - 4: 'update_x', 'initial_x1'
 - 5: 'final_x', 'update_x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
