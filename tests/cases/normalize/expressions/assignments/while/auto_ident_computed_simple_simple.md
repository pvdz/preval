# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > While > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ((a = b["c"])) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 1;
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
const b /*:object*/ = { c: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  a = b.c;
  if (a) {
  } else {
    break;
  }
}
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 1;
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
$(100);
const b = { c: 1 };
while (true) {
  $(100);
  a = b.c;
  if (!a) {
    break;
  }
}
$(a, b);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
$( 100 );
const b = { c: 1 };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  a = b.c;
  if (a) {

  }
  else {
    break;
  }
}
$( a, b );
`````


## Todos triggered


- objects in isFree check


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
