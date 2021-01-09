# Preval test case

# default_yes_yes_no__obj_null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: null, b: 11, c: 12 });
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
var y;
objAssignPatternRhs = { x: null, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { y: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
objPatternBeforeDefault_1 = objPatternAfterDefault.y;
tmpTernaryTest_1 = objPatternBeforeDefault_1 === undefined;
y = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : objPatternBeforeDefault_1;
$('bad');
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
var x;
var x;
var x;
x = { x: /regex/, x: 8, x: 8 };
x = x.x;
x = x * x;
x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
x = x.x;
x = x * x;
x = x ? ((x = x('str')), x) : x;
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternAfterDefault;
var objPatternBeforeDefault_1;
var y;
objAssignPatternRhs = { x: null, b: 11, c: 12 };
objPatternBeforeDefault = objAssignPatternRhs.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { y: 'fail2' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
objPatternBeforeDefault_1 = objPatternAfterDefault.y;
tmpTernaryTest_1 = objPatternBeforeDefault_1 === undefined;
y = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $('fail')), tmpTernaryConsequent_1) : objPatternBeforeDefault_1;
$('bad');
`````
