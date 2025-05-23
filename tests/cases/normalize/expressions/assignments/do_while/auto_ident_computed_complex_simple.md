# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)["c"]));
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
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
$(100);
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
$( 100 );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpAssignRhsProp = $(b);
  a = tmpAssignRhsProp.c;
  const tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 100
 - 4: { c: '1' }
 - 5: 100
 - 6: { c: '1' }
 - 7: 100
 - 8: { c: '1' }
 - 9: 100
 - 10: { c: '1' }
 - 11: 100
 - 12: { c: '1' }
 - 13: 100
 - 14: { c: '1' }
 - 15: 100
 - 16: { c: '1' }
 - 17: 100
 - 18: { c: '1' }
 - 19: 100
 - 20: { c: '1' }
 - 21: 100
 - 22: { c: '1' }
 - 23: 100
 - 24: { c: '1' }
 - 25: 100
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
