# Preval test case

# default_no__123.md

> normalize > pattern >  > param > obj > default_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({} = 1);
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternCrashTest;
objAssignPatternRhs = 1;
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
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternCrashTest;
objAssignPatternRhs = 1;
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
$('ok');
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
