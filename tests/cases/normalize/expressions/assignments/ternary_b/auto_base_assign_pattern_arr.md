# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Ternary b > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$($(1) ? (a = [b] = $([$(2)])) : $(200));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpArrElement /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:array*/ = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  const b /*:array*/ = [];
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpArrElement = $(2);
  const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
  const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, []);
}
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$($(1) ? (a = [b] = $([$(2)])) : $(200));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs = undefined;
  const tmpArrElement = $(2);
  const tmpCalleeParam$1 = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  const c = [ b ];
  const d = $( c );
  const e = [ ...d ];
  const f = e[ 0 ];
  $( d );
  $( d, f );
}
else {
  const g = $( 200 );
  $( g );
  const h = {
    a: 999,
    b: 1000,
  };
  const i = [];
  $( h, i );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: [2]
 - 5: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
