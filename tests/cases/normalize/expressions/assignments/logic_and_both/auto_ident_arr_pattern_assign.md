# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident arr pattern assign
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$((a = [x, y] = [$(3), $(4)]) && (a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Settled


`````js filename=intro
$(3);
$(4);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpArrElement$5 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs$1 /*:array*/ = [tmpArrElement$3, tmpArrElement$5];
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_x$1 /*:unknown*/ = arrPatternSplat$1[0];
const tmpClusterSSA_y$1 /*:unknown*/ = arrPatternSplat$1[1];
$(tmpNestedAssignArrPatternRhs$1);
$(tmpNestedAssignArrPatternRhs$1, tmpClusterSSA_x$1, tmpClusterSSA_y$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(4);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_x$1 = arrPatternSplat$1[0];
const tmpClusterSSA_y$1 = arrPatternSplat$1[1];
$(tmpNestedAssignArrPatternRhs$1);
$(tmpNestedAssignArrPatternRhs$1, tmpClusterSSA_x$1, tmpClusterSSA_y$1);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$((a = [x, y] = [$(3), $(4)]) && (a = [x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  x = arrPatternSplat$1[0];
  y = arrPatternSplat$1[1];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a, x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 4 );
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ...c ];
const e = d[ 0 ];
const f = d[ 1 ];
$( c );
$( c, e, f );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: [3, 4]
 - 6: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope