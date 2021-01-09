# Preval test case

# base.md

> normalize > pattern >  > param > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = [1, 2, 3]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = [1, 2, 3];
arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = [8, 8, 8];
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = [1, 2, 3];
arrPatternSplat = [...arrAssignPatternRhs];
$('ok');
`````
