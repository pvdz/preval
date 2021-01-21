# Preval test case

# default_yes_no__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} = $({ x: 'fail' }) } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternCrashTest;
var tmpObjPropValue;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { x: 'fail' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
{
  let tmpAssignLogicStmtOr = objPatternAfterDefault === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = objPatternAfterDefault === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
  } else {
    objPatternCrashTest = tmpAssignLogicStmtOr;
  }
}
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternCrashTest;
var tmpObjPropValue;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
objAssignPatternRhs = { x: tmpObjPropValue, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { x: 'fail' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
let tmpAssignLogicStmtOr = objPatternAfterDefault === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = objPatternAfterDefault === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
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
