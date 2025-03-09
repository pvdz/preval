# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Logic and both > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
([b] = $([$(2)])) && ([b] = $([$(2)]));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpNestedAssignArrPatternRhs) {
  const tmpArrElement$1 /*:unknown*/ = $(2);
  const tmpCalleeParam$1 /*:array*/ = [tmpArrElement$1];
  const arrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const arrPatternSplat$1 /*:array*/ = [...arrAssignPatternRhs];
  const tmpClusterSSA_b$1 /*:unknown*/ = arrPatternSplat$1[0];
  $(a, tmpClusterSSA_b$1);
} else {
  $(a, tmpClusterSSA_b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
const a = { a: 999, b: 1000 };
if (tmpNestedAssignArrPatternRhs) {
  const tmpArrElement$1 = $(2);
  const arrAssignPatternRhs = $([tmpArrElement$1]);
  $(a, [...arrAssignPatternRhs][0]);
} else {
  $(a, tmpClusterSSA_b);
}
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
([b] = $([$(2)])) && ([b] = $([$(2)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpArrElement = $(2);
const tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpIfTest = tmpNestedAssignArrPatternRhs;
if (tmpIfTest) {
  const tmpArrElement$1 = $(2);
  const tmpCalleeParam$1 = [tmpArrElement$1];
  const arrAssignPatternRhs = $(tmpCalleeParam$1);
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  b = arrPatternSplat$1[0];
  $(a, b);
} else {
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
const f = {
  a: 999,
  b: 1000,
};
if (c) {
  const g = $( 2 );
  const h = [ g ];
  const i = $( h );
  const j = [ ...i ];
  const k = j[ 0 ];
  $( f, k );
}
else {
  $( f, e );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope