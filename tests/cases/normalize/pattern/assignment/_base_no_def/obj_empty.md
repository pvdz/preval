# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ } = 1);
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
objAssignPatternRhs;
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
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
