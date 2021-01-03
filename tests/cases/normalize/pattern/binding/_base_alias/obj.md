# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x: a } = 1
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const a = bindingPatternObjRoot.x;
`````

## Output

`````js filename=intro
(1).x;
`````
