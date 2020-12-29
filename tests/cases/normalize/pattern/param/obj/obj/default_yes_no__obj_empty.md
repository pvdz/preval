# Preval test case

# default_yes_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'pass' }) }) {
  return 'ok';
}
$(f({}, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = { x: 'pass' };
    arrPatternStep = $(tmpArg);
  }
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f({}, 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = { x: 'pass' };
    arrPatternStep = $(tmpArg);
  }
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f({}, 10);
$(tmpArg_1);
`````
