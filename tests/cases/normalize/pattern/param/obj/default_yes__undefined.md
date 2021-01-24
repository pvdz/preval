# Preval test case

# default_yes__undefined.md

> normalize > pattern >  > param > obj > default_yes__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      $tdz$__pattern_after_default = $('pass');
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let objPatternCrashTest = $tdz$__pattern_after_default === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = $tdz$__pattern_after_default === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = $tdz$__pattern_after_default.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    $tdz$__pattern_after_default = $('pass');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternCrashTest = $tdz$__pattern_after_default === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = $tdz$__pattern_after_default === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = $tdz$__pattern_after_default.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "ok"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
