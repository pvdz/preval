# Preval test case

# default_yes_yes_no__null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })]) {
  return 'bad';
}
$(f(null));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg = { x: 'fail2' };
    arrPatternStep = $(tmpArg);
  }
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = $('pass');
  }
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(null);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg = { x: 'fail2' };
    arrPatternStep = $(tmpArg);
  }
  let x = arrPatternStep.x;
  if (x === undefined) {
    x = $('pass');
  }
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(null);
$(tmpArg_1);
`````
