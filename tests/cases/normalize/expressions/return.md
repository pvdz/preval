# Preval test case

# return.md

> Normalize > Expressions > Return
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function f(x, y) {
  return x = y;
}
`````

## Pre Normal

`````js filename=intro
let f = function (x, y) {
  return (x = y);
};
`````

## Normalized

`````js filename=intro
let f = function (x, y) {
  x = y;
  let tmpReturnArg = x;
  return tmpReturnArg;
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
