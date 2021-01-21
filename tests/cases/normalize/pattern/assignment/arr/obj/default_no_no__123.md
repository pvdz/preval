# Preval test case

# default_no_no__123.md

> normalize > pattern >  > param > arr > obj > default_no_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([{}] = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternCrashTest;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
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
$('bad');
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternStep;
var objPatternCrashTest;
arrAssignPatternRhs = undefined;
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternStep = arrPatternSplat[0];
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
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
