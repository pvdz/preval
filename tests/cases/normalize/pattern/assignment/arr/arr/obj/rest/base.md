# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[{ ...x }]] = [[{ x: 1, y: 2, z: 3 }, 20, 30], 40, 50]);
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement_1;
var tmpElement_2;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var x;
tmpElement_1 = { x: 1, y: 2, z: 3 };
tmpElement = [tmpElement_1, 20, 30];
arrAssignPatternRhs = arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
x = objPatternRest(arrPatternStep_1, []);
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var x;
tmpElement_1 = { x: 1, y: 2, z: 3 };
tmpElement = [tmpElement_1, 20, 30];
arrAssignPatternRhs = arrAssignPatternRhs = [tmpElement, 40, 50];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
x = objPatternRest(arrPatternStep_1, []);
$(x);
`````
