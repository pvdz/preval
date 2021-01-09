# Preval test case

# default_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > obj > default_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'bad';
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: undefined, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  return 'str';
}
var x;
var x;
x = { x: x, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  tmpParamPattern.x;
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: undefined, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
