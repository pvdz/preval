# Preval test case

# default_yes_yes__empty_str.md

> normalize > pattern >  > param > arr > ident > default_yes_yes__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('pass')] = $('fail2')) {
  return x;
}
$(f('', 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        $tdz$__pattern_after_default = $('fail2');
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  {
    let x;
    {
      let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
      if (ifTestTmp_1) {
        x = $('pass');
      } else {
        x = arrPatternBeforeDefault;
      }
    }
  }
  return x;
}
var tmpArg;
tmpArg = f('', 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    $tdz$__pattern_after_default = $('fail2');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x;
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    x = $('pass');
  } else {
    x = arrPatternBeforeDefault;
  }
  return x;
}
var tmpArg;
tmpArg = f('', 200);
$(tmpArg);
`````

## Result

Should call `$` with:
[['pass'], [null], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: Same
