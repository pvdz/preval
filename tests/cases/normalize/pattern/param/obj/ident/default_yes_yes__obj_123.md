# Preval test case

# default_yes_yes__obj_123.md

> normalize > pattern >  > param > obj > ident > default_yes_yes__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') } = $({ x: 'fail2' })) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpArg = { x: 'fail2' };
      $tdz$__pattern_after_default = $(tmpArg);
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let x;
  {
    let ifTestTmp$1 = objPatternBeforeDefault === undefined;
    if (ifTestTmp$1) {
      x = $('fail');
    } else {
      x = objPatternBeforeDefault;
    }
  }
  return x;
}
var tmpArg$1;
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = { x: 1, b: 2, c: 3 };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpArg = { x: 'fail2' };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let x;
  let ifTestTmp$1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = { x: 1, b: 2, c: 3 };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
