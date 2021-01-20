# Preval test case

# default_no_no__empty.md

> normalize > pattern >  > param > obj > rest > default_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'pass' })) {
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpArg = { a: 'pass' };
      $tdz$__pattern_after_default = $(tmpArg);
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let x = objPatternRest($tdz$__pattern_after_default, []);
  return x;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpArg = { a: 'pass' };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let x = objPatternRest($tdz$__pattern_after_default, []);
  return x;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Result

Should call `$` with:
[[{ a: 'pass' }], "<crash[ Cannot destructure '(intermediate value)(intermediate value)(intermediate value)' as it is undefined. ]>"];

Normalized calls: BAD?!
[[{ a: 'pass' }], '<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
[[{ a: 'pass' }], '<crash[ <ref> is not defined ]>'];

