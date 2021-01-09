# Preval test case

# default_no_no_no__arr_null.md

> normalize > pattern >  > param > arr > arr > ident > default_no_no_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x]]) {
  return 'bad';
}
$(f([null, 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1[0];
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [null, 4, 5];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  var x = [...x];
  var x = x[8];
  return 'str';
}
var x;
var x;
x = [/regex/, 8, 8];
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  arrPatternSplat_1[0];
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [null, 4, 5];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
