# Preval test case

# default_no__arr_elided.md

> normalize > pattern >  > param > arr > rest > default_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([...x] = [, , , 1]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = [, , , 1];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
arrAssignPatternRhs = [, , , 1];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````
