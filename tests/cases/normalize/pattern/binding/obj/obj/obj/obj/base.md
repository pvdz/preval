# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: {
      z: {},
    },
  },
} = { x: { x: 13, y: { z: { a: 1, b: 2, c: 3 }, a: 15, b: 16 }, z: 14 }, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = { a: 1, b: 2, c: 3 };
tmpObjPropValue$1 = { z: tmpObjPropValue$2, a: 15, b: 16 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternNoDefault$2 = objPatternNoDefault$1.z;
let objPatternCrashTest = objPatternNoDefault$2 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault$2 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault$2.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
var tmpObjPropValue$2;
tmpObjPropValue$2 = { a: 1, b: 2, c: 3 };
tmpObjPropValue$1 = { z: tmpObjPropValue$2, a: 15, b: 16 };
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternNoDefault$2 = objPatternNoDefault$1.z;
let objPatternCrashTest = objPatternNoDefault$2 === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault$2 === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault$2.cannotDestructureThis;
}
$('ok');
`````

## Result

Should call `$` with:
 - 0: "ok"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
