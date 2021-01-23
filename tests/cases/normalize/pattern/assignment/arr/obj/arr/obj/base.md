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
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternNoDefault;
var arrPatternSplat$1;
var arrPatternStep$1;
var objPatternCrashTest;
var tmpElement;
var tmpObjPropValue;
var tmpElement$1;
tmpElement$1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement$1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat$1 = [...objPatternNoDefault];
arrPatternStep$1 = arrPatternSplat$1[0];
{
  let tmpAssignLogicStmtOr = arrPatternStep$1 === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = arrPatternStep$1 === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
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
var arrPatternSplat$1;
var arrPatternStep$1;
var objPatternCrashTest;
var tmpElement;
var tmpObjPropValue;
var tmpElement$1;
tmpElement$1 = { a: 1, b: 2, c: 3 };
tmpObjPropValue = [tmpElement$1, 12];
tmpElement = { x: tmpObjPropValue, y: 11 };
arrAssignPatternRhs = [tmpElement, 10];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
objPatternNoDefault = arrPatternStep.x;
arrPatternSplat$1 = [...objPatternNoDefault];
arrPatternStep$1 = arrPatternSplat$1[0];
let tmpAssignLogicStmtOr = arrPatternStep$1 === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = arrPatternStep$1 === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = arrPatternStep$1.cannotDestructureThis;
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
