# Preval test case

# default_yes__arr_elided.md

> normalize > pattern >  > param > arr > default_yes__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([] = $('fail')) {
  return 'ok';
}
$(f([, , 1], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        $tdz$__pattern_after_default = $('fail');
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [, , 1];
tmpArg = f(tmpArg_1, 200);
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
  [...$tdz$__pattern_after_default];
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [, , 1];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
