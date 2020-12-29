# Preval test case

# default_yes_yes_no__0.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])]) {
  return 'bad';
}
$(f(0, 200));
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
  let x = arrPatternSplat_1[0];
  if (x === undefined) {
    x = $('fail');
  }
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(0, 200);
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
  let arrPatternSplat_1 = [...arrPatternStep];
  let x = arrPatternSplat_1[0];
  if (x === undefined) {
    x = $('fail');
  }
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f(0, 200);
$(tmpArg_1);
`````
