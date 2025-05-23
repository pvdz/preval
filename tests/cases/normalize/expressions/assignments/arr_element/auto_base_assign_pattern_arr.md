# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Arr element > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$((a = [b] = $([$(2)])) + (a = [b] = $([$(2)])));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpNestedAssignArrPatternRhs];
const tmpArrElement$1 /*:unknown*/ = $(2);
const tmpCalleeParam$3 /*:array*/ = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpArrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const b /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs$1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
[...tmpNestedAssignArrPatternRhs];
const tmpArrElement$1 = $(2);
const tmpNestedAssignArrPatternRhs$1 = $([tmpArrElement$1]);
const b = [...tmpNestedAssignArrPatternRhs$1][0];
$(tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1);
$(tmpNestedAssignArrPatternRhs$1, b);
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
const i = c + f;
$( i );
$( f, h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
const tmpArrElement = $(2);
let tmpCalleeParam$1 = [tmpArrElement];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
b = tmpArrPatternSplat[0];
a = tmpNestedAssignArrPatternRhs;
const tmpBinBothLhs = a;
const tmpArrElement$1 = $(2);
let tmpCalleeParam$3 = [tmpArrElement$1];
const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs$1];
b = tmpArrPatternSplat$1[0];
a = tmpNestedAssignArrPatternRhs$1;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 2
 - 4: [2]
 - 5: '22'
 - 6: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
