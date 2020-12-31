# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let z = 1; }
const {x: {y: {z}}} = 1;
{ let z = 1; }
`````

## Normalized

`````js filename=intro
{
  let z_1 = 1;
}
const bindingPatternObjRoot = 1,
  objPatternNoDefault = bindingPatternObjRoot.x,
  objPatternNoDefault_1 = objPatternNoDefault.y,
  z = objPatternNoDefault_1.z;
{
  let z_2 = 1;
}
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
`````
