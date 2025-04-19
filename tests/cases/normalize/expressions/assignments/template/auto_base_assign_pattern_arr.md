# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Assignments > Template > Auto base assign pattern arr
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
$(`before  ${(a = [b] = $([$(2)]))}  after`);
$(a, b);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam$3 /*:array*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$3);
const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
const tmpBinBothRhs /*:string*/ = $coerce(tmpNestedAssignArrPatternRhs, `string`);
const tmpCalleeParam /*:string*/ = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
const tmpClusterSSA_b = [...tmpNestedAssignArrPatternRhs][0];
$(`before  ${tmpNestedAssignArrPatternRhs}  after`);
$(tmpNestedAssignArrPatternRhs, tmpClusterSSA_b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
const f = $coerce( c, "string" );
const g = `before  ${f}  after`;
$( g );
$( c, e );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 'before 2 after'
 - 4: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
