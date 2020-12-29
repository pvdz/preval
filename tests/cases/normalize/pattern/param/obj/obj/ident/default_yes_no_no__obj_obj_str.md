# Preval test case

# default_yes_no_no__obj_obj_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } }) {
  return y;
}
$(f({ x: { x: 1, y: 'abc', z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let y = arrPatternStep.y;
  if (y === undefined) {
    y = $('fail');
  }
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: { x: 1, y: 'abc', z: 3 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let y = arrPatternStep.y;
  if (y === undefined) {
    y = $('fail');
  }
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: { x: 1, y: 'abc', z: 3 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
