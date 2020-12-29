# Preval test case

# default_no_no__obj_123.md

> normalize > pattern >  > param > obj > arr > default_no_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] }) {
  return 'bad';
}
$(f({ x: 1, a: 2, b: 3 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  let arrPatternSplat = [...arrPatternStep];
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 1, a: 2, b: 3 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternStep = tmpParamPattern.x;
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 1, a: 2, b: 3 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
