# Preval test case

# default_yes_no__arr_empty_str.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return x;
}
$(f(['', 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg = { a: 'fail' };
    arrPatternStep = $(tmpArg);
  }
  let x = objPatternRest(arrPatternStep, []);
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = ['', 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg = { a: 'fail' };
    arrPatternStep = $(tmpArg);
  }
  let x = objPatternRest(arrPatternStep, []);
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = ['', 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````
