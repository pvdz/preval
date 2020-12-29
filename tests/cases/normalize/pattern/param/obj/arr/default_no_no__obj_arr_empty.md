# Preval test case

# default_no_no__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] }) {
  return 'ok';
}
$(f({ x: [], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternSplat = [...arrPatternStep];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: [], a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: [], a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
