# Preval test case

# default_yes_yes_yes__arr_obj_null.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_yes__arr_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('fail') } = $({ x: 'fail2' })] = $([{ x: 'fail3' }])) {
  return x;
}
$(f([{ x: null, y: 2, z: 3 }, 20, 30], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  var tmpElement;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpElement = { x: 'fail3' };
    tmpArg = [tmpElement];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    tmpArg$1 = { x: 'fail2' };
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  const tmpIfTest$2 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$2) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg$2;
var tmpArg$3;
var tmpElement$1;
('<hoisted func decl `f`>');
tmpElement$1 = { x: null, y: 2, z: 3 };
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
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpElement = { x: 'fail3' };
    tmpArg = [tmpElement];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    tmpArg$1 = { x: 'fail2' };
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  const tmpIfTest$2 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$2) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg$2;
var tmpArg$3;
var tmpElement$1;
tmpElement$1 = { x: null, y: 2, z: 3 };
tmpArg$3 = [tmpElement$1, 20, 30];
tmpArg$2 = f(tmpArg$3, 200);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
