# Preval test case

# base.md

> normalize > pattern >  > param > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x }) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let x = objPatternRest(tmpParamPattern, []);
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 1, b: 2, c: 3 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x(x, []);
  return x;
}
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let x = objPatternRest(tmpParamPattern, []);
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 1, b: 2, c: 3 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
