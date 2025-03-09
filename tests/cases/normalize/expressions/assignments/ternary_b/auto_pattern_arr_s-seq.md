# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Ternary b > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(1) ? ([a] = ($(10), $(20), [1, 2])) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs /*:array*/ = [1, 2];
  const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
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
const bindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...bindingPatternArrRoot][0];
if ($(1)) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  const tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs][0];
  $(tmpNestedAssignArrPatternRhs);
  $(tmpClusterSSA_a);
} else {
  $($(200));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(1) ? ([a] = ($(10), $(20), [1, 2])) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs;
  $(tmpNestedAssignArrPatternRhs);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
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
  $( 10 );
  $( 20 );
  const e = [ 1, 2 ];
  const f = [ ...e ];
  const g = f[ 0 ];
  $( e );
  $( g );
}
else {
  const h = $( 200 );
  $( h );
  $( c );
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