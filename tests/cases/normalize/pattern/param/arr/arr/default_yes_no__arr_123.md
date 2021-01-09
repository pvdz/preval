# Preval test case

# default_yes_no__arr_123.md

> normalize > pattern > param >  > arr > arr > default_yes_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['pass2'])]) {
  return 'ok';
}
$(f([1, 2, 3, 4, 5], 200));
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
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [1, 2, 3, 4, 5];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  var x = [...x];
  var x = x[8];
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = ['str'];
        x = x(x);
      } else {
        x = x;
      }
    }
  }
  var x = [...x];
  return 'str';
}
var x;
var x;
x = [8, 8, 8, 8, 8];
x = x(x, 8);
x(x);
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
  [...arrPatternStep];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [1, 2, 3, 4, 5];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````
