# Preval test case

# default_no_no_no__obj_arr_0.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__obj_arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y] } = { x: [0], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = [0];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = [0];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat[0];
$(y);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
