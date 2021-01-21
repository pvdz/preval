# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: [[{}]] } = { x: [[{ a: 1, b: 2, c: 3 }, 14], 13], a: 11, b: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var objPatternCrashTest;
var tmpObjPropValue;
var tmpElement;
var tmpElement_1;
tmpElement_1 = { a: 1, b: 2, c: 3 };
tmpElement = [tmpElement_1, 14];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
{
  let tmpAssignLogicStmtOr = arrPatternStep_1 === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = arrPatternStep_1 === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = arrPatternStep_1.cannotDestructureThis;
  } else {
    objPatternCrashTest = tmpAssignLogicStmtOr;
  }
}
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var arrPatternSplat;
var arrPatternStep;
var arrPatternSplat_1;
var arrPatternStep_1;
var objPatternCrashTest;
var tmpObjPropValue;
var tmpElement;
var tmpElement_1;
tmpElement_1 = { a: 1, b: 2, c: 3 };
tmpElement = [tmpElement_1, 14];
tmpObjPropValue = [tmpElement, 13];
objAssignPatternRhs = { x: tmpObjPropValue, a: 11, b: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
arrPatternSplat = [...objPatternNoDefault];
arrPatternStep = arrPatternSplat[0];
arrPatternSplat_1 = [...arrPatternStep];
arrPatternStep_1 = arrPatternSplat_1[0];
let tmpAssignLogicStmtOr = arrPatternStep_1 === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = arrPatternStep_1 === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = arrPatternStep_1.cannotDestructureThis;
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
