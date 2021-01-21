# Preval test case

# default_yes_no__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > default_yes_no__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{} = $('fail')] = [{ x: 1, y: 2, z: 3 }, 20, 30]);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternCrashTest;
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
tmpElement = { x: 1, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
{
  let tmpAssignLogicStmtOr = arrPatternStep === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = arrPatternStep === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
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
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternCrashTest;
var tmpElement;
var tmpTernaryTest;
var tmpTernaryConsequent;
tmpElement = { x: 1, y: 2, z: 3 };
arrAssignPatternRhs = [tmpElement, 20, 30];
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
let tmpAssignLogicStmtOr = arrPatternStep === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = arrPatternStep === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = arrPatternStep.cannotDestructureThis;
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
