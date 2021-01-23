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
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let objPatternCrashTest = objPatternNoDefault$1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault$1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpObjPropValue` decl without init>');
('<hoisted var `tmpObjPropValue$1` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpObjPropValue` decl without init>');
('<hoisted var `tmpObjPropValue$1` decl without init>');
tmpObjPropValue$1 = { z: 1, a: 2, b: 3 };
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
  let objPatternCrashTest = objPatternNoDefault$1 === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault$1 === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault$1.cannotDestructureThis;
  }
  return 'ok';
}
var tmpArg;
var tmpArg$1;
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = { z: 1, a: 2, b: 3 };
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
