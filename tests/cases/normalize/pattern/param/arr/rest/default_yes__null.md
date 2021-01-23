# Preval test case

# default_yes__null.md

> normalize > pattern >  > param > arr > rest > default_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x] = $(['fail'])) {
  return 'bad';
}
$(f(null, 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  {
    let ifTestTmp = $tdz$__pattern === undefined;
    if (ifTestTmp) {
      tmpArg = ['fail'];
      $tdz$__pattern_after_default = $(tmpArg);
    } else {
      $tdz$__pattern_after_default = $tdz$__pattern;
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let x = arrPatternSplat.slice(0);
  return 'bad';
}
var tmpArg$1;
tmpArg$1 = f(null, 200);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail'];
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  arrPatternSplat.slice(0);
  return 'bad';
}
var tmpArg$1;
tmpArg$1 = f(null, 200);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
