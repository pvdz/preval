# Preval test case

# arr_obj.md

> Normalize > Pattern > Assignment > Base unique > Arr obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
([{ x }] = [{ x: 100 }]);
{ let x = 1; }
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpArrElement = { x: 100 };
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x$1 = arrPatternStep.x$1;
let x$2 = 1;
$(x$1);
`````

## Output

`````js filename=intro
const tmpArrElement = { x: 100 };
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
x$1 = arrPatternStep.x$1;
$(x$1);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
