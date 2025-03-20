# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > Arr element > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$((a = [x, y] = [$(3), $(4)]) + (a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
arrPatternSplat[1];
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpArrElement$5 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs$1 /*:array*/ = [tmpArrElement$3, tmpArrElement$5];
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat$1[0];
const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat$1[1];
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs$1, tmpClusterSSA_x, tmpClusterSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
arrPatternSplat[0];
arrPatternSplat[1];
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_x = arrPatternSplat$1[0];
const tmpClusterSSA_y = arrPatternSplat$1[1];
$(tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1);
$(tmpNestedAssignArrPatternRhs$1, tmpClusterSSA_x, tmpClusterSSA_y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ...c ];
d[ 0 ];
d[ 1 ];
const e = $( 3 );
const f = $( 4 );
const g = [ e, f ];
const h = [ ...g ];
const i = h[ 0 ];
const j = h[ 1 ];
const k = c + g;
$( k );
$( g, i, j );
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: '3,43,4'
 - 6: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
