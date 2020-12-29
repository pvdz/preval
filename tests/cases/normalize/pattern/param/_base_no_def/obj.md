# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x }) { return x }
`````

## Normalized

`````js filename=intro
function g(tmpParamPattern) {
  let x = tmpParamPattern.x;
  return x;
}
`````

## Output

`````js filename=intro

`````
