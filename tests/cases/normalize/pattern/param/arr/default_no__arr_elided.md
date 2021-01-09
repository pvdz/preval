# Preval test case

# default_no__arr_elided.md

> normalize > pattern >  > param > arr > default_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([]) {
  return 'ok';
}
$(f([, , 1], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [, , 1];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x = [...x];
  return 'str';
}
var x;
var x;
x = [, , 8];
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg_1 = [, , 1];
tmpArg = 'ok';
$(tmpArg);
`````
