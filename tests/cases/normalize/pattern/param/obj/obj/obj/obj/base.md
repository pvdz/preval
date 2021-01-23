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
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternNoDefault$2 = objPatternNoDefault$1.z;
  let objPatternCrashTest = objPatternNoDefault$2 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault$2 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault$2.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = { a: 1, b: 2, c: 3 };
tmpObjPropValue$1 = { z: tmpObjPropValue$2, a: 15, b: 16 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
tmpArg$1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternNoDefault$2 = objPatternNoDefault$1.z;
  let objPatternCrashTest = objPatternNoDefault$2 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault$2 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault$2.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = { a: 1, b: 2, c: 3 };
tmpObjPropValue$1 = { z: tmpObjPropValue$2, a: 15, b: 16 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
tmpArg$1 = { x: tmpObjPropValue, b: 11, c: 12 };
tmpArg = f(tmpArg$1, 10);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
