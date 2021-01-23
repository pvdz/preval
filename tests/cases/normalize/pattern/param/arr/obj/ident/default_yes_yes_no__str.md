# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'fail2' })]) {
  return x;
}
$(f('abc'));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
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
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  {
    let ifTestTmp$1 = objPatternBeforeDefault === undefined;
    if (ifTestTmp$1) {
      x = $('pass');
    } else {
      x = objPatternBeforeDefault;
    }
  }
  return x;
}
var tmpArg$1;
tmpArg$1 = f('abc');
$(tmpArg$1);
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
  let ifTestTmp$1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg$1;
tmpArg$1 = f('abc');
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
