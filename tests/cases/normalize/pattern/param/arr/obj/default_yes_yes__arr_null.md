# Preval test case

# default_yes_yes__arr_null.md

> normalize > pattern >  > param > arr > obj > default_yes_yes__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('fail')] = $(['fail2'])) {
  return 'bad';
}
$(f([null, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpArg = ['fail2'];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
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
  return 'bad';
}
var tmpArg$1;
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = [null, 20, 30];
tmpArg$1 = f(tmpArg$2, 200);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpArg = ['fail2'];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
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
  return 'bad';
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = [null, 20, 30];
tmpArg$1 = f(tmpArg$2, 200);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'cannotDestructureThis' of null ]>

Normalized calls: Same

Final output calls: Same
