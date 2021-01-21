# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'fail' }) } = 1);
$('bad');
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { a: 'fail' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
y = objPatternRest(objPatternAfterDefault, [], undefined);
$('bad');
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
objAssignPatternRhs = 1;
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  tmpArg = { a: 'fail' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
y = objPatternRest(objPatternAfterDefault, [], undefined);
$('bad');
`````

## Result

Should call `$` with:
 - 0: {"a":"fail"}
 - 1: <crash[ Cannot read property 'cannotDestructureThis' of undefined ]>

Normalized calls: Same

Final output calls: Same
