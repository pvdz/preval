# Preval test case

# default_yes_yes__empty.md

> normalize > pattern >  > param > obj > obj > default_yes_yes__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'pass2' } })) {
  return 'ok';
}
$(f());
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
        tmpObjPropValue = { y: 'pass2' };
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
tmpArg_2 = f();
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
    tmpObjPropValue = { y: 'pass2' };
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
tmpArg_2 = f();
$(tmpArg_2);
`````
