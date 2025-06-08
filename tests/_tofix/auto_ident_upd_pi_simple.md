# Preval test case

# auto_ident_upd_pi_simple.md

> Tofix > auto ident upd pi simple

Why does preval not know a is a number here (at the time of writing)?

## Input

`````js filename=intro
let a = undefined;
let tmpClusterSSA_b$2 /*:number*/ = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  tmpClusterSSA_b$2 = tmpClusterSSA_b$2 + 1;
  a = tmpClusterSSA_b$2;
  if (a) {
  } else {
    break;
  }
}
$(a, tmpClusterSSA_b$2);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpClusterSSA_b$2 /*:number*/ = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  tmpClusterSSA_b$2 = tmpClusterSSA_b$2 + 1;
  a = tmpClusterSSA_b$2;
  if (a) {
  } else {
    break;
  }
}
$(a, tmpClusterSSA_b$2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
let tmpClusterSSA_b$2 = 12;
while (true) {
  $(100);
  tmpClusterSSA_b$2 = tmpClusterSSA_b$2 + 1;
  a = tmpClusterSSA_b$2;
  if (!a) {
    break;
  }
}
$(a, tmpClusterSSA_b$2);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  b = b + 1;
  a = b;
  if (a) {

  }
  else {
    break;
  }
}
$( a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let tmpClusterSSA_b$2 = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  tmpClusterSSA_b$2 = tmpClusterSSA_b$2 + 1;
  a = tmpClusterSSA_b$2;
  if (a) {
  } else {
    break;
  }
}
$(a, tmpClusterSSA_b$2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
