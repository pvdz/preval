# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x: y }) { return y }
`````

## Normalized

`````js filename=intro
function g(tmpParamPattern) {
  let y = tmpParamPattern.x;
  return y;
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
