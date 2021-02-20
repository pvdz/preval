# Preval test case

# obj.md

> Normalize > Pattern > Param > Base unique > Obj
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
  let x$1 = tmpParamPattern.x;
  let x$2 = 2;
  return x$1;
}
let x = 1;
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
