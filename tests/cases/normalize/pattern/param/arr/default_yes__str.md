# Preval test case

# default_yes__str.md

> normalize > pattern >  > param > arr > default_yes__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([] = $('fail')) {
  return 'ok';
}
$(f('xyz', 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = $('fail');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  return 'ok';
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f('xyz', 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = $('fail');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  [...$tdz$__pattern_after_default];
  return 'ok';
}
var tmpArg;
tmpArg = f('xyz', 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
