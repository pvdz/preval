# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Binary right > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(100) + ([a] = ($(10), $(20), [1, 2])));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpBinBothLhs /*:unknown*/ = $(100);
$(10);
$(20);
const tmpNestedAssignArrPatternRhs /*:array*/ = [1, 2];
const tmpArrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const a /*:unknown*/ = tmpArrPatternSplat$1[0];
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpNestedAssignArrPatternRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpBinBothLhs = $(100);
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
const a = [...tmpNestedAssignArrPatternRhs][0];
$(tmpBinBothLhs + tmpNestedAssignArrPatternRhs);
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
const b = $( 100 );
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
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
