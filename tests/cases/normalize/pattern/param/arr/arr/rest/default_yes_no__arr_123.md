# Preval test case

# default_yes_no__arr_123.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[...x] = $('pass')]) {
  return x;
}
$(f([1, 2, 3, 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    arrPatternStep = $('pass');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
}
var tmpArg;
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = [1, 2, 3, 4, 5];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    arrPatternStep = $('pass');
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let x = arrPatternSplat$1.slice(0);
  return x;
}
var tmpArg;
var tmpArg$1;
tmpArg$1 = [1, 2, 3, 4, 5];
tmpArg = f(tmpArg$1, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
