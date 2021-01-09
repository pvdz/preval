# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > arr > ident > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x] = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = x;
x = [...x];
x = x[8];
x('str');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$('bad');
`````
