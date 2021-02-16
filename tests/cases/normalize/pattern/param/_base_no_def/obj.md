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
function g(tmpParamPattern) {
  const x = tmpParamPattern.x;
  return x;
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
