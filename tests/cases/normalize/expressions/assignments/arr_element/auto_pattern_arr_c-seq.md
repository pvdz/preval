# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto pattern arr c-seq
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
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...bindingPatternArrRoot];
$(10);
$(20);
const tmpCalleeParam$1 /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
[...tmpNestedAssignArrPatternRhs];
$(10);
$(20);
const tmpCalleeParam$3 /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
const arrPatternSplat$3 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$3[0];
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
[...bindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = $([1, 2]);
[...tmpNestedAssignArrPatternRhs];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs$1 = $([1, 2]);
const tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs$1][0];
$(tmpNestedAssignArrPatternRhs + tmpNestedAssignArrPatternRhs$1);
$(tmpClusterSSA_a);
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


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
