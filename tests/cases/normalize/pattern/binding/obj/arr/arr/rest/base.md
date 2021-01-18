# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [[...y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
tmpElement = [1, 2, 3];
tmpObjPropValue = [tmpElement, 13];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const y = arrPatternSplat_1.slice(0);
$(y);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
tmpElement = [1, 2, 3];
tmpObjPropValue = [tmpElement, 13];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const y = arrPatternSplat_1.slice(0);
$(y);
`````

## Result

Should call `$` with:
[[[1, 2, 3]], null];

Normalized calls: Same

Final output calls: Same
