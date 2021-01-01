# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [{ y }] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternObjRoot = { x: ((tmpElement = { x: 1, y: 2, c: 3 }), [tmpElement, 13, 14]), a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const y = arrPatternStep.y;
$(y);
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternObjRoot = { x: ((tmpElement = { x: 1, y: 2, c: 3 }), [tmpElement, 13, 14]), a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const y = arrPatternStep.y;
$(y);
`````
