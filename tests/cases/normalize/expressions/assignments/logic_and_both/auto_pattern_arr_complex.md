# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = $([1, 2])) && ([a] = $([1, 2])));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const a /*:unknown*/ = tmpArrPatternSplat$1[0];
if (tmpNestedAssignArrPatternRhs) {
  const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpArrPatternSplat$3 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs$1];
  const tmpClusterSSA_a /*:unknown*/ = tmpArrPatternSplat$3[0];
  $(tmpNestedAssignArrPatternRhs$1);
  $(tmpClusterSSA_a);
} else {
  $(tmpNestedAssignArrPatternRhs);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
const tmpNestedAssignArrPatternRhs = $([1, 2]);
const a = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  const tmpNestedAssignArrPatternRhs$1 = $([1, 2]);
  const tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs$1][0];
  $(tmpNestedAssignArrPatternRhs$1);
  $(tmpClusterSSA_a);
} else {
  $(tmpNestedAssignArrPatternRhs);
  $(a);
}
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
const d = [ ...c ];
const e = d[ 0 ];
if (c) {
  const f = [ 1, 2 ];
  const g = $( f );
  const h = [ ...g ];
  const i = h[ 0 ];
  $( g );
  $( i );
}
else {
  $( c );
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let tmpCalleeParam = undefined;
let tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = tmpArrPatternSplat$1[0];
tmpCalleeParam = tmpNestedAssignArrPatternRhs;
if (tmpCalleeParam) {
  let tmpCalleeParam$3 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
  const tmpArrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$1];
  a = tmpArrPatternSplat$3[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs$1;
  $(tmpNestedAssignArrPatternRhs$1);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
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
