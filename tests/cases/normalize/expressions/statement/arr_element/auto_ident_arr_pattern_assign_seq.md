# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Arr element > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
([x, y] = ($(x), $(y), [$(3), $(4)])) + ([x, y] = ($(x), $(y), [$(3), $(4)]));
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
const tmpSSA_x /*:unknown*/ = tmpArrPatternSplat[0];
const tmpSSA_y /*:unknown*/ = tmpArrPatternSplat[1];
$(tmpSSA_x);
$(tmpSSA_y);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpArrElement$5 /*:unknown*/ = $(4);
const tmpNestedAssignArrPatternRhs$1 /*:array*/ = [tmpArrElement$3, tmpArrElement$5];
const tmpArrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_tmpSSA_x /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpClusterSSA_tmpSSA_y /*:unknown*/ = tmpArrPatternSplat$1[1];
tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpClusterSSA_tmpSSA_x, tmpClusterSSA_tmpSSA_y);
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
const tmpSSA_x = tmpArrPatternSplat[0];
const tmpSSA_y = tmpArrPatternSplat[1];
$(tmpSSA_x);
$(tmpSSA_y);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_tmpSSA_x = tmpArrPatternSplat$1[0];
const tmpClusterSSA_tmpSSA_y = tmpArrPatternSplat$1[1];
tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$({ a: 999, b: 1000 }, tmpClusterSSA_tmpSSA_x, tmpClusterSSA_tmpSSA_y);
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
$( e );
$( f );
const g = $( 3 );
const h = $( 4 );
const i = [ g, h ];
const j = [ ...i ];
const k = j[ 0 ];
const l = j[ 1 ];
c + i;
const m = {
  a: 999,
  b: 1000,
};
$( m, k, l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
$(x);
$(y);
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat[0];
y = tmpArrPatternSplat[1];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs = undefined;
$(x);
$(y);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
const tmpNestedAssignArrPatternRhs$1 = [tmpArrElement$3, tmpArrElement$5];
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
x = tmpArrPatternSplat$1[0];
y = tmpArrPatternSplat$1[1];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, x, y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
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
 - 9: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
