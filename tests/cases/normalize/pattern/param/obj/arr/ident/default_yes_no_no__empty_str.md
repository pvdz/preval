# Preval test case

# default_yes_no_no__empty_str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] }) {
  return 'bad';
}
$(f('', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpTernaryTest;
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let y = tmpTernaryTest ? 'fail' : arrPatternBeforeDefault;
  return 'bad';
}
var tmpArg;
tmpArg = f('', 10);
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
  return 'bad';
}
var tmpArg;
tmpArg = f('', 10);
$(tmpArg);
`````
