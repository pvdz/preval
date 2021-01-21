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
var tmpObjPropValue;
tmpObjPropValue = { a: 1, b: 2, c: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const y = objPatternRest(objPatternNoDefault, [], undefined);
$(y);
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = { a: 1, b: 2, c: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const y = objPatternRest(objPatternNoDefault, [], undefined);
$(y);
`````

## Result

Should call `$` with:
 - 0: {"a":1,"b":2,"c":3}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
