# Preval test case

# default_no_no__elided.md

> normalize > pattern >  > param > obj > arr > rest > default_no_no__elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] } = { x: [, , , 1], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = [, , , 1];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = [, , , 1];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Result

Should call `$` with:
 - 0: [null,null,null,1]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
