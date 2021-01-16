# Preval test case

# arr_obj.md

> normalize > pattern > param > _base > arr_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
([{ x }] = 1);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
`````
