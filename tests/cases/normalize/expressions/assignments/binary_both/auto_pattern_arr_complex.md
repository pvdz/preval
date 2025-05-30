# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = $([1, 2])) + ([a] = $([1, 2])));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpCalleeParam$1 /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpNestedAssignArrPatternRhs];
const tmpCalleeParam$3 /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpArrPatternSplat$3 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const a /*:unknown*/ = tmpArrPatternSplat$3[0];
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpNestedAssignArrPatternRhs = $([1, 2]);
[...tmpNestedAssignArrPatternRhs];
const tmpNestedAssignArrPatternRhs$1 = $([1, 2]);
const a = [...tmpNestedAssignArrPatternRhs$1][0];
$(tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
const b = [ 1, 2 ];
const c = $( b );
[ ...c ];
const d = [ 1, 2 ];
const e = $( d );
const f = [ ...e ];
const g = f[ 0 ];
const h = c + e;
$( h );
$( g );
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
