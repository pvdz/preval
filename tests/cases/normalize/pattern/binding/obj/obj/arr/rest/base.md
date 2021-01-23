# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: [...z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
$(z);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault$1];
const z = arrPatternSplat.slice(0);
$(z);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue$1;
tmpObjPropValue$1 = [1, 2, 3];
tmpObjPropValue = { x: 13, y: tmpObjPropValue$1, z: 14 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault$1];
const z = arrPatternSplat.slice(0);
$(z);
`````

## Result

Should call `$` with:
 - 0: [1,2,3]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
