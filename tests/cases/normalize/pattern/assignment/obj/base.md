# Preval test case

# base.md

> normalize > pattern > param > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({} = { a: 1, b: 2, c: 3 });
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternCrashTest;
objAssignPatternRhs = { a: 1, b: 2, c: 3 };
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
objAssignPatternRhs = { a: 1, b: 2, c: 3 };
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
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
