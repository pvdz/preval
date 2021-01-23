# Preval test case

# default_yes_yes__obj_str.md

> normalize > pattern >  > param > obj > obj > default_yes_yes__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'fail2' } })) {
  return 'ok';
}
$(f({ x: 'abc', b: 11, c: 12 }, 10));
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
      tmpObjPropValue = { y: 'fail2' };
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
      tmpArg$1 = { x: 'fail' };
      objPatternAfterDefault = $(tmpArg$1);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let objPatternCrashTest = objPatternAfterDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternAfterDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg$2;
var tmpArg$3;
tmpArg$3 = { x: 'abc', b: 11, c: 12 };
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
    tmpObjPropValue = { y: 'fail2' };
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  let ifTestTmp$1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    tmpArg$1 = { x: 'fail' };
    objPatternAfterDefault = $(tmpArg$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternCrashTest = objPatternAfterDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternAfterDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg$2;
var tmpArg$3;
tmpArg$3 = { x: 'abc', b: 11, c: 12 };
tmpArg$2 = f(tmpArg$3, 10);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
