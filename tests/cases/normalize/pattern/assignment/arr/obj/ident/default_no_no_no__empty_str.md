# Preval test case

# default_no_no_no__empty_str.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = '');
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var x;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var x;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$('bad');
`````