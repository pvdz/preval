# Preval test case

# default_yes_no__obj_empty_str.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'ok';
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
      tmpArg = ['fail'];
      objPatternAfterDefault = $(tmpArg);
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: '', a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: '', a: 11, b: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
