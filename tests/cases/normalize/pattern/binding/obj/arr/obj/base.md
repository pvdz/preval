# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [{}] } = { x: [{ x: 1, y: 2, c: 3 }, 13, 14], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternObjRoot = { x: ((tmpElement = { x: 1, y: 2, c: 3 }), [tmpElement, 13, 14]), a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternObjRoot = { x: ((tmpElement = { x: 1, y: 2, c: 3 }), [tmpElement, 13, 14]), a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
arrPatternSplat[0];
$('ok');
`````
