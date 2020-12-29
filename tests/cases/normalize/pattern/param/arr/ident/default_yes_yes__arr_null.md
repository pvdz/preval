# Preval test case

# default_yes_yes__arr_null.md

> normalize > pattern >  > param > arr > ident > default_yes_yes__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')] = $('fail2')) {
  return x;
}
$(f([null, 201], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail2')), tmpTernaryConsequent) : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let x = arrPatternSplat[0];
  if (x === undefined) {
    x = $('fail');
  }
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [null, 201];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpTernaryTest;
  var tmpTernaryConsequent;
  tmpTernaryTest = $tdz$__pattern === undefined;
  let $tdz$__pattern_after_default = tmpTernaryTest ? ((tmpTernaryConsequent = $('fail2')), tmpTernaryConsequent) : $tdz$__pattern;
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let x = arrPatternSplat[0];
  if (x === undefined) {
    x = $('fail');
  }
  return x;
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = [null, 201];
tmpArg = f(tmpArg_1, 200);
$(tmpArg);
`````
