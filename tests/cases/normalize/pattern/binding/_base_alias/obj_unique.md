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
const { x: a } = 1
{ let a = 1; }
`````

## Normalized

`````js filename=intro
{
  let a_1 = 1;
}
const bindingPatternObjRoot = 1;
const a = bindingPatternObjRoot.x;
{
  let a_2 = 1;
}
`````

## Output

`````js filename=intro

`````
