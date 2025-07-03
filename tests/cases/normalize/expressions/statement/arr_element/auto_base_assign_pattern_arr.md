# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > Arr element > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
([b] = $([$(2)])) + ([b] = $([$(2)]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
[...tmpNestedAssignArrPatternRhs];
const tmpArrElement$1 /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpSSA_b /*:unknown*/ = tmpArrPatternSplat$1[0];
tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, tmpSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
[...tmpNestedAssignArrPatternRhs];
const tmpArrElement$1 = $(2);
const tmpNestedAssignArrPatternRhs$1 = $([tmpArrElement$1]);
const tmpSSA_b = [...tmpNestedAssignArrPatternRhs$1][0];
tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$({ a: 999, b: 1000 }, tmpSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
[ ...c ];
const d = $( 2 );
const e = [ d ];
const f = $( e );
const g = [ ...f ];
const h = g[ 0 ];
c + f;
const i = {
  a: 999,
  b: 1000,
};
$( i, h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpArrElement = $(2);
let tmpCalleeParam = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = tmpArrPatternSplat[0];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs = undefined;
const tmpArrElement$1 = $(2);
let tmpCalleeParam$1 = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$1);
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
b = tmpArrPatternSplat$1[0];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
