# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > While > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
while ((a = [b] = $([$(2)]))) $(100);
$(a, b);
`````

## Settled


`````js filename=intro
let b /*:unknown*/ = undefined;
let a /*:unknown*/ = undefined;
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
if (tmpNestedAssignArrPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpArrElement$1 /*:unknown*/ = $(2);
    const tmpCalleeParam$1 /*:array*/ = [tmpArrElement$1];
    const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
    b = arrPatternSplat$1[0];
    a = tmpNestedAssignArrPatternRhs$1;
    if (tmpNestedAssignArrPatternRhs$1) {
    } else {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = undefined;
let a = undefined;
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  while (true) {
    $(100);
    const tmpArrElement$1 = $(2);
    const tmpNestedAssignArrPatternRhs$1 = $([tmpArrElement$1]);
    b = [...tmpNestedAssignArrPatternRhs$1][0];
    a = tmpNestedAssignArrPatternRhs$1;
    if (!tmpNestedAssignArrPatternRhs$1) {
      break;
    }
  }
  $(a, b);
} else {
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
}
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while ((a = [b] = $([$(2)]))) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
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
let b = undefined;
const c = $( 2 );
const d = [ c ];
const e = $( d );
const f = [ ...e ];
const g = f[ 0 ];
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const h = $( 2 );
    const i = [ h ];
    const j = $( i );
    const k = [ ...j ];
    a = k[ 0 ];
    b = j;
    if (j) {

    }
    else {
      break;
    }
  }
  $( b, a );
}
else {
  $( e, g );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 100
 - 4: 2
 - 5: [2]
 - 6: 100
 - 7: 2
 - 8: [2]
 - 9: 100
 - 10: 2
 - 11: [2]
 - 12: 100
 - 13: 2
 - 14: [2]
 - 15: 100
 - 16: 2
 - 17: [2]
 - 18: 100
 - 19: 2
 - 20: [2]
 - 21: 100
 - 22: 2
 - 23: [2]
 - 24: 100
 - 25: 2
 - 26: [2]
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
- objects in isFree check
