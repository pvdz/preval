# Preval test case

# default_no_no_no__obj_0.md

> normalize > pattern >  > param > obj > arr > ident > default_no_no_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y] }) {
  return 'bad';
}
$(f({ x: 0, a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let y = arrPatternSplat[0];
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 0, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: 0, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````