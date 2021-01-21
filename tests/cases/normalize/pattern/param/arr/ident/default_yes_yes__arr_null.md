# Preval test case

# default_yes_yes__arr_null.md

> normalize > pattern >  > param > arr > ident > default_yes_yes__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')] = $('fail2')) {
  return x;
}
$(f([null, 201], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      $tdz$__pattern_after_default = $('fail2');
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  {
    let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
    if (ifTestTmp_1) {
      x = $('fail');
    } else {
      x = arrPatternBeforeDefault;
    }
  }
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [null, 201];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    $tdz$__pattern_after_default = $('fail2');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [null, 201];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
