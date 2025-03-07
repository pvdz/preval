# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, $(b))[$("c")]); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsCompObj /*:unknown*/ = $(b);
const tmpAssignRhsCompProp /*:unknown*/ = $(`c`);
let tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpAssignRhsCompObj$1 /*:unknown*/ = $(b);
    const tmpAssignRhsCompProp$1 /*:unknown*/ = $(`c`);
    tmpClusterSSA_a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
    if (tmpClusterSSA_a) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
let tmpClusterSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (tmpClusterSSA_a) {
  while (true) {
    $(1);
    const tmpAssignRhsCompObj$1 = $(b);
    const tmpAssignRhsCompProp$1 = $(`c`);
    tmpClusterSSA_a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
    if (!tmpClusterSSA_a) {
      break;
    }
  }
}
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = (1, 2, $(b))[$(`c`)])) {
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
  const tmpAssignRhsCompObj = $(b);
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
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
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
let d = b[ c ];
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const e = $( a );
    const f = $( "c" );
    d = e[ f ];
    if (d) {

    }
    else {
      break;
    }
  }
}
$( d, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1
 - 4: { c: '1' }
 - 5: 'c'
 - 6: 1
 - 7: { c: '1' }
 - 8: 'c'
 - 9: 1
 - 10: { c: '1' }
 - 11: 'c'
 - 12: 1
 - 13: { c: '1' }
 - 14: 'c'
 - 15: 1
 - 16: { c: '1' }
 - 17: 'c'
 - 18: 1
 - 19: { c: '1' }
 - 20: 'c'
 - 21: 1
 - 22: { c: '1' }
 - 23: 'c'
 - 24: 1
 - 25: { c: '1' }
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check