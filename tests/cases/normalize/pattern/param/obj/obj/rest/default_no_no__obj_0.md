# Preval test case

# default_no_no__obj_0.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } }) {
  return y;
}
$(f({ x: 0, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let y = objPatternRest(arrPatternStep, []);
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 0, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let y = objPatternRest(arrPatternStep, []);
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 0, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
