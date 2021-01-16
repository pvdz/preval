# Preval test case

# default_yes_yes_no__arr_empty.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'pass2' })]) {
  return x;
}
$(f([], 200));
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
        tmpArg = { x: 'pass2' };
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
        x = $('pass');
      } else {
        x = objPatternBeforeDefault;
      }
    }
  }
  return x;
}
var tmpArg_1;
tmpArg_1 = f([], 200);
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
    tmpArg = { x: 'pass2' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  let ifTestTmp_1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg_1;
tmpArg_1 = f([], 200);
$(tmpArg_1);
`````
