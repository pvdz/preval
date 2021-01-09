# Preval test case

# default_yes_no__missing.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] = $(['pass']) } = { a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const bindingPatternObjRoot = { a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['pass']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = { x: 8, x: 8 };
var x = x.x;
x = x * x;
var x = x ? ((x = ['str']), (x = x(x)), x) : x;
var x = [...x];
var x = x.x(8);
x(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
const bindingPatternObjRoot = { a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['pass']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````
