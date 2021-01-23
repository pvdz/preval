# Preval test case

# default_yes_yes_yes__arr_empty_str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_yes__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('pass')] = $(['fail2'])] = $(['fail3'])) {
  return x;
}
$(f(['', 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
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
    let ifTestTmp$1 = arrPatternBeforeDefault === undefined;
    if (ifTestTmp$1) {
      tmpArg$1 = ['fail2'];
      arrPatternStep = $(tmpArg$1);
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x;
  {
    let ifTestTmp$2 = arrPatternBeforeDefault$1 === undefined;
    if (ifTestTmp$2) {
      x = $('pass');
    } else {
      x = arrPatternBeforeDefault$1;
    }
  }
  return x;
}
var tmpArg$2;
var tmpArg$3;
tmpArg$3 = ['', 4, 5];
tmpArg$2 = f(tmpArg$3, 200);
$(tmpArg$2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
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
  let ifTestTmp$1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    tmpArg$1 = ['fail2'];
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x;
  let ifTestTmp$2 = arrPatternBeforeDefault$1 === undefined;
  if (ifTestTmp$2) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault$1;
  }
  return x;
}
var tmpArg$2;
var tmpArg$3;
tmpArg$3 = ['', 4, 5];
tmpArg$2 = f(tmpArg$3, 200);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
