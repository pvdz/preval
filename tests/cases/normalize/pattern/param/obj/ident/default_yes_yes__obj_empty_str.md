# Preval test case

# default_yes_yes__obj_empty_str.md

> normalize > pattern >  > param > obj > ident > default_yes_yes__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('fail') } = $({ x: 'fail2' })) {
  return x;
}
$(f({ x: '' }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        tmpArg = { x: 'fail2' };
        $tdz$__pattern_after_default = $(tmpArg);
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  {
    let x;
    {
      let ifTestTmp_1 = objPatternBeforeDefault === undefined;
      if (ifTestTmp_1) {
        x = $('fail');
      } else {
        x = objPatternBeforeDefault;
      }
    }
  }
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: '' };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpArg = { x: 'fail2' };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let x;
  let ifTestTmp_1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    x = $('fail');
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: '' };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
