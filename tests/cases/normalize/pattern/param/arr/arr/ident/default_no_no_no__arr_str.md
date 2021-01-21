# Preval test case

# default_no_no_no__arr_str.md

> normalize > pattern >  > param > arr > arr > ident > default_no_no_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x]]) {
  return x;
}
$(f(['abc', 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1[0];
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = ['abc', 4, 5];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1[0];
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = ['abc', 4, 5];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
