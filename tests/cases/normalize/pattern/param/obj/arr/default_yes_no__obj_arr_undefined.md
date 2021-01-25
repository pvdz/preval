# Preval test case

# default_yes_no__obj_arr_undefined.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_arr_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) }) {
  return 'ok';
}
$(f({ x: [undefined], a: 11, b: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = ['fail'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let arrPatternSplat = [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg$1;
var tmpArg$2;
var tmpObjPropValue;
('<hoisted func decl `f`>');
tmpObjPropValue = [undefined];
tmpArg$2 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    tmpArg = ['fail'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  [...objPatternAfterDefault];
  return 'ok';
}
var tmpArg$1;
var tmpArg$2;
var tmpObjPropValue;
tmpObjPropValue = [undefined];
tmpArg$2 = { x: tmpObjPropValue, a: 11, b: 12 };
tmpArg$1 = f(tmpArg$2, 10);
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
