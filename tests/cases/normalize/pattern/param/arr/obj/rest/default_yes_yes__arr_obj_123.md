# Preval test case

# default_yes_yes__arr_obj_123.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_yes__arr_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'fail' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f([{ x: 1, y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  var tmpElement;
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
    let ifTestTmp$1 = arrPatternBeforeDefault === undefined;
    if (ifTestTmp$1) {
      tmpArg$1 = { a: 'fail' };
      arrPatternStep = $(tmpArg$1);
    } else {
      arrPatternStep = arrPatternBeforeDefault;
    }
  }
  let x = objPatternRest(arrPatternStep, [], undefined);
  return x;
}
var tmpArg$2;
var tmpArg$3;
var tmpElement$1;
('<hoisted func decl `f`>');
tmpElement$1 = { x: 1, y: 2, z: 3 };
tmpArg$3 = [tmpElement$1, 20, 30];
tmpArg$2 = f(tmpArg$3, 200);
$(tmpArg$2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  var tmpElement;
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
  let ifTestTmp$1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    tmpArg$1 = { a: 'fail' };
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let x = objPatternRest(arrPatternStep, [], undefined);
  return x;
}
var tmpArg$2;
var tmpArg$3;
var tmpElement$1;
tmpElement$1 = { x: 1, y: 2, z: 3 };
tmpArg$3 = [tmpElement$1, 20, 30];
tmpArg$2 = f(tmpArg$3, 200);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: {"x":1,"y":2,"z":3}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
