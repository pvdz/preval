# Preval test case

# default_yes_yes_no__obj_arr_123.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['fail2']) }) {
  return y;
}
$(f({ x: [1, 2, 3], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      tmpArg = ['fail2'];
      objPatternAfterDefault = $(tmpArg);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  {
    let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
    if (ifTestTmp_1) {
      y = 'fail';
    } else {
      y = arrPatternBeforeDefault;
    }
  }
  return y;
}
var tmpArg_1;
var tmpArg_2;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpArg_2 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail2'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
  }
  return y;
}
var tmpArg_1;
var tmpArg_2;
var tmpObjPropValue;
tmpObjPropValue = [1, 2, 3];
tmpArg_2 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
