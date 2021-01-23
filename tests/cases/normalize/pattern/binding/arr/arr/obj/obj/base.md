# Preval test case

# base.md

> normalize > pattern >  > param > arr > arr > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [
  [
    {
      x: {},
    },
  ],
] = [[{ x: { a: 1, b: 2, c: 3 } }, 20, 30], 40, 50];
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpObjPropValue = { a: 1, b: 2, c: 3 };
tmpElement$1 = { x: tmpObjPropValue };
tmpElement = [tmpElement$1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const objPatternNoDefault = arrPatternStep$1.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement$1;
var tmpObjPropValue;
tmpObjPropValue = { a: 1, b: 2, c: 3 };
tmpElement$1 = { x: tmpObjPropValue };
tmpElement = [tmpElement$1, 20, 30];
const bindingPatternArrRoot = [tmpElement, 40, 50];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const objPatternNoDefault = arrPatternStep$1.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
