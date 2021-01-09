# Preval test case

# default_no_no__empty.md

> normalize > pattern >  > param > arr > ident > default_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x]) {
  return 'bad';
}
$(f());
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat[0];
  return 'bad';
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  var x = x[8];
  return 'str';
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  arrPatternSplat[0];
  return 'bad';
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
