# Preval test case

# base.md

> normalize > pattern >  > param > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([...x] = [1, 2, 3]);
$(x);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x;
arrAssignPatternRhs = [1, 2, 3];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
x = [8, 8, 8];
x = [...x];
x = x.x(8);
x(x);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var x;
arrAssignPatternRhs = [1, 2, 3];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````
