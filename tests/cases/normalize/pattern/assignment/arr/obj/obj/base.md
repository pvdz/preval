# Preval test case

# base.md

> Normalize > Pattern > Assignment > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: {},
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10]);
$('ok');
`````

## Pre Normal

`````js filename=intro
[
  {
    x: {},
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10];
$('ok');
`````

## Normalized

`````js filename=intro
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const arrAssignPatternRhs = [tmpArrElement, 10];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
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
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const arrAssignPatternRhs = [tmpArrElement, 10];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault = arrPatternStep.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault.cannotDestructureThis;
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
