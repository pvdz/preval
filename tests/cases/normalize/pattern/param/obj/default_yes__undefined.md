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
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
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
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
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
const tmpCalleeParam = f(undefined, 10);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
