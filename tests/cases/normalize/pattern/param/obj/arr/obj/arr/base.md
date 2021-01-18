# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: [
    {
      y: [],
    },
  ],
}) {
  return 'ok';
}
$(f({ x: [{ x: 15, y: [1, 2, 3], c: 16 }, 13, 14], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault_1 = arrPatternStep.y;
  let arrPatternSplat_1 = [...objPatternNoDefault_1];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
var tmpElement;
var tmpObjPropValue_1;
tmpObjPropValue_1 = [1, 2, 3];
tmpElement = { x: 15, y: tmpObjPropValue_1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
tmpArg_1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault_1 = arrPatternStep.y;
  [...objPatternNoDefault_1];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
var tmpElement;
var tmpObjPropValue_1;
tmpObjPropValue_1 = [1, 2, 3];
tmpElement = { x: 15, y: tmpObjPropValue_1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
tmpArg_1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
