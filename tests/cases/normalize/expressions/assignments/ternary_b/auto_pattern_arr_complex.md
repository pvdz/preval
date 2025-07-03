# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(1) ? ([a] = $([1, 2])) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [1, 2];
  const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpArrPatternSplat$1 /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_a /*:unknown*/ = tmpArrPatternSplat$1[0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...tmpBindingPatternArrRoot][0];
if ($(1)) {
  const tmpNestedAssignArrPatternRhs = $([1, 2]);
  const tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs][0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpClusterSSA_a);
} else {
  $($(200));
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
const b = [ ...a ];
const c = b[ 0 ];
const d = $( 1 );
if (d) {
  const e = [ 1, 2 ];
  const f = $( e );
  const g = [ ...f ];
  const h = g[ 0 ];
  $( f );
  $( h );
}
else {
  const i = $( 200 );
  $( i );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpCalleeParam$1 = [1, 2];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
  const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = tmpArrPatternSplat$1[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs;
  $(tmpNestedAssignArrPatternRhs);
  $(a);
} else {
  tmpCalleeParam = $(200);
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
