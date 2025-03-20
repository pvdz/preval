# Preval test case

# branched_write_read_update_before.md

> While > Branched write read update before
>
> A loop with a branch where a binding is updated in one side and read in another...

## Input

`````js filename=intro
let x = $(1);
while (true) {
  x = $(10);
  if (x % 2) {
    $(++x, 'write');
  } else {
    // The write before will always change x so the ++x cannot be observed here
    $(x, 'read');
  }
}
`````


## Settled


`````js filename=intro
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x /*:unknown*/ = $(10);
  const tmpIfTest /*:number*/ = tmpClusterSSA_x % 2;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent /*:number*/ = $coerce(tmpClusterSSA_x, `number`);
    const tmpClusterSSA_x$1 /*:number*/ = tmpPostUpdArgIdent + 1;
    $(tmpClusterSSA_x$1, `write`);
  } else {
    $(tmpClusterSSA_x, `read`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
while (true) {
  const tmpClusterSSA_x = $(10);
  if (tmpClusterSSA_x % 2) {
    $($coerce(tmpClusterSSA_x, `number`) + 1, `write`);
  } else {
    $(tmpClusterSSA_x, `read`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( 10 );
  const b = a % 2;
  if (b) {
    const c = $coerce( a, "number" );
    const d = c + 1;
    $( d, "write" );
  }
  else {
    $( a, "read" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 10, 'read'
 - 4: 10
 - 5: 10, 'read'
 - 6: 10
 - 7: 10, 'read'
 - 8: 10
 - 9: 10, 'read'
 - 10: 10
 - 11: 10, 'read'
 - 12: 10
 - 13: 10, 'read'
 - 14: 10
 - 15: 10, 'read'
 - 16: 10
 - 17: 10, 'read'
 - 18: 10
 - 19: 10, 'read'
 - 20: 10
 - 21: 10, 'read'
 - 22: 10
 - 23: 10, 'read'
 - 24: 10
 - 25: 10, 'read'
 - 26: 10
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
