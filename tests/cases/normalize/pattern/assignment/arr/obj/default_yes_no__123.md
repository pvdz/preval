# Preval test case

# default_yes_no__123.md

> normalize > pattern >  > param > arr > obj > default_yes_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{} = $('pass')] = undefined);
$('ok');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var arrPatternStep;
var objPatternCrashTest;
var tmpTernaryTest;
var tmpTernaryConsequent;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
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
var tmpTernaryTest;
var tmpTernaryConsequent;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
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
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
