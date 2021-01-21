# Preval test case

# default_yes_no_no__str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')]]) {
  return x;
}
$(f('abc', 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat_1[0];
  let x;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('fail');
    } else {
      x = arrPatternBeforeDefault;
    }
  }
  return x;
}
var tmpArg;
tmpArg = f('abc', 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat_1[0];
  let x;
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
tmpArg = f('abc', 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
