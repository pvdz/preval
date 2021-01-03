# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
const {x: {y: {z: a}}} = 1
{ let a = 1; }
`````

## Normalized

`````js filename=intro
{
  let a_1 = 1;
}
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const a = objPatternNoDefault_1.z;
{
  let a_2 = 1;
}
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
`````