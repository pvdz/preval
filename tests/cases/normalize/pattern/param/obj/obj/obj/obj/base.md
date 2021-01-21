# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: {
      z: {},
    },
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: { z: { a: 1, b: 2, c: 3 }, a: 15, b: 16 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let objPatternNoDefault_2 = objPatternNoDefault_1.z;
  let objPatternCrashTest = objPatternNoDefault_2 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault_2 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault_2.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
tmpObjPropValue_2 = { a: 1, b: 2, c: 3 };
tmpObjPropValue_1 = { z: tmpObjPropValue_2, a: 15, b: 16 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let objPatternNoDefault_2 = objPatternNoDefault_1.z;
  let objPatternCrashTest = objPatternNoDefault_2 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault_2 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault_2.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
tmpObjPropValue_2 = { a: 1, b: 2, c: 3 };
tmpObjPropValue_1 = { z: tmpObjPropValue_2, a: 15, b: 16 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue_1, z: 14 };
tmpArg_1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
