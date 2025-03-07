# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > For b > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; ([a] = ($(10), $(20), $([1, 2]))); $(1));
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat$1 /*:array*/ = [...tmpNestedAssignArrPatternRhs];
let tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
if (tmpNestedAssignArrPatternRhs) {
  while ($LOOP_UNROLL_10) {
    $(1);
    $(10);
    $(20);
    const tmpCalleeParam$1 /*:array*/ = [1, 2];
    const tmpNestedAssignArrPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
    const arrPatternSplat$2 /*:array*/ = [...tmpNestedAssignArrPatternRhs$1];
    tmpClusterSSA_a = arrPatternSplat$2[0];
    if (tmpNestedAssignArrPatternRhs$1) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
[...bindingPatternArrRoot][0];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = $([1, 2]);
let tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs][0];
if (tmpNestedAssignArrPatternRhs) {
  while (true) {
    $(1);
    $(10);
    $(20);
    const tmpNestedAssignArrPatternRhs$1 = $([1, 2]);
    tmpClusterSSA_a = [...tmpNestedAssignArrPatternRhs$1][0];
    if (!tmpNestedAssignArrPatternRhs$1) {
      break;
    }
  }
}
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  while (([a] = ($(10), $(20), $([1, 2])))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
while (true) {
  let tmpIfTest = undefined;
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
  a = arrPatternSplat$1[0];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
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
b[ 0 ];
$( 10 );
$( 20 );
const c = [ 1, 2 ];
const d = $( c );
const e = [ ...d ];
let f = e[ 0 ];
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    $( 10 );
    $( 20 );
    const g = [ 1, 2 ];
    const h = $( g );
    const i = [ ...h ];
    f = i[ 0 ];
    if (h) {

    }
    else {
      break;
    }
  }
}
$( f );
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