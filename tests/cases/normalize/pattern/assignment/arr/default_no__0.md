# Preval test case

# default_no__0.md

> normalize > pattern >  > param > arr > default_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = 0);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = 0;
arrPatternSplat = [...arrAssignPatternRhs];
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = 0;
arrPatternSplat = [...arrAssignPatternRhs];
$('bad');
`````
