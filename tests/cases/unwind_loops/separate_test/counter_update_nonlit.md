# Preval test case

# counter_update_nonlit.md

> Unwind loops > Separate test > Counter update nonlit
>
> Unrolling loops

## Input

`````js filename=intro
const max = $(10);
for (let i=0; i<10; i += max) $(i);
`````


## Settled


`````js filename=intro
const max /*:unknown*/ = $(10);
$(0);
const tmpClusterSSA_i /*:primitive*/ = 0 + max;
const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_i < 10;
if (tmpIfTest$1) {
  $(tmpClusterSSA_i);
  let tmpClusterSSA_i$1 /*:primitive*/ = tmpClusterSSA_i + max;
  while ($LOOP_UNROLL_9) {
    const tmpIfTest$2 /*:boolean*/ = tmpClusterSSA_i$1 < 10;
    if (tmpIfTest$2) {
      $(tmpClusterSSA_i$1);
      tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + max;
    } else {
      break;
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const max = $(10);
$(0);
const tmpClusterSSA_i = 0 + max;
if (tmpClusterSSA_i < 10) {
  $(tmpClusterSSA_i);
  let tmpClusterSSA_i$1 = tmpClusterSSA_i + max;
  while (true) {
    if (tmpClusterSSA_i$1 < 10) {
      $(tmpClusterSSA_i$1);
      tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + max;
    } else {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( 0 );
const b = 0 + a;
const c = b < 10;
if (c) {
  $( b );
  let d = b + a;
  while ($LOOP_UNROLL_9) {
    const e = d < 10;
    if (e) {
      $( d );
      d = d + a;
    }
    else {
      break;
    }
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
