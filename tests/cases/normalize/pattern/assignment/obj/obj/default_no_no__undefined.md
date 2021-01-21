# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > obj > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternCrashTest;
objAssignPatternRhs = undefined;
objPatternNoDefault = objAssignPatternRhs.x;
{
  let tmpAssignLogicStmtOr = objPatternNoDefault === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = objPatternNoDefault === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
  } else {
    objPatternCrashTest = tmpAssignLogicStmtOr;
  }
}
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternCrashTest;
objAssignPatternRhs = undefined;
objPatternNoDefault = objAssignPatternRhs.x;
let tmpAssignLogicStmtOr = objPatternNoDefault === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = objPatternNoDefault === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
} else {
  objPatternCrashTest = tmpAssignLogicStmtOr;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
