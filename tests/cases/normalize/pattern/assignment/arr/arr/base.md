# Preval test case

# base.md

> normalize > pattern > param > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[]] = [[1, 2, 3], 4, 5]);
$('ok');
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
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = [8, 8, 8];
x = [x, 8, 8];
x = [...x];
x = x[8];
x = [...x];
x('str');
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
$('ok');
`````
