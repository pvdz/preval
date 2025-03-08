# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Call > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(([b] = $([$(2)])));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
$(tmpNestedAssignArrPatternRhs);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
$(tmpNestedAssignArrPatternRhs);
$({ a: 999, b: 1000 }, tmpClusterSSA_b);
`````

## Pre Normal


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
$(([b] = $([$(2)])));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpArrElement = $(2);
const tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = arrPatternSplat[0];
tmpCalleeParam = tmpNestedAssignArrPatternRhs;
$(tmpNestedAssignArrPatternRhs);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
$( c );
const f = {
  a: 999,
  b: 1000,
};
$( f, e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: [2]
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope