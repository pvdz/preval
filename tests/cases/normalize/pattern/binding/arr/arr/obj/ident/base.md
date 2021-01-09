# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[{ x }]] = [[{ x: 1 }, 20, 30], 40, 50];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement_1;
tmpElement_1 = { x: 1 };
tmpElement = [tmpElement_1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
const x = arrPatternStep_1.x;
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = { x: 8 };
x = [x, 8, 8];
var x = [x, 8, 8];
var x = [...x];
var x = x[8];
var x = [...x];
var x = x[8];
var x = x.x;
x(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
tmpElement_1 = { x: 1 };
tmpElement = [tmpElement_1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
const x = arrPatternStep_1.x;
$(x);
`````
