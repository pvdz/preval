# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > obj > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'fail' }) } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const bindingPatternObjRoot = undefined;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = { x: 'fail' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
$('bad');
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = x;
var x = x.x;
x = x * x;
var x = x ? ((x = { x: 'str' }), (x = x(x)), x) : x;
x('str');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const objPatternBeforeDefault = undefined.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
tmpTernaryTest ? ((tmpArg = { x: 'fail' }), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent) : objPatternBeforeDefault;
$('bad');
`````
