# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: [[]],
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: [[1, 2, 3], 15], z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let arrPatternSplat = [...objPatternNoDefault$1];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
('<hoisted func decl `f`>');
tmpElement = [1, 2, 3];
tmpObjPropValue$1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
tmpArg$1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let arrPatternSplat = [...objPatternNoDefault$1];
  let arrPatternStep = arrPatternSplat[0];
  [...arrPatternStep];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpElement = [1, 2, 3];
tmpObjPropValue$1 = [tmpElement, 15];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
tmpArg$1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
