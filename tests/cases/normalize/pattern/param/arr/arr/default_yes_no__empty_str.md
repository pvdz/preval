# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern > param >  > arr > arr > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['pass2'])]) {
  return 'ok';
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
  return 'ok';
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
  [...arrPatternStep];
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f('', 200);
$(tmpArg_1);
`````
