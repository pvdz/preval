# Preval test case

# default_yes_no__123.md

> normalize > pattern > param >  > arr > arr > default_yes_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])]) {
  return 'bad';
}
$(f(1, 2, 3, 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg = ['fail2'];
    arrPatternStep = $(tmpArg);
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(1, 2, 3, 200);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  if (arrPatternStep === undefined) {
    tmpArg = ['fail2'];
    arrPatternStep = $(tmpArg);
  }
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(1, 2, 3, 200);
$(tmpArg_1);
`````
