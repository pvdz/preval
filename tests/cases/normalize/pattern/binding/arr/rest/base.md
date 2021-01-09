# Preval test case

# base.md

> normalize > pattern >  > param > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [...x] = [1, 2, 3];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````

## Uniformed

`````js filename=intro
var x = [8, 8, 8];
var x = [...x];
var x = x.x(8);
x(x);
`````

## Output

`````js filename=intro
const bindingPatternArrRoot = [1, 2, 3];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat.slice(0);
$(x);
`````
