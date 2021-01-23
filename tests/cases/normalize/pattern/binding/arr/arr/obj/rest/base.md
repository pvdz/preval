# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[{ ...x }]] = [[{ x: 1, y: 2, z: 3 }, 20, 30], 40, 50];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement$1;
tmpElement$1 = { x: 1, y: 2, z: 3 };
tmpElement = [tmpElement$1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const x = objPatternRest(arrPatternStep$1, [], undefined);
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement$1;
tmpElement$1 = { x: 1, y: 2, z: 3 };
tmpElement = [tmpElement$1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const x = objPatternRest(arrPatternStep$1, [], undefined);
$(x);
`````

## Result

Should call `$` with:
 - 0: {"x":1,"y":2,"z":3}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
