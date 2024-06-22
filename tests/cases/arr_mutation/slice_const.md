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
} else {
}
$(x);
`````

## Output


`````js filename=intro
if ($) {
  const tmpClusterSSA_x = [];
  $(tmpClusterSSA_x);
} else {
  $(undefined);
}
`````

## PST Output

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

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
