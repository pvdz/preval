# Preval test case

# default_yes_yes_no__empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) }) {
  return 'bad';
}
$(f());
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      tmpArg = { y: 'fail2' };
      objPatternAfterDefault = $(tmpArg);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y;
  {
    let ifTestTmp$1 = objPatternBeforeDefault$1 === undefined;
    if (ifTestTmp$1) {
      y = $('fail');
    } else {
      y = objPatternBeforeDefault$1;
    }
  }
  return 'bad';
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { y: 'fail2' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y;
  let ifTestTmp$1 = objPatternBeforeDefault$1 === undefined;
  if (ifTestTmp$1) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault$1;
  }
  return 'bad';
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
