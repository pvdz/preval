# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
let x = 1;
function g({ x }) {
  { let x = 2; }
  return x
}
`````

## Normalized

`````js filename=intro
function g(tmpParamPattern) {
  let x_1 = tmpParamPattern.x;
  {
    let x_2 = 2;
  }
  return x_1;
}
let x = 1;
`````

## Output

`````js filename=intro
function g(tmpParamPattern) {
  let x_1 = tmpParamPattern.x;
  {
    let x_2 = 2;
  }
  return x_1;
}
let x = 1;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
