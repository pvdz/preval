# Preval test case

# base.md

> Normalize > Pattern > Assignment > Obj > Arr > Obj > Obj > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: [
    {
      y: {},
    },
  ],
} = { x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 });
$('ok');
`````

## Pre Normal

`````js filename=intro
({
  x: [
    {
      y: {},
    },
  ],
} = { x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = 15;
const tmpObjLitVal$2 = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: tmpObjLitVal$1, y: tmpObjLitVal$2, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault$1 = arrPatternStep.y;
let objPatternCrashTest = objPatternNoDefault$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault$1 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
const tmpObjLitVal$2 = { a: 1, b: 2, c: 3 };
const tmpArrElement = { x: 15, y: tmpObjLitVal$2, c: 16 };
const tmpObjLitVal = [tmpArrElement, 13, 14];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault$1 = arrPatternStep.y;
let objPatternCrashTest = objPatternNoDefault$1 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault$1 === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault$1.cannotDestructureThis;
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
