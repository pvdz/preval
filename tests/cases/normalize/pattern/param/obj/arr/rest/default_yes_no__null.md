# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [...y] = $(['fail']) }) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = ['fail'];
    arrPatternStep = $(tmpArg);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat.slice(0);
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(null, 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = ['fail'];
    arrPatternStep = $(tmpArg);
  }
  let arrPatternSplat = [...arrPatternStep];
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(null, 10);
$(tmpArg_1);
`````
