# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > For c > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); [a] = $([1, 2]));
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [1, 2];
  const arrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const arrPatternSplat$1 /*:array*/ = [...arrAssignPatternRhs];
  let tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCalleeParam$1 /*:array*/ = [1, 2];
      const arrAssignPatternRhs$1 /*:unknown*/ = $(tmpCalleeParam$1);
      const arrPatternSplat$2 /*:array*/ = [...arrAssignPatternRhs$1];
      tmpClusterSSA_a = arrPatternSplat$2[0];
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...bindingPatternArrRoot][0];
if ($(1)) {
  const arrAssignPatternRhs = $([1, 2]);
  let tmpClusterSSA_a = [...arrAssignPatternRhs][0];
  while (true) {
    if ($(1)) {
      const arrAssignPatternRhs$1 = $([1, 2]);
      tmpClusterSSA_a = [...arrAssignPatternRhs$1][0];
    } else {
      break;
    }
  }
  $(tmpClusterSSA_a);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  while ($(1)) {
    [a] = $([1, 2]);
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCalleeParam = [1, 2];
    const arrAssignPatternRhs = $(tmpCalleeParam);
    const arrPatternSplat$1 = [...arrAssignPatternRhs];
    a = arrPatternSplat$1[0];
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
const c = b[ 0 ];
const d = $( 1 );
if (d) {
  const e = [ 1, 2 ];
  const f = $( e );
  const g = [ ...f ];
  let h = g[ 0 ];
  while ($LOOP_UNROLL_10) {
    const i = $( 1 );
    if (i) {
      const j = [ 1, 2 ];
      const k = $( j );
      const l = [ ...k ];
      h = l[ 0 ];
    }
    else {
      break;
    }
  }
  $( h );
}
else {
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
- inline computed array property read
