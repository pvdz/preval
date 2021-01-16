# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x]] = [[1, 2, 3], 4, 5]);
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
tmpElement = [1, 2, 3];
arrAssignPatternRhs = [tmpElement, 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
x = arrPatternSplat_1[0];
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
tmpElement = [1, 2, 3];
arrAssignPatternRhs = [tmpElement, 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
x = arrPatternSplat_1[0];
$(x);
`````
