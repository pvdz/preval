# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['pass']) }) {
  return y;
}
$(f('', 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = ['pass'];
    arrPatternStep = $(tmpArg);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat.slice(0);
  return y;
}
var tmpArg_1;
tmpArg_1 = f('', 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = ['pass'];
    arrPatternStep = $(tmpArg);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat.slice(0);
  return y;
}
var tmpArg_1;
tmpArg_1 = f('', 10);
$(tmpArg_1);
`````
