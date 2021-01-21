# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({
  x: {
    y: {},
  },
}) {
  return 'ok';
}
$(f({ x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault_1 = objPatternNoDefault.y;
  let objPatternCrashTest = objPatternNoDefault_1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault_1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault_1.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { z: 1, a: 2, b: 3 };
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
  let objPatternCrashTest = objPatternNoDefault_1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault_1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault_1.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg_1;
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpObjPropValue_1 = { z: 1, a: 2, b: 3 };
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
