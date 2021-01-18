# Preval test case

# default_yes_no_no__obj_obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('pass') } }) {
  return y;
}
$(f({ x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  {
    let y;
    {
      let ifTestTmp = objPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        y = $('pass');
      } else {
        y = objPatternBeforeDefault;
      }
    }
  }
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternBeforeDefault = objPatternNoDefault.y;
  let y;
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = $('pass');
  } else {
    y = objPatternBeforeDefault;
  }
  return y;
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
[['pass'], [null], null];

Normalized calls: BAD?!
[['pass'], [{ 0: 'a', 1: 'b', 2: 'c' }], null];

Final output calls: Same
