# Preval test case

# base.md

> normalize > pattern >  > param > arr > obj > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([
  {
    x: [y],
  },
]) {
  return y;
}
$(f([{ x: [1, 2, 3] }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let y = arrPatternSplat$1[0];
  return y;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpElement` decl without init>');
('<hoisted var `tmpObjPropValue` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpElement` decl without init>');
('<hoisted var `tmpObjPropValue` decl without init>');
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
tmpArg$1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternNoDefault = arrPatternStep.x;
  let arrPatternSplat$1 = [...objPatternNoDefault];
  let y = arrPatternSplat$1[0];
  return y;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpElement = { x: tmpObjPropValue };
tmpArg$1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
