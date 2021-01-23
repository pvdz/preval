# Preval test case

# default_yes_yes_yes__undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_yes__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'pass3' } })) {
  return y;
}
$(f(undefined, 10));
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
      tmpObjPropValue = { y: 'pass3' };
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
      tmpArg$1 = { y: 'fail2' };
      objPatternAfterDefault = $(tmpArg$1);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y;
  {
    let ifTestTmp$2 = objPatternBeforeDefault$1 === undefined;
    if (ifTestTmp$2) {
      y = $('fail');
    } else {
      y = objPatternBeforeDefault$1;
    }
  }
  return y;
}
var tmpArg$2;
('<hoisted var `tmpArg$2` decl without init>');
('<hoisted var `tmpArg$2` decl without init>');
tmpArg$2 = f(undefined, 10);
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
    tmpObjPropValue = { y: 'pass3' };
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  let ifTestTmp$1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    tmpArg$1 = { y: 'fail2' };
    objPatternAfterDefault = $(tmpArg$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y;
  let ifTestTmp$2 = objPatternBeforeDefault$1 === undefined;
  if (ifTestTmp$2) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault$1;
  }
  return y;
}
var tmpArg$2;
tmpArg$2 = f(undefined, 10);
$(tmpArg$2);
`````

## Result

Should call `$` with:
 - 0: {"x":{"y":"pass3"}}
 - 1: "pass3"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
