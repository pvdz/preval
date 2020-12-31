# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: [ y ]} = 1
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1,
  objPatternNoDefault = bindingPatternObjRoot.x,
  arrPatternSplat = [...objPatternNoDefault],
  y = arrPatternSplat[0];
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
`````
