# Preval test case

# default_yes_no__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) }) {
  return y;
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  var tmpArg;
  let objPatternBeforeDefault = tmpParamPattern.x;
  {
    let objPatternAfterDefault;
    {
      let ifTestTmp = objPatternBeforeDefault === undefined;
      if (ifTestTmp) {
        tmpArg = { a: 'fail' };
        objPatternAfterDefault = $(tmpArg);
      } else {
        objPatternAfterDefault = objPatternBeforeDefault;
      }
    }
  }
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_1;
var tmpArg_2;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpArg_2 = { x: tmpObjPropValue, b: 11, c: 12 };
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
    tmpArg = { a: 'fail' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let y = objPatternRest(objPatternAfterDefault, []);
  return y;
}
var tmpArg_1;
var tmpArg_2;
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
tmpArg_2 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
