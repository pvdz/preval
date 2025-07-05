# Preval test case

# ai_loop_var_redundant_init.md

> Ai > Ai1 > Ai loop var redundant init
>
> Test: Redundant 'var x = undefined;' re-initialization inside a loop.

## Input

`````js filename=intro
// Expected: var sum = 0; var current; while ($("cond")) { current = $("val"); sum = sum + current; } $("result", sum);
var sum = 0;
var iteration = 0;
while ($("cond", iteration++)) {
  var current = undefined; // Redundant assignment in each iteration after the first (due to hoisting)
  current = $("val");
  sum = sum + current;     // Assuming + is handled correctly for numbers / coerced numbers
}
$("result", sum);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`, 0);
if (tmpIfTest) {
  let tmpClusterSSA_iteration /*:number*/ = 1;
  const tmpSSA_current /*:unknown*/ = $(`val`);
  let tmpClusterSSA_sum /*:primitive*/ = 0 + tmpSSA_current;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpPostUpdArgIdent$1 /*:number*/ = tmpClusterSSA_iteration;
    tmpClusterSSA_iteration = tmpClusterSSA_iteration + 1;
    const tmpIfTest$1 /*:unknown*/ = $(`cond`, tmpPostUpdArgIdent$1);
    if (tmpIfTest$1) {
      const tmpSSA_current$1 /*:unknown*/ = $(`val`);
      tmpClusterSSA_sum = tmpClusterSSA_sum + tmpSSA_current$1;
    } else {
      break;
    }
  }
  $(`result`, tmpClusterSSA_sum);
} else {
  $(`result`, 0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`, 0)) {
  let tmpClusterSSA_iteration = 1;
  const tmpSSA_current = $(`val`);
  let tmpClusterSSA_sum = 0 + tmpSSA_current;
  while (true) {
    const tmpPostUpdArgIdent$1 = tmpClusterSSA_iteration;
    tmpClusterSSA_iteration = tmpClusterSSA_iteration + 1;
    if ($(`cond`, tmpPostUpdArgIdent$1)) {
      tmpClusterSSA_sum = tmpClusterSSA_sum + $(`val`);
    } else {
      break;
    }
  }
  $(`result`, tmpClusterSSA_sum);
} else {
  $(`result`, 0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond", 0 );
if (a) {
  let b = 1;
  const c = $( "val" );
  let d = 0 + c;
  while ($LOOP_UNROLLS_LEFT_10) {
    const e = b;
    b = b + 1;
    const f = $( "cond", e );
    if (f) {
      const g = $( "val" );
      d = d + g;
    }
    else {
      break;
    }
  }
  $( "result", d );
}
else {
  $( "result", 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let current = undefined;
let iteration = undefined;
let sum = undefined;
sum = 0;
iteration = 0;
while (true) {
  const tmpPostUpdArgIdent = $coerce(iteration, `number`);
  iteration = tmpPostUpdArgIdent + 1;
  let tmpCalleeParam = tmpPostUpdArgIdent;
  const tmpIfTest = $(`cond`, tmpPostUpdArgIdent);
  if (tmpIfTest) {
    current = undefined;
    current = $(`val`);
    sum = sum + current;
  } else {
    break;
  }
}
$(`result`, sum);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond', 0
 - 2: 'val'
 - 3: 'cond', 1
 - 4: 'val'
 - 5: 'cond', 2
 - 6: 'val'
 - 7: 'cond', 3
 - 8: 'val'
 - 9: 'cond', 4
 - 10: 'val'
 - 11: 'cond', 5
 - 12: 'val'
 - 13: 'cond', 6
 - 14: 'val'
 - 15: 'cond', 7
 - 16: 'val'
 - 17: 'cond', 8
 - 18: 'val'
 - 19: 'cond', 9
 - 20: 'val'
 - 21: 'cond', 10
 - 22: 'val'
 - 23: 'cond', 11
 - 24: 'val'
 - 25: 'cond', 12
 - 26: 'val'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
