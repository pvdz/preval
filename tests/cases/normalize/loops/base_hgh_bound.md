# Preval test case

# base_hgh_bound.md

> Normalize > Loops > Base hgh bound
>
> How do you do loops?

This case should cap the inlining at some point even if the loop doesn't go all the way to infinity

## Input

`````js filename=intro
function f() {
  for (let i=0; i<1e9; ++i) $(i);
  return 100;
}
const r = f();
$(r);
`````


## Settled


`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
$(10);
let tmpClusterSSA_i$2 /*:number*/ = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_i$2 < 1000000000;
  if (tmpIfTest$1) {
    $(tmpClusterSSA_i$2);
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 1;
  } else {
    break;
  }
}
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
$(7);
$(8);
$(9);
$(10);
let tmpClusterSSA_i$2 = 11;
while (true) {
  if (tmpClusterSSA_i$2 < 1000000000) {
    $(tmpClusterSSA_i$2);
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 1;
  } else {
    break;
  }
}
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( 5 );
$( 6 );
$( 7 );
$( 8 );
$( 9 );
$( 10 );
let a = 11;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a < 1000000000;
  if (b) {
    $( a );
    a = a + 1;
  }
  else {
    break;
  }
}
$( 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  while (true) {
    const tmpIfTest = i < 1000000000;
    if (tmpIfTest) {
      $(i);
      const tmpPostUpdArgIdent = $coerce(i, `number`);
      i = tmpPostUpdArgIdent + 1;
    } else {
      break;
    }
  }
  return 100;
};
const r = f();
$(r);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 5
 - 7: 6
 - 8: 7
 - 9: 8
 - 10: 9
 - 11: 10
 - 12: 11
 - 13: 12
 - 14: 13
 - 15: 14
 - 16: 15
 - 17: 16
 - 18: 17
 - 19: 18
 - 20: 19
 - 21: 20
 - 22: 21
 - 23: 22
 - 24: 23
 - 25: 24
 - 26: 25
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
