# Preval test case

# default_yes_yes__obj_undefined.md

> normalize > pattern >  > param > obj > ident > default_yes_yes__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('pass') } = $({ x: 'fail2' })) {
  return x;
}
$(f({ x: undefined }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpArg = { x: 'fail2' };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let x;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg$1;
var tmpArg$2;
('<hoisted func decl `f`>');
tmpArg$2 = { x: undefined };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpArg = { x: 'fail2' };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let x;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('pass');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = { x: undefined };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
