# Preval test case

# default_yes_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([{ x = $('pass') } = $({ x: 'pass2' })]) {
  return x;
}
$(f([, , , 1, 20, 30], 200));
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
    tmpArg = { x: 'pass2' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg$1;
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = [, , , 1, 20, 30];
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
    tmpArg = { x: 'pass2' };
    arrPatternStep = $(tmpArg);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let objPatternBeforeDefault = arrPatternStep.x;
  let x;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = [, , , 1, 20, 30];
tmpArg$1 = f(tmpArg$2, 200);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: {"x":"pass2"}
 - 1: "pass2"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
