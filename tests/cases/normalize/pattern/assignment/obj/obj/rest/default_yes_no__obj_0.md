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
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var y;
objAssignPatternRhs = { x: 0, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { a: 'fail' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
y = objPatternRest(objPatternAfterDefault, []);
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = x.x;
x = x * x;
x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
x = x(x, []);
x(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var y;
objAssignPatternRhs = { x: 0, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { a: 'fail' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
y = objPatternRest(objPatternAfterDefault, []);
$(y);
`````
