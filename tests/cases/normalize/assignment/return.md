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
  {
    x = y;
    let tmpStmtArg = y;
    return tmpStmtArg;
  }
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
