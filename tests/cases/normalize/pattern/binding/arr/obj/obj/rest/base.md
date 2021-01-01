# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: { ...y },
  },
] = [{ x: { a: 1, b: 2, c: 3 }, y: 11 }, 10];
$(y);
`````

## Normalized

`````js filename=intro
var tmpElement;
tmpElement = { x: { a: 1, b: 2, c: 3 }, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const y = objPatternRest(objPatternNoDefault, []);
$(y);
`````

## Output

`````js filename=intro
var tmpElement;
tmpElement = { x: { a: 1, b: 2, c: 3 }, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const y = objPatternRest(objPatternNoDefault, []);
$(y);
`````
