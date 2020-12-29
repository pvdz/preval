# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

#TODO

## Input

`````js filename=intro
function g({ x = b } ) { return x }
`````

## Normalized

`````js filename=intro
function g(tmpParamPattern) {
  let x = tmpParamPattern.x;
  if (x === undefined) {
    x = b;
  }
  return x;
}
`````

## Output

`````js filename=intro

`````
