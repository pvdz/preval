# Preval test case

# default_no__null.md

> normalize > pattern >  > param > arr > default_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([] = null);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = null;
arrPatternSplat = [...arrAssignPatternRhs];
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = /regex/;
x = [...x];
x('str');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = null;
arrPatternSplat = [...arrAssignPatternRhs];
$('bad');
`````
