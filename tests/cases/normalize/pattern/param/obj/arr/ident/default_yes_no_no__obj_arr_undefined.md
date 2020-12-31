# Preval test case

# default_yes_no_no__obj_arr_undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'pass'] }) {
  return y;
}
$(f({ x: [undefined], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? 'pass' : arrPatternBeforeDefault;
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: [undefined], a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? 'pass' : arrPatternBeforeDefault;
  return y;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { x: [undefined], a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````
