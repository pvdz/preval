# Preval test case

# default_yes_yes__0.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_yes__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f(0, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpArg_1;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpObjPropValue = { a: 'fail2' };
      tmpArg = { x: tmpObjPropValue };
      $tdz$__pattern_after_default = $(tmpArg);
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  {
    let ifTestTmp_1 = objPatternBeforeDefault === undefined;
    if (ifTestTmp_1) {
      tmpArg_1 = { a: 'pass' };
      objPatternAfterDefault = $(tmpArg_1);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let y = objPatternRest(objPatternAfterDefault, [], undefined);
  return y;
}
var tmpArg_2;
tmpArg_2 = f(0, 10);
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
    tmpObjPropValue = { a: 'fail2' };
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  let ifTestTmp_1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    tmpArg_1 = { a: 'pass' };
    objPatternAfterDefault = $(tmpArg_1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let y = objPatternRest(objPatternAfterDefault, [], undefined);
  return y;
}
var tmpArg_2;
tmpArg_2 = f(0, 10);
$(tmpArg_2);
`````

## Result

Should call `$` with:
[[{ a: 'pass' }], "<crash[ Cannot read property 'cannotDestructureThis' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
