# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  {
    x: [{}],
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpElement$1;
tmpElement$1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement$1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
const arrPatternStep$1 = arrPatternSplat$1[0];
let objPatternCrashTest = arrPatternStep$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep$1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpObjPropValue;
var tmpElement$1;
tmpElement$1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement$1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
const bindingPatternArrRoot = [tmpElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const arrPatternSplat$1 = [...objPatternNoDefault];
const arrPatternStep$1 = arrPatternSplat$1[0];
let objPatternCrashTest = arrPatternStep$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = arrPatternStep$1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
