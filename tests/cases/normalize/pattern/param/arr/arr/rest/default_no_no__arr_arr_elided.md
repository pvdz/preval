# Preval test case

# default_no_no__arr_arr_elided.md

> normalize > pattern >  > param > arr > arr > rest > default_no_no__arr_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x]]) {
  return x;
}
$(f([[, , , 1], 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
tmpElement = [, , , 1];
tmpArg$1 = [tmpElement, 4, 5];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
}
var tmpArg;
var tmpArg$1;
var tmpElement;
tmpElement = [, , , 1];
tmpArg$1 = [tmpElement, 4, 5];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: [null,null,null,1]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
