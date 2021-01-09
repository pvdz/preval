# Preval test case

# default_no_no_no__obj_arr_elided.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__obj_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = [, , , 1];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````

## Uniformed

`````js filename=intro
var x;
x = [, , , 8];
var x = { x: x, x: 8, x: 8 };
var x = x.x;
var x = [...x];
var x = x[8];
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = [, , , 1];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````
