# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
let y = 1;
function g({ x: y }) {
  {
    let y = 2;
  }
  return y;
}
`````

## Normalized

`````js filename=intro
function g(tmpParamPattern) {
  let y_1 = tmpParamPattern.x;
  {
    let y_2 = 2;
  }
  return y_1;
}
let y = 1;
('<hoisted func decl `g`>');
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
