# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > For b > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (; ([b] = $([$(2)])); $(1));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
if (tmpNestedAssignArrPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpArrElement$1 /*:unknown*/ = $(2);
    const tmpCalleeParam$1 /*:array*/ = [tmpArrElement$1];
    const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
    tmpClusterSSA_b = arrPatternSplat$1[0];
    if (tmpNestedAssignArrPatternRhs$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
let tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  while (true) {
    $(1);
    const tmpArrElement$1 = $(2);
    const tmpNestedAssignArrPatternRhs$1 = $([tmpArrElement$1]);
    tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs$1][0];
    if (!tmpNestedAssignArrPatternRhs$1) {
      break;
    }
  }
}
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  while (([b] = $([$(2)]))) {
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
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
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
let e = d[ 0 ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const f = $( 2 );
    const g = [ f ];
    const h = $( g );
    const i = [ ...h ];
    e = i[ 0 ];
    if (h) {

    }
    else {
      break;
    }
  }
}
const j = {
  a: 999,
  b: 1000,
};
$( j, e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 1
 - 4: 2
 - 5: [2]
 - 6: 1
 - 7: 2
 - 8: [2]
 - 9: 1
 - 10: 2
 - 11: [2]
 - 12: 1
 - 13: 2
 - 14: [2]
 - 15: 1
 - 16: 2
 - 17: [2]
 - 18: 1
 - 19: 2
 - 20: [2]
 - 21: 1
 - 22: 2
 - 23: [2]
 - 24: 1
 - 25: 2
 - 26: [2]
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
