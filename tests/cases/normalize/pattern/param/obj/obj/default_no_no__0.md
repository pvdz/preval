# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > obj > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'bad';
}
$(f(0, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  return 'bad';
}
var tmpArg;
tmpArg = f(0, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  return 'str';
}
var x;
x = x(8, 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  tmpParamPattern.x;
  return 'bad';
}
var tmpArg;
tmpArg = f(0, 10);
$(tmpArg);
`````
