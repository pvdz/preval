# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), $([1, 2]))) || ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam$1 /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam$1);
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
if (tmpNestedAssignArrPatternRhs) {
  $(tmpNestedAssignArrPatternRhs);
  $(tmpClusterSSA_a);
} else {
  $(10);
  $(20);
  const tmpCalleeParam$3 /*:array*/ = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const arrPatternSplat$3 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
  const tmpClusterSSA_a$1 /*:unknown*/ = arrPatternSplat$3[0];
  $(tmpNestedAssignArrPatternRhs$1);
  $(tmpClusterSSA_a$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
[...bindingPatternArrRoot][0];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = $([1, 2]);
const tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  $(tmpNestedAssignArrPatternRhs);
  $(tmpClusterSSA_a);
} else {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs$1 = $([1, 2]);
  const tmpClusterSSA_a$1 = [...tmpNestedAssignArrPatternRhs$1][0];
  $(tmpNestedAssignArrPatternRhs$1);
  $(tmpClusterSSA_a$1);
}
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(([a] = ($(10), $(20), $([1, 2]))) || ([a] = ($(10), $(20), $([1, 2]))));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpCalleeParam = undefined;
$(10);
$(20);
const tmpCalleeParam$1 = [1, 2];
const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam$1);
const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = arrPatternSplat$1[0];
tmpCalleeParam = tmpNestedAssignArrPatternRhs;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  $(10);
  $(20);
  const tmpCalleeParam$3 = [1, 2];
  const tmpNestedAssignArrPatternRhs$1 = $(tmpCalleeParam$3);
  const arrPatternSplat$3 = [...tmpNestedAssignArrPatternRhs$1];
  a = arrPatternSplat$3[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs$1;
  $(tmpNestedAssignArrPatternRhs$1);
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
b[ 0 ];
$( 10 );
$( 20 );
const c = [ 1, 2 ];
const d = $( c );
const e = [ ...d ];
const f = e[ 0 ];
if (d) {
  $( d );
  $( f );
}
else {
  $( 10 );
  $( 20 );
  const g = [ 1, 2 ];
  const h = $( g );
  const i = [ ...h ];
  const j = i[ 0 ];
  $( h );
  $( j );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
