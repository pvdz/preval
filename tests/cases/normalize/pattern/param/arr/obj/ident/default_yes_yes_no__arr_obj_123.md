# Preval test case

# default_yes_yes_no__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('fail') } = $({ x: 'fail2' })]) {
  return x;
}
$(f([{ x: 1, y: 2, z: 3 }, 20, 30], 200));
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
        tmpArg = { x: 'fail2' };
        arrPatternStep = $(tmpArg);
      } else {
        arrPatternStep = arrPatternBeforeDefault;
      }
    }
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  {
    let x;
    {
      let ifTestTmp_1 = objPatternBeforeDefault === undefined;
      if (ifTestTmp_1) {
        x = $('fail');
      } else {
        x = objPatternBeforeDefault;
      }
    }
  }
  return x;
}
var tmpArg_1;
var tmpArg_2;
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
tmpArg_2 = [tmpElement, 20, 30];
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
        x = { x: 'str' };
        x = x(x);
      } else {
        x = x;
      }
    }
  }
  var x = x.x;
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = x('str');
      } else {
        x = x;
      }
    }
  }
  return x;
}
var x;
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = [x, 8, 8];
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
    tmpArg = { x: 'fail2' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  let ifTestTmp_1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg_1;
var tmpArg_2;
var tmpElement;
tmpElement = { x: 1, y: 2, z: 3 };
tmpArg_2 = [tmpElement, 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````
