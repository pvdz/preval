# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), [1, 2])) + ([a] = ($(10), $(20), [1, 2])));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs /*:array*/ = [1, 2];
[...tmpNestedAssignArrPatternRhs];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs$1 /*:array*/ = [1, 2];
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
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
[...tmpNestedAssignArrPatternRhs];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs$1 = [1, 2];
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
$( 10 );
$( 20 );
const b = [ 1, 2 ];
[ ...b ];
$( 10 );
$( 20 );
const c = [ 1, 2 ];
const d = [ ...c ];
const e = d[ 0 ];
const f = b + c;
$( f );
$( e );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
