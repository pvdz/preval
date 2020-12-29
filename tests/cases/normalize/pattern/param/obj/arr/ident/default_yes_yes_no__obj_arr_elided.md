# Preval test case

# default_yes_yes_no__obj_arr_elided.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'pass'] = $(['fail2']) }) {
  return y;
}
$(f({ x: [, , , 1], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = ['fail2'];
    arrPatternStep = $(tmpArg);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  if (y === undefined) {
    y = 'pass';
  }
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: [, , , 1], a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let arrPatternStep = tmpParamPattern.x;
  if (arrPatternStep === undefined) {
    tmpArg = ['fail2'];
    arrPatternStep = $(tmpArg);
  }
  let arrPatternSplat = [...arrPatternStep];
  let y = arrPatternSplat[0];
  if (y === undefined) {
    y = 'pass';
  }
  return y;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: [, , , 1], a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
