# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > obj > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({} = undefined);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternCrashTest;
objAssignPatternRhs = undefined;
{
  let tmpAssignLogicStmtOr = objAssignPatternRhs === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = objAssignPatternRhs === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = objAssignPatternRhs.cannotDestructureThis;
  } else {
    objPatternCrashTest = tmpAssignLogicStmtOr;
  }
}
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternCrashTest;
objAssignPatternRhs = undefined;
let tmpAssignLogicStmtOr = objAssignPatternRhs === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = objAssignPatternRhs === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = objAssignPatternRhs.cannotDestructureThis;
} else {
  objPatternCrashTest = tmpAssignLogicStmtOr;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'cannotDestructureThis' of undefined ]>

Normalized calls: Same

Final output calls: Same
