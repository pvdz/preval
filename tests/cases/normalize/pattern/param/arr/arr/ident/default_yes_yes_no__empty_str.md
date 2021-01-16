# Preval test case

# default_yes_yes_no__empty_str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])]) {
  return x;
}
$(f('', 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  {
    let arrPatternStep;
    {
      let ifTestTmp = arrPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        tmpArg = ['pass2'];
        arrPatternStep = $(tmpArg);
      } else {
        arrPatternStep = arrPatternBeforeDefault;
      }
    }
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
  {
    let x;
    {
      let ifTestTmp_1 = arrPatternBeforeDefault_1 === undefined;
      if (ifTestTmp_1) {
        x = $('fail');
      } else {
        x = arrPatternBeforeDefault_1;
      }
    }
  }
  return x;
}
var tmpArg_1;
tmpArg_1 = f('', 200);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['pass2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
  let x;
  let ifTestTmp_1 = arrPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault_1;
  }
  return x;
}
var tmpArg_1;
tmpArg_1 = f('', 200);
$(tmpArg_1);
`````
