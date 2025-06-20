# Preval test case

# branched_write_read_bare.md

> While > Branched write read bare
>
> A loop with a branch where a binding is updated in one side and read in another...

(Technically this is an infinite loop that writes once since after that it only goes to the read branch)

## Input

`````js filename=intro
let x = $(1);
while (true) {
  if (x % 2) {
    $(++x, 'write');
  } else {
    $(x, 'read');
  }
}
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest /*:number*/ = x % 2;
  if (tmpIfTest) {
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
  if (x % 2) {
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
  const b = a % 2;
  if (b) {
    const c = $coerce( a, "number" );
    a = c + 1;
    $( a, "write" );
  }
  else {
    $( a, "read" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
while (true) {
  const tmpIfTest = x % 2;
  if (tmpIfTest) {
    const tmpPostUpdArgIdent = $coerce(x, `number`);
    x = tmpPostUpdArgIdent + 1;
    let tmpCalleeParam = x;
    $(x, `write`);
  } else {
    $(x, `read`);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2, 'write'
 - 3: 2, 'read'
 - 4: 2, 'read'
 - 5: 2, 'read'
 - 6: 2, 'read'
 - 7: 2, 'read'
 - 8: 2, 'read'
 - 9: 2, 'read'
 - 10: 2, 'read'
 - 11: 2, 'read'
 - 12: 2, 'read'
 - 13: 2, 'read'
 - 14: 2, 'read'
 - 15: 2, 'read'
 - 16: 2, 'read'
 - 17: 2, 'read'
 - 18: 2, 'read'
 - 19: 2, 'read'
 - 20: 2, 'read'
 - 21: 2, 'read'
 - 22: 2, 'read'
 - 23: 2, 'read'
 - 24: 2, 'read'
 - 25: 2, 'read'
 - 26: 2, 'read'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
