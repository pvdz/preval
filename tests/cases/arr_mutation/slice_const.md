# Preval test case

# slice_const.md

> Arr mutation > Slice const
>
>

## Input

`````js filename=intro
const arrAssignPatternRhs = [``, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
let x;
if ($) {
  x = arrPatternSplat$1.slice(0);
}
$(x);
`````

## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_x /*:array*/ = [];
  $(tmpClusterSSA_x);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $([]);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
const arrAssignPatternRhs = [``, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
let x;
if ($) {
  x = arrPatternSplat$1.slice(0);
}
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [``, 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
let x = undefined;
if ($) {
  x = arrPatternSplat$1.slice(0);
  $(x);
} else {
  $(x);
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = [];
  $( a );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice