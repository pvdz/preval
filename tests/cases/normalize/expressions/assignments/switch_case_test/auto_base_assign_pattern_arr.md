# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Switch case test > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = [b] = $([$(2)])):
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = arrPatternSplat[0];
$(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
$(tmpNestedAssignArrPatternRhs, [...tmpNestedAssignArrPatternRhs][0]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
$( c, e );
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [2]
 - 4: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
