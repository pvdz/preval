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
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const a = objPatternNoDefault_1.z;
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
`````
