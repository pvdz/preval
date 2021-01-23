# Preval test case

# default_yes_yes_no__obj_empty_str.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'pass'] = $(['fail2']) }) {
  return y;
}
$(f({ x: '', a: 11, b: 12 }, 10));
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
      tmpArg = ['fail2'];
      objPatternAfterDefault = $(tmpArg);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  {
    let ifTestTmp$1 = arrPatternBeforeDefault === undefined;
    if (ifTestTmp$1) {
      y = 'pass';
    } else {
      y = arrPatternBeforeDefault;
    }
  }
  return y;
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = { x: '', a: 11, b: 12 };
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
    tmpArg = ['fail2'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let y;
  let ifTestTmp$1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp$1) {
    y = 'pass';
  } else {
    y = arrPatternBeforeDefault;
  }
  return y;
}
var tmpArg$1;
var tmpArg$2;
tmpArg$2 = { x: '', a: 11, b: 12 };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
