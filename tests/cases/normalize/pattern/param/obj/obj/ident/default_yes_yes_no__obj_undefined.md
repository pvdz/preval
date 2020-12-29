# Preval test case

# default_yes_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'pass2' }) }) {
  return y;
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = { y: 'pass2' };
    arrPatternStep = $(tmpArg);
  }
  let y = arrPatternStep.y;
  if (y === undefined) {
    y = $('fail');
  }
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: undefined, b: 11, c: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = { y: 'pass2' };
    arrPatternStep = $(tmpArg);
  }
  let y = arrPatternStep.y;
  if (y === undefined) {
    y = $('fail');
  }
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: undefined, b: 11, c: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
