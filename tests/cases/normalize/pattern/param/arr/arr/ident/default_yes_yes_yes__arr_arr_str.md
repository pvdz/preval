# Preval test case

# default_yes_yes_yes__arr_arr_str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_yes__arr_arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])] = $(['fail3'])) {
  return x;
}
$(f([['abc', 201], 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg_1;
  {
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
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  {
    let arrPatternStep;
    {
      let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
      if (ifTestTmp_1) {
        tmpArg_1 = ['fail2'];
        arrPatternStep = $(tmpArg_1);
      } else {
        arrPatternStep = arrPatternBeforeDefault;
      }
    }
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
  {
    let x;
    {
      let ifTestTmp_2 = arrPatternBeforeDefault_1 === undefined;
      if (ifTestTmp_2) {
        x = $('fail');
      } else {
        x = arrPatternBeforeDefault_1;
      }
    }
  }
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement;
tmpElement = ['abc', 201];
tmpArg_3 = [tmpElement, 4, 5];
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
    tmpArg_1 = ['fail2'];
    arrPatternStep = $(tmpArg_1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternBeforeDefault_1 = arrPatternSplat_1[0];
  let x;
  let ifTestTmp_2 = arrPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_2) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault_1;
  }
  return x;
}
var tmpArg_2;
var tmpArg_3;
var tmpElement;
tmpElement = ['abc', 201];
tmpArg_3 = [tmpElement, 4, 5];
tmpArg_2 = f(tmpArg_3, 200);
$(tmpArg_2);
`````

## Result

Should call `$` with:
[['abc'], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: Same
