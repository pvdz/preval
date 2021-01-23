# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [[[]]] } = { x: [[[1, 2, 3], 14], 13], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
var tmpElement$1;
tmpElement$1 = [1, 2, 3];
tmpElement = [tmpElement$1, 14];
tmpObjPropValue = [tmpElement, 13];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
const arrPatternSplat$2 = [...arrPatternStep$1];
$('ok');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
var tmpElement$1;
tmpElement$1 = [1, 2, 3];
tmpElement = [tmpElement$1, 14];
tmpObjPropValue = [tmpElement, 13];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternStep$1 = arrPatternSplat$1[0];
[...arrPatternStep$1];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
