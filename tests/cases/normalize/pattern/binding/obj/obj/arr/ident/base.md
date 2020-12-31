# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: [z],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
$(z);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternNoDefault_1 = objPatternNoDefault.y,
  arrPatternSplat = [...objPatternNoDefault_1],
  z = arrPatternSplat[0];
$(z);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternNoDefault_1 = objPatternNoDefault.y,
  arrPatternSplat = [...objPatternNoDefault_1],
  z = arrPatternSplat[0];
$(z);
`````
