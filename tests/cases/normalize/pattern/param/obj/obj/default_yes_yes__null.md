# Preval test case

# default_yes_yes__null.md

> normalize > pattern >  > param > obj > obj > default_yes_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: {} = $({ x: 'fail' }) } = $({ x: { y: 'fail2' } })) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  var tmpObjPropValue;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpObjPropValue = { y: 'fail2' };
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
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
  return 'bad';
}
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = f(null, 10);
$(tmpArg$2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpArg$1;
  var tmpObjPropValue;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpObjPropValue = { y: 'fail2' };
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
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
  return 'bad';
}
var tmpArg$2;
tmpArg$2 = f(null, 10);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of null ]>

Normalized calls: Same

Final output calls: Same
