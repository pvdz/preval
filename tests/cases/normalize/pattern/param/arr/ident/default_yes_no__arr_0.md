# Preval test case

# default_yes_no__arr_0.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('pass')]) {
  return x;
}
$(f([0, 201], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('pass');
    } else {
      x = arrPatternBeforeDefault;
    }
  }
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [0, 201];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [0, 201];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
