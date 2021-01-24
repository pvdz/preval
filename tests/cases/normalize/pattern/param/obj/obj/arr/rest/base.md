# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: [...z],
  },
}) {
  return z;
}
$(f({ x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let arrPatternSplat = [...objPatternNoDefault$1];
  let z = arrPatternSplat.slice(0);
  return z;
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
('<hoisted func decl `f`>');
tmpObjPropValue$1 = [1, 2, 3];
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
  let z = arrPatternSplat.slice(0);
  return z;
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
tmpArg$1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [1,2,3]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
