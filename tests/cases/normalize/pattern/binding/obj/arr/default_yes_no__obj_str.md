# Preval test case

# default_yes_no__obj_str.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = { x: 'abc', a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = { x: 'abc', a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = ['fail'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
$('ok');
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = { x: 'abc', a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = ['fail'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
[...objPatternAfterDefault];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
