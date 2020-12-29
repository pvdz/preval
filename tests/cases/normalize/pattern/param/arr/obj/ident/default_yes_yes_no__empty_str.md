# Preval test case

# default_yes_yes_no__empty_str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'pass2' })]) {
  return x;
}
$(f(''));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg = { x: 'pass2' };
    arrPatternStep = $(tmpArg);
  }
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = $('pass');
  }
  return x;
}
var tmpArg_1;
tmpArg_1 = f('');
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg = { x: 'pass2' };
    arrPatternStep = $(tmpArg);
  }
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = $('pass');
  }
  return x;
}
var tmpArg_1;
tmpArg_1 = f('');
$(tmpArg_1);
`````
