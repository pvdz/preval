# Preval test case

# default_no_no__elided.md

> normalize > pattern >  > param > obj > arr > rest > default_no_no__elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] }) {
  return y;
}
$(f({ x: [, , , 1], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat.slice(0);
  return y;
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
('<hoisted func decl `f`>');
tmpObjPropValue = [, , , 1];
tmpArg$1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat.slice(0);
  return y;
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
tmpObjPropValue = [, , , 1];
tmpArg$1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [null,null,null,1]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
