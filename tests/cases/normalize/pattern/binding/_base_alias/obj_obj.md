# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z: a}}} = 1
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1,
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternNoDefault_1 = objPatternNoDefault.y,
  a = objPatternNoDefault_1.z;
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
`````
