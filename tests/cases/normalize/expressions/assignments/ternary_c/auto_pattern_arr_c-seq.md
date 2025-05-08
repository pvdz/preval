# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Ternary c > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(0) ? $(100) : ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  $(10);
  $(20);
  const tmpCalleeParam$1 /*:array*/ = [1, 2];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpArrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_a /*:unknown*/ = tmpArrPatternSplat$1[0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...tmpBindingPatternArrRoot][0];
if ($(0)) {
  $($(100));
  $(a);
} else {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = $([1, 2]);
  const tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs][0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
const c = b[ 0 ];
const d = $( 0 );
if (d) {
  const e = $( 100 );
  $( e );
  $( c );
}
else {
  $( 10 );
  $( 20 );
  const f = [ 1, 2 ];
  const g = $( f );
  const h = [ ...g ];
  const i = h[ 0 ];
  $( g );
  $( i );
}
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
