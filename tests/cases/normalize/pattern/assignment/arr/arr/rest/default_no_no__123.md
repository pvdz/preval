# Preval test case

# default_no_no__123.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[...x]] = 1);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
x = arrPatternSplat_1.slice(0);
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var x;
arrAssignPatternRhs = 1;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
x = arrPatternSplat_1.slice(0);
$(x);
`````