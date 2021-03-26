# Preval test case

# arr_arr.md

> Normalize > Pattern > Assignment > Base unique > Arr arr
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
([[ x ]] = [[ 100 ]]);
{ let x = 1; }
$(x);
`````

## Pre Normal

`````js filename=intro
{
  let x = 1;
}
[[x$1]] = [[100]];
{
  let x$3 = 1;
}
$(x$1);
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpArrElement = [100];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x$1 = arrPatternSplat$1[0];
let x$3 = 1;
$(x$1);
`````

## Output

`````js filename=intro
const tmpArrElement = [100];
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
x$1 = arrPatternSplat$1[0];
$(x$1);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
