# Preval test case

# default_yes_no__arr_empty_str.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('pass')]) {
  return x;
}
$(f(['', 201], 200));
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
var tmpArg$1;
tmpArg$1 = ['', 201];
tmpArg = f(tmpArg$1, 200);
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
var tmpArg$1;
tmpArg$1 = ['', 201];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: ""
 - 1: undefined

Normalized calls: Same

Final output calls: Same
