# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: [{}],
  },
] = [{ x: [{ a: 1, b: 2, c: 3 }, 12], y: 11 }, 10]);
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
const tmpArrElement$1 = { a: 1, b: 2, c: 3 };
const tmpObjLitVal = [tmpArrElement$1, 12];
const tmpArrElement = { x: tmpObjLitVal, y: 11 };
const arrAssignPatternRhs = [tmpArrElement, 10];
const arrPatternSplat = [...arrAssignPatternRhs];
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
 - 1: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
