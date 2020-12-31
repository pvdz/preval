# Preval test case

# default_no_no_no__arr_obj_0.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x }] = [{ x: 0, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = { x: 0, y: 2, z: 3 }), [tmpElement, 20, 30]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  x = arrPatternStep.x;
$(x);
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = { x: 0, y: 2, z: 3 }), [tmpElement, 20, 30]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  x = arrPatternStep.x;
$(x);
`````
