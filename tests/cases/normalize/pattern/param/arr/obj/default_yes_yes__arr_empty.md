# Preval test case

# default_yes_yes__arr_empty.md

> normalize > pattern >  > param > arr > obj > default_yes_yes__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{} = $('pass')] = $(['fail2'])) {
  return 'ok';
}
$(f([]));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  {
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
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  {
    let arrPatternStep;
    {
      let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
      if (ifTestTmp_1) {
        arrPatternStep = $('pass');
      } else {
        arrPatternStep = arrPatternBeforeDefault;
      }
    }
  }
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f([]);
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
    arrPatternStep = $('pass');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  return 'ok';
}
var tmpArg_1;
tmpArg_1 = f([]);
$(tmpArg_1);
`````
