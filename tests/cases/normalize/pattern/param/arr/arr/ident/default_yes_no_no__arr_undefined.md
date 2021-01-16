# Preval test case

# default_yes_no_no__arr_undefined.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_no_no__arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')]]) {
  return 'bad';
}
$(f([undefined, 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault = arrPatternSplat_1[0];
  {
    let x;
    {
      let ifTestTmp = arrPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        x = $('fail');
      } else {
        x = arrPatternBeforeDefault;
      }
    }
  }
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [undefined, 4, 5];
tmpArg = f(tmpArg_1, 200);
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
  return 'bad';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [undefined, 4, 5];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
