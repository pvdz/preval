# Preval test case

# default_yes_no_no__obj_arr_elided.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_no_no__obj_arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'pass'] }) {
  return y;
}
$(f({ x: [, , , 1], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  {
    let ifTestTmp = arrPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      y = 'pass';
    } else {
      y = arrPatternBeforeDefault;
    }
  }
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = [, , , 1];
tmpArg_1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let arrPatternSplat = [...objPatternNoDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  let ifTestTmp = arrPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = 'pass';
  } else {
    y = arrPatternBeforeDefault;
  }
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = [, , , 1];
tmpArg_1 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
