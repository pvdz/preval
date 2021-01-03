# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: { ...z },
  },
}) {
  return z;
}
$(f({ x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let z = objPatternRest(objPatternNoDefault_1, []);
  return z;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let z = objPatternRest(objPatternNoDefault_1, []);
  return z;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````