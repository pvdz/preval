# Preval test case

# default_yes_yes__0.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_yes__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'fail2' }])) {
  return 'bad';
}
$(f(0, 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpArg_1;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpElement = { a: 'fail2' };
      tmpArg = [tmpElement];
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
      tmpArg_1 = { a: 'fail' };
      arrPatternStep = $(tmpArg_1);
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
  let x = objPatternRest(arrPatternStep, [], undefined);
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(0, 200);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpElement;
  var tmpArg_1;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpElement = { a: 'fail2' };
    tmpArg = [tmpElement];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    tmpArg_1 = { a: 'fail' };
    arrPatternStep = $(tmpArg_1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  objPatternRest(arrPatternStep, [], undefined);
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(0, 200);
$(tmpArg_2);
`````

## Result

Should call `$` with:
 - 0: <crash[ $ is not a function ]>

Normalized calls: BAD?!
['<crash[ <ref> is not iterable ]>'];

Final output calls: BAD!!
['<crash[ <ref> is not iterable ]>'];

