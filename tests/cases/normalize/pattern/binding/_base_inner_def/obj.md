# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x = b } = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1,
  objPatternBeforeDefault = bindingPatternObjRoot.x,
  x = objPatternBeforeDefault === undefined ? b : objPatternBeforeDefault;
`````

## Output

`````js filename=intro

`````
