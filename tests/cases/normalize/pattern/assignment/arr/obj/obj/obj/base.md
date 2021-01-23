# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([
  {
    x: {
      y: {},
    },
  },
] = [{ x: { x: 13, y: { a: 1, b: 2, c: 3 }, z: 31 }, y: 11 }, 10]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var objPatternNoDefault$1;
var objPatternCrashTest;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
{
  let tmpAssignLogicStmtOr = objPatternNoDefault$1 === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = objPatternNoDefault$1 === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
  } else {
    objPatternCrashTest = tmpAssignLogicStmtOr;
  }
}
arrAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var objPatternNoDefault$1;
var objPatternCrashTest;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
let tmpAssignLogicStmtOr = objPatternNoDefault$1 === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = objPatternNoDefault$1 === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
} else {
  objPatternCrashTest = tmpAssignLogicStmtOr;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
