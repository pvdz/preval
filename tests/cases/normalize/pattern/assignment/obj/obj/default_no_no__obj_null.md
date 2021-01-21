# Preval test case

# default_no_no__obj_null.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = { x: null, b: 11, c: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternCrashTest;
objAssignPatternRhs = { x: null, b: 11, c: 12 };
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
objAssignPatternRhs = { x: null, b: 11, c: 12 };
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
["<crash[ Cannot destructure property 'x' of '{(intermediate value)(intermediate value)(intermediate value)}' as it is null. ]>"];

Normalized calls: BAD?!
["<crash[ Cannot read property 'cannotDestructureThis' of null ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'cannotDestructureThis' of null ]>"];

