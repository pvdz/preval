# Preval test case

# default_yes__str.md

> normalize > pattern >  > param > obj > default_yes__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('fail')) {
  return 'ok';
}
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      $tdz$__pattern_after_default = $('fail');
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  return 'ok';
}
var tmpArg;
tmpArg = f('abc', 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    $tdz$__pattern_after_default = $('fail');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  return 'ok';
}
var tmpArg;
tmpArg = f('abc', 10);
$(tmpArg);
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
