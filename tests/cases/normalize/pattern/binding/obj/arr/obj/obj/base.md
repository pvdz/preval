# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {
  x: [
    {
      y: {},
    },
  ],
} = { x: [{ x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }, 13, 14], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternObjRoot = { x: ((tmpElement = { x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }), [tmpElement, 13, 14]), a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  arrPatternStep = arrPatternSplat[0],
  objPatternNoDefault_1 = arrPatternStep.y;
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternObjRoot = { x: ((tmpElement = { x: 15, y: { a: 1, b: 2, c: 3 }, c: 16 }), [tmpElement, 13, 14]), a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  arrPatternStep = arrPatternSplat[0];
$('ok');
`````
