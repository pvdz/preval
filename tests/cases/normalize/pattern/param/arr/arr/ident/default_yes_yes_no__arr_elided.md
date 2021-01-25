# Preval test case

# default_yes_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['pass2'])]) {
  return x;
}
$(f([, , , , 4, 5], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = ['pass2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault$1;
  }
  return x;
}
var tmpArg$1;
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = [, , , , 4, 5];
tmpArg$1 = f(tmpArg$2, 200);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = ['pass2'];
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault$1;
  }
  return x;
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = [, , , , 4, 5];
tmpArg$1 = f(tmpArg$2, 200);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: "pass2"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
