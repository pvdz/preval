# Preval test case

# counter_update_0.md

> Unwind loops > Separate test > Counter update 0
>
> Unrolling loops

## Input

`````js filename=intro
const max = $(10);
for (let i=0; i<10; i += 0) $(i);
`````


## Settled


`````js filename=intro
$(10);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
let tmpClusterSSA_i$2 /*:number*/ = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_i$2 < 10;
  if (tmpIfTest$1) {
    $(tmpClusterSSA_i$2);
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 0;
  } else {
    break;
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
$(0);
let tmpClusterSSA_i$2 = 0;
while (true) {
  if (tmpClusterSSA_i$2 < 10) {
    $(tmpClusterSSA_i$2);
    tmpClusterSSA_i$2 = tmpClusterSSA_i$2 + 0;
  } else {
    break;
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
$( 0 );
let a = 0;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a < 10;
  if (b) {
    $( a );
    a = a + 0;
  }
  else {
    break;
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const max = $(10);
let i = 0;
while (true) {
  const tmpIfTest = i < 10;
  if (tmpIfTest) {
    $(i);
    i = i + 0;
  } else {
    break;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 0
 - 6: 0
 - 7: 0
 - 8: 0
 - 9: 0
 - 10: 0
 - 11: 0
 - 12: 0
 - 13: 0
 - 14: 0
 - 15: 0
 - 16: 0
 - 17: 0
 - 18: 0
 - 19: 0
 - 20: 0
 - 21: 0
 - 22: 0
 - 23: 0
 - 24: 0
 - 25: 0
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
