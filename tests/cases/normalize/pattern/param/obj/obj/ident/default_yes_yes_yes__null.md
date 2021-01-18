# Preval test case

# default_yes_yes_yes__null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'fail3' } })) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpArg_1;
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        tmpObjPropValue = { y: 'fail3' };
        tmpArg = { x: tmpObjPropValue };
        $tdz$__pattern_after_default = $(tmpArg);
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  {
    let objPatternAfterDefault;
    {
      let ifTestTmp_1 = objPatternBeforeDefault === undefined;
      if (ifTestTmp_1) {
        tmpArg_1 = { y: 'fail2' };
        objPatternAfterDefault = $(tmpArg_1);
      } else {
        objPatternAfterDefault = objPatternBeforeDefault;
      }
    }
  }
  let objPatternBeforeDefault_1 = objPatternAfterDefault.y;
  {
    let y;
    {
      let ifTestTmp_2 = objPatternBeforeDefault_1 === undefined;
      if (ifTestTmp_2) {
        y = $('fail');
      } else {
        y = objPatternBeforeDefault_1;
      }
    }
  }
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(null, 10);
$(tmpArg_2);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  var tmpObjPropValue;
  var tmpArg_1;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpObjPropValue = { y: 'fail3' };
    tmpArg = { x: tmpObjPropValue };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault;
  let ifTestTmp_1 = objPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    tmpArg_1 = { y: 'fail2' };
    objPatternAfterDefault = $(tmpArg_1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault_1 = objPatternAfterDefault.y;
  let y;
  let ifTestTmp_2 = objPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_2) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault_1;
  }
  return 'bad';
}
var tmpArg_2;
tmpArg_2 = f(null, 10);
$(tmpArg_2);
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'x' of null ]>"];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: Same
