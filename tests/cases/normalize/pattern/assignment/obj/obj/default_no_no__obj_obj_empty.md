# Preval test case

# default_no_no__obj_obj_empty.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = { x: {}, b: 11, c: 12 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternCrashTest;
objAssignPatternRhs = { x: {}, b: 11, c: 12 };
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
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternCrashTest;
objAssignPatternRhs = { x: {}, b: 11, c: 12 };
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
$('ok');
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
