# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$($(100) && (a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpArrElement /*:unknown*/ = $(3);
  const tmpArrElement$1 /*:unknown*/ = $(4);
  const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
  const tmpClusterSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1, 2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_x = tmpArrPatternSplat[0];
  const tmpClusterSSA_y = tmpArrPatternSplat[1];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpNestedAssignArrPatternRhs, tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, 1, 2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( 3 );
  const c = $( 4 );
  const d = [ b, c ];
  const e = [ ...d ];
  const f = e[ 0 ];
  const g = e[ 1 ];
  $( d );
  $( d, f, g );
}
else {
  $( a );
  const h = {
    a: 999,
    b: 1000,
  };
  $( h, 1, 2 );
}
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: [3, 4]
 - 5: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
