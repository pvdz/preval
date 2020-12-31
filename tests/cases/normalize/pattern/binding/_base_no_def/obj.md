# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x } = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1,
  x = bindingPatternObjRoot.x;
`````

## Output

`````js filename=intro

`````
