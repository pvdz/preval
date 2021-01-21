# Preval test case

# default_yes_no__empty.md

> normalize > pattern > param >  > arr > arr > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])]) {
  return 'bad';
}
$(f());
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
      tmpArg = ['fail2'];
      arrPatternStep = $(tmpArg);
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f();
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
    tmpArg = ['fail2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  [...arrPatternStep];
  return 'bad';
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
