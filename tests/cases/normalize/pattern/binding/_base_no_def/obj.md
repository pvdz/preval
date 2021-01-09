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
const bindingPatternObjRoot = 1;
const x = bindingPatternObjRoot.x;
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = x.x;
`````

## Output

`````js filename=intro
(1).x;
`````
