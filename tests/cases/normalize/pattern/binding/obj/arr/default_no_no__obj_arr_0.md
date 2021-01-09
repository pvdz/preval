# Preval test case

# default_no_no__obj_arr_0.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] } = { x: [0], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = [0];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
x = [8];
var x = { x: x, x: 8, x: 8 };
var x = x.x;
var x = [...x];
x('str');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = [0];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
[...objPatternNoDefault];
$('ok');
`````
