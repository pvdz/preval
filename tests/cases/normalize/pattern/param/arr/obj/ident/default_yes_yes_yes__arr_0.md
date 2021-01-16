# Preval test case

# default_yes_yes_yes__arr_0.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_yes__arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([0, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpArg_1;
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        tmpElement = { x: 'fail3' };
        tmpArg = [tmpElement];
        $tdz$__pattern_after_default = $(tmpArg);
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  {
    let arrPatternStep;
    {
      let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
      if (ifTestTmp_1) {
        tmpArg_1 = { x: 'fail2' };
        arrPatternStep = $(tmpArg_1);
      } else {
        arrPatternStep = arrPatternBeforeDefault;
      }
    }
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  {
    let x;
    {
      let ifTestTmp_2 = objPatternBeforeDefault === undefined;
      if (ifTestTmp_2) {
        x = $('pass');
      } else {
        x = objPatternBeforeDefault;
      }
    }
  }
  return x;
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = [0, 20, 30];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpArg_1;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpElement = { x: 'fail3' };
    tmpArg = [tmpElement];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    tmpArg_1 = { x: 'fail2' };
    arrPatternStep = $(tmpArg_1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  let ifTestTmp_2 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_2) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = [0, 20, 30];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````
