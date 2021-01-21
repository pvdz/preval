# Preval test case

# default_yes_yes__arr_elided.md

> normalize > pattern >  > param > arr > obj > default_yes_yes__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'ok';
}
$(f([, , , 1, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpArg = ['fail2'];
      $tdz$__pattern_after_default = $(tmpArg);
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  {
    let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
    if (ifTestTmp_1) {
      arrPatternStep = $('fail');
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
  let objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [, , , 1, 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail2'];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    arrPatternStep = $('fail');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternCrashTest = arrPatternStep === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = arrPatternStep === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = arrPatternStep.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = [, , , 1, 20, 30];
tmpArg_1 = f(tmpArg_2, 200);
$(tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: "fail"
 - 1: <crash[ Cannot read property 'cannotDestructureThis' of undefined ]>

Normalized calls: Same

Final output calls: Same
