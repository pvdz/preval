# Preval test case

# base.md

> Normalize > Pattern > Binding > Arr > Obj > Obj > Obj > Base
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

## Pre Normal

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
const tmpObjLitVal$1 = 13;
const tmpObjLitVal$3 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: 31 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const bindingPatternArrRoot = [tmpArrElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
let objPatternCrashTest = objPatternNoDefault$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault$1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
} else {
}
$('ok');
`````

## Output

`````js filename=intro
const tmpObjLitVal$3 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = { x: 13, y: tmpObjLitVal$3, z: 31 };
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const bindingPatternArrRoot = [tmpArrElement, 10];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
let objPatternCrashTest = objPatternNoDefault$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault$1 === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault$1.cannotDestructureThis;
} else {
}
$('ok');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
