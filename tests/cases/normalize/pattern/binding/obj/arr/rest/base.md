# Preval test case

# base.md

> normalize > pattern >  > param > obj > arr > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] } = { x: [1, 2, 3], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: [1, 2, 3], a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  y = arrPatternSplat.slice(0);
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: [1, 2, 3], a: 11, b: 12 },
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  y = arrPatternSplat.slice(0);
$(y);
`````
