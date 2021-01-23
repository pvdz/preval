# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: {
      y: [],
    },
  },
]) {
  return 'ok';
}
$(f([{ x: { x: 13, y: [1, 2, 3], z: 31 }, y: 11 }, 10], 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let arrPatternSplat$1 = [...objPatternNoDefault$1];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpElement` decl without init>');
('<hoisted var `tmpObjPropValue` decl without init>');
('<hoisted var `tmpObjPropValue$1` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpElement` decl without init>');
('<hoisted var `tmpObjPropValue` decl without init>');
('<hoisted var `tmpObjPropValue$1` decl without init>');
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 31 };
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
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  [...objPatternNoDefault$1];
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 31 };
tmpElement = { x: tmpObjPropValue, y: 11 };
tmpArg$1 = [tmpElement, 10];
tmpArg = f(tmpArg$1, 100);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
