# Preval test case

# default_yes_no_no__arr_null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return 'bad';
}
$(f([null, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = $('pass');
  }
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [null, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = $('pass');
  }
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [null, 20, 30];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
