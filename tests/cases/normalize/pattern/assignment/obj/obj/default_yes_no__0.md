# Preval test case

# default_yes_no__0.md

> normalize > pattern >  > param > obj > obj > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} = $({ x: 'pass' }) } = 0);
$('ok');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternAfterDefault;
var objPatternBeforeDefault;
var objPatternCrashTest;
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
objAssignPatternRhs = 0;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { x: 'pass' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
{
  let tmpAssignLogicStmtOr = objPatternAfterDefault === undefined;
  if (tmpAssignLogicStmtOr) {
  } else {
    tmpAssignLogicStmtOr = objPatternAfterDefault === null;
  }
  if (tmpAssignLogicStmtOr) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
  } else {
    objPatternCrashTest = tmpAssignLogicStmtOr;
  }
}
objAssignPatternRhs;
$('ok');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternAfterDefault;
var objPatternBeforeDefault;
var objPatternCrashTest;
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
objAssignPatternRhs = 0;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { x: 'pass' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
let tmpAssignLogicStmtOr = objPatternAfterDefault === undefined;
if (tmpAssignLogicStmtOr) {
} else {
  tmpAssignLogicStmtOr = objPatternAfterDefault === null;
}
if (tmpAssignLogicStmtOr) {
  objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
} else {
  objPatternCrashTest = tmpAssignLogicStmtOr;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: {"x":"pass"}
 - 1: "ok"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
