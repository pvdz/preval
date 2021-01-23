# Preval test case

# default_yes_no__obj_0.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } = $({ a: 'fail' }) } = { x: 0, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternAfterDefault;
var objPatternBeforeDefault;
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
objAssignPatternRhs = { x: 0, b: 11, c: 12 };
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
objAssignPatternRhs;
$(y);
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternAfterDefault;
var objPatternBeforeDefault;
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
objAssignPatternRhs = { x: 0, b: 11, c: 12 };
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
$(y);
`````

## Result

Should call `$` with:
 - 0: {}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
