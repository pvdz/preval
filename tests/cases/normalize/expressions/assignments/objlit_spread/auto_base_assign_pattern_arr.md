# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Objlit spread > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$({ ...(a = [b] = $([$(2)])) });
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const b /*:unknown*/ = tmpArrPatternSplat[0];
const tmpCalleeParam /*:object*/ /*truthy*/ = { ...tmpNestedAssignArrPatternRhs };
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const b = [...tmpNestedAssignArrPatternRhs][0];
$({ ...tmpNestedAssignArrPatternRhs });
$(tmpNestedAssignArrPatternRhs, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
const f = { ... c };
$( f );
$( c, e );
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
const tmpObjSpread = a;
let tmpCalleeParam = { ...tmpObjSpread };
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
 - 3: { 0: '2' }
 - 4: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
