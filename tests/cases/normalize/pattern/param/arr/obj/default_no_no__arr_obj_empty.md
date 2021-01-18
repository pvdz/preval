# Preval test case

# default_no_no__arr_obj_empty.md

> normalize > pattern >  > param > arr > obj > default_no_no__arr_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{}]) {
  return 'ok';
}
$(f([{}, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [{}, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  arrPatternSplat[0];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [{}, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
