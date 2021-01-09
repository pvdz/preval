# Preval test case

# default_yes_no_no__obj_arr_undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'pass'] } = { x: [undefined], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryTest;
tmpObjPropValue = [undefined];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? 'pass' : arrPatternBeforeDefault;
$(y);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = [x];
var x = { x: x, x: 8, x: 8 };
var x = x.x;
var x = [...x];
var x = x[8];
x = x * x;
var x = x ? 'str' : x;
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryTest;
tmpObjPropValue = [undefined];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
const y = tmpTernaryTest ? 'pass' : arrPatternBeforeDefault;
$(y);
`````
