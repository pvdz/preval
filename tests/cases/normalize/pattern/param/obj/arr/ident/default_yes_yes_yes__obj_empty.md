# Preval test case

# default_yes_yes_yes__obj_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_yes__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) } = $({ x: ['fail3'] })) {
  return y;
}
$(f({}, 10));
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
    tmpObjPropValue = ['fail3'];
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    tmpArg$1 = ['pass2'];
    objPatternAfterDefault = $(tmpArg$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  const tmpIfTest$2 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$2) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
  }
  return y;
}
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = f({}, 10);
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
    tmpObjPropValue = ['fail3'];
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    tmpArg$1 = ['pass2'];
    objPatternAfterDefault = $(tmpArg$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  const tmpIfTest$2 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$2) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
  }
  return y;
}
var tmpArg$2;
tmpArg$2 = f({}, 10);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: "pass2"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
