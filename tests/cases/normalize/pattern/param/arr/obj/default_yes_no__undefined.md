# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > arr > obj > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')]) {
  return 'bad';
}
$(f(1, 2, 3, 100));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  {
    let arrPatternStep;
    {
      let ifTestTmp = arrPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        arrPatternStep = $('fail');
      } else {
        arrPatternStep = arrPatternBeforeDefault;
      }
    }
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(1, 2, 3, 100);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    arrPatternStep = $('fail');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  return 'bad';
}
var tmpArg;
tmpArg = f(1, 2, 3, 100);
$(tmpArg);
`````
