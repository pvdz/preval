# Preval test case

# default_yes_yes__obj_null.md

> normalize > pattern >  > param > obj > arr > default_yes_yes__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'bad';
}
$(f({ x: null, a: 11, b: 12 }, 10));
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
    tmpObjPropValue = ['fail2'];
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    tmpArg$1 = ['fail'];
    objPatternAfterDefault = $(tmpArg$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  return 'bad';
}
var tmpArg$2;
var tmpArg$3;
('<hoisted func decl `f`>');
tmpArg$3 = { x: null, a: 11, b: 12 };
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
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpObjPropValue = ['fail2'];
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    tmpArg$1 = ['fail'];
    objPatternAfterDefault = $(tmpArg$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  [...objPatternAfterDefault];
  return 'bad';
}
var tmpArg$2;
var tmpArg$3;
tmpArg$3 = { x: null, a: 11, b: 12 };
tmpArg$2 = f(tmpArg$3, 10);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
