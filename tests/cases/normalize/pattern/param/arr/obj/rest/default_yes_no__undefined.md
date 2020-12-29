# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })]) {
  return 'bad';
}
$(f(undefined, 200));
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
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(undefined, 200);
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
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(undefined, 200);
$(tmpArg_1);
`````
