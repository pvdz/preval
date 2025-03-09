# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > For c > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = $(1) + $(2));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpBinBothLhs /*:unknown*/ = $(1);
  const tmpBinBothRhs /*:unknown*/ = $(2);
  let tmpClusterSSA_a /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpBinBothLhs$1 /*:unknown*/ = $(1);
      const tmpBinBothRhs$1 /*:unknown*/ = $(2);
      tmpClusterSSA_a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  let tmpClusterSSA_a = $(1) + $(2);
  while (true) {
    if ($(1)) {
      tmpClusterSSA_a = $(1) + $(2);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $({ a: 999, b: 1000 });
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $(1) + $(2);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpBinBothLhs = $(1);
    const tmpBinBothRhs = $(2);
    a = tmpBinBothLhs + tmpBinBothRhs;
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = $( 2 );
  let d = b + c;
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    if (e) {
      const f = $( 1 );
      const g = $( 2 );
      d = f + g;
    }
    else {
      break;
    }
  }
  $( d );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check