# Preval test case

# default_yes_yes__arr_elided.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_yes__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ ...x } = $({ a: 'pass' })] = $([{ a: 'fail2' }])) {
  return x;
}
$(f([, , , , 20, 30], 200));
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
    tmpElement = { a: 'fail2' };
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
    tmpArg$1 = { a: 'pass' };
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let x = objPatternRest(arrPatternStep, [], undefined);
  return x;
}
var tmpArg$2;
var tmpArg$3;
('<hoisted func decl `f`>');
tmpArg$3 = [, , , , 20, 30];
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
    tmpElement = { a: 'fail2' };
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
    tmpArg$1 = { a: 'pass' };
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let x = objPatternRest(arrPatternStep, [], undefined);
  return x;
}
var tmpArg$2;
var tmpArg$3;
tmpArg$3 = [, , , , 20, 30];
tmpArg$2 = f(tmpArg$3, 200);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: {"a":"pass"}
 - 1: {"a":"pass"}
 - 2: undefined

Normalized calls: Same

Final output calls: Same
