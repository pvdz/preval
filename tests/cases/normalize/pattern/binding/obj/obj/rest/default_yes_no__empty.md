# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { a: 'fail' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
const y = objPatternRest(objPatternAfterDefault, []);
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = 8;
var x = x.x;
x = x * x;
var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
var x = x(x, []);
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const objPatternBeforeDefault = (1).x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { a: 'fail' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
objPatternRest(objPatternAfterDefault, []);
$('bad');
`````
