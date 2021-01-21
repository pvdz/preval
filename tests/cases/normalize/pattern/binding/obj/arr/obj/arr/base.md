# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: [
    {
      y: [],
    },
  ],
} = { x: [{ x: 15, y: [1, 2, 3], c: 16 }, 13, 14], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
var tmpObjPropValue_1;
tmpObjPropValue_1 = [1, 2, 3];
tmpElement = { x: 15, y: tmpObjPropValue_1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault_1 = arrPatternStep.y;
const arrPatternSplat_1 = [...objPatternNoDefault_1];
$('ok');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpElement;
var tmpObjPropValue_1;
tmpObjPropValue_1 = [1, 2, 3];
tmpElement = { x: 15, y: tmpObjPropValue_1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
const bindingPatternObjRoot = { x: tmpObjPropValue, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const objPatternNoDefault_1 = arrPatternStep.y;
[...objPatternNoDefault_1];
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
