# Preval test case

# default_yes_yes__123.md

> normalize > pattern >  > param > arr > arr > default_yes_yes__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])] = $(['pass3'])) {
  return 'ok';
}
$(f(1, 2, 3, 200));
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
      tmpArg = ['pass3'];
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
  return 'ok';
}
var tmpArg$2;
tmpArg$2 = f(1, 2, 3, 200);
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
    tmpArg = ['pass3'];
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
  [...arrPatternStep];
  return 'ok';
}
var tmpArg$2;
tmpArg$2 = f(1, 2, 3, 200);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: <crash[ $ is not a function ]>

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

