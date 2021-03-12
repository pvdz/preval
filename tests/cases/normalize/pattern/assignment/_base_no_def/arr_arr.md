# Preval test case

# arr_arr.md

> Normalize > Pattern > Assignment > Base no def > Arr arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 10;
([[ x ]] = [[ 100 ]]);
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 10;
[[x]] = [[100]];
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
const tmpArrElement = [100];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1[0];
$(x);
`````

## Output

`````js filename=intro
const tmpArrElement = [100];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const SSA_x = arrPatternSplat$1[0];
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
