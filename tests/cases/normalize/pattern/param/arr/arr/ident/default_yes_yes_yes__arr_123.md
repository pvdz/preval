# Preval test case

# default_yes_yes_yes__arr_123.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_yes__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])] = $(['fail3'])) {
  return x;
}
$(f([1, 2, 3, 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpArg = ['fail3'];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    tmpArg$1 = ['pass2'];
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x;
  const tmpIfTest$2 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$2) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault$1;
  }
  return x;
}
var tmpArg$2;
var tmpArg$3;
('<hoisted func decl `f`>');
tmpArg$3 = [1, 2, 3, 4, 5];
tmpArg$2 = f(tmpArg$3, 200);
$(tmpArg$2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpArg = ['fail3'];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    tmpArg$1 = ['pass2'];
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x;
  const tmpIfTest$2 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$2) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault$1;
  }
  return x;
}
var tmpArg$2;
var tmpArg$3;
tmpArg$3 = [1, 2, 3, 4, 5];
tmpArg$2 = f(tmpArg$3, 200);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
