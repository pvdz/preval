# Preval test case

# default_yes_yes__obj_arr_123.md

> normalize > pattern >  > param > obj > arr > default_yes_yes__obj_arr_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f({ x: [1, 2, 3], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpArg$1;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpObjPropValue = ['fail2'];
      tmpArg = { x: tmpObjPropValue };
      $tdz$__pattern_after_default = $(tmpArg);
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  {
    let ifTestTmp$1 = objPatternBeforeDefault === undefined;
    if (ifTestTmp$1) {
      tmpArg$1 = ['fail'];
      objPatternAfterDefault = $(tmpArg$1);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg$2;
var tmpArg$3;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpArg$3 = { x: tmpObjPropValue$1, a: 11, b: 12 };
tmpArg$2 = f(tmpArg$3, 10);
$(tmpArg$2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpArg$1;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpObjPropValue = ['fail2'];
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  let ifTestTmp$1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    tmpArg$1 = ['fail'];
    objPatternAfterDefault = $(tmpArg$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg$2;
var tmpArg$3;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpArg$3 = { x: tmpObjPropValue$1, a: 11, b: 12 };
tmpArg$2 = f(tmpArg$3, 10);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
