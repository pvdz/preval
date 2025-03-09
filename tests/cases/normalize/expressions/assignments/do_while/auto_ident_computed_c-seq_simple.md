# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, $(b))[$("c")]));
$(a, b);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const b /*:object*/ = { c: 1 };
const tmpAssignRhsCompObj /*:unknown*/ = $(b);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpAssignRhsCompObj$1 /*:unknown*/ = $(b);
    const tmpAssignRhsCompProp$1 /*:unknown*/ = $(`c`);
    a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
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
$(100);
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
const tmpClusterSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (tmpClusterSSA_a) {
  while (true) {
    $(100);
    const tmpAssignRhsCompObj$1 = $(b);
    const tmpAssignRhsCompProp$1 = $(`c`);
    a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
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
while (true) {
  {
    $(100);
  }
  if ((a = (1, 2, $(b))[$(`c`)])) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpAssignRhsCompObj = $(b);
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  let tmpIfTest = a;
  if (tmpIfTest) {
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
$( 100 );
const b = { c: 1 };
const c = $( b );
const d = $( "c" );
const e = c[ d ];
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( b );
    const g = $( "c" );
    a = f[ g ];
    if (a) {

    }
    else {
      break;
    }
  }
  $( a, b );
}
else {
  $( e, b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 100
 - 5: { c: '1' }
 - 6: 'c'
 - 7: 100
 - 8: { c: '1' }
 - 9: 'c'
 - 10: 100
 - 11: { c: '1' }
 - 12: 'c'
 - 13: 100
 - 14: { c: '1' }
 - 15: 'c'
 - 16: 100
 - 17: { c: '1' }
 - 18: 'c'
 - 19: 100
 - 20: { c: '1' }
 - 21: 'c'
 - 22: 100
 - 23: { c: '1' }
 - 24: 'c'
 - 25: 100
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check