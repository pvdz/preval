# Preval test case

# default_no_no_no__obj_obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_no_no_no__obj_obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y } }) {
  return y;
}
$(f({ x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let y = arrPatternStep.y;
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let y = arrPatternStep.y;
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
