# Preval test case

# unobservable_ops_global.md

> While > Unobservable ops global
>
> A static operation that can not be observed inside the loop and is not depended on the loop count should be moved out.

## Input

`````js filename=intro
let s = $(10);
let x = true;
while (x) {
  $(1);
  s = s | 10; // This line can be moved outward since `s` can not be observed
  x = $(true);
}
$(s);
`````


## Settled


`````js filename=intro
const s /*:unknown*/ = $(10);
$(1);
let tmpClusterSSA_s /*:number*/ = s | 10;
const tmpClusterSSA_x /*:unknown*/ = $(true);
if (tmpClusterSSA_x) {
  while ($LOOP_UNROLL_10) {
    $(1);
    tmpClusterSSA_s = tmpClusterSSA_s | 10;
    const tmpClusterSSA_x$1 /*:unknown*/ = $(true);
    if (tmpClusterSSA_x$1) {
    } else {
      break;
    }
  }
  $(tmpClusterSSA_s);
} else {
  $(tmpClusterSSA_s);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const s = $(10);
$(1);
let tmpClusterSSA_s = s | 10;
if ($(true)) {
  while (true) {
    $(1);
    tmpClusterSSA_s = tmpClusterSSA_s | 10;
    if (!$(true)) {
      break;
    }
  }
  $(tmpClusterSSA_s);
} else {
  $(tmpClusterSSA_s);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( 1 );
let b = a | 10;
const c = $( true );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    b = b | 10;
    const d = $( true );
    if (d) {

    }
    else {
      break;
    }
  }
  $( b );
}
else {
  $( b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 1
 - 3: true
 - 4: 1
 - 5: true
 - 6: 1
 - 7: true
 - 8: 1
 - 9: true
 - 10: 1
 - 11: true
 - 12: 1
 - 13: true
 - 14: 1
 - 15: true
 - 16: 1
 - 17: true
 - 18: 1
 - 19: true
 - 20: 1
 - 21: true
 - 22: 1
 - 23: true
 - 24: 1
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
