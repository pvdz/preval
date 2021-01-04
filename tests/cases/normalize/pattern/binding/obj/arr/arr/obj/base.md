# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [[{}]] } = { x: [[{ a: 1, b: 2, c: 3 }, 14], 13], a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpElement;
var tmpElement_1;
const bindingPatternObjRoot = {
  x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), (tmpElement = [tmpElement_1, 14]), [tmpElement, 13]),
  a: 11,
  b: 12,
};
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
const arrPatternStep_1 = arrPatternSplat_1[0];
$('ok');
`````

## Output

`````js filename=intro
var tmpElement;
var tmpElement_1;
const bindingPatternObjRoot = {
  x: ((tmpElement_1 = { a: 1, b: 2, c: 3 }), (tmpElement = [tmpElement_1, 14]), [tmpElement, 13]),
  a: 11,
  b: 12,
};
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternStep = arrPatternSplat[0];
const arrPatternSplat_1 = [...arrPatternStep];
arrPatternSplat_1[0];
$('ok');
`````
