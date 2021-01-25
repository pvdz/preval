# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > rest > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'pass' })) {
  return x;
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpArg = { a: 'pass' };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let x = objPatternRest($tdz$__pattern_after_default, [], undefined);
  return x;
}
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = f(undefined, 10);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    tmpArg = { a: 'pass' };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let x = objPatternRest($tdz$__pattern_after_default, [], undefined);
  return x;
}
var tmpArg$1;
tmpArg$1 = f(undefined, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: {"a":"pass"}
 - 1: {"a":"pass"}
 - 2: undefined

Normalized calls: Same

Final output calls: Same
