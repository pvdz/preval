# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: [{}],
  },
} = { x: { x: 13, y: [{ a: 1, b: 2, c: 3 }, 15], z: 14 }, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpElement;
tmpElement = { a: 1, b: 2, c: 3 };
tmpObjPropValue_1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault_1];
const arrPatternStep = arrPatternSplat[0];
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpElement;
tmpElement = { a: 1, b: 2, c: 3 };
tmpObjPropValue_1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault_1];
const arrPatternStep = arrPatternSplat[0];
let objPatternCrashTest = arrPatternStep === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
