# Preval test case

# default_no_no__arr_obj_empty.md

> normalize > pattern >  > param > arr > obj > rest > default_no_no__arr_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ ...x }] = [{}, 20, 30]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var x;
arrAssignPatternRhs = [{}, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = objPatternRest(arrPatternStep, []);
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var x;
arrAssignPatternRhs = [{}, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = objPatternRest(arrPatternStep, []);
$(x);
`````