# Preval test case

# default_yes_yes_yes__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_yes__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'pass'] = $(['fail2']) } = $({ x: ['fail3'] })) {
  return y;
}
$(f({ x: [], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  var tmpObjPropValue;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpObjPropValue = ['fail3'];
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
      tmpArg$1 = ['fail2'];
      objPatternAfterDefault = $(tmpArg$1);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  {
    let ifTestTmp$2 = arrPatternBeforeDefault === undefined;
    if (ifTestTmp$2) {
      y = 'pass';
    } else {
      y = arrPatternBeforeDefault;
    }
  }
  return y;
}
var tmpArg$2;
var tmpArg$3;
('<hoisted func decl `f`>');
tmpArg$3 = { x: [], a: 11, b: 12 };
tmpArg$2 = f(tmpArg$3, 10);
$(tmpArg$2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  var tmpObjPropValue;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpObjPropValue = ['fail3'];
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  let ifTestTmp$1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    tmpArg$1 = ['fail2'];
    objPatternAfterDefault = $(tmpArg$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  let ifTestTmp$2 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp$2) {
    y = 'pass';
  } else {
    y = arrPatternBeforeDefault;
  }
  return y;
}
var tmpArg$2;
var tmpArg$3;
tmpArg$3 = { x: [], a: 11, b: 12 };
tmpArg$2 = f(tmpArg$3, 10);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
