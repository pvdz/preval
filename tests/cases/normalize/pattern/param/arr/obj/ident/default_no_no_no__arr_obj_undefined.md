# Preval test case

# default_no_no_no__arr_obj_undefined.md

> normalize > pattern >  > param > arr > obj > ident > default_no_no_no__arr_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x }]) {
  return x;
}
$(f([{ x: undefined, y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
('<hoisted func decl `f`>');
tmpElement = { x: undefined, y: 2, z: 3 };
tmpArg$1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
tmpElement = { x: undefined, y: 2, z: 3 };
tmpArg$1 = [tmpElement, 20, 30];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
