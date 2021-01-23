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
  let objPatternNoDefault$1 = arrPatternStep.y;
  let arrPatternSplat$1 = [...objPatternNoDefault$1];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpElement;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpElement = { x: 15, y: tmpObjPropValue$1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
tmpArg$1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault$1 = arrPatternStep.y;
  [...objPatternNoDefault$1];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpElement;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpElement = { x: 15, y: tmpObjPropValue$1, c: 16 };
tmpObjPropValue = [tmpElement, 13, 14];
tmpArg$1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
