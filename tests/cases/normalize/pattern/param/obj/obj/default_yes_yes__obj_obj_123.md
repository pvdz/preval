# Preval test case

# default_yes_yes__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > default_yes_yes__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'fail2' } })) {
  return 'ok';
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpArg_1;
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        tmpObjPropValue = { y: 'fail2' };
        tmpArg = { x: tmpObjPropValue };
        $tdz$__pattern_after_default = $(tmpArg);
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  {
    let objPatternAfterDefault;
    {
      let ifTestTmp_1 = objPatternBeforeDefault === undefined;
      if (ifTestTmp_1) {
        tmpArg_1 = { x: 'fail' };
        objPatternAfterDefault = $(tmpArg_1);
      } else {
        objPatternAfterDefault = objPatternBeforeDefault;
      }
    }
  }
  return 'ok';
}
var tmpArg_2;
var tmpArg_3;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { x: 1, y: 2, z: 3 };
tmpArg_3 = { x: tmpObjPropValue_1, b: 11, c: 12 };
tmpArg_2 = f(tmpArg_3, 10);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpArg_1;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpObjPropValue = { y: 'fail2' };
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  let ifTestTmp_1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    tmpArg_1 = { x: 'fail' };
    objPatternAfterDefault = $(tmpArg_1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  return 'ok';
}
var tmpArg_2;
var tmpArg_3;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { x: 1, y: 2, z: 3 };
tmpArg_3 = { x: tmpObjPropValue_1, b: 11, c: 12 };
tmpArg_2 = f(tmpArg_3, 10);
$(tmpArg_2);
`````
