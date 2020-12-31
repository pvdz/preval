# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: [ y = a ]} = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1,
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  arrPatternBeforeDefault = arrPatternSplat[0],
  y = arrPatternBeforeDefault === undefined ? a : arrPatternBeforeDefault;
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x,
  arrPatternSplat = [...objPatternNoDefault];
`````
