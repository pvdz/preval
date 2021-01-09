# Preval test case

# default_no_no__obj_empty_str.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x }) {
  return x;
}
$(f({ x: '' }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let x = tmpParamPattern.x;
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: '' };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  return x;
}
var x;
var x;
x = { x: 'str' };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let x = tmpParamPattern.x;
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: '' };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
