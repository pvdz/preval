# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident arr pattern assign seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(
  (a = [x, y] = ($(x), $(y), [$(3), $(4)])) &&
    (a = [x, y] = ($(x), $(y), [$(3), $(4)]))
);
$(a, x, y);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
$(tmpArrElement);
$(tmpArrElement$1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpArrElement$5 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs$1 /*:array*/ /*truthy*/ = [tmpArrElement$3, tmpArrElement$5];
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_tmpSSA_x /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpClusterSSA_tmpSSA_y /*:unknown*/ = tmpArrPatternSplat$1[1];
$(tmpNestedAssignArrPatternRhs$1);
$(tmpNestedAssignArrPatternRhs$1, tmpClusterSSA_tmpSSA_x, tmpClusterSSA_tmpSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
$(tmpArrElement);
$(tmpArrElement$1);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_tmpSSA_x = tmpArrPatternSplat$1[0];
const tmpClusterSSA_tmpSSA_y = tmpArrPatternSplat$1[1];
$(tmpNestedAssignArrPatternRhs$1);
$(tmpNestedAssignArrPatternRhs$1, tmpClusterSSA_tmpSSA_x, tmpClusterSSA_tmpSSA_y);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
$( a );
$( b );
const c = $( 3 );
const d = $( 4 );
const e = [ c, d ];
const f = [ ...e ];
const g = f[ 0 ];
const h = f[ 1 ];
$( e );
$( e, g, h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat[0];
y = tmpArrPatternSplat[1];
a = tmpNestedAssignArrPatternRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  $(x);
  $(y);
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
  const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
  x = tmpArrPatternSplat$1[0];
  y = tmpArrPatternSplat$1[1];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, x, y);
} else {
  $(tmpCalleeParam);
  $(a, x, y);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 3
 - 6: 4
 - 7: 3
 - 8: 4
 - 9: [3, 4]
 - 10: [3, 4], 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
