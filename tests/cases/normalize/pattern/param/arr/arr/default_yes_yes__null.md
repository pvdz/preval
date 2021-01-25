# Preval test case

# default_yes_yes__null.md

> normalize > pattern >  > param > arr > arr > default_yes_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[] = $(['fail2'])] = $(['fail3'])) {
  return 'bad';
}
$(f(null, 200));
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
    tmpArg$1 = ['fail2'];
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  return 'bad';
}
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = f(null, 200);
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
    tmpArg$1 = ['fail2'];
    arrPatternStep = $(tmpArg$1);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  [...arrPatternStep];
  return 'bad';
}
var tmpArg$2;
tmpArg$2 = f(null, 200);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
