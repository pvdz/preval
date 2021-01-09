# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[...x]] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1.slice(0);
$(x);
`````

## Uniformed

`````js filename=intro
var x = 'str';
var x = [...x];
var x = x[8];
var x = [...x];
var x = x.x(8);
x(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const x = arrPatternSplat_1.slice(0);
$(x);
`````
