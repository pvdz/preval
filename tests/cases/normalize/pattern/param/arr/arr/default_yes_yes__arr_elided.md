# Preval test case

# default_yes_yes__arr_elided.md

> normalize > pattern >  > param > arr > arr > default_yes_yes__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['pass2'])] = $(['fail3'])) {
  return 'ok';
}
$(f([, , , , 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg_1;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpArg = ['fail3'];
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
      tmpArg_1 = ['pass2'];
      arrPatternStep = $(tmpArg_1);
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  return 'ok';
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = [, , , , 4, 5];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg_1;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail3'];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    tmpArg_1 = ['pass2'];
    arrPatternStep = $(tmpArg_1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  [...arrPatternStep];
  return 'ok';
}
var tmpArg_2;
var tmpArg_3;
tmpArg_3 = [, , , , 4, 5];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: "ok"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
