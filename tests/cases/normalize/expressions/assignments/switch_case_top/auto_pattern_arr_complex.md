# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Switch case top > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    [a] = $([1, 2]);
}
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [1, 2];
  const arrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const arrPatternSplat$1 /*:array*/ = [...arrAssignPatternRhs];
  const tmpClusterSSA_a /*:unknown*/ = arrPatternSplat$1[0];
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
if ($(1) === $(1)) {
  const arrAssignPatternRhs = $([1, 2]);
  $([...arrAssignPatternRhs][0]);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    [a] = $([1, 2]);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCalleeParam = [1, 2];
  const arrAssignPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  a = arrPatternSplat$1[0];
  $(a);
} else {
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
const e = $( 1 );
const f = d === e;
if (f) {
  const g = [ 1, 2 ];
  const h = $( g );
  const i = [ ...h ];
  const j = i[ 0 ];
  $( j );
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