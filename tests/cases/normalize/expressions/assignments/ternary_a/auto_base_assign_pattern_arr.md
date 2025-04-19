# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Ternary a > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) ? $(100) : $(200));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
if (tmpNestedAssignArrPatternRhs) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  $($(100));
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
} else {
  $($(200));
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
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
if (c) {
  const f = $( 100 );
  $( f );
  $( c, e );
}
else {
  const g = $( 200 );
  $( g );
  $( c, e );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 100
 - 4: 100
 - 5: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
