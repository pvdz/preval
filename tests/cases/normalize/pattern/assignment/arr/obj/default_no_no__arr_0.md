# Preval test case

# default_no_no__arr_0.md

> normalize > pattern >  > param > arr > obj > default_no_no__arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{}] = [0, 20, 30]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
arrAssignPatternRhs = [0, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = [8, 8, 8];
x = [...x];
x = x[8];
x('str');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
arrAssignPatternRhs = [0, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
$('ok');
`````
