# Preval test case

# default_no_no_no__arr_obj_undefined.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = [{ x: undefined, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
tmpElement = { x: undefined, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
tmpElement = { x: undefined, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const x = arrPatternStep.x;
$(x);
`````
