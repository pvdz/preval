# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > arr > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [[y]] } = { x: [[1, 2, 3], 13], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpElement;
const bindingPatternObjRoot = { x: ((tmpElement = [1, 2, 3]), [tmpElement, 13]), a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  y = arrPatternSplat_1[0];
$(y);
`````

## Output

`````js filename=intro
var tmpElement;
const bindingPatternObjRoot = { x: ((tmpElement = [1, 2, 3]), [tmpElement, 13]), a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  arrPatternStep = arrPatternSplat[0],
  arrPatternSplat_1 = [...arrPatternStep],
  y = arrPatternSplat_1[0];
$(y);
`````
