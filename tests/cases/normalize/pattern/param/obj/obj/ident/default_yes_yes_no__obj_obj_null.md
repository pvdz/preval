# Preval test case

# default_yes_yes_no__obj_obj_null.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: { x: 1, y: null, z: 3 }, b: 11, c: 12 }, 10));
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
  return y;
}
var tmpArg$1;
var tmpArg$2;
var tmpObjPropValue;
('<hoisted func decl `f`>');
tmpObjPropValue = { x: 1, y: null, z: 3 };
tmpArg$2 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg$1 = f(tmpArg$2, 10);
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
  return y;
}
var tmpArg$1;
var tmpArg$2;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: null, z: 3 };
tmpArg$2 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
