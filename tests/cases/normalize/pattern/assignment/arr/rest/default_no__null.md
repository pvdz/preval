# Preval test case

# default_no__null.md

> normalize > pattern >  > param > arr > rest > default_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([...x] = null);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = null;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = null;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$('bad');
`````
