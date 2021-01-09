# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > obj > arr > rest > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] }) {
  return 'bad';
}
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat.slice(0);
  return 'bad';
}
var tmpArg;
tmpArg = f('abc', 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = x.x;
  var x = [...x];
  var x = x.x(8);
  return 'str';
}
var x;
x = x('str', 8);
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  arrPatternSplat.slice(0);
  return 'bad';
}
var tmpArg;
tmpArg = f('abc', 10);
$(tmpArg);
`````
