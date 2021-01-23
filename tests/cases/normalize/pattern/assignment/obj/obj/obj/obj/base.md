# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({
  x: {
    y: {
      z: {},
    },
  },
} = { x: { x: 13, y: { z: { a: 1, b: 2, c: 3 }, a: 15, b: 16 }, z: 14 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternCrashTest;
var objPatternNoDefault;
var objPatternNoDefault$1;
var objPatternNoDefault$2;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = { a: 1, b: 2, c: 3 };
tmpObjPropValue$1 = { z: tmpObjPropValue$2, a: 15, b: 16 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
objPatternNoDefault$2 = objPatternNoDefault$1.z;
{
  let tmpAssignLogicStmtOr = objPatternNoDefault$2 === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = objPatternNoDefault$2 === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = objPatternNoDefault$2.cannotDestructureThis;
  } else {
    objPatternCrashTest = tmpAssignLogicStmtOr;
  }
}
objAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternCrashTest;
var objPatternNoDefault;
var objPatternNoDefault$1;
var objPatternNoDefault$2;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = { a: 1, b: 2, c: 3 };
tmpObjPropValue$1 = { z: tmpObjPropValue$2, a: 15, b: 16 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
objPatternNoDefault$2 = objPatternNoDefault$1.z;
let tmpAssignLogicStmtOr = objPatternNoDefault$2 === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = objPatternNoDefault$2 === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = objPatternNoDefault$2.cannotDestructureThis;
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
