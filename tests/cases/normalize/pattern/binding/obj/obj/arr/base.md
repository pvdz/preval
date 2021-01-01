# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > arr > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: {
    y: [],
  },
} = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const arrPatternSplat = [...objPatternNoDefault_1];
$('ok');
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: { x: 13, y: [1, 2, 3], z: 14 }, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
$('ok');
`````
