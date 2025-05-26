# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), $([1, 2]))) + ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpCalleeParam$1 /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpNestedAssignArrPatternRhs];
$(10);
$(20);
const tmpCalleeParam$3 /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpArrPatternSplat$3 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpSSA_a /*:unknown*/ = tmpArrPatternSplat$3[0];
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(tmpSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = $([1, 2]);
[...tmpNestedAssignArrPatternRhs];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs$1 = $([1, 2]);
const tmpSSA_a = [...tmpNestedAssignArrPatternRhs$1][0];
$(tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1);
$(tmpSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
$( 10 );
$( 20 );
const b = [ 1, 2 ];
const c = $( b );
[ ...c ];
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = $( d );
const f = [ ...e ];
const g = f[ 0 ];
const h = c + e;
$( h );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let tmpBinBothLhs = undefined;
$(10);
$(20);
let tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = tmpArrPatternSplat$1[0];
tmpBinBothLhs = tmpNestedAssignArrPatternRhs;
let tmpBinBothRhs = undefined;
$(10);
$(20);
let tmpCalleeParam$3 = [1, 2];
const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
const tmpArrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$1];
a = tmpArrPatternSplat$3[0];
tmpBinBothRhs = tmpNestedAssignArrPatternRhs$1;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
