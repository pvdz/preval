# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: {
      y: [],
    },
  },
] = [{ x: { x: 13, y: [1, 2, 3], z: 31 }, y: 11 }, 10];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const arrPatternSplat$1 = [...objPatternNoDefault$1];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
[...objPatternNoDefault$1];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
