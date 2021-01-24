# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: { y },
  },
]) {
  return y;
}
$(f([{ x: { x: 1, y: 2, z: 3 }, y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let y = objPatternNoDefault.y;
  return y;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
('<hoisted func decl `f`>');
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg$1 = [tmpElement, 10];
tmpArg = f(tmpArg$1, 100);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let y = objPatternNoDefault.y;
  return y;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg$1 = [tmpElement, 10];
tmpArg = f(tmpArg$1, 100);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: undefined

Normalized calls: Same

Final output calls: Same
