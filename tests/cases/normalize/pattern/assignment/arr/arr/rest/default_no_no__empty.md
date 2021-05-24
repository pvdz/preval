# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Assignment > Arr > Arr > Rest > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
let x = 100;
([[...x]] = [[]]);
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 100;
[[...x]] = [[]];
$(x);
`````

## Normalized

`````js filename=intro
let x = 100;
const tmpArrElement = [];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output

`````js filename=intro
const tmpArrElement = [];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const tmpClusterSSA_x = arrPatternSplat$1.slice(0);
$(tmpClusterSSA_x);
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
