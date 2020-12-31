# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: { y },
  },
] = [{ x: { x: 1, y: 2, z: 3 }, y: 11 }, 10];
$(y);
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = { x: { x: 1, y: 2, z: 3 }, y: 11 }), [tmpElement, 10]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  objPatternNoDefault = arrPatternStep.x,
  y = objPatternNoDefault.y;
$(y);
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternArrRoot = ((tmpElement = { x: { x: 1, y: 2, z: 3 }, y: 11 }), [tmpElement, 10]),
  arrPatternSplat = [...bindingPatternArrRoot],
  arrPatternStep = arrPatternSplat[0],
  objPatternNoDefault = arrPatternStep.x,
  y = objPatternNoDefault.y;
$(y);
`````
