# Preval test case

# default_yes_yes__empty.md

> normalize > pattern >  > param > arr > ident > default_yes_yes__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')] = $('pass2')) {
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      $tdz$__pattern_after_default = $('pass2');
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  {
    let ifTestTmp$1 = arrPatternBeforeDefault === undefined;
    if (ifTestTmp$1) {
      x = $('fail');
    } else {
      x = arrPatternBeforeDefault;
    }
  }
  return x;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    $tdz$__pattern_after_default = $('pass2');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  let ifTestTmp$1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    x = $('fail');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "pass2"
 - 1: "p"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
