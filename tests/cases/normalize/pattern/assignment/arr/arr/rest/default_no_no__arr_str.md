# Preval test case

# default_no_no__arr_str.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[...x]] = ['abc', 4, 5]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var x;
arrAssignPatternRhs = ['abc', 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
x = arrPatternSplat_1.slice(0);
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
x = ['str', 8, 8];
x = [...x];
x = x[8];
x = [...x];
x = x.x(8);
x(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var x;
arrAssignPatternRhs = ['abc', 4, 5];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
x = arrPatternSplat_1.slice(0);
$(x);
`````
