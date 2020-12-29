# Preval test case

# default_yes_no__123.md

> normalize > pattern >  > param > arr > obj > default_yes_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('pass')]) {
  return 'ok';
}
$(f(undefined, 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    arrPatternStep = $('pass');
  }
  return 'ok';
}
var tmpArg;
tmpArg = f(undefined, 100);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    arrPatternStep = $('pass');
  }
  return 'ok';
}
var tmpArg;
tmpArg = f(undefined, 100);
$(tmpArg);
`````
