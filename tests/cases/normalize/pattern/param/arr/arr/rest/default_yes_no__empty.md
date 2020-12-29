# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('fail')]) {
  return 'bad';
}
$(f());
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    arrPatternStep = $('fail');
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1.slice(0);
  return 'bad';
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    arrPatternStep = $('fail');
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  return 'bad';
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
