# Preval test case

# default_no_no_no__arr_elided.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{ x }] = [, , , 1, 20, 30]);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
arrAssignPatternRhs = [, , , 1, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
arrAssignPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
arrAssignPatternRhs = [, , , 1, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
x = arrPatternStep.x;
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
