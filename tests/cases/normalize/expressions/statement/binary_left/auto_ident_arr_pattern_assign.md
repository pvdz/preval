# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Binary left > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
([x, y] = [$(3), $(4)]) + $(100);
$(a, x, y);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat[0];
const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat[1];
const tmpBinBothRhs /*:unknown*/ = $(100);
tmpNestedAssignArrPatternRhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_x, tmpClusterSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x = arrPatternSplat[0];
const tmpClusterSSA_y = arrPatternSplat[1];
tmpNestedAssignArrPatternRhs + $(100);
$({ a: 999, b: 1000 }, tmpClusterSSA_x, tmpClusterSSA_y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ...c ];
const e = d[ 0 ];
const f = d[ 1 ];
const g = $( 100 );
c + g;
const h = {
  a: 999,
  b: 1000,
};
$( h, e, f );
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
 - 3: 100
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
