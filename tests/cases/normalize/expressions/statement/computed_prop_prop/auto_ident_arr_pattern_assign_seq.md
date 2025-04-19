# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
let obj = {};
obj[([x, y] = ($(x), $(y), [$(3), $(4)]))];
$(a, x, y);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs /*:array*/ = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
const tmpClusterSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
$coerce(tmpNestedAssignArrPatternRhs, `string`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_x, tmpClusterSSA_y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_x = tmpArrPatternSplat[0];
const tmpClusterSSA_y = tmpArrPatternSplat[1];
$coerce(tmpNestedAssignArrPatternRhs, `string`);
$({ a: 999, b: 1000 }, tmpClusterSSA_x, tmpClusterSSA_y);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
const c = [ a, b ];
const d = [ ...c ];
const e = d[ 0 ];
const f = d[ 1 ];
$coerce( c, "string" );
const g = {
  a: 999,
  b: 1000,
};
$( g, e, f );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
