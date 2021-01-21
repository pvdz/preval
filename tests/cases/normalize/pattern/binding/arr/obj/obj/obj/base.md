# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: {
      y: {},
    },
  },
] = [{ x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 }, 10];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
let objPatternCrashTest = objPatternNoDefault_1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault_1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault_1.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
let objPatternCrashTest = objPatternNoDefault_1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault_1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault_1.cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
