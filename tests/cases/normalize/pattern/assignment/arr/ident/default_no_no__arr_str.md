# Preval test case

# default_no_no__arr_str.md

> normalize > pattern >  > param > arr > ident > default_no_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x] = ['abc']);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x;
arrAssignPatternRhs = ['abc'];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = ['str'];
x = [...x];
x = x[8];
x(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x;
arrAssignPatternRhs = ['abc'];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
`````
