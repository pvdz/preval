# Preval test case

# default_yes_yes_no__undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['fail2']) } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
const bindingPatternObjRoot = undefined;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
const y = tmpTernaryTest_1 ? 'fail' : arrPatternBeforeDefault;
$('bad');
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpArg;
var tmpTernaryTest_1;
const objPatternBeforeDefault = undefined.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
const objPatternAfterDefault = tmpTernaryTest
  ? ((tmpArg = ['fail2']), (tmpTernaryConsequent = $(tmpArg)), tmpTernaryConsequent)
  : objPatternBeforeDefault;
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest_1 = arrPatternBeforeDefault === undefined;
$('bad');
`````