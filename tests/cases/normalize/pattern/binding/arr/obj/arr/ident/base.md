# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: [y],
  },
] = [{ x: [1, 2, 3] }, 20, 30];
$(y);
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
const y = arrPatternSplat_1[0];
$(y);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
const bindingPatternArrRoot = [tmpElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat_1 = [...objPatternNoDefault];
const y = arrPatternSplat_1[0];
$(y);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
