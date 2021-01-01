# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: { ...z },
  },
} = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 };
$(z);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const z = objPatternRest(objPatternNoDefault_1, []);
$(z);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 13, y: { z: 1, a: 2, b: 3 }, z: 14 }, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const z = objPatternRest(objPatternNoDefault_1, []);
$(z);
`````
