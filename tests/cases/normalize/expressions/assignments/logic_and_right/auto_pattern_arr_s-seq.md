# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Logic and right > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(100) && ([a] = ($(10), $(20), [1, 2])));
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
let a /*:unknown*/ = arrPatternSplat[0];
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs /*:array*/ = [1, 2];
  const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  $(tmpNestedAssignArrPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
let a = [...bindingPatternArrRoot][0];
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  a = [...tmpNestedAssignArrPatternRhs][0];
  $(tmpNestedAssignArrPatternRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$($(100) && ([a] = ($(10), $(20), [1, 2])));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(10);
  $(20);
  const tmpNestedAssignArrPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpCalleeParam = tmpNestedAssignArrPatternRhs;
} else {
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
let c = b[ 0 ];
const d = $( 100 );
if (d) {
  $( 10 );
  $( 20 );
  const e = [ 1, 2 ];
  const f = [ ...e ];
  c = f[ 0 ];
  $( e );
}
else {
  $( d );
}
$( c );
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