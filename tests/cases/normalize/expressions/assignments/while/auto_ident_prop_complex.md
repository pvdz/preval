# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > While > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ((a = $(b).c)) $(100);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
let a /*:unknown*/ = tmpAssignRhsProp.c;
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpAssignRhsProp$1 /*:unknown*/ = $(b);
    a = tmpAssignRhsProp$1.c;
    if (a) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
let a = $(b).c;
if (a) {
  while (true) {
    $(100);
    a = $(b).c;
    if (!a) {
      break;
    }
  }
  $(a, b);
} else {
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
let c = b.c;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( a );
    c = d.c;
    if (c) {

    }
    else {
      break;
    }
  }
  $( c, a );
}
else {
  $( c, a );
}
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: 100
 - 3: { c: '1' }
 - 4: 100
 - 5: { c: '1' }
 - 6: 100
 - 7: { c: '1' }
 - 8: 100
 - 9: { c: '1' }
 - 10: 100
 - 11: { c: '1' }
 - 12: 100
 - 13: { c: '1' }
 - 14: 100
 - 15: { c: '1' }
 - 16: 100
 - 17: { c: '1' }
 - 18: 100
 - 19: { c: '1' }
 - 20: 100
 - 21: { c: '1' }
 - 22: 100
 - 23: { c: '1' }
 - 24: 100
 - 25: { c: '1' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
