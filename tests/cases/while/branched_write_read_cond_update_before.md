# Preval test case

# branched_write_read_cond_update_before.md

> While > Branched write read cond update before
>
> A loop with a branch where a binding is updated in one side and read in another...

## Input

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 3) x = $(10, 'ten');
  if (x % 2) {
    $(++x, 'write');
  } else {
    // Since the 10-write may not happen, this read may observe the ++x
    $(x, 'read');
  }
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:number*/ = x % 3;
  let tmpIfTest$1 /*:number*/ = 0;
  if (tmpIfTest) {
    x = $(10, `ten`);
    tmpIfTest$1 = x % 2;
  } else {
    tmpIfTest$1 = x % 2;
  }
  if (tmpIfTest$1) {
    const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
    x = tmpPostUpdArgIdent + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(1);
while (true) {
  const tmpIfTest = x % 3;
  let tmpIfTest$1 = 0;
  if (tmpIfTest) {
    x = $(10, `ten`);
    tmpIfTest$1 = x % 2;
  } else {
    tmpIfTest$1 = x % 2;
  }
  if (tmpIfTest$1) {
    x = $coerce(x, `number`) + 1;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a % 3;
  let c = 0;
  if (b) {
    a = $( 10, "ten" );
    c = a % 2;
  }
  else {
    c = a % 2;
  }
  if (c) {
    const d = $coerce( a, "number" );
    a = d + 1;
    $( a, "write" );
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
 - 2: 10, 'ten'
 - 3: 10, 'read'
 - 4: 10, 'ten'
 - 5: 10, 'read'
 - 6: 10, 'ten'
 - 7: 10, 'read'
 - 8: 10, 'ten'
 - 9: 10, 'read'
 - 10: 10, 'ten'
 - 11: 10, 'read'
 - 12: 10, 'ten'
 - 13: 10, 'read'
 - 14: 10, 'ten'
 - 15: 10, 'read'
 - 16: 10, 'ten'
 - 17: 10, 'read'
 - 18: 10, 'ten'
 - 19: 10, 'read'
 - 20: 10, 'ten'
 - 21: 10, 'read'
 - 22: 10, 'ten'
 - 23: 10, 'read'
 - 24: 10, 'ten'
 - 25: 10, 'read'
 - 26: 10, 'ten'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
