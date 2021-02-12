# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f(x, y) {
  return x = y;
}
`````

## Normalized

`````js filename=intro
function f(x, y) {
  x = y;
  let tmpReturnArg = x;
  return tmpReturnArg;
}
`````

## Output

`````js filename=intro
function f(x, y) {
  x = y;
  let tmpReturnArg = x;
  return tmpReturnArg;
}
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
