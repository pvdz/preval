# Preval test case

# default_yes_no_no__str.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') }]) {
  return x;
}
$(f('abc'));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('pass');
    } else {
      x = objPatternBeforeDefault;
    }
  }
  return x;
}
var tmpArg;
tmpArg = f('abc');
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
tmpArg = f('abc');
$(tmpArg);
`````

## Result

Should call `$` with:
[['pass'], [null], null];

Normalized calls: Same

Final output calls: Same
