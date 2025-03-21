# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; (a = $(b)["c"]); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpAssignRhsProp$1 /*:unknown*/ = $(b);
    a = tmpAssignRhsProp$1.c;
    if (a) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpClusterSSA_a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { c: 1 };
const tmpClusterSSA_a = $(b).c;
if (tmpClusterSSA_a) {
  while (true) {
    $(1);
    a = $(b).c;
    if (!a) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpClusterSSA_a, b);
}
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = $(b)[`c`])) {
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpAssignRhsProp = $(b);
  a = tmpAssignRhsProp.c;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { c: 1 };
const c = $( b );
const d = c.c;
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const e = $( b );
    a = e.c;
    if (a) {

    }
    else {
      break;
    }
  }
  $( a, b );
}
else {
  $( d, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '1' }
 - 2: 1
 - 3: { c: '1' }
 - 4: 1
 - 5: { c: '1' }
 - 6: 1
 - 7: { c: '1' }
 - 8: 1
 - 9: { c: '1' }
 - 10: 1
 - 11: { c: '1' }
 - 12: 1
 - 13: { c: '1' }
 - 14: 1
 - 15: { c: '1' }
 - 16: 1
 - 17: { c: '1' }
 - 18: 1
 - 19: { c: '1' }
 - 20: 1
 - 21: { c: '1' }
 - 22: 1
 - 23: { c: '1' }
 - 24: 1
 - 25: { c: '1' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
